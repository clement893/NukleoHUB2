import React from 'react';
import { cn } from '@/lib/utils/cn';

export interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
  orientation?: 'horizontal' | 'vertical';
  text?: string;
  textPosition?: 'left' | 'center' | 'right';
  className?: string;
}

const Divider = React.forwardRef<HTMLHRElement, DividerProps>(
  ({ orientation = 'horizontal', text, textPosition = 'center', className, ...props }, ref) => {
    if (orientation === 'vertical') {
      return (
        <hr
          ref={ref}
          className={cn('border-l border-input h-full w-px', className)}
          role="separator"
          aria-orientation="vertical"
          {...props}
        />
      );
    }

    if (text) {
      return (
        <div className={cn('relative flex items-center py-4', className)}>
          <hr
            ref={ref}
            className={cn(
              'flex-1 border-t border-input',
              textPosition === 'left' && 'mr-4',
              textPosition === 'center' && 'mx-4',
              textPosition === 'right' && 'ml-4'
            )}
            role="separator"
            aria-orientation="horizontal"
            {...props}
          />
          <span
            className={cn(
              'px-2 text-sm text-muted-foreground bg-background',
              textPosition === 'left' && 'absolute left-0',
              textPosition === 'center' && 'absolute left-1/2 -translate-x-1/2',
              textPosition === 'right' && 'absolute right-0'
            )}
          >
            {text}
          </span>
        </div>
      );
    }

    return (
      <hr
        ref={ref}
        className={cn('border-t border-input', className)}
        role="separator"
        aria-orientation="horizontal"
        {...props}
      />
    );
  }
);

Divider.displayName = 'Divider';

export { Divider };

