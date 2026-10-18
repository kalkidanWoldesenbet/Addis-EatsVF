const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
export default function sitemap() {
  return ['/', '/menu', '/signin', '/signup'].map((p) => ({ url: `${base}${p}`, lastModified: new Date() }));
}
