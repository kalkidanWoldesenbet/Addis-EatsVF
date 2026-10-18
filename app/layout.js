import Link from 'next/link';
import './globals.css';
import AuthNav from '@/components/AuthNav';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: 'Addis Eats: Ethiopian food delivered in Addis Ababa', template: '%s | Addis Eats' },
  description: 'Order doro wat, kitfo, tibs and fasting platters for delivery across Addis Ababa. Pay on delivery.',
  openGraph: { title: 'Addis Eats', description: 'Hot injera, delivered across Addis Ababa.', type: 'website', siteName: 'Addis Eats' },
  twitter: { card: 'summary_large_image' },
};

export const viewport = { width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <a href="#main" className="skip">Skip to content</a>
        <header className="site-header">
          <nav aria-label="Main" className="wrap bar">
            <Link href="/" className="brand">Addis Eats</Link>
            <AuthNav />
          </nav>
        </header>
        <main id="main" className="wrap">{children}</main>
        <footer className="wrap site-footer">
          <p>Addis Eats is a CodeOps capstone project. Orders are not real.</p>
        </footer>
      </body>
    </html>
  );
}
