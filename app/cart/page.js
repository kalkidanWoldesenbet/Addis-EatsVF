import CartView from '@/components/CartView';
import { getMenu, DELIVERY_FEE } from '@/lib/menu';

export const metadata = { title: 'Your order', robots: { index: false } };

export default function CartPage() {
  const menu = Object.fromEntries(getMenu().map((i) => [i.id, i]));
  return (
    <>
      <h1>Your order</h1>
      <CartView menu={menu} fee={DELIVERY_FEE} />
    </>
  );
}
