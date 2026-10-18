import Link from 'next/link';
import { requireUser } from '@/lib/session';
import { listOrders } from '@/lib/db';
import { etb, when } from '@/lib/format';

export const metadata = { title: 'My orders', robots: { index: false } };

export default async function OrdersPage() {
  const session = await requireUser('/orders'); // Layer 2
  const orders = listOrders(session.userId); // scoped to the session's user, never a request id
  return (
    <>
      <h1>My orders</h1>
      {orders.length === 0 ? (
        <div className="empty">
          <h2>No orders yet</h2>
          <p>When you place an order, you will be able to follow it here.</p>
          <Link href="/menu" className="btn">Browse the menu</Link>
        </div>
      ) : (
        <ul className="orders">
          {orders.map((o) => (
            <li key={o.id}>
              <Link href={`/orders/${o.id}`}>
                <span className="oid">Order {o.id}</span>
                <span className="muted">{when(o.createdAt)}</span>
                <span className={`status ${o.status}`}>{o.status === 'placed' ? 'Placed' : 'Cancelled'}</span>
                <span className="price">{etb(o.total)}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
