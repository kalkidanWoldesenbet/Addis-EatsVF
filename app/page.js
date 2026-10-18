import Link from 'next/link';
import DishImage from '@/components/DishImage';
import { getMenu } from '@/lib/menu';
import { etb } from '@/lib/format';

// Static: no cookies, no searchParams, so this page is built once and served from the CDN.
export default function Home() {
  const popular = getMenu().filter((i) => ['doro-wat', 'kitfo', 'beyaynetu', 'buna'].includes(i.id));
  return (
    <>
      <section className="hero">
        <h1>Hot injera, delivered across Addis Ababa.</h1>
        <p className="lede">Choose from twelve dishes, pay when it arrives. Fasting platters are always on the menu.</p>
        <Link href="/menu" className="btn">See the menu</Link>
      </section>

      <section aria-labelledby="popular">
        <h2 id="popular">Popular this week</h2>
        <ul className="ledger plain">
          {popular.map((i) => (
            <li key={i.id} className="dish">
              <DishImage item={i} />
              <div className="dish-body">
                <div className="row-main">
                  <h3>{i.name}</h3>
                  <span className="leader" aria-hidden="true" />
                  <span className="price">{etb(i.price)}</span>
                </div>
                <p className="desc">{i.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="how">
        <h2 id="how">How it works</h2>
        <ol className="steps">
          <li><strong>Choose.</strong> Add dishes from the menu to your order.</li>
          <li><strong>Check out.</strong> Sign in and enter your address and mobile number.</li>
          <li><strong>Eat.</strong> Pay the courier in cash when the food arrives.</li>
        </ol>
      </section>
    </>
  );
}
