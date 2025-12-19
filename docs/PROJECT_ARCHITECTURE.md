# Architecture Complète - Nukleo.HUB Refactorisé

## Vue d'ensemble

**Stack technologique:**
- Frontend: Next.js 15 + React 18 + TypeScript + Tailwind CSS
- Backend: Node.js + Express (intégré dans Next.js API Routes)
- Base de données: PostgreSQL + Prisma ORM
- Cache: Redis
- Authentification: Google OAuth + JWT
- Stockage: AWS S3
- IA: OpenAI API

---

## Architecture modulaire par domaine

```
src/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Routes d'authentification
│   │   ├── login/
│   │   ├── logout/
│   │   └── callback/
│   │
│   ├── (dashboard)/              # Routes protégées
│   │   ├── dashboard/
│   │   ├── commercial/           # Module Commercial
│   │   ├── projects/             # Module Projets
│   │   ├── team/                 # Module Équipe
│   │   ├── billing/              # Module Facturation
│   │   ├── communication/        # Module Communication
│   │   ├── contracts/            # Module Contrats
│   │   ├── admin/                # Module Administration
│   │   └── portal/               # Portails (Client/Employé)
│   │
│   ├── api/                      # API Routes (Node.js Backend)
│   │   ├── auth/                 # Authentification
│   │   ├── commercial/           # Endpoints Commercial
│   │   ├── projects/             # Endpoints Projets
│   │   ├── team/                 # Endpoints Équipe
│   │   ├── billing/              # Endpoints Facturation
│   │   ├── communication/        # Endpoints Communication
│   │   ├── contracts/            # Endpoints Contrats
│   │   ├── admin/                # Endpoints Administration
│   │   └── portal/               # Endpoints Portails
│   │
│   └── layout.tsx                # Layout racine
│
├── components/                   # Composants React réutilisables
│   ├── common/                   # Composants génériques
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Modal.tsx
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   ├── Table.tsx
│   │   └── Pagination.tsx
│   │
│   ├── layout/                   # Composants de layout
│   │   ├── Sidebar.tsx
│   │   ├── Header.tsx
│   │   ├── Navigation.tsx
│   │   └── Footer.tsx
│   │
│   ├── commercial/               # Composants Commercial
│   │   ├── OpportunityCard.tsx
│   │   ├── OpportunityForm.tsx
│   │   ├── KanbanBoard.tsx
│   │   ├── ContactCard.tsx
│   │   └── CompanyCard.tsx
│   │
│   ├── projects/                 # Composants Projets
│   │   ├── ProjectCard.tsx
│   │   ├── ProjectForm.tsx
│   │   ├── TaskList.tsx
│   │   ├── TaskForm.tsx
│   │   ├── MilestoneTimeline.tsx
│   │   └── ProjectGantt.tsx
│   │
│   ├── team/                     # Composants Équipe
│   │   ├── EmployeeCard.tsx
│   │   ├── TimesheetForm.tsx
│   │   ├── VacationForm.tsx
│   │   └── WorkloadChart.tsx
│   │
│   ├── billing/                  # Composants Facturation
│   │   ├── InvoiceForm.tsx
│   │   ├── QuoteForm.tsx
│   │   ├── PaymentForm.tsx
│   │   └── InvoicePreview.tsx
│   │
│   ├── communication/            # Composants Communication
│   │   ├── CampaignForm.tsx
│   │   ├── ContentCalendar.tsx
│   │   └── NewsletterForm.tsx
│   │
│   ├── contracts/                # Composants Contrats
│   │   ├── ContractForm.tsx
│   │   ├── SignaturePad.tsx
│   │   └── ContractPreview.tsx
│   │
│   ├── admin/                    # Composants Admin
│   │   ├── UserManagement.tsx
│   │   ├── AccessControl.tsx
│   │   ├── ApiKeyManager.tsx
│   │   └── SystemSettings.tsx
│   │
│   └── portal/                   # Composants Portails
│       ├── ClientPortalLayout.tsx
│       ├── EmployeePortalLayout.tsx
│       └── PortalDashboard.tsx
│
├── hooks/                        # Custom React Hooks
│   ├── useAuth.ts
│   ├── useAccessControl.ts
│   ├── useFetch.ts
│   ├── useForm.ts
│   ├── usePagination.ts
│   ├── useCache.ts
│   └── useNotifications.ts
│
├── lib/                          # Utilitaires et services
│   ├── auth/
│   │   ├── auth.ts               # Authentification
│   │   ├── oauth.ts              # Google OAuth
│   │   └── jwt.ts                # JWT tokens
│   │
│   ├── api/
│   │   ├── client.ts             # Client API
│   │   ├── endpoints.ts          # Définitions des endpoints
│   │   └── interceptors.ts       # Intercepteurs
│   │
│   ├── database/
│   │   ├── prisma.ts             # Client Prisma
│   │   ├── migrations.ts         # Migrations
│   │   └── seeds.ts              # Seeds
│   │
│   ├── services/
│   │   ├── commercial.service.ts # Service Commercial
│   │   ├── projects.service.ts   # Service Projets
│   │   ├── team.service.ts       # Service Équipe
│   │   ├── billing.service.ts    # Service Facturation
│   │   ├── communication.service.ts # Service Communication
│   │   ├── contracts.service.ts  # Service Contrats
│   │   ├── email.service.ts      # Service Email
│   │   ├── storage.service.ts    # Service Stockage (S3)
│   │   ├── cache.service.ts      # Service Cache (Redis)
│   │   └── ai.service.ts         # Service IA (OpenAI)
│   │
│   ├── utils/
│   │   ├── validation.ts         # Validations Zod
│   │   ├── formatters.ts         # Formatage de données
│   │   ├── helpers.ts            # Fonctions utilitaires
│   │   ├── constants.ts          # Constantes
│   │   └── errors.ts             # Gestion des erreurs
│   │
│   └── middleware/
│       ├── auth.middleware.ts    # Middleware d'authentification
│       ├── cors.middleware.ts    # CORS
│       ├── rateLimit.middleware.ts # Rate limiting
│       ├── errorHandler.middleware.ts # Gestion des erreurs
│       └── logging.middleware.ts # Logging
│
├── types/                        # Types TypeScript
│   ├── auth.types.ts
│   ├── commercial.types.ts
│   ├── projects.types.ts
│   ├── team.types.ts
│   ├── billing.types.ts
│   ├── communication.types.ts
│   ├── contracts.types.ts
│   ├── api.types.ts
│   └── common.types.ts
│
├── stores/                       # Zustand stores (état global)
│   ├── authStore.ts
│   ├── commercialStore.ts
│   ├── projectsStore.ts
│   ├── teamStore.ts
│   ├── billingStore.ts
│   ├── uiStore.ts
│   └── notificationStore.ts
│
├── providers/                    # React Context Providers
│   ├── AuthProvider.tsx
│   ├── QueryProvider.tsx
│   ├── ThemeProvider.tsx
│   └── NotificationProvider.tsx
│
├── styles/                       # Styles Tailwind CSS
│   ├── globals.css
│   ├── variables.css
│   └── components.css
│
└── middleware.ts                 # Next.js Middleware

prisma/
├── schema.prisma                 # Schéma Prisma (50 modèles)
├── migrations/                   # Migrations de base de données
└── seeds/                        # Données de seed

public/                           # Fichiers statiques
├── images/
├── icons/
└── fonts/

config/
├── environment.ts                # Configuration d'environnement
├── database.ts                   # Configuration BD
├── redis.ts                      # Configuration Redis
├── aws.ts                        # Configuration AWS
├── email.ts                      # Configuration Email
└── ai.ts                         # Configuration IA

tests/
├── unit/                         # Tests unitaires
├── integration/                  # Tests d'intégration
└── e2e/                          # Tests end-to-end

docs/
├── API.md                        # Documentation API
├── DATABASE.md                   # Documentation BD
├── ARCHITECTURE.md               # Documentation Architecture
└── DEPLOYMENT.md                 # Guide de déploiement
```

