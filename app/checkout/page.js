import CheckoutForm from '@/components/CheckoutForm';
import { requireUser } from '@/lib/session';
import { getMenu, DELIVERY_FEE } from '@/lib/menu';

export const metadata = { title: 'Checkout', robots: { index: false } };

export default async function CheckoutPage() {
  await requireUser('/checkout'); // Layer 2
  const menu = Object.fromEntries(getMenu().map((i) => [i.id, i]));
  return (
    <section className="narrow">
      <h1>Checkout</h1>
      <CheckoutForm menu={menu} fee={DELIVERY_FEE} />
    </section>
  );
}
