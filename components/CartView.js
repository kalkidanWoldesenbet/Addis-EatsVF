'use client';
import Link from 'next/link';
import { useCart, cartActions } from '@/lib/cartStore';
import { etb } from '@/lib/format';
import DishImage from './DishImage';

export function useCartLines(menu) {
  const cart = useCart();
  const lines = cart.map((l) => ({ ...l, item: menu[l.id] })).filter((l) => l.item);
  const subtotal = lines.reduce((s, l) => s + l.item.price * l.qty, 0);
  return { lines, subtotal };
}

export default function CartView({ menu, fee }) {
  const { lines, subtotal } = useCartLines(menu);
  if (!lines.length) {
    return (
      <div className="empty">
        <h2>Your order is empty</h2>
        <p>Pick something hot from the menu and it will show up here.</p>
        <Link href="/menu" className="btn">Browse the menu</Link>
      </div>
    );
  }
  return (
    <>
      <ul className="ledger">
        {lines.map(({ id, qty, item }) => (
          <li key={id} className="dish">
            <DishImage item={item} />
            <div className="dish-body">
              <div className="row-main">
                <h3>{item.name}</h3>
                <span className="leader" aria-hidden="true" />
                <span className="price">{etb(item.price * qty)}</span>
              </div>
              <div className="row-side">
                <div className="stepper" role="group" aria-label={`${item.name} quantity`}>
                  <button type="button" onClick={() => cartActions.setQty(id, qty - 1)} aria-label={`Remove one ${item.name}`}>−</button>
                  <output aria-live="polite">{qty}</output>
                  <button type="button" onClick={() => cartActions.setQty(id, qty + 1)} aria-label={`Add one more ${item.name}`}>+</button>
                </div>
                <button type="button" className="linkbtn" onClick={() => cartActions.setQty(id, 0)}>Remove</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <dl className="totals">
        <div><dt>Subtotal</dt><dd>{etb(subtotal)}</dd></div>
        <div><dt>Delivery</dt><dd>{etb(fee)}</dd></div>
        <div className="grand"><dt>Total</dt><dd>{etb(subtotal + fee)}</dd></div>
      </dl>
      <Link href="/checkout" className="btn wide">Continue to checkout</Link>
    </>
  );
}
