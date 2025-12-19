'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button, Card, CardHeader, CardTitle, CardContent, CompanyForm, ConfirmDialog } from '@/components/common';
import { CompanyForm as CompForm } from '@/components/commercial/CompanyForm';
import type { Company } from '@/types/commercial';
import { Table } from '@/components/common';

export default function CompanyDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [company, setCompany] = useState<Company | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (id) {
      fetchCompany();
    }
  }, [id]);

  const fetchCompany = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/commercial/companies/${id}`);
      if (response.ok) {
        const data = await response.json();
        setCompany(data);
      }
    } catch (error) {
      console.error('Error fetching company:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async (data: any) => {
    try {
      const response = await fetch(`/api/commercial/companies/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        fetchCompany();
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error updating company:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/commercial/companies/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        router.push('/commercial/companies');
      }
    } catch (error) {
      console.error('Error deleting company:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Chargement...</div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Entreprise non trouvée</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <Button variant="outline" onClick={() => router.back()}>
          ← Retour
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? 'Annuler' : 'Modifier'}
          </Button>
          <Button variant="danger" onClick={() => setIsDeleting(true)}>
            Supprimer
          </Button>
        </div>
      </div>

      {isEditing ? (
        <Card>
          <CardHeader>
            <CardTitle>Modifier l'entreprise</CardTitle>
          </CardHeader>
          <CardContent>
            <CompForm
              company={company}
              onSubmit={handleUpdate}
              onCancel={() => setIsEditing(false)}
            />
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>{company.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {company.address && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Adresse</label>
                    <p className="text-foreground">{company.address}</p>
                  </div>
                )}
                {company.website && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Site web</label>
                    <p className="text-foreground">
                      <a
                        href={company.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        {company.website}
                      </a>
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {company.contacts && company.contacts.length > 0 && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Contacts ({company.contacts.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table
                    data={company.contacts}
                    columns={[
                      {
                        key: 'name',
                        header: 'Nom',
                        render: (_: any, row: any) => (
                          <button
                            onClick={() => router.push(`/commercial/contacts/${row.id}`)}
                            className="text-primary hover:underline"
                          >
                            {row.firstName} {row.lastName}
                          </button>
                        ),
                      },
                      {
                        key: 'email',
                        header: 'Email',
                        accessor: 'email' as const,
                      },
                      {
                        key: 'phone',
                        header: 'Téléphone',
                        accessor: 'phone' as const,
                        render: (value: string | null) => value || '-',
                      },
                    ]}
                  />
                </CardContent>
              </Card>
            )}

            {company.opportunities && company.opportunities.length > 0 && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Opportunités ({company.opportunities.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table
                    data={company.opportunities}
                    columns={[
                      {
                        key: 'name',
                        header: 'Nom',
                        render: (_: any, row: any) => (
                          <button
                            onClick={() => router.push(`/commercial/opportunities/${row.id}`)}
                            className="text-primary hover:underline"
                          >
                            {row.name}
                          </button>
                        ),
                      },
                      {
                        key: 'stage',
                        header: 'Étape',
                        accessor: 'stage' as const,
                      },
                      {
                        key: 'amount',
                        header: 'Montant',
                        accessor: 'amount' as const,
                        render: (value: number) =>
                          new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(value),
                        align: 'right' as const,
                      },
                    ]}
                  />
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      )}

      <ConfirmDialog
        isOpen={isDeleting}
        onClose={() => setIsDeleting(false)}
        onConfirm={handleDelete}
        title="Supprimer l'entreprise"
        message={`Êtes-vous sûr de vouloir supprimer l'entreprise "${company.name}" ?`}
        confirmLabel="Supprimer"
        cancelLabel="Annuler"
        confirmVariant="danger"
      />
    </div>
  );
}

