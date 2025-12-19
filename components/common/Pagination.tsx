import React from 'react';
import { cn } from '@/lib/utils/cn';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showFirstLast?: boolean;
  showPrevNext?: boolean;
  maxVisible?: number;
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  showFirstLast = true,
  showPrevNext = true,
  maxVisible = 5,
  className,
}) => {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const half = Math.floor(maxVisible / 2);

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      let start = Math.max(1, currentPage - half);
      let end = Math.min(totalPages, start + maxVisible - 1);

      if (end - start < maxVisible - 1) {
        start = Math.max(1, end - maxVisible + 1);
      }

      if (start > 1) {
        pages.push(1);
        if (start > 2) {
          pages.push('...');
        }
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (end < totalPages) {
        if (end < totalPages - 1) {
          pages.push('...');
        }
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  if (totalPages <= 1) return null;

  return (
    <nav className={cn('flex items-center justify-center gap-1', className)} aria-label="Pagination">
      {showFirstLast && (
        <button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
          className="px-3 py-2 text-sm font-medium rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="First page"
        >
          First
        </button>
      )}
      {showPrevNext && (
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-2 text-sm font-medium rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Previous page"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}
      {pageNumbers.map((page, index) => {
        if (page === '...') {
          return (
            <span key={`ellipsis-${index}`} className="px-3 py-2 text-sm text-muted-foreground">
              ...
            </span>
          );
        }

        const pageNum = page as number;
        return (
          <button
            key={pageNum}
            onClick={() => handlePageChange(pageNum)}
            className={cn(
              'px-3 py-2 text-sm font-medium rounded-md border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              currentPage === pageNum
                ? 'bg-primary text-primary-foreground border-primary'
                : 'border-input bg-background hover:bg-accent hover:text-accent-foreground'
            )}
            aria-label={`Page ${pageNum}`}
            aria-current={currentPage === pageNum ? 'page' : undefined}
          >
            {pageNum}
          </button>
        );
      })}
      {showPrevNext && (
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-2 text-sm font-medium rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Next page"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}
      {showFirstLast && (
        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="px-3 py-2 text-sm font-medium rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Last page"
        >
          Last
        </button>
      )}
    </nav>
  );
};

Pagination.displayName = 'Pagination';

export { Pagination };

