# Guide de Configuration du Monorepo Turborepo

## Structure Créée

```
nukleohub2/
├── apps/
│   └── web/                    # Application Next.js principale
│       ├── app/                 # Pages et routes API
│       ├── package.json
│       ├── tsconfig.json
│       ├── next.config.js
│       └── tailwind.config.ts
├── packages/
│   ├── ui/                     # Librairie de composants UI (26 composants)
│   │   ├── components/common/
│   │   ├── lib/utils/
│   │   └── package.json
│   ├── types/                  # Types TypeScript partagés
│   │   ├── commercial.ts
│   │   └── package.json
│   ├── config/                 # Configurations partagées
│   │   ├── eslint-preset.js
│   │   ├── tsconfig.json
│   │   └── package.json
│   ├── db/                     # Base de données Prisma
│   │   ├── prisma/schema.prisma
│   │   ├── index.ts
│   │   └── package.json
│   └── commercial/             # Module Commercial
│       ├── components/
│       ├── types/
│       ├── services/
│       └── package.json
├── package.json                 # Configuration racine avec workspaces
├── turbo.json                   # Configuration Turborepo
└── .npmrc                      # Configuration pnpm
```

## Installation

### 1. Installer les dépendances

```bash
pnpm install
```

### 2. Générer le client Prisma

```bash
pnpm --filter @nukleohub/db db:generate
```

### 3. Configurer la base de données

Créer un fichier `.env` à la racine :

```env
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
```

### 4. Créer les migrations

```bash
pnpm --filter @nukleohub/db db:migrate
```

## Scripts Disponibles

### Au niveau racine

- `pnpm dev` - Démarre toutes les apps en mode développement
- `pnpm build` - Construit tous les packages et apps
- `pnpm lint` - Lint tous les packages
- `pnpm type-check` - Vérifie les types TypeScript
- `pnpm clean` - Nettoie tous les dossiers de build

### Pour un package spécifique

```bash
# Développer uniquement l'app web
pnpm --filter @nukleohub/web dev

# Builder uniquement le package UI
pnpm --filter @nukleohub/ui build

# Linter uniquement le module commercial
pnpm --filter @nukleohub/commercial lint
```

## Imports dans le Code

### Dans `apps/web`

```typescript
// Composants UI
import { Button, Card, Input } from '@nukleohub/ui';

// Types
import type { Opportunity } from '@nukleohub/types';

// Module Commercial
import { KanbanBoard, OpportunityForm } from '@nukleohub/commercial';

// Base de données
import { prisma } from '@nukleohub/db';
```

### Dans `packages/commercial`

```typescript
// Composants UI partagés
import { Button, Card } from '@nukleohub/ui';

// Types partagés
import type { Opportunity } from '@nukleohub/types';

// Types locaux
import type { CommercialStats } from './types';
```

### Dans `packages/ui`

```typescript
// Utilitaires locaux
import { cn } from '../lib/utils/cn';
```

## Prochaines Étapes

1. **Vérifier les imports** : S'assurer que tous les imports utilisent les nouveaux packages
2. **Tester le build** : `pnpm build` pour vérifier que tout compile
3. **Tester le dev** : `pnpm dev` pour vérifier que l'app démarre
4. **Configurer Prisma** : Mettre en place la base de données
5. **Déployer** : L'app web peut être déployée sur Railway/Vercel

## Notes Importantes

- Les packages utilisent `workspace:*` pour référencer les autres packages du monorepo
- Turborepo gère automatiquement les dépendances entre packages
- Seule l'app `apps/web` est déployée, les packages sont des dépendances internes
- Les configurations TypeScript sont partagées via `@nukleohub/config`

