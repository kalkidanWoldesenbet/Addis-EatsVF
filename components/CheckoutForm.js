'use client';
import { useActionState, useEffect, useState } from 'react';
import Link from 'next/link';
import { placeOrder } from '@/app/actions';
import { cartActions } from '@/lib/cartStore';
import { useCartLines } from './CartView';
import Field from './Field';
import SubmitButton from './SubmitButton';
import { etb } from '@/lib/format';

const makeKey = () =>
  typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : `k-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

export default function CheckoutForm({ menu, fee }) {
  const { lines, subtotal } = useCartLines(menu);
  const [state, action] = useActionState(placeOrder, {});
  const [key, setKey] = useState('');
  useEffect(() => setKey(makeKey()), []); // one idempotency key per checkout visit
  const e = state.errors || {};
  const v = state.values || {};

  if (!lines.length) {
    return (
      <div className="empty">
        <h2>Nothing to check out yet</h2>
        <p>Your order is empty. Add a dish from the menu first.</p>
        <Link href="/menu" className="btn">Browse the menu</Link>
      </div>
    );
  }
  return (
    <form action={action} noValidate className="form">
      {e.form && <p className="error banner" role="alert">{e.form}</p>}
      <input type="hidden" name="key" value={key} />
      <input type="hidden" name="items" value={JSON.stringify(lines.map(({ id, qty }) => ({ id, qty })))} />
      <Field label="Delivery address" name="address" autoComplete="street-address" defaultValue={v.address} error={e.address} hint="Neighbourhood and a landmark, e.g. Bole, near Edna Mall." />
      <Field label="Mobile number" name="phone" type="tel" inputMode="tel" autoComplete="tel" defaultValue={v.phone} error={e.phone} />
      <Field label="Note for the kitchen (optional)" name="note" as="textarea" rows={3} maxLength={200} defaultValue={v.note} />
      <dl className="totals">
        <div><dt>{lines.reduce((n, l) => n + l.qty, 0)} items</dt><dd>{etb(subtotal)}</dd></div>
        <div><dt>Delivery</dt><dd>{etb(fee)}</dd></div>
        <div className="grand"><dt>Total, pay on delivery</dt><dd>{etb(subtotal + fee)}</dd></div>
      </dl>
      <SubmitButton pendingText="Placing your order…" disabled={!key} className="btn wide">Place order</SubmitButton>
    </form>
  );
}

export function ClearCart() {
  useEffect(() => cartActions.clear(), []);
  return null;
}
