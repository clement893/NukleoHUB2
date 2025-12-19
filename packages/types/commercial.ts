export type OpportunityStage = 'Nouveau' | 'Qualification' | 'Proposition' | 'Négociation' | 'Gagné' | 'Perdu';

export interface Opportunity {
  id: string;
  name: string;
  stage: OpportunityStage;
  amount: number;
  closingDate: Date | string;
  ownerId: string;
  owner?: {
    id: string;
    name: string | null;
    email: string;
  };
  contactId: string;
  contact?: Contact;
  companyId: string;
  company?: Company;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  companyId: string;
  company?: Company;
  opportunities?: Opportunity[];
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface Company {
  id: string;
  name: string;
  address: string | null;
  website: string | null;
  contacts?: Contact[];
  opportunities?: Opportunity[];
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface CreateOpportunityInput {
  name: string;
  stage: OpportunityStage;
  amount: number;
  closingDate: Date | string;
  ownerId: string;
  contactId: string;
  companyId: string;
}

export interface UpdateOpportunityInput extends Partial<CreateOpportunityInput> {
  id: string;
}

export interface CreateContactInput {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  companyId: string;
}

export interface UpdateContactInput extends Partial<CreateContactInput> {
  id: string;
}

export interface CreateCompanyInput {
  name: string;
  address?: string;
  website?: string;
}

export interface UpdateCompanyInput extends Partial<CreateCompanyInput> {
  id: string;
}

export interface CommercialStats {
  totalOpportunities: number;
  totalAmount: number;
  wonOpportunities: number;
  wonAmount: number;
  conversionRate: number;
  opportunitiesByStage: Record<OpportunityStage, number>;
}

