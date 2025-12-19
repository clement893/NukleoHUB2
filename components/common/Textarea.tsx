import React from 'react';
import { cn } from '@/lib/utils/cn';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  autoResize?: boolean;
  maxLength?: number;
  showCharacterCount?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      fullWidth = true,
      autoResize = false,
      maxLength,
      showCharacterCount = false,
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    const textareaId = props.id || React.useId();
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);
    const combinedRef = React.useCallback(
      (node: HTMLTextAreaElement | null) => {
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current = node;
        }
        textareaRef.current = node;
      },
      [ref]
    );

    const currentLength = typeof value === 'string' ? value.length : (value as string)?.length || 0;

    React.useEffect(() => {
      if (autoResize && textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
    }, [value, autoResize]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (onChange) {
        onChange(e);
      }
      if (autoResize && textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
    };

    return (
      <div className={cn('relative', fullWidth && 'w-full')}>
        {label && (
          <label htmlFor={textareaId} className="block text-sm font-medium text-foreground mb-2">
            {label}
            {props.required && <span className="text-destructive">*</span>}
          </label>
        )}
        <div className="relative">
          <textarea
            id={textareaId}
            ref={combinedRef}
            className={cn(
              'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y',
              error && 'border-destructive focus-visible:ring-destructive',
              autoResize && 'resize-none overflow-hidden',
              className
            )}
            value={value}
            onChange={handleChange}
            maxLength={maxLength}
            aria-invalid={!!error}
            aria-describedby={
              error ? `${textareaId}-error` : helperText ? `${textareaId}-helper` : maxLength ? `${textareaId}-count` : undefined
            }
            {...props}
          />
        </div>
        <div className="flex items-center justify-between mt-1">
          <div>
            {error && (
              <p id={`${textareaId}-error`} className="text-sm text-destructive">
                {error}
              </p>
            )}
            {helperText && !error && (
              <p id={`${textareaId}-helper`} className="text-sm text-muted-foreground">
                {helperText}
              </p>
            )}
          </div>
          {showCharacterCount && maxLength && (
            <p
              id={`${textareaId}-count`}
              className={cn(
                'text-xs text-muted-foreground',
                currentLength >= maxLength && 'text-destructive'
              )}
            >
              {currentLength}/{maxLength}
            </p>
          )}
        </div>
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export { Textarea };

