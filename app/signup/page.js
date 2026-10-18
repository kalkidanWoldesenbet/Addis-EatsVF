import { redirect } from 'next/navigation';
import AuthForm from '@/components/AuthForm';
import { getSession } from '@/lib/session';
import { safeNext } from '@/lib/safeNext';

export const metadata = { title: 'Create an account' };

export default async function SignUp({ searchParams }) {
  const { next: rawNext } = await searchParams;
  const next = safeNext(rawNext);
  if (await getSession()) redirect(next);
  return (
    <section className="narrow">
      <h1>Create an account</h1>
      <AuthForm mode="signup" next={next} />
    </section>
  );
}
