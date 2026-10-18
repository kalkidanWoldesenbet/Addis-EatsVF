export function validateSignup({ name, email, password }) {
  const e = {};
  if (!name || name.trim().length < 2) e.name = 'Enter your name (at least 2 characters).';
  if (!/^\S+@\S+\.\S+$/.test(email || '')) e.email = 'Enter a valid email address.';
  if (!password || password.length < 8) e.password = 'Use at least 8 characters.';
  return e;
}

export function validateSignin({ email, password }) {
  const e = {};
  if (!/^\S+@\S+\.\S+$/.test(email || '')) e.email = 'Enter a valid email address.';
  if (!password) e.password = 'Enter your password.';
  return e;
}

export const normalisePhone = (p = '') => p.replace(/[\s-]/g, '');

export function validateCheckout({ address, phone }) {
  const e = {};
  if (!address || address.trim().length < 5) e.address = 'Enter a delivery address (neighbourhood and landmark).';
  if (!/^(\+251|0)9\d{8}$/.test(normalisePhone(phone))) e.phone = 'Enter an Ethiopian mobile number, like 0911 234 567.';
  return e;
}
