import React from 'react';
import { cn } from '../lib/utils/cn';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  className?: string;
}

const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({ className, items, separator, ...props }, ref) => {
    const defaultSeparator = (
      <svg className="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    );

    const breadcrumbSeparator = separator || defaultSeparator;
    const lastIndex = items.length - 1;

    return (
      <nav
        ref={ref}
        className={cn('flex items-center space-x-2 text-sm', className)}
        aria-label="Breadcrumb"
        {...props}
      >
        <ol className="flex items-center space-x-2">
          {items.map((item, index) => {
            const isLast = index === lastIndex;
            const isActive = isLast;

            return (
              <li key={index} className="flex items-center">
                {index > 0 && <span className="mx-2">{breadcrumbSeparator}</span>}
                {isLast ? (
                  <span
                    className={cn(
                      'font-medium text-foreground',
                      !isActive && 'text-muted-foreground'
                    )}
                    aria-current="page"
                  >
                    {item.label}
                  </span>
                ) : item.href ? (
                  <a
                    href={item.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </a>
                ) : item.onClick ? (
                  <button
                    onClick={item.onClick}
                    className="text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {item.label}
                  </button>
                ) : (
                  <span className="text-muted-foreground">{item.label}</span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    );
  }
);

Breadcrumb.displayName = 'Breadcrumb';

export { Breadcrumb };

