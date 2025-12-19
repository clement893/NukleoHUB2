import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils/cn';

const toastVariants = cva(
  'group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all',
  {
    variants: {
      variant: {
        default: 'border bg-background text-foreground',
        success: 'border-success/50 bg-success/10 text-success',
        error: 'border-destructive/50 bg-destructive/10 text-destructive',
        warning: 'border-warning/50 bg-warning/10 text-warning',
        info: 'border-primary/50 bg-primary/10 text-primary',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface ToastProps extends VariantProps<typeof toastVariants> {
  id?: string;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  onClose?: () => void;
  duration?: number;
  className?: string;
}

const Toast: React.FC<ToastProps> = ({
  id,
  title,
  description,
  action,
  onClose,
  variant = 'default',
  className,
}) => {
  return (
    <div
      id={id}
      className={cn(toastVariants({ variant }), className)}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div className="flex-1 space-y-1">
        {title && <div className="text-sm font-semibold">{title}</div>}
        {description && <div className="text-sm opacity-90">{description}</div>}
      </div>
      {action && <div className="flex items-center space-x-2">{action}</div>}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100"
          aria-label="Close"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

Toast.displayName = 'Toast';

export type ToastPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';

export interface ToastContainerProps {
  position?: ToastPosition;
  children: React.ReactNode;
  className?: string;
}

const ToastContainer: React.FC<ToastContainerProps> = ({
  position = 'top-right',
  children,
  className,
}) => {
  const positionClasses = {
    'top-right': 'top-0 right-0',
    'top-left': 'top-0 left-0',
    'bottom-right': 'bottom-0 right-0',
    'bottom-left': 'bottom-0 left-0',
    'top-center': 'top-0 left-1/2 -translate-x-1/2',
    'bottom-center': 'bottom-0 left-1/2 -translate-x-1/2',
  };

  return (
    <div
      className={cn(
        'fixed z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:flex-col md:max-w-[420px]',
        positionClasses[position],
        className
      )}
      aria-live="polite"
      aria-atomic="true"
    >
      {children}
    </div>
  );
};

ToastContainer.displayName = 'ToastContainer';

export { Toast, ToastContainer, toastVariants };

