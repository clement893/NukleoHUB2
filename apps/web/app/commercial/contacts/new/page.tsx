'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@nukleohub/ui';
import { ContactForm } from '@nukleohub/commercial/components/ContactForm';

export default function NewContactPage() {
  const router = useRouter();
  const [companies, setCompanies] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await fetch('/api/commercial/companies');
      if (response.ok) {
        const data = await response.json();
        setCompanies(data);
      }
    } catch (error) {
      console.error('Error fetching companies:', error);
    }
  };

  const handleSubmit = async (data: any) => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/commercial/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const newContact = await response.json();
        router.push(`/commercial/contacts/${newContact.id}`);
      }
    } catch (error) {
      console.error('Error creating contact:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground">Nouveau Contact</h1>
        <p className="text-muted-foreground mt-2">Créez un nouveau contact commercial</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informations du contact</CardTitle>
        </CardHeader>
        <CardContent>
          <ContactForm
            companies={companies}
            onSubmit={handleSubmit}
            onCancel={() => router.back()}
            isLoading={isLoading}
          />
        </CardContent>
      </Card>
    </div>
  );
}

