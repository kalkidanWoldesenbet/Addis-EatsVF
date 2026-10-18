'use client';
import { useSyncExternalStore } from 'react';

// Tiny external store backed by localStorage. Works with useSyncExternalStore so
// the server render and first client render both see an empty cart (no hydration mismatch).
const KEY = 'addis-eats-cart-v1';
const EMPTY = [];
let cache = null;
const listeners = new Set();

function read() {
  if (typeof window === 'undefined') return EMPTY;
  if (cache) return cache;
  try {
    const parsed = JSON.parse(localStorage.getItem(KEY));
    cache = Array.isArray(parsed) ? parsed : EMPTY;
  } catch {
    cache = EMPTY;
  }
  return cache;
}

function write(lines) {
  cache = lines;
  try {
    localStorage.setItem(KEY, JSON.stringify(lines));
  } catch {}
  listeners.forEach((l) => l());
}

function subscribe(listener) {
  listeners.add(listener);
  const onStorage = (e) => {
    if (e.key === KEY) {
      cache = null;
      listener();
    }
  };
  window.addEventListener('storage', onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener('storage', onStorage);
  };
}

export const cartActions = {
  add(id) {
    const lines = read();
    const found = lines.find((l) => l.id === id);
    write(found ? lines.map((l) => (l.id === id ? { ...l, qty: Math.min(l.qty + 1, 20) } : l)) : [...lines, { id, qty: 1 }]);
  },
  setQty(id, qty) {
    write(qty <= 0 ? read().filter((l) => l.id !== id) : read().map((l) => (l.id === id ? { ...l, qty: Math.min(qty, 20) } : l)));
  },
  clear() {
    write(EMPTY);
  },
};

export const useCart = () => useSyncExternalStore(subscribe, read, () => EMPTY);
