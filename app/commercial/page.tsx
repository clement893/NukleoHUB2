'use client';

import React, { useEffect, useState } from 'react';
import { KanbanBoard } from '@/components/commercial/KanbanBoard';
import { CommercialDashboard } from '@/components/commercial/CommercialDashboard';
import { Button, Card, CardHeader, CardTitle, CardContent, Tabs } from '@/components/common';
import type { Opportunity, OpportunityStage } from '@/types/commercial';
import { useRouter } from 'next/navigation';

export default function CommercialPage() {
  const router = useRouter();
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('kanban');

  useEffect(() => {
    fetchOpportunities();
  }, []);

  const fetchOpportunities = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/commercial/opportunities');
      if (response.ok) {
        const data = await response.json();
        setOpportunities(data);
      }
    } catch (error) {
      console.error('Error fetching opportunities:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpportunityUpdate = async (opportunityId: string, newStage: OpportunityStage) => {
    try {
      const response = await fetch(`/api/commercial/opportunities/${opportunityId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stage: newStage }),
      });

      if (response.ok) {
        fetchOpportunities();
      }
    } catch (error) {
      console.error('Error updating opportunity:', error);
    }
  };

  const handleOpportunityClick = (opportunity: Opportunity) => {
    router.push(`/commercial/opportunities/${opportunity.id}`);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Module Commercial</h1>
          <p className="text-muted-foreground mt-2">Gérez votre pipeline commercial</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => router.push('/commercial/opportunities/new')}>
            Nouvelle Opportunité
          </Button>
          <Button variant="outline" onClick={() => router.push('/commercial/contacts/new')}>
            Nouveau Contact
          </Button>
          <Button variant="outline" onClick={() => router.push('/commercial/companies/new')}>
            Nouvelle Entreprise
          </Button>
        </div>
      </div>

      <Tabs
        items={[
          {
            value: 'kanban',
            label: 'Pipeline Kanban',
            content: (
              <div className="mt-4">
                <KanbanBoard
                  opportunities={opportunities}
                  onOpportunityUpdate={handleOpportunityUpdate}
                  onOpportunityClick={handleOpportunityClick}
                />
              </div>
            ),
          },
          {
            value: 'dashboard',
            label: 'Tableau de Bord',
            content: (
              <div className="mt-4">
                <CommercialDashboard opportunities={opportunities} />
              </div>
            ),
          },
        ]}
        value={activeTab}
        onValueChange={setActiveTab}
      />
    </div>
  );
}

