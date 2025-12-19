import React from 'react';
import { cn } from '../lib/utils/cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, helperText, fullWidth = true, icon, iconPosition = 'left', ...props }, ref) => {
    const inputId = props.id || React.useId();

    return (
      <div className={cn('relative', fullWidth && 'w-full')}>
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-foreground mb-2">
            {label}
            {props.required && <span className="text-destructive">*</span>}
          </label>
        )}
        <div className="relative">
          {icon && iconPosition === 'left' && (
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              {icon}
            </div>
          )}
          <input
            type={type}
            id={inputId}
            className={cn(
              'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
              icon && iconPosition === 'left' && 'pl-10',
              icon && iconPosition === 'right' && 'pr-10',
              error && 'border-destructive focus-visible:ring-destructive',
              className
            )}
            ref={ref}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
            {...props}
          />
          {icon && iconPosition === 'right' && (
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              {icon}
            </div>
          )}
        </div>
        {error && (
          <p id={`${inputId}-error`} className="text-sm text-destructive mt-1">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={`${inputId}-helper`} className="text-sm text-muted-foreground mt-1">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
