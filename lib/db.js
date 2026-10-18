import 'server-only';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';

// Stand-in for the real API + database that Modules 4 and 5 will build.
// Every function that touches orders takes a userId, so "scoped by owner" is
// built into the data layer rather than remembered at each call site.
const FILE = process.env.DATA_FILE || path.join(os.tmpdir(), 'addis-eats-db.json');

const read = () => {
  try {
    return JSON.parse(fs.readFileSync(FILE, 'utf8'));
  } catch {
    return { users: [], orders: [] };
  }
};
const write = (db) => fs.writeFileSync(FILE, JSON.stringify(db));

function hashPassword(pw) {
  const salt = crypto.randomBytes(16).toString('hex');
  return `${salt}:${crypto.scryptSync(pw, salt, 64).toString('hex')}`;
}

export function verifyPassword(pw, stored) {
  const [salt, hash] = stored.split(':');
  const candidate = crypto.scryptSync(pw, salt, 64);
  const expected = Buffer.from(hash, 'hex');
  return candidate.length === expected.length && crypto.timingSafeEqual(candidate, expected);
}

export const findUserByEmail = (email) =>
  read().users.find((u) => u.email === email.trim().toLowerCase()) || null;

export function createUser({ name, email, password }) {
  const db = read();
  const user = {
    id: crypto.randomUUID(),
    name: name.trim(),
    email: email.trim().toLowerCase(),
    passwordHash: hashPassword(password),
    createdAt: new Date().toISOString(),
  };
  db.users.push(user);
  write(db);
  return user;
}

export const listOrders = (userId) =>
  read()
    .orders.filter((o) => o.userId === userId)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

// Scoped: an id that exists but belongs to someone else returns null, same as a missing id.
export const getOrder = (userId, id) =>
  read().orders.find((o) => o.id === id && o.userId === userId) || null;

// Idempotent: the same (userId, key) returns the existing order instead of creating a second.
export function createOrder(userId, data) {
  const db = read();
  const existing = db.orders.find((o) => o.userId === userId && o.key === data.key);
  if (existing) return existing;
  const order = {
    id: crypto.randomUUID().slice(0, 8),
    userId,
    ...data,
    status: 'placed',
    createdAt: new Date().toISOString(),
  };
  db.orders.push(order);
  write(db);
  return order;
}

export function cancelOrder(userId, id) {
  const db = read();
  const order = db.orders.find((o) => o.id === id && o.userId === userId);
  if (!order) return null;
  if (order.status === 'placed') order.status = 'cancelled';
  write(db);
  return order;
}
