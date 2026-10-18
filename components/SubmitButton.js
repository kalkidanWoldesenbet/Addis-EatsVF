'use client';
import { useFormStatus } from 'react-dom';

export default function SubmitButton({ children, pendingText = 'Working…', className = 'btn', disabled = false }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className={className} disabled={pending || disabled} aria-disabled={pending || disabled}>
      {pending ? pendingText : children}
    </button>
  );
}