---

## Domaines métier et leurs responsabilités

### 1. Commercial (src/app/commercial)
**Responsabilités:**
- Gestion des opportunités
- Gestion des contacts
- Gestion des entreprises
- Pipeline de ventes (Kanban)
- Témoignages clients

**Endpoints API:**
- POST /api/commercial/opportunities
- GET /api/commercial/opportunities
- PUT /api/commercial/opportunities/:id
- DELETE /api/commercial/opportunities/:id
- POST /api/commercial/contacts
- GET /api/commercial/contacts
- POST /api/commercial/companies
- GET /api/commercial/companies

### 2. Projets (src/app/projects)
**Responsabilités:**
- Gestion des projets
- Phases de projet
- Tâches
- Jalons
- Documents
- Workflows d'approbation

**Endpoints API:**
- POST /api/projects
- GET /api/projects
- PUT /api/projects/:id
- DELETE /api/projects/:id
- POST /api/projects/:id/tasks
- GET /api/projects/:id/tasks
- POST /api/projects/:id/milestones
- GET /api/projects/:id/milestones

### 3. Équipe (src/app/team)
**Responsabilités:**
- Gestion des employés
- Suivi du temps
- Feuilles de temps
- Gestion des congés
- Charge de travail

**Endpoints API:**
- GET /api/team/employees
- POST /api/team/employees
- GET /api/team/time-entries
- POST /api/team/time-entries
- GET /api/team/timesheets
- POST /api/team/vacations
- GET /api/team/workload

