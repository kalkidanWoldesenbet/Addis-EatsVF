export const DELIVERY_FEE = 50;

const RAW = [
  { id: 'doro-wat', name: 'Doro wat', category: 'Mains', price: 320, desc: 'Slow-cooked chicken in berbere sauce with a boiled egg and injera.' },
  { id: 'kitfo', name: 'Kitfo', category: 'Mains', price: 380, desc: 'Minced beef warmed in spiced butter, served with ayib and gomen.' },
  { id: 'tibs', name: 'Beef tibs', category: 'Mains', price: 350, desc: 'Sautéed beef with onion, rosemary and green chilli.' },
  { id: 'gored-gored', name: 'Gored gored', category: 'Mains', price: 390, desc: 'Cubed beef in awaze and niter kibbeh.' },
  { id: 'beyaynetu', name: 'Beyaynetu', category: 'Fasting', price: 240, desc: 'A vegan platter: shiro, misir, gomen, atkilt and injera.' },
  { id: 'shiro', name: 'Shiro wat', category: 'Fasting', price: 180, desc: 'Chickpea stew simmered with garlic and berbere.' },
  { id: 'firfir', name: 'Fit-fit', category: 'Fasting', price: 160, desc: 'Shredded injera folded through spiced lentil sauce.' },
  { id: 'sambusa', name: 'Sambusa (3)', category: 'Snacks', price: 90, desc: 'Crisp pastry triangles filled with lentil or beef.' },
  { id: 'ambasha', name: 'Ambasha', category: 'Snacks', price: 70, desc: 'Lightly spiced celebration bread, baked fresh.' },
  { id: 'buna', name: 'Buna (coffee)', category: 'Drinks', price: 45, desc: 'Roasted and brewed in a jebena.' },
  { id: 'spris', name: 'Spris juice', category: 'Drinks', price: 80, desc: 'Layered avocado, mango and papaya.' },
  { id: 'shai', name: 'Shai (spiced tea)', category: 'Drinks', price: 35, desc: 'Black tea with cinnamon and cloves.' },
];

// Every dish gets an image path and descriptive alt text. To use real photos, drop
// <id>.webp files in public/images, change the extension below, and see DishImage.js.
const ITEMS = RAW.map((i) => ({ ...i, image: `/images/${i.id}.jpg`, alt: `Illustration of ${i.name}` }));

export const CATEGORIES = ['Mains', 'Fasting', 'Snacks', 'Drinks'];
export const getMenu = () => ITEMS;
export const getItem = (id) => ITEMS.find((i) => i.id === id) || null;
