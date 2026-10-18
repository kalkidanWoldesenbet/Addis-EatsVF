// Fixed width and height reserve the space before the file loads, so there is no layout shift.
// The SVG illustrations are about 1-5 kB each. For photos, swap this <img> for next/image
// (with width/height) and keep files under about 150 kB.
export default function DishImage({ item, priority = false }) {
  return (
    <img
      src={item.image}
      alt={item.alt}
      width={96}
      height={72}
      className="thumb"
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
    />
  );
}
