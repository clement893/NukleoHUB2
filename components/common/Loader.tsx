import React from 'react';
import { cn } from '@/lib/utils/cn';

const loaderVariants = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-8 w-8',
};

export interface LoaderProps {
  size?: keyof typeof loaderVariants;
  className?: string;
  text?: string;
}

const Loader: React.FC<LoaderProps> = ({ size = 'md', className, text }) => {
  return (
    <div className="flex items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={cn('animate-spin', loaderVariants[size], className)}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
        />
      </svg>
      {text && <span className="ml-2">{text}</span>}
    </div>
  );
};

export { Loader };
