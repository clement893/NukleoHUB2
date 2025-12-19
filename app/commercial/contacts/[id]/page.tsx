'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button, Card, CardHeader, CardTitle, CardContent, ConfirmDialog } from '@/components/common';
import { ContactForm as ContForm } from '@/components/commercial/ContactForm';
import type { Contact } from '@/types/commercial';

export default function ContactDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [contact, setContact] = useState<Contact | null>(null);
  const [companies, setCompanies] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (id) {
      fetchContact();
      fetchCompanies();
    }
  }, [id]);

  const fetchContact = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/commercial/contacts/${id}`);
      if (response.ok) {
        const data = await response.json();
        setContact(data);
      }
    } catch (error) {
      console.error('Error fetching contact:', error);
    } finally {
      setIsLoading(false);
    }
  };

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

  const handleUpdate = async (data: any) => {
    try {
      const response = await fetch(`/api/commercial/contacts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        fetchContact();
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error updating contact:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/commercial/contacts/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        router.push('/commercial/contacts');
      }
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Chargement...</div>
      </div>
    );
  }

  if (!contact) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Contact non trouvé</div>
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
            <CardTitle>Modifier le contact</CardTitle>
          </CardHeader>
          <CardContent>
            <ContForm
              contact={contact}
              companies={companies}
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
                <CardTitle>
                  {contact.firstName} {contact.lastName}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Email</label>
                  <p className="text-foreground">{contact.email}</p>
                </div>
                {contact.phone && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Téléphone</label>
                    <p className="text-foreground">{contact.phone}</p>
                  </div>
                )}
                {contact.company && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Entreprise</label>
                    <div className="flex items-center gap-2">
                      <p className="text-foreground">{contact.company.name}</p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => router.push(`/commercial/companies/${contact.companyId}`)}
                      >
                        Voir l'entreprise
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      <ConfirmDialog
        isOpen={isDeleting}
        onClose={() => setIsDeleting(false)}
        onConfirm={handleDelete}
        title="Supprimer le contact"
        message={`Êtes-vous sûr de vouloir supprimer le contact "${contact.firstName} ${contact.lastName}" ?`}
        confirmLabel="Supprimer"
        cancelLabel="Annuler"
        confirmVariant="danger"
      />
    </div>
  );
}

