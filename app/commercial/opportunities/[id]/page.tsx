'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button, Card, CardHeader, CardTitle, CardContent, ConfirmDialog } from '@/components/common';
import { OpportunityForm as OppForm } from '@/components/commercial/OpportunityForm';
import type { Opportunity } from '@/types/commercial';
import { Badge } from '@/components/common';

export default function OpportunityDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [opportunity, setOpportunity] = useState<Opportunity | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [contacts, setContacts] = useState<any[]>([]);
  const [companies, setCompanies] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    if (id) {
      fetchOpportunity();
      fetchRelatedData();
    }
  }, [id]);

  const fetchOpportunity = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/commercial/opportunities/${id}`);
      if (response.ok) {
        const data = await response.json();
        setOpportunity(data);
      }
    } catch (error) {
      console.error('Error fetching opportunity:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchRelatedData = async () => {
    try {
      const [contactsRes, companiesRes] = await Promise.all([
        fetch('/api/commercial/contacts'),
        fetch('/api/commercial/companies'),
      ]);

      if (contactsRes.ok) {
        const contactsData = await contactsRes.json();
        setContacts(contactsData);
      }

      if (companiesRes.ok) {
        const companiesData = await companiesRes.json();
        setCompanies(companiesData);
      }

      // Mock users - replace with actual API call
      setUsers([{ id: '1', name: 'Utilisateur Test', email: 'test@example.com' }]);
    } catch (error) {
      console.error('Error fetching related data:', error);
    }
  };

  const handleUpdate = async (data: any) => {
    try {
      const response = await fetch(`/api/commercial/opportunities/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        fetchOpportunity();
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error updating opportunity:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/commercial/opportunities/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        router.push('/commercial/opportunities');
      }
    } catch (error) {
      console.error('Error deleting opportunity:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Chargement...</div>
      </div>
    );
  }

  if (!opportunity) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Opportunité non trouvée</div>
      </div>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(amount);
  };

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
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
            <CardTitle>Modifier l'opportunité</CardTitle>
          </CardHeader>
          <CardContent>
            <OppForm
              opportunity={opportunity}
              contacts={contacts}
              companies={companies}
              users={users}
              onSubmit={handleUpdate}
              onCancel={() => setIsEditing(false)}
            />
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{opportunity.name}</CardTitle>
                  <Badge variant={getStageVariant(opportunity.stage)}>{opportunity.stage}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Montant</label>
                  <p className="text-lg font-semibold text-foreground">{formatCurrency(opportunity.amount)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Date de clôture prévue</label>
                  <p className="text-foreground">{formatDate(opportunity.closingDate)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Propriétaire</label>
                  <p className="text-foreground">{opportunity.owner?.name || opportunity.owner?.email || '-'}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {opportunity.contact && (
              <Card>
                <CardHeader>
                  <CardTitle>Contact</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="font-medium text-foreground">
                      {opportunity.contact.firstName} {opportunity.contact.lastName}
                    </p>
                    <p className="text-sm text-muted-foreground">{opportunity.contact.email}</p>
                    {opportunity.contact.phone && (
                      <p className="text-sm text-muted-foreground">{opportunity.contact.phone}</p>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push(`/commercial/contacts/${opportunity.contactId}`)}
                    >
                      Voir le contact
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {opportunity.company && (
              <Card>
                <CardHeader>
                  <CardTitle>Entreprise</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="font-medium text-foreground">{opportunity.company.name}</p>
                    {opportunity.company.address && (
                      <p className="text-sm text-muted-foreground">{opportunity.company.address}</p>
                    )}
                    {opportunity.company.website && (
                      <p className="text-sm text-muted-foreground">
                        <a href={opportunity.company.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                          {opportunity.company.website}
                        </a>
                      </p>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push(`/commercial/companies/${opportunity.companyId}`)}
                    >
                      Voir l'entreprise
                    </Button>
                  </div>
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
        title="Supprimer l'opportunité"
        message={`Êtes-vous sûr de vouloir supprimer l'opportunité "${opportunity.name}" ?`}
        confirmLabel="Supprimer"
        cancelLabel="Annuler"
        confirmVariant="danger"
      />
    </div>
  );
}

