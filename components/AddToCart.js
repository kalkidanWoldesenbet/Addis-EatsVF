'use client';
import { useCart, cartActions } from '@/lib/cartStore';

export default function AddToCart({ id, name }) {
  const qty = useCart().find((l) => l.id === id)?.qty || 0;
  if (!qty) {
    return (
      <button type="button" className="btn small" onClick={() => cartActions.add(id)} aria-label={`Add ${name} to your order`}>
        Add
      </button>
    );
  }
  return (
    <div className="stepper" role="group" aria-label={`${name} quantity`}>
      <button type="button" onClick={() => cartActions.setQty(id, qty - 1)} aria-label={`Remove one ${name}`}>−</button>
      <output aria-live="polite">{qty}</output>
      <button type="button" onClick={() => cartActions.setQty(id, qty + 1)} aria-label={`Add one more ${name}`}>+</button>
    </div>
  );
}
