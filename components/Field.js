export default function Field({ label, name, error, hint, as = 'input', ...props }) {
  const id = `f-${name}`;
  const Tag = as;
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <Tag id={id} name={name} aria-invalid={error ? 'true' : undefined} aria-describedby={error ? `${id}-err` : hint ? `${id}-hint` : undefined} {...props} />
      {hint && !error && <p id={`${id}-hint`} className="hint">{hint}</p>}
      {error && <p id={`${id}-err`} className="error" role="alert">{error}</p>}
    </div>
  );
}
