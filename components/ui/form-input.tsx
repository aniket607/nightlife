import { InputHTMLAttributes } from 'react';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  containerClassName?: string;
}

export function FormInput({
  label,
  id,
  error,
  containerClassName = '',
  className = '',
  ...props
}: FormInputProps) {
  return (
    <div className={`space-y-2 ${containerClassName}`}>
      <label htmlFor={id} className="block text-sm font-medium text-white">
        {label}
      </label>
      <input
        id={id}
        {...props}
        className={`w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white/20 ${className}`}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
