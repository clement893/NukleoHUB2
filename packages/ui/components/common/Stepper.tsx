import React from 'react';
import { cn } from '../lib/utils/cn';

export interface Step {
  id: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface StepperProps {
  steps: Step[];
  currentStep: number;
  orientation?: 'horizontal' | 'vertical';
  showLabels?: boolean;
  showDescriptions?: boolean;
  onStepClick?: (stepIndex: number) => void;
  className?: string;
}

const Stepper: React.FC<StepperProps> = ({
  steps,
  currentStep,
  orientation = 'horizontal',
  showLabels = true,
  showDescriptions = false,
  onStepClick,
  className,
}) => {
  const getStepStatus = (index: number): 'completed' | 'active' | 'disabled' | 'pending' => {
    if (steps[index].disabled) return 'disabled';
    if (index < currentStep) return 'completed';
    if (index === currentStep) return 'active';
    return 'pending';
  };

  const renderStep = (step: Step, index: number) => {
    const status = getStepStatus(index);
    const isClickable = onStepClick && !step.disabled && status !== 'active';

    const statusClasses = {
      completed: 'bg-primary text-primary-foreground border-primary',
      active: 'bg-primary text-primary-foreground border-primary ring-2 ring-primary ring-offset-2',
      disabled: 'bg-muted text-muted-foreground border-muted cursor-not-allowed',
      pending: 'bg-background text-muted-foreground border-input',
    };

    const connectorClasses = {
      completed: 'bg-primary',
      active: 'bg-primary',
      disabled: 'bg-muted',
      pending: 'bg-input',
    };

    return (
      <div
        key={step.id}
        className={cn(
          'flex items-center',
          orientation === 'vertical' && 'flex-col',
          orientation === 'horizontal' && 'flex-row'
        )}
      >
        <div className="flex items-center">
          <button
            type="button"
            onClick={() => isClickable && onStepClick?.(index)}
            disabled={step.disabled || !isClickable}
            className={cn(
              'flex items-center justify-center rounded-full border-2 transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
              statusClasses[status],
              step.icon ? 'h-10 w-10' : 'h-8 w-8',
              isClickable && 'cursor-pointer hover:scale-105'
            )}
            aria-current={status === 'active' ? 'step' : undefined}
            aria-disabled={step.disabled}
          >
            {step.icon ? (
              step.icon
            ) : status === 'completed' ? (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <span className="text-sm font-medium">{index + 1}</span>
            )}
          </button>
          {showLabels && (
            <div
              className={cn(
                'ml-3',
                orientation === 'vertical' && 'ml-0 mt-2 text-center'
              )}
            >
              <div
                className={cn(
                  'text-sm font-medium',
                  status === 'active' && 'text-foreground',
                  status === 'completed' && 'text-foreground',
                  status === 'disabled' && 'text-muted-foreground',
                  status === 'pending' && 'text-muted-foreground'
                )}
              >
                {step.label}
              </div>
              {showDescriptions && step.description && (
                <div className="text-xs text-muted-foreground mt-1">{step.description}</div>
              )}
            </div>
          )}
        </div>
        {index < steps.length - 1 && (
          <div
            className={cn(
              'transition-colors',
              orientation === 'horizontal' && 'mx-4 h-0.5 w-16',
              orientation === 'vertical' && 'my-4 h-16 w-0.5',
              connectorClasses[status]
            )}
            aria-hidden="true"
          />
        )}
      </div>
    );
  };

  return (
    <nav
      className={cn(
        'flex',
        orientation === 'horizontal' ? 'flex-row items-center' : 'flex-col',
        className
      )}
      aria-label="Progress"
    >
      {steps.map((step, index) => renderStep(step, index))}
    </nav>
  );
};

Stepper.displayName = 'Stepper';

export { Stepper };