### 4. Facturation (src/app/billing)
**Responsabilités:**
- Gestion des factures
- Gestion des devis
- Gestion des paiements
- Rappels de paiement
- Rapports financiers

**Endpoints API:**
- POST /api/billing/invoices
- GET /api/billing/invoices
- PUT /api/billing/invoices/:id
- POST /api/billing/quotes
- GET /api/billing/quotes
- POST /api/billing/payments
- GET /api/billing/payments

### 5. Communication (src/app/communication)
**Responsabilités:**
- Stratégies de communication
- Calendrier de contenu
- Campagnes
- Newsletters
- Actifs de marque

**Endpoints API:**
- POST /api/communication/campaigns
- GET /api/communication/campaigns
- POST /api/communication/newsletters
- GET /api/communication/content-calendar

### 6. Contrats (src/app/contracts)
**Responsabilités:**
- Gestion des contrats
- Modèles de contrats
- Signatures électroniques
- Renouvellements
- Amendements

**Endpoints API:**
- POST /api/contracts
- GET /api/contracts
- PUT /api/contracts/:id
- POST /api/contracts/:id/sign
- GET /api/contracts/templates

### 7. Administration (src/app/admin)
**Responsabilités:**
- Gestion des utilisateurs
- Contrôle d'accès
- Clés API
- Permissions
- Paramètres système

**Endpoints API:**
- GET /api/admin/users
- POST /api/admin/users
- PUT /api/admin/users/:id
- DELETE /api/admin/users/:id
- POST /api/admin/api-keys
- GET /api/admin/api-keys

### 8. Portails (src/app/portal)
**Responsabilités:**
- Portail client
- Portail employé
- Accès sécurisé
- Notifications
- Chat

**Endpoints API:**
- GET /api/portal/[token]/dashboard
- GET /api/portal/[token]/projects
- POST /api/portal/[token]/chat
- GET /api/portal/[token]/notifications

---

## Patterns et conventions

### 1. Nommage des fichiers
- Composants: PascalCase (Button.tsx)
- Hooks: camelCase avec préfixe "use" (useAuth.ts)
- Services: camelCase avec suffixe ".service.ts" (auth.service.ts)
- Types: PascalCase avec suffixe ".types.ts" (Auth.types.ts)
- Stores: camelCase avec suffixe "Store.ts" (authStore.ts)

### 2. Structure des composants
```typescript
// Imports
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/common/Button';

// Types
interface ComponentProps {
  title: string;
  onSubmit: (data: any) => void;
}

// Composant
export const MyComponent: React.FC<ComponentProps> = ({ title, onSubmit }) => {
  return <div>{title}</div>;
};

export default MyComponent;
```

