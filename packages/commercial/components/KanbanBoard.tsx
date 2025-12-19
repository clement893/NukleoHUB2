'use client';

import React, { useState } from 'react';
import { cn } from '@nukleohub/ui/lib/utils/cn';
import { OpportunityCard } from './OpportunityCard';
import type { Opportunity, OpportunityStage } from '../types';
import { Button } from '@nukleohub/ui';

const STAGES: OpportunityStage[] = ['Nouveau', 'Qualification', 'Proposition', 'Négociation', 'Gagné', 'Perdu'];

const STAGE_COLORS = {
  Nouveau: 'bg-blue-50 border-blue-200',
  Qualification: 'bg-yellow-50 border-yellow-200',
  Proposition: 'bg-purple-50 border-purple-200',
  Négociation: 'bg-orange-50 border-orange-200',
  Gagné: 'bg-green-50 border-green-200',
  Perdu: 'bg-red-50 border-red-200',
};

export interface KanbanBoardProps {
  opportunities: Opportunity[];
  onOpportunityUpdate?: (opportunityId: string, newStage: OpportunityStage) => void;
  onOpportunityClick?: (opportunity: Opportunity) => void;
  className?: string;
}

export const KanbanBoard: React.FC<KanbanBoardProps> = ({
  opportunities,
  onOpportunityUpdate,
  onOpportunityClick,
  className,
}) => {
  const [draggedOpportunity, setDraggedOpportunity] = useState<Opportunity | null>(null);
  const [dragOverStage, setDragOverStage] = useState<OpportunityStage | null>(null);

  const opportunitiesByStage = React.useMemo(() => {
    const grouped: Record<OpportunityStage, Opportunity[]> = {
      Nouveau: [],
      Qualification: [],
      Proposition: [],
      Négociation: [],
      Gagné: [],
      Perdu: [],
    };

    opportunities.forEach((opp) => {
      if (opp.stage in grouped) {
        grouped[opp.stage].push(opp);
      }
    });

    return grouped;
  }, [opportunities]);

  const handleDragStart = (opportunity: Opportunity) => {
    setDraggedOpportunity(opportunity);
  };

  const handleDragEnd = () => {
    if (draggedOpportunity && dragOverStage && dragOverStage !== draggedOpportunity.stage) {
      onOpportunityUpdate?.(draggedOpportunity.id, dragOverStage);
    }
    setDraggedOpportunity(null);
    setDragOverStage(null);
  };

  const handleDragOver = (e: React.DragEvent, stage: OpportunityStage) => {
    e.preventDefault();
    setDragOverStage(stage);
  };

  const handleDragLeave = () => {
    setDragOverStage(null);
  };

  const getStageTotal = (stage: OpportunityStage): number => {
    return opportunitiesByStage[stage].reduce((sum, opp) => sum + opp.amount, 0);
  };

  return (
    <div className={cn('w-full overflow-x-auto', className)}>
      <div className="flex gap-4 min-w-max pb-4">
        {STAGES.map((stage) => {
          const stageOpportunities = opportunitiesByStage[stage];
          const stageTotal = getStageTotal(stage);
          const isDragOver = dragOverStage === stage;

          return (
            <div
              key={stage}
              className={cn(
                'flex flex-col w-80 rounded-lg border-2 transition-colors',
                STAGE_COLORS[stage],
                isDragOver && 'border-primary ring-2 ring-primary ring-offset-2'
              )}
              onDragOver={(e) => handleDragOver(e, stage)}
              onDragLeave={handleDragLeave}
              onDrop={handleDragEnd}
            >
              <div className="p-4 border-b">
                <h3 className="font-semibold text-foreground">{stage}</h3>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm text-muted-foreground">
                    {stageOpportunities.length} opportunité{stageOpportunities.length > 1 ? 's' : ''}
                  </span>
                  <span className="text-sm font-medium text-foreground">
                    {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(stageTotal)}
                  </span>
                </div>
              </div>
              <div className="flex-1 p-4 space-y-3 min-h-[400px]">
                {stageOpportunities.map((opportunity) => (
                  <OpportunityCard
                    key={opportunity.id}
                    opportunity={opportunity}
                    draggable
                    onDragStart={() => handleDragStart(opportunity)}
                    onClick={() => onOpportunityClick?.(opportunity)}
                  />
                ))}
                {stageOpportunities.length === 0 && (
                  <div className="text-center text-sm text-muted-foreground py-8">
                    Aucune opportunité
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

