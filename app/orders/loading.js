export default function Loading() {
  return (
    <div role="status" aria-live="polite" className="loading">
      <span className="skeleton" /><span className="skeleton" /><span className="skeleton short" />
      <span className="sr">Loading your orders…</span>
    </div>
  );
}
