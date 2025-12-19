import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils/cn';

const progressVariants = cva('relative w-full overflow-hidden rounded-full bg-secondary', {
  variants: {
    size: {
      sm: 'h-1',
      md: 'h-2',
      lg: 'h-4',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const progressBarVariants = cva('h-full w-full flex-1 bg-primary transition-all', {
  variants: {
    variant: {
      default: 'bg-primary',
      success: 'bg-success',
      warning: 'bg-warning',
      error: 'bg-destructive',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export interface ProgressProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressVariants> {
  value?: number;
  max?: number;
  showValue?: boolean;
  variant?: VariantProps<typeof progressBarVariants>['variant'];
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value = 0, max = 100, showValue = false, size, variant, ...props }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    return (
      <div className={cn('w-full', className)}>
        {showValue && (
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-muted-foreground">Progress</span>
            <span className="text-sm font-medium text-foreground">{Math.round(percentage)}%</span>
          </div>
        )}
        <div
          ref={ref}
          className={cn(progressVariants({ size }))}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
          {...props}
        >
          <div
            className={cn(progressBarVariants({ variant }))}
            style={{ transform: `translateX(-${100 - percentage}%)` }}
          />
        </div>
      </div>
    );
  }
);

Progress.displayName = 'Progress';

const circularProgressVariants = cva('', {
  variants: {
    size: {
      sm: 'h-8 w-8',
      md: 'h-12 w-12',
      lg: 'h-16 w-16',
    },
    variant: {
      default: 'text-primary',
      success: 'text-success',
      warning: 'text-warning',
      error: 'text-destructive',
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'default',
  },
});

export interface CircularProgressProps
  extends React.SVGProps<SVGSVGElement>,
    VariantProps<typeof circularProgressVariants> {
  value?: number;
  max?: number;
  showValue?: boolean;
}

const CircularProgress = React.forwardRef<SVGSVGElement, CircularProgressProps>(
  ({ className, value = 0, max = 100, showValue = false, size, variant, ...props }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
    const radius = size === 'sm' ? 14 : size === 'lg' ? 30 : 22;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return (
      <div className="relative inline-flex items-center justify-center">
        <svg
          ref={ref}
          className={cn(circularProgressVariants({ size, variant }), 'transform -rotate-90', className)}
          viewBox="0 0 50 50"
          {...props}
        >
          <circle
            cx="25"
            cy="25"
            r={radius}
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
            className="opacity-20"
          />
          <circle
            cx="25"
            cy="25"
            r={radius}
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-300"
          />
        </svg>
        {showValue && (
          <span className="absolute text-xs font-medium text-foreground">{Math.round(percentage)}%</span>
        )}
      </div>
    );
  }
);

CircularProgress.displayName = 'CircularProgress';

export { Progress, CircularProgress, progressVariants, circularProgressVariants };

