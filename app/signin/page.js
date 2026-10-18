import { redirect } from 'next/navigation';
import AuthForm from '@/components/AuthForm';
import { getSession } from '@/lib/session';
import { safeNext } from '@/lib/safeNext';

export const metadata = { title: 'Sign in' };

export default async function SignIn({ searchParams }) {
  const { next: rawNext } = await searchParams;
  const next = safeNext(rawNext);
  if (await getSession()) redirect(next);
  return (
    <section className="narrow">
      <h1>Sign in</h1>
      {next !== '/' && <p className="notice">Sign in to continue.</p>}
      <AuthForm mode="signin" next={next} />
    </section>
  );
}
