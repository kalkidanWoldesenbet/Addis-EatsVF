import 'server-only';
import crypto from 'node:crypto';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const SESSION_COOKIE = 'ae_session';
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function secret() {
  const s = process.env.SESSION_SECRET;
  if (!s || s.length < 16) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('SESSION_SECRET must be set to 16+ characters in production.');
    }
    return 'dev-only-secret-not-for-production';
  }
  return s;
}

const sign = (payload) => crypto.createHmac('sha256', secret()).update(payload).digest('base64url');

export async function createSession(user) {
  const payload = Buffer.from(
    JSON.stringify({ uid: user.id, name: user.name, exp: Date.now() + MAX_AGE * 1000 })
  ).toString('base64url');
  (await cookies()).set(SESSION_COOKIE, `${payload}.${sign(payload)}`, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: MAX_AGE,
  });
}

export async function destroySession() {
  (await cookies()).delete(SESSION_COOKIE);
}

// The real check: verifies the signature and expiry. Returns { userId, name } or null.
export async function getSession() {
  const raw = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!raw) return null;
  const [payload, sig] = raw.split('.');
  if (!payload || !sig) return null;
  const a = Buffer.from(sig);
  const b = Buffer.from(sign(payload));
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString());
    if (!data.uid || data.exp < Date.now()) return null;
    return { userId: data.uid, name: data.name };
  } catch {
    return null;
  }
}

// Layer 2: used at the top of every private page.
export async function requireUser(returnTo = '/') {
  const session = await getSession();
  if (!session) redirect(`/signin?next=${encodeURIComponent(returnTo)}`);
  return session;
}
