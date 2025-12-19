import React from 'react';
import { cn } from '../lib/utils/cn';

export interface SidebarItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  href?: string;
  onClick?: () => void;
  active?: boolean;
  disabled?: boolean;
  children?: SidebarItem[];
}

export interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  items: SidebarItem[];
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  onItemClick?: (item: SidebarItem) => void;
  renderItem?: (item: SidebarItem) => React.ReactNode;
}

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  ({ className, items, isCollapsed = false, onToggleCollapse, onItemClick, renderItem, ...props }, ref) => {
    const [expandedItems, setExpandedItems] = React.useState<Set<string>>(new Set());

    const toggleExpanded = (itemId: string) => {
      setExpandedItems((prev) => {
        const newSet = new Set(prev);
        if (newSet.has(itemId)) {
          newSet.delete(itemId);
        } else {
          newSet.add(itemId);
        }
        return newSet;
      });
    };

    const handleItemClick = (item: SidebarItem) => {
      if (item.disabled) return;

      if (item.children && item.children.length > 0) {
        toggleExpanded(item.id);
      }

      if (item.onClick) {
        item.onClick();
      }

      if (onItemClick) {
        onItemClick(item);
      }
    };

    const renderSidebarItem = (item: SidebarItem, level = 0): React.ReactNode => {
      if (renderItem) {
        return renderItem(item);
      }

      const hasChildren = item.children && item.children.length > 0;
      const isExpanded = expandedItems.has(item.id);
      const isActive = item.active;

      return (
        <div key={item.id}>
          <button
            onClick={() => handleItemClick(item)}
            disabled={item.disabled}
            className={cn(
              'flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
              'hover:bg-accent hover:text-accent-foreground',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              isActive && 'bg-accent text-accent-foreground',
              item.disabled && 'cursor-not-allowed opacity-50',
              level > 0 && 'pl-6',
              isCollapsed && 'justify-center px-2'
            )}
            aria-expanded={hasChildren ? isExpanded : undefined}
            aria-current={isActive ? 'page' : undefined}
          >
            {item.icon && (
              <span className={cn('flex-shrink-0', isCollapsed && 'mx-auto')}>{item.icon}</span>
            )}
            {!isCollapsed && (
              <>
                <span className="flex-1 text-left">{item.label}</span>
                {hasChildren && (
                  <svg
                    className={cn(
                      'h-4 w-4 transition-transform',
                      isExpanded && 'rotate-90'
                    )}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </>
            )}
          </button>
          {hasChildren && !isCollapsed && isExpanded && (
            <div className="mt-1 space-y-1">
              {item.children?.map((child) => renderSidebarItem(child, level + 1))}
            </div>
          )}
        </div>
      );
    };

    return (
      <aside
        ref={ref}
        className={cn(
          'flex h-full flex-col border-r bg-background transition-all',
          isCollapsed ? 'w-16' : 'w-64',
          className
        )}
        aria-label="Sidebar navigation"
        {...props}
      >
        {onToggleCollapse && (
          <button
            onClick={onToggleCollapse}
            className="flex h-12 items-center justify-center border-b transition-colors hover:bg-accent"
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <svg
              className={cn('h-5 w-5 transition-transform', isCollapsed && 'rotate-180')}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          </button>
        )}
        <nav className="flex-1 space-y-1 p-4" aria-label="Sidebar">
          {items.map((item) => renderSidebarItem(item))}
        </nav>
      </aside>
    );
  }
);

Sidebar.displayName = 'Sidebar';

export { Sidebar };

