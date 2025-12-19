'use client';

import React, { useEffect } from 'react';
import { Button, Input, Select } from '@/components/common';
import type { Opportunity, OpportunityStage, CreateOpportunityInput, UpdateOpportunityInput } from '@/types/commercial';

const STAGES: OpportunityStage[] = ['Nouveau', 'Qualification', 'Proposition', 'Négociation', 'Gagné', 'Perdu'];

export interface OpportunityFormProps {
  opportunity?: Opportunity;
  contacts: Array<{ id: string; firstName: string; lastName: string; email: string }>;
  companies: Array<{ id: string; name: string }>;
  users: Array<{ id: string; name: string | null; email: string }>;
  onSubmit: (data: CreateOpportunityInput | UpdateOpportunityInput) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

export const OpportunityForm: React.FC<OpportunityFormProps> = ({
  opportunity,
  contacts,
  companies,
  users,
  onSubmit,
  onCancel,
  isLoading = false,
}) => {
  const [formData, setFormData] = React.useState<CreateOpportunityInput>({
    name: '',
    stage: 'Nouveau',
    amount: 0,
    closingDate: new Date().toISOString().split('T')[0],
    ownerId: users[0]?.id || '',
    contactId: contacts[0]?.id || '',
    companyId: companies[0]?.id || '',
  });

  useEffect(() => {
    if (opportunity) {
      setFormData({
        name: opportunity.name,
        stage: opportunity.stage,
        amount: opportunity.amount,
        closingDate: new Date(opportunity.closingDate).toISOString().split('T')[0],
        ownerId: opportunity.ownerId,
        contactId: opportunity.contactId,
        companyId: opportunity.companyId,
      });
    }
  }, [opportunity]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (opportunity) {
      onSubmit({ ...formData, id: opportunity.id } as UpdateOpportunityInput);
    } else {
      onSubmit(formData);
    }
  };

  const contactOptions = contacts.map((contact) => ({
    value: contact.id,
    label: `${contact.firstName} ${contact.lastName} (${contact.email})`,
  }));

  const companyOptions = companies.map((company) => ({
    value: company.id,
    label: company.name,
  }));

  const userOptions = users.map((user) => ({
    value: user.id,
    label: user.name || user.email,
  }));

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Nom de l'opportunité"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
        fullWidth
      />

      <Select
        label="Étape"
        options={STAGES.map((stage) => ({ value: stage, label: stage }))}
        value={formData.stage}
        onChange={(value) => setFormData({ ...formData, stage: value as OpportunityStage })}
        required
        fullWidth
      />

      <Input
        label="Montant (€)"
        type="number"
        step="0.01"
        min="0"
        value={formData.amount}
        onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) || 0 })}
        required
        fullWidth
      />

      <Input
        label="Date de clôture prévue"
        type="date"
        value={formData.closingDate}
        onChange={(e) => setFormData({ ...formData, closingDate: e.target.value })}
        required
        fullWidth
      />

      <Select
        label="Propriétaire"
        options={userOptions}
        value={formData.ownerId}
        onChange={(value) => setFormData({ ...formData, ownerId: value })}
        required
        fullWidth
      />

      <Select
        label="Contact"
        options={contactOptions}
        value={formData.contactId}
        onChange={(value) => setFormData({ ...formData, contactId: value })}
        required
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
          {opportunity ? 'Mettre à jour' : 'Créer'}
        </Button>
      </div>
    </form>
  );
};

