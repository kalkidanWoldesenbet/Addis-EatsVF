// Only allow same-site, path-only return URLs. Blocks /signin?next=https://example.com
// and protocol-relative tricks like //evil.com or /\evil.com.
export function safeNext(raw, fallback = '/') {
  if (typeof raw !== 'string') return fallback;
  if (!raw.startsWith('/')) return fallback;
  if (raw.startsWith('//') || raw.startsWith('/\\')) return fallback;
  if (/[\r\n\t]/.test(raw)) return fallback;
  return raw;
}
