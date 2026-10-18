import AddToCart from '@/components/AddToCart';
import DishImage from '@/components/DishImage';
import { CATEGORIES, getMenu } from '@/lib/menu';
import { etb } from '@/lib/format';

export const metadata = {
  title: 'Menu',
  description: 'Mains, fasting platters, snacks and drinks. Every dish is cooked to order in Addis Ababa.',
};

// Static with a one-hour refresh: the menu rarely changes and is the same for everyone.
export const revalidate = 3600;

export default function MenuPage() {
  const items = getMenu();
  return (
    <>
      <h1>Menu</h1>
      {CATEGORIES.map((cat) => (
        <section key={cat} aria-labelledby={`cat-${cat}`}>
          <h2 id={`cat-${cat}`}>{cat}</h2>
          <ul className="ledger">
            {items.filter((i) => i.category === cat).map((i) => (
              <li key={i.id} className="dish">
                <DishImage item={i} />
                <div className="dish-body">
                  <div className="row-main">
                    <h3>{i.name}</h3>
                    <span className="leader" aria-hidden="true" />
                    <span className="price">{etb(i.price)}</span>
                  </div>
                  <p className="desc">{i.desc}</p>
                  <div className="row-side"><AddToCart id={i.id} name={i.name} /></div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </>
  );
}