### 3. Structure des API Routes
```typescript
// pages/api/[domain]/[resource].ts
import { NextRequest, NextResponse } from 'next/server';
import { authenticate } from '@/lib/auth/auth';
import { [Domain]Service } from '@/lib/services/[domain].service';

export async function GET(request: NextRequest) {
  try {
    const user = await authenticate(request);
    const data = await [Domain]Service.getAll();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await authenticate(request);
    const body = await request.json();
    const data = await [Domain]Service.create(body);
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
```

### 4. Structure des services
```typescript
// lib/services/[domain].service.ts
import { prisma } from '@/lib/database/prisma';
import { cache } from '@/lib/cache.service';

export class [Domain]Service {
  static async getAll() {
    const cacheKey = '[domain]:all';
    const cached = await cache.get(cacheKey);
    if (cached) return cached;

    const data = await prisma.[model].findMany();
    await cache.set(cacheKey, data, 3600);
    return data;
  }

  static async getById(id: string) {
    return prisma.[model].findUnique({ where: { id } });
  }

  static async create(data: any) {
    const result = await prisma.[model].create({ data });
    await cache.invalidate('[domain]:all');
    return result;
  }

  static async update(id: string, data: any) {
    const result = await prisma.[model].update({ where: { id }, data });
    await cache.invalidate('[domain]:all');
    return result;
  }

  static async delete(id: string) {
    const result = await prisma.[model].delete({ where: { id } });
    await cache.invalidate('[domain]:all');
    return result;
  }
}
```

### 5. Validations avec Zod
```typescript
// lib/utils/validation.ts
import { z } from 'zod';

export const createOpportunitySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  value: z.number().positive('Value must be positive'),
  stage: z.enum(['00 - Idées', '10 - Prospect', '20 - Proposition']),
  companyId: z.string().uuid(),
});

export type CreateOpportunityInput = z.infer<typeof createOpportunitySchema>;
```

---

## Flux de données

### 1. Authentification
```
Client (Login) → Google OAuth → JWT Token → Stored in HttpOnly Cookie
```

### 2. Requête API authentifiée
```
Client → API Route → Auth Middleware → Service → Prisma → PostgreSQL
```

### 3. Caching
```
Client → API Route → Cache Check (Redis) → Service → Prisma → PostgreSQL
```

### 4. Notifications
```
Service → Event → Queue (Redis) → Worker → Email/WebSocket → Client
```

---

## Sécurité

### 1. Authentification
- Google OAuth pour la connexion
- JWT tokens stockés en HttpOnly cookies
- Refresh tokens pour les sessions longues

### 2. Autorisation
- RBAC (Role-Based Access Control)
- Row-Level Security (RLS) dans PostgreSQL
- Vérification des permissions à chaque endpoint

### 3. Protection des données
- Chiffrement des données sensibles
- Validation des entrées avec Zod
- Protection CSRF
- Rate limiting

### 4. Audit
- Journalisation de toutes les actions
- Tracking des modifications
- Logs d'accès

---

## Performance

### 1. Frontend
- Code splitting avec Next.js
- Image optimization
- CSS-in-JS avec Tailwind
- Lazy loading des composants

### 2. Backend
- Caching avec Redis
- Indexes PostgreSQL
- Pagination des résultats
- Compression des réponses

### 3. Base de données
- Indexes stratégiques
- Partitioning pour les tables volumineuses
- Connection pooling
- Query optimization

---

## Déploiement

### Environnements
- Development (local)
- Staging (test)
- Production (live)

### Infrastructure
- Frontend: Vercel ou Railway
- Backend: Node.js sur Railway/AWS
- Base de données: PostgreSQL sur Railway/AWS RDS
- Cache: Redis sur Railway/AWS ElastiCache
- Stockage: AWS S3

### Variables d'environnement
```
DATABASE_URL=postgresql://...
REDIS_URL=redis://...
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
JWT_SECRET=...
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
OPENAI_API_KEY=...
```

---

## Prochaines étapes

1. Initialiser le projet Next.js
2. Configurer Prisma et PostgreSQL
3. Créer les modèles de données consolidés
4. Implémenter l'authentification
5. Créer les services par domaine
6. Développer les composants React
7. Implémenter les API routes
8. Ajouter les tests
9. Configurer le déploiement
10. Documenter l'API
