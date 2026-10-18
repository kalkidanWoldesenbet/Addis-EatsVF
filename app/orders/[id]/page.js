import Link from 'next/link';
import { notFound } from 'next/navigation';
import { requireUser } from '@/lib/session';
import { getOrder } from '@/lib/db';
import { cancelOrderAction } from '@/app/actions';
import SubmitButton from '@/components/SubmitButton';
import { ClearCart } from '@/components/CheckoutForm';
import { etb, when } from '@/lib/format';

export const metadata = { title: 'Order details', robots: { index: false } };

export default async function OrderPage({ params, searchParams }) {
  const { id } = await params;
  const { placed } = await searchParams;
  const session = await requireUser(`/orders/${id}`); // Layer 2
  const order = getOrder(session.userId, id); // Layer 3b: matches id AND owner
  if (!order) notFound(); // someone else's id looks exactly like a missing one

  return (
    <>
      {placed === '1' && (
        <>
          <ClearCart />
          <p className="notice" role="status">Order placed. The kitchen has it.</p>
        </>
      )}
      <h1>Order {order.id}</h1>
      <p className="muted">
        {when(order.createdAt)} ·{' '}
        <span className={`status ${order.status}`}>{order.status === 'placed' ? 'Placed' : 'Cancelled'}</span>
      </p>
      <ul className="ledger plain">
        {order.lines.map((l) => (
          <li key={l.id}>
            <div className="row-main">
              <h3>{l.qty} × {l.name}</h3>
              <span className="leader" aria-hidden="true" />
              <span className="price">{etb(l.qty * l.price)}</span>
            </div>
          </li>
        ))}
      </ul>
      <dl className="totals">
        <div><dt>Delivery</dt><dd>{etb(order.fee)}</dd></div>
        <div className="grand"><dt>Total, pay on delivery</dt><dd>{etb(order.total)}</dd></div>
      </dl>
      <p>Delivering to {order.address}. We will call {order.phone}.</p>
      {order.status === 'placed' && (
        <form action={cancelOrderAction}>
          <input type="hidden" name="id" value={order.id} />
          <SubmitButton pendingText="Cancelling…" className="btn ghost">Cancel order</SubmitButton>
        </form>
      )}
      <p><Link href="/orders">Back to my orders</Link></p>
    </>
  );
}
