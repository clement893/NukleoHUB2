'use client';

import React from 'react';
import { cn } from '@nukleohub/ui/lib/utils/cn';
import type { Opportunity } from '../types';
import { Badge } from '@nukleohub/ui';

export interface OpportunityCardProps {
  opportunity: Opportunity;
  draggable?: boolean;
  onDragStart?: () => void;
  onClick?: () => void;
  className?: string;
}

export const OpportunityCard: React.FC<OpportunityCardProps> = ({
  opportunity,
  draggable = false,
  onDragStart,
  onClick,
  className,
}) => {
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(amount);
  };

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const getStageVariant = (stage: string): 'default' | 'success' | 'warning' | 'error' => {
    switch (stage) {
      case 'Gagné':
        return 'success';
      case 'Perdu':
        return 'error';
      case 'Négociation':
      case 'Proposition':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <div
      draggable={draggable}
      onDragStart={onDragStart}
      onClick={onClick}
      className={cn(
        'bg-background rounded-lg border p-4 shadow-sm cursor-pointer transition-all hover:shadow-md',
        draggable && 'cursor-move',
        onClick && 'hover:border-primary',
        className
      )}
    >
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-medium text-foreground line-clamp-2 flex-1">{opportunity.name}</h4>
        <Badge variant={getStageVariant(opportunity.stage)} size="sm" className="ml-2 flex-shrink-0">
          {opportunity.stage}
        </Badge>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Montant</span>
          <span className="text-sm font-semibold text-foreground">{formatAmount(opportunity.amount)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Date de clôture</span>
          <span className="text-sm text-foreground">{formatDate(opportunity.closingDate)}</span>
        </div>
        {opportunity.contact && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Contact</span>
            <span className="text-sm text-foreground truncate ml-2">
              {opportunity.contact.firstName} {opportunity.contact.lastName}
            </span>
          </div>
        )}
        {opportunity.company && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Entreprise</span>
            <span className="text-sm text-foreground truncate ml-2">{opportunity.company.name}</span>
          </div>
        )}
      </div>
    </div>
  );
};

