'use client';

import React, { useEffect } from 'react';
import { Button, Input, Select } from '@/components/common';
import type { Contact, CreateContactInput, UpdateContactInput } from '@/types/commercial';

export interface ContactFormProps {
  contact?: Contact;
  companies: Array<{ id: string; name: string }>;
  onSubmit: (data: CreateContactInput | UpdateContactInput) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

export const ContactForm: React.FC<ContactFormProps> = ({
  contact,
  companies,
  onSubmit,
  onCancel,
  isLoading = false,
}) => {
  const [formData, setFormData] = React.useState<CreateContactInput>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    companyId: companies[0]?.id || '',
  });

  useEffect(() => {
    if (contact) {
      setFormData({
        firstName: contact.firstName,
        lastName: contact.lastName,
        email: contact.email,
        phone: contact.phone || '',
        companyId: contact.companyId,
      });
    }
  }, [contact, companies]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contact) {
      onSubmit({ ...formData, id: contact.id } as UpdateContactInput);
    } else {
      onSubmit(formData);
    }
  };

  const companyOptions = companies.map((company) => ({
    value: company.id,
    label: company.name,
  }));

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Prénom"
          value={formData.firstName}
          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
          required
          fullWidth
        />
        <Input
          label="Nom"
          value={formData.lastName}
          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
          required
          fullWidth
        />
      </div>

      <Input
        label="Email"
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
        fullWidth
      />

      <Input
        label="Téléphone"
        type="tel"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        fullWidth
      />

      <Select
        label="Entreprise"
        options={companyOptions}
        value={formData.companyId}
        onChange={(value) => setFormData({ ...formData, companyId: value })}
        required
        fullWidth
      />

      <div className="flex justify-end gap-3 pt-4">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
            Annuler
          </Button>
        )}
        <Button type="submit" isLoading={isLoading}>
          {contact ? 'Mettre à jour' : 'Créer'}
        </Button>
      </div>
    </form>
  );
};

