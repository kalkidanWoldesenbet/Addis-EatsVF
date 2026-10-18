'use server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { createSession, destroySession, getSession } from '@/lib/session';
import { createUser, findUserByEmail, verifyPassword, createOrder, cancelOrder } from '@/lib/db';
import { getItem, DELIVERY_FEE } from '@/lib/menu';
import { validateSignup, validateSignin, validateCheckout, normalisePhone } from '@/lib/validate';
import { safeNext } from '@/lib/safeNext';

const str = (fd, k) => (typeof fd.get(k) === 'string' ? fd.get(k) : '');

export async function signUp(_prev, fd) {
  const v = { name: str(fd, 'name'), email: str(fd, 'email'), password: str(fd, 'password') };
  const values = { name: v.name, email: v.email };
  const errors = validateSignup(v);
  if (Object.keys(errors).length) return { errors, values };
  if (findUserByEmail(v.email)) {
    return { errors: { email: 'An account with this email already exists. Sign in instead.' }, values };
  }
  await createSession(createUser(v));
  redirect(safeNext(str(fd, 'next'))); // Attack 3: open redirect refused here
}

export async function signIn(_prev, fd) {
  const v = { email: str(fd, 'email'), password: str(fd, 'password') };
  const values = { email: v.email };
  const errors = validateSignin(v);
  if (Object.keys(errors).length) return { errors, values };
  const user = findUserByEmail(v.email);
  if (!user || !verifyPassword(v.password, user.passwordHash)) {
    return { errors: { form: 'Email or password is incorrect.' }, values };
  }
  await createSession(user);
  redirect(safeNext(str(fd, 'next'))); // Attack 3: open redirect refused here
}

export async function signOut() {
  await destroySession();
  redirect('/');
}

export async function placeOrder(_prev, fd) {
  // Layer 3a: the action checks the session itself (Attack 1: signed out).
  const session = await getSession();
  if (!session) return { errors: { form: 'Your session has ended. Sign in again to place your order.' } };

  const values = { address: str(fd, 'address'), phone: str(fd, 'phone'), note: str(fd, 'note') };

  // Never trust prices or names from the browser: only ids and quantities are read.
  let requested;
  try {
    requested = JSON.parse(str(fd, 'items'));
  } catch {
    requested = null;
  }
  const lines = [];
  if (Array.isArray(requested)) {
    for (const r of requested) {
      const item = getItem(r?.id);
      const qty = Number(r?.qty);
      if (item && Number.isInteger(qty) && qty >= 1 && qty <= 20) {
        lines.push({ id: item.id, name: item.name, qty, price: item.price });
      }
    }
  }
  if (!lines.length) return { errors: { form: 'Your order is empty. Add something from the menu first.' }, values };

  const errors = validateCheckout(values);
  if (Object.keys(errors).length) return { errors, values };

  const key = str(fd, 'key');
  if (!/^[\w-]{8,64}$/.test(key)) return { errors: { form: 'Something went wrong. Reload the page and try again.' }, values };

  const subtotal = lines.reduce((s, l) => s + l.price * l.qty, 0);
  const order = createOrder(session.userId, {
    key,
    lines,
    subtotal,
    fee: DELIVERY_FEE,
    total: subtotal + DELIVERY_FEE,
    address: values.address.trim(),
    phone: normalisePhone(values.phone),
    note: values.note.trim().slice(0, 200),
  });
  revalidatePath('/orders');
  redirect(`/orders/${order.id}?placed=1`);
}

export async function cancelOrderAction(fd) {
  // Layer 3a (signed in?) and 3b (owns the record?) live inside the write.
  const session = await getSession();
  if (!session) redirect('/signin');
  const id = str(fd, 'id');
  cancelOrder(session.userId, id); // data layer matches on BOTH id and userId
  revalidatePath('/orders');
  revalidatePath(`/orders/${id}`);
}
