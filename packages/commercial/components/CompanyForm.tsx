'use client';

import React, { useEffect } from 'react';
import { Button, Input } from '@nukleohub/ui';
import type { Company, CreateCompanyInput, UpdateCompanyInput } from '../types';

export interface CompanyFormProps {
  company?: Company;
  onSubmit: (data: CreateCompanyInput | UpdateCompanyInput) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

export const CompanyForm: React.FC<CompanyFormProps> = ({
  company,
  onSubmit,
  onCancel,
  isLoading = false,
}) => {
  const [formData, setFormData] = React.useState<CreateCompanyInput>({
    name: '',
    address: '',
    website: '',
  });

  useEffect(() => {
    if (company) {
      setFormData({
        name: company.name,
        address: company.address || '',
        website: company.website || '',
      });
    }
  }, [company]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (company) {
      onSubmit({ ...formData, id: company.id } as UpdateCompanyInput);
    } else {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Nom de l'entreprise"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
        fullWidth
      />

      <Input
        label="Adresse"
        value={formData.address}
        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
        fullWidth
      />

      <Input
        label="Site web"
        type="url"
        value={formData.website}
        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
        placeholder="https://example.com"
        fullWidth
      />

      <div className="flex justify-end gap-3 pt-4">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
            Annuler
          </Button>
        )}
        <Button type="submit" isLoading={isLoading}>
          {company ? 'Mettre à jour' : 'Créer'}
        </Button>
      </div>
    </form>
  );
};

