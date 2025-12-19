import React from 'react';
import { cn } from '@/lib/utils/cn';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
  label?: string;
  error?: string;
  helperText?: string;
  onChange?: (checked: boolean) => void;
  indeterminate?: boolean;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, error, helperText, onChange, indeterminate, checked, ...props }, ref) => {
    const checkboxId = props.id || React.useId();
    const checkboxRef = React.useRef<HTMLInputElement>(null);

    const combinedRef = React.useCallback(
      (node: HTMLInputElement | null) => {
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
        }
        checkboxRef.current = node;
      },
      [ref]
    );

    React.useEffect(() => {
      if (checkboxRef.current) {
        checkboxRef.current.indeterminate = indeterminate || false;
      }
    }, [indeterminate]);

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
        <div className="flex items-start space-x-2">
          <div className="flex items-center h-5">
            <input
              id={checkboxId}
              type="checkbox"
              ref={combinedRef}
              checked={checked}
              onChange={handleChange}
              className={cn(
                'h-4 w-4 rounded border-input text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                error && 'border-destructive',
                className
              )}
              aria-invalid={!!error}
              aria-describedby={
                error ? `${checkboxId}-error` : helperText ? `${checkboxId}-helper` : undefined
              }
              {...props}
            />
          </div>
          {label && (
            <div className="flex-1">
              <label
                htmlFor={checkboxId}
                className={cn(
                  'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
                  error ? 'text-destructive' : 'text-foreground'
                )}
              >
                {label}
                {props.required && <span className="text-destructive ml-1">*</span>}
              </label>
              {error && (
                <p id={`${checkboxId}-error`} className="text-sm text-destructive mt-1">
                  {error}
                </p>
              )}
              {helperText && !error && (
                <p id={`${checkboxId}-helper`} className="text-sm text-muted-foreground mt-1">
                  {helperText}
                </p>
              )}
            </div>
          )}
        </div>
        {!label && error && (
          <p id={`${checkboxId}-error`} className="text-sm text-destructive mt-1">
            {error}
          </p>
        )}
        {!label && helperText && !error && (
          <p id={`${checkboxId}-helper`} className="text-sm text-muted-foreground mt-1">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export interface CheckboxGroupProps {
  label?: string;
  error?: string;
  helperText?: string;
  children: React.ReactNode;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  label,
  error,
  helperText,
  children,
  orientation = 'vertical',
  className,
}) => {
  const groupId = React.useId();

  return (
    <div className={cn('space-y-2', className)}>
      {label && (
        <label className="block text-sm font-medium text-foreground">
          {label}
          <span className="text-destructive">*</span>
        </label>
      )}
      <div
        className={cn(
          'space-y-2',
          orientation === 'horizontal' && 'flex flex-wrap gap-4 space-y-0'
        )}
        role="group"
        aria-labelledby={label ? `${groupId}-label` : undefined}
        aria-describedby={error ? `${groupId}-error` : helperText ? `${groupId}-helper` : undefined}
      >
        {children}
      </div>
      {error && (
        <p id={`${groupId}-error`} className="text-sm text-destructive">
          {error}
        </p>
      )}
      {helperText && !error && (
        <p id={`${groupId}-helper`} className="text-sm text-muted-foreground">
          {helperText}
        </p>
      )}
    </div>
  );
};

CheckboxGroup.displayName = 'CheckboxGroup';

export { CheckboxGroup };

