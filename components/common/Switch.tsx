import React from 'react';
import { cn } from '@/lib/utils/cn';

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
  label?: string;
  error?: string;
  helperText?: string;
  onChange?: (checked: boolean) => void;
}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, label, error, helperText, onChange, checked, disabled, ...props }, ref) => {
    const switchId = props.id || React.useId();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(e.target.checked);
      }
      if (props.onChange) {
        props.onChange(e);
      }
    };

    return (
      <div className="relative">
        <div className="flex items-start space-x-3">
          <div className="flex items-center">
            <label
              htmlFor={switchId}
              className={cn(
                'relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2',
                checked ? 'bg-primary' : 'bg-input',
                disabled && 'opacity-50 cursor-not-allowed',
                error && 'ring-2 ring-destructive'
              )}
            >
              <input
                id={switchId}
                type="checkbox"
                ref={ref}
                checked={checked}
                onChange={handleChange}
                disabled={disabled}
                className="sr-only"
                role="switch"
                aria-checked={checked}
                aria-invalid={!!error}
                aria-describedby={
                  error ? `${switchId}-error` : helperText ? `${switchId}-helper` : undefined
                }
                {...props}
              />
              <span
                className={cn(
                  'inline-block h-4 w-4 transform rounded-full bg-background transition-transform',
                  checked ? 'translate-x-6' : 'translate-x-1'
                )}
              />
            </label>
          </div>
          {label && (
            <div className="flex-1">
              <label
                htmlFor={switchId}
                className={cn(
                  'text-sm font-medium leading-none cursor-pointer',
                  disabled && 'cursor-not-allowed opacity-70',
                  error ? 'text-destructive' : 'text-foreground'
                )}
              >
                {label}
                {props.required && <span className="text-destructive ml-1">*</span>}
              </label>
              {error && (
                <p id={`${switchId}-error`} className="text-sm text-destructive mt-1">
                  {error}
                </p>
              )}
              {helperText && !error && (
                <p id={`${switchId}-helper`} className="text-sm text-muted-foreground mt-1">
                  {helperText}
                </p>
              )}
            </div>
          )}
        </div>
        {!label && error && (
          <p id={`${switchId}-error`} className="text-sm text-destructive mt-1">
            {error}
          </p>
        )}
        {!label && helperText && !error && (
          <p id={`${switchId}-helper`} className="text-sm text-muted-foreground mt-1">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Switch.displayName = 'Switch';

export { Switch };

