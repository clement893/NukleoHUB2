'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/common';
import type { Opportunity, CommercialStats } from '@/types/commercial';
import { Progress, Badge } from '@/components/common';

export interface CommercialDashboardProps {
  opportunities: Opportunity[];
  stats?: CommercialStats;
  className?: string;
}

export const CommercialDashboard: React.FC<CommercialDashboardProps> = ({
  opportunities,
  stats,
  className,
}) => {
  const calculateStats = (): CommercialStats => {
    if (stats) return stats;

    const totalOpportunities = opportunities.length;
    const totalAmount = opportunities.reduce((sum, opp) => sum + opp.amount, 0);
    const wonOpportunities = opportunities.filter((opp) => opp.stage === 'Gagné').length;
    const wonAmount = opportunities
      .filter((opp) => opp.stage === 'Gagné')
      .reduce((sum, opp) => sum + opp.amount, 0);
    const conversionRate = totalOpportunities > 0 ? (wonOpportunities / totalOpportunities) * 100 : 0;

    const opportunitiesByStage: Record<string, number> = {
      Nouveau: 0,
      Qualification: 0,
      Proposition: 0,
      Négociation: 0,
      Gagné: 0,
      Perdu: 0,
    };

    opportunities.forEach((opp) => {
      if (opp.stage in opportunitiesByStage) {
        opportunitiesByStage[opp.stage]++;
      }
    });

    return {
      totalOpportunities,
      totalAmount,
      wonOpportunities,
      wonAmount,
      conversionRate,
      opportunitiesByStage: opportunitiesByStage as any,
    };
  };

  const dashboardStats = calculateStats();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(amount);
  };

  return (
    <div className={className}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Opportunités</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{dashboardStats.totalOpportunities}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">CA Prévisionnel</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{formatCurrency(dashboardStats.totalAmount)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">Opportunités Gagnées</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{dashboardStats.wonOpportunities}</div>
            <div className="text-sm text-muted-foreground mt-1">{formatCurrency(dashboardStats.wonAmount)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">Taux de Conversion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{dashboardStats.conversionRate.toFixed(1)}%</div>
            <Progress value={dashboardStats.conversionRate} max={100} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Répartition par Étape</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(dashboardStats.opportunitiesByStage).map(([stage, count]) => {
              const percentage =
                dashboardStats.totalOpportunities > 0
                  ? (count / dashboardStats.totalOpportunities) * 100
                  : 0;

              return (
                <div key={stage}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-foreground">{stage}</span>
                      <Badge variant="outline" size="sm">
                        {count}
                      </Badge>
                    </div>
                    <span className="text-sm text-muted-foreground">{percentage.toFixed(1)}%</span>
                  </div>
                  <Progress value={percentage} max={100} />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

