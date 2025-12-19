import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils/cn';

const skeletonVariants = cva('animate-pulse rounded-md bg-muted', {
  variants: {
    variant: {
      text: 'h-4 w-full',
      circle: 'rounded-full',
      rectangle: 'rounded-md',
    },
    size: {
      sm: 'h-4',
      md: 'h-6',
      lg: 'h-8',
    },
  },
  defaultVariants: {
    variant: 'text',
    size: 'md',
  },
});

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {
  width?: string | number;
  height?: string | number;
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant, size, width, height, style, ...props }, ref) => {
    const customStyle: React.CSSProperties = {
      ...style,
      ...(width && { width: typeof width === 'number' ? `${width}px` : width }),
      ...(height && { height: typeof height === 'number' ? `${height}px` : height }),
    };

    if (variant === 'circle') {
      return (
        <div
          ref={ref}
          className={cn(
            skeletonVariants({ variant, size }),
            !width && !height && 'h-10 w-10',
            className
          )}
          style={customStyle}
          {...props}
        />
      );
    }

    return (
      <div
        ref={ref}
        className={cn(skeletonVariants({ variant, size }), className)}
        style={customStyle}
        {...props}
      />
    );
  }
);

Skeleton.displayName = 'Skeleton';

export { Skeleton, skeletonVariants };

