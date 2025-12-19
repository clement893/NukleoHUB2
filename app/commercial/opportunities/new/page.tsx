'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/common';
import { OpportunityForm as OppForm } from '@/components/commercial/OpportunityForm';

export default function NewOpportunityPage() {
  const router = useRouter();
  const [contacts, setContacts] = useState<any[]>([]);
  const [companies, setCompanies] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchRelatedData();
  }, []);

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

  const handleSubmit = async (data: any) => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/commercial/opportunities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const newOpportunity = await response.json();
        router.push(`/commercial/opportunities/${newOpportunity.id}`);
      }
    } catch (error) {
      console.error('Error creating opportunity:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground">Nouvelle Opportunité</h1>
        <p className="text-muted-foreground mt-2">Créez une nouvelle opportunité commerciale</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informations de l'opportunité</CardTitle>
        </CardHeader>
        <CardContent>
          <OppForm
            contacts={contacts}
            companies={companies}
            users={users}
            onSubmit={handleSubmit}
            onCancel={() => router.back()}
            isLoading={isLoading}
          />
        </CardContent>
      </Card>
    </div>
  );
}

