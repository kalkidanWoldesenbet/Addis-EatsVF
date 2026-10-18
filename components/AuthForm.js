'use client';
import { useActionState } from 'react';
import Link from 'next/link';
import { signIn, signUp } from '@/app/actions';
import Field from './Field';
import SubmitButton from './SubmitButton';

export default function AuthForm({ mode, next }) {
  const isUp = mode === 'signup';
  const [state, action] = useActionState(isUp ? signUp : signIn, {});
  const e = state.errors || {};
  const v = state.values || {};
  const q = next && next !== '/' ? `?next=${encodeURIComponent(next)}` : '';
  return (
    <form action={action} noValidate className="form">
      <input type="hidden" name="next" value={next || '/'} />
      {e.form && <p className="error banner" role="alert">{e.form}</p>}
      {isUp && <Field label="Your name" name="name" autoComplete="name" defaultValue={v.name} error={e.name} />}
      <Field label="Email" name="email" type="email" autoComplete="email" defaultValue={v.email} error={e.email} />
      <Field
        label="Password"
        name="password"
        type="password"
        autoComplete={isUp ? 'new-password' : 'current-password'}
        error={e.password}
        hint={isUp ? 'At least 8 characters.' : undefined}
      />
      <SubmitButton pendingText={isUp ? 'Creating account…' : 'Signing in…'}>{isUp ? 'Create account' : 'Sign in'}</SubmitButton>
      <p className="alt">
        {isUp ? (
          <>Already have an account? <Link href={`/signin${q}`}>Sign in</Link></>
        ) : (
          <>New to Addis Eats? <Link href={`/signup${q}`}>Create an account</Link></>
        )}
      </p>
    </form>
  );
}
