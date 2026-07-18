import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', id, ...props }, ref) => {
    const inputId = id || label.toLowerCase().replace(/\s+/g, '-');
    
    return (
      <div className={`flex flex-col gap-1 ${className}`}>
        <label htmlFor={inputId} className="text-sm font-medium">
          {label}
        </label>
        <input
          id={inputId}
          ref={ref}
          className={`px-3 py-2 rounded-md border ${
            error ? 'border-error' : 'border-border'
          } bg-transparent focus:outline-none focus:ring-2 focus:ring-primary`}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="text-error" role="alert" aria-live="polite">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
