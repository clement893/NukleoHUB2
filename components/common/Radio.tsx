import React from 'react';
import { cn } from '@/lib/utils/cn';

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
  label?: string;
  error?: string;
  helperText?: string;
  onChange?: (value: string) => void;
}

const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ className, label, error, helperText, onChange, value, ...props }, ref) => {
    const radioId = props.id || React.useId();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(e.target.value);
      }
    };

    return (
      <div className="relative">
        <div className="flex items-start space-x-2">
          <div className="flex items-center h-5">
            <input
              id={radioId}
              type="radio"
              ref={ref}
              value={value}
              onChange={handleChange}
              className={cn(
                'h-4 w-4 border-input text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                error && 'border-destructive',
                className
              )}
              aria-invalid={!!error}
              aria-describedby={
                error ? `${radioId}-error` : helperText ? `${radioId}-helper` : undefined
              }
              {...props}
            />
          </div>
          {label && (
            <div className="flex-1">
              <label
                htmlFor={radioId}
                className={cn(
                  'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
                  error ? 'text-destructive' : 'text-foreground'
                )}
              >
                {label}
                {props.required && <span className="text-destructive ml-1">*</span>}
              </label>
              {error && (
                <p id={`${radioId}-error`} className="text-sm text-destructive mt-1">
                  {error}
                </p>
              )}
              {helperText && !error && (
                <p id={`${radioId}-helper`} className="text-sm text-muted-foreground mt-1">
                  {helperText}
                </p>
              )}
            </div>
          )}
        </div>
        {!label && error && (
          <p id={`${radioId}-error`} className="text-sm text-destructive mt-1">
            {error}
          </p>
        )}
        {!label && helperText && !error && (
          <p id={`${radioId}-helper`} className="text-sm text-muted-foreground mt-1">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Radio.displayName = 'Radio';

export interface RadioGroupProps {
  label?: string;
  error?: string;
  helperText?: string;
  children: React.ReactNode;
  value?: string;
  onChange?: (value: string) => void;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
  name?: string;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  label,
  error,
  helperText,
  children,
  value,
  onChange,
  orientation = 'vertical',
  className,
  name,
}) => {
  const groupId = React.useId();
  const groupName = name || groupId;

  const handleChange = (newValue: string) => {
    if (onChange) {
      onChange(newValue);
    }
  };

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement<RadioProps>(child)) {
      return React.cloneElement(child, {
        name: groupName,
        onChange: (val: string) => {
          handleChange(val);
          if (child.props.onChange) {
            child.props.onChange(val);
          }
        },
        checked: child.props.value === value,
      });
    }
    return child;
  });

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
        role="radiogroup"
        aria-labelledby={label ? `${groupId}-label` : undefined}
        aria-describedby={error ? `${groupId}-error` : helperText ? `${groupId}-helper` : undefined}
      >
        {childrenWithProps}
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

RadioGroup.displayName = 'RadioGroup';

export { Radio, RadioGroup };

