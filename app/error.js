'use client';
export default function Error({ reset }) {
  return (
    <div className="empty" role="alert">
      <h1>Something went wrong</h1>
      <p>We could not load this page. Try again, and if it keeps happening, come back in a few minutes.</p>
      <button type="button" className="btn" onClick={reset}>Try again</button>
    </div>
  );
}
