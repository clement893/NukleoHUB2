import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils/cn';

const avatarVariants = cva('relative flex shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground font-medium overflow-hidden', {
  variants: {
    size: {
      sm: 'h-8 w-8 text-xs',
      md: 'h-10 w-10 text-sm',
      lg: 'h-12 w-12 text-base',
      xl: 'h-16 w-16 text-lg',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export type AvatarStatus = 'online' | 'offline' | 'away' | 'busy';

export interface AvatarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarVariants> {
  src?: string;
  alt?: string;
  fallback?: string | React.ReactNode;
  icon?: React.ReactNode;
  status?: AvatarStatus;
  showStatus?: boolean;
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, alt, fallback, icon, size, status, showStatus = false, ...props }, ref) => {
    const [imageError, setImageError] = React.useState(false);
    const shouldShowImage = src && !imageError;

    const getInitials = (name: string): string => {
      const parts = name.trim().split(/\s+/);
      if (parts.length >= 2) {
        return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
      }
      return name.substring(0, 2).toUpperCase();
    };

    const statusColors = {
      online: 'bg-success',
      offline: 'bg-muted',
      away: 'bg-warning',
      busy: 'bg-destructive',
    };

    const statusSizes = {
      sm: 'h-2 w-2',
      md: 'h-2.5 w-2.5',
      lg: 'h-3 w-3',
      xl: 'h-4 w-4',
    };

    return (
      <div
        ref={ref}
        className={cn(avatarVariants({ size }), className)}
        {...props}
      >
        {shouldShowImage ? (
          <img
            src={src}
            alt={alt || 'Avatar'}
            className="h-full w-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : icon ? (
          <span className="flex items-center justify-center">{icon}</span>
        ) : (
          <span className="flex items-center justify-center">
            {typeof fallback === 'string' ? getInitials(fallback) : fallback || '?'}
          </span>
        )}
        {showStatus && status && (
          <span
            className={cn(
              'absolute bottom-0 right-0 rounded-full border-2 border-background',
              statusColors[status],
              statusSizes[size || 'md']
            )}
            aria-label={`Status: ${status}`}
          />
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  max?: number;
  size?: VariantProps<typeof avatarVariants>['size'];
}

const AvatarGroup: React.FC<AvatarGroupProps> = ({ children, max, size, className, ...props }) => {
  const childrenArray = React.Children.toArray(children);
  const visibleAvatars = max ? childrenArray.slice(0, max) : childrenArray;
  const remainingCount = max ? childrenArray.length - max : 0;

  return (
    <div
      className={cn('flex -space-x-2', className)}
      {...props}
    >
      {visibleAvatars.map((child, index) => {
        if (React.isValidElement<AvatarProps>(child)) {
          return React.cloneElement(child, {
            key: index,
            size: size || child.props.size,
            className: cn('ring-2 ring-background', child.props.className),
          } as Partial<AvatarProps>);
        }
        return child;
      })}
      {remainingCount > 0 && (
        <Avatar
          size={size}
          className="ring-2 ring-background"
          fallback={`+${remainingCount}`}
        />
      )}
    </div>
  );
};

AvatarGroup.displayName = 'AvatarGroup';

export { Avatar, AvatarGroup, avatarVariants };

