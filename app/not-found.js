import Link from 'next/link';
export const metadata = { title: 'Page not found' };
export default function NotFound() {
  return (
    <div className="empty">
      <h1>We could not find that page</h1>
      <p>The link may be old, or the order may belong to a different account.</p>
      <Link href="/" className="btn">Go to the home page</Link>
    </div>
  );
}
