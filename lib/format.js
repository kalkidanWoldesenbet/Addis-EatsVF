// Deterministic formatting: same output on server and client (no hydration mismatch).
export const etb = (n) => `${Number(n).toLocaleString('en-US')} ETB`;
export const when = (iso) =>
  new Date(iso).toLocaleString('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Africa/Addis_Ababa',
  });
