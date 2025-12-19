import React from 'react';
import { cn } from '../lib/utils/cn';

export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  logo?: React.ReactNode;
  logoHref?: string;
  navigation?: React.ReactNode;
  userMenu?: React.ReactNode;
  actions?: React.ReactNode;
  sticky?: boolean;
}

const Header = React.forwardRef<HTMLElement, HeaderProps>(
  ({ className, logo, logoHref, navigation, userMenu, actions, sticky = false, ...props }, ref) => {
    return (
      <header
        ref={ref}
        className={cn(
          'flex h-16 items-center justify-between border-b bg-background px-4',
          sticky && 'sticky top-0 z-50',
          className
        )}
        {...props}
      >
        <div className="flex items-center gap-4">
          {logo && (
            <div className="flex-shrink-0">
              {logoHref ? (
                <a href={logoHref} className="flex items-center">
                  {logo}
                </a>
              ) : (
                logo
              )}
            </div>
          )}
          {navigation && <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {navigation}
          </nav>}
        </div>

        <div className="flex items-center gap-4">
          {actions && <div className="flex items-center gap-2">{actions}</div>}
          {userMenu && <div className="flex items-center">{userMenu}</div>}
        </div>
      </header>
    );
  }
);

Header.displayName = 'Header';

export interface HeaderNavItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  href?: string;
}

const HeaderNavItem = React.forwardRef<HTMLButtonElement, HeaderNavItemProps>(
  ({ className, active, href, children, ...props }, ref) => {
    const baseClasses = cn(
      'px-3 py-2 text-sm font-medium rounded-md transition-colors',
      'hover:bg-accent hover:text-accent-foreground',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
      active && 'bg-accent text-accent-foreground',
      className
    );

    if (href) {
      return (
        <a href={href} className={baseClasses} aria-current={active ? 'page' : undefined}>
          {children}
        </a>
      );
    }

    return (
      <button ref={ref} className={baseClasses} aria-current={active ? 'page' : undefined} {...props}>
        {children}
      </button>
    );
  }
);

HeaderNavItem.displayName = 'HeaderNavItem';

export { Header, HeaderNavItem };

