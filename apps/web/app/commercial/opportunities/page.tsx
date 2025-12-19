'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input, Table, Select, Pagination } from '@nukleohub/ui';
import type { Opportunity, OpportunityStage } from '@nukleohub/types';
import { Badge } from '@nukleohub/ui';

const STAGES: OpportunityStage[] = ['Nouveau', 'Qualification', 'Proposition', 'Négociation', 'Gagné', 'Perdu'];

export default function OpportunitiesPage() {
  const router = useRouter();
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [stageFilter, setStageFilter] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchOpportunities();
  }, [stageFilter]);

  const fetchOpportunities = async () => {
    try {
      setIsLoading(true);
      const params = new URLSearchParams();
      if (stageFilter) params.append('stage', stageFilter);
      const response = await fetch(`/api/commercial/opportunities?${params.toString()}`);
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

  const filteredOpportunities = opportunities.filter((opp) =>
    opp.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedOpportunities = filteredOpportunities.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(amount);
  };

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString('fr-FR');
  };

  const columns = [
    {
      key: 'name',
      header: 'Nom',
      accessor: 'name' as const,
      render: (value: string, row: Opportunity) => (
        <button
          onClick={() => router.push(`/commercial/opportunities/${row.id}`)}
          className="text-primary hover:underline font-medium"
        >
          {value}
        </button>
      ),
    },
    {
      key: 'stage',
      header: 'Étape',
      accessor: 'stage' as const,
      render: (value: OpportunityStage) => (
        <Badge variant={getStageVariant(value)} size="sm">
          {value}
        </Badge>
      ),
    },
    {
      key: 'amount',
      header: 'Montant',
      accessor: 'amount' as const,
      render: (value: number) => formatCurrency(value),
      align: 'right' as const,
    },
    {
      key: 'closingDate',
      header: 'Date de clôture',
      accessor: 'closingDate' as const,
      render: (value: Date | string) => formatDate(value),
    },
    {
      key: 'contact',
      header: 'Contact',
      render: (_: any, row: Opportunity) =>
        row.contact ? `${row.contact.firstName} ${row.contact.lastName}` : '-',
    },
    {
      key: 'company',
      header: 'Entreprise',
      render: (_: any, row: Opportunity) => (row.company ? row.company.name : '-'),
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Opportunités</h1>
          <p className="text-muted-foreground mt-2">Gérez vos opportunités commerciales</p>
        </div>
        <Button onClick={() => router.push('/commercial/opportunities/new')}>
          Nouvelle Opportunité
        </Button>
      </div>

      <div className="flex gap-4 mb-6">
        <Input
          placeholder="Rechercher..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Select
          options={[
            { value: '', label: 'Toutes les étapes' },
            ...STAGES.map((stage) => ({ value: stage, label: stage })),
          ]}
          value={stageFilter}
          onChange={setStageFilter}
          placeholder="Filtrer par étape"
          className="w-48"
        />
      </div>

      <Table
        data={paginatedOpportunities}
        columns={columns}
        emptyMessage="Aucune opportunité trouvée"
      />

      {filteredOpportunities.length > itemsPerPage && (
        <div className="mt-6 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredOpportunities.length / itemsPerPage)}
            onPageChange={setCurrentPage}
            showPrevNext
            maxVisible={5}
          />
        </div>
      )}
    </div>
  );
}

