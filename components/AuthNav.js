'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from '@/app/actions';
import { useCart } from '@/lib/cartStore';

// The layout stays static (no cookies read on the server). The signed-in state is
// fetched from /api/me after load, so / and /menu can be statically rendered.
export default function AuthNav() {
  const pathname = usePathname();
  const [user, setUser] = useState(undefined); // undefined = still checking
  const count = useCart().reduce((n, l) => n + l.qty, 0);

  useEffect(() => {
    let live = true;
    fetch('/api/me', { cache: 'no-store' })
      .then((r) => r.json())
      .then((d) => live && setUser(d.name ? d : null))
      .catch(() => live && setUser(null));
    return () => {
      live = false;
    };
  }, [pathname]);

  return (
    <ul className="nav-list">
      <li><Link href="/menu">Menu</Link></li>
      <li><Link href="/cart">Order{count > 0 && <span className="count" aria-label={`${count} items`}>{count}</span>}</Link></li>
      {user && <li><Link href="/orders">My orders</Link></li>}
      <li className="who">
        {user === undefined ? (
          <span className="muted" aria-hidden="true">&nbsp;</span>
        ) : user ? (
          <form action={signOut}>
            <button type="submit" className="linkbtn">Sign out ({user.name.split(' ')[0]})</button>
          </form>
        ) : (
          <Link href="/signin">Sign in</Link>
        )}
      </li>
    </ul>
  );
}
