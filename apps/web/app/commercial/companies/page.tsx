'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input, Table, Pagination } from '@nukleohub/ui';
import type { Company } from '@nukleohub/types';

export default function CompaniesPage() {
  const router = useRouter();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/commercial/companies');
      if (response.ok) {
        const data = await response.json();
        setCompanies(data);
      }
    } catch (error) {
      console.error('Error fetching companies:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredCompanies = companies.filter((company) =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedCompanies = filteredCompanies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const columns = [
    {
      key: 'name',
      header: 'Nom',
      render: (_: any, row: Company) => (
        <button
          onClick={() => router.push(`/commercial/companies/${row.id}`)}
          className="text-primary hover:underline font-medium"
        >
          {row.name}
        </button>
      ),
    },
    {
      key: 'address',
      header: 'Adresse',
      accessor: 'address' as const,
      render: (value: string | null) => value || '-',
    },
    {
      key: 'website',
      header: 'Site web',
      accessor: 'website' as const,
      render: (value: string | null) =>
        value ? (
          <a href={value} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
            {value}
          </a>
        ) : (
          '-'
        ),
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Entreprises</h1>
          <p className="text-muted-foreground mt-2">Gérez vos entreprises clientes</p>
        </div>
        <Button onClick={() => router.push('/commercial/companies/new')}>
          Nouvelle Entreprise
        </Button>
      </div>

      <div className="mb-6">
        <Input
          placeholder="Rechercher une entreprise..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <Table
        data={paginatedCompanies}
        columns={columns}
        emptyMessage="Aucune entreprise trouvée"
      />

      {filteredCompanies.length > itemsPerPage && (
        <div className="mt-6 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredCompanies.length / itemsPerPage)}
            onPageChange={setCurrentPage}
            showPrevNext
            maxVisible={5}
          />
        </div>
      )}
    </div>
  );
}

