# Guide de Migration vers Turborepo

Ce document explique comment migrer les imports existants vers la nouvelle structure monorepo.

## Changements d'Imports

### Avant (Structure monolithique)
```typescript
import { Button } from '@/components/common';
import { Opportunity } from '@/types/commercial';
import { cn } from '@/lib/utils/cn';
```

### Après (Structure monorepo)
```typescript
import { Button } from '@nukleohub/ui';
import { Opportunity } from '@nukleohub/types';
import { cn } from '@nukleohub/ui/lib/utils/cn';
```

## Packages Disponibles

### @nukleohub/ui
Tous les composants UI partagés (26 composants).

```typescript
import { Button, Card, Input, Modal, ... } from '@nukleohub/ui';
```

### @nukleohub/types
Types TypeScript partagés.

```typescript
import { Opportunity, Contact, Company } from '@nukleohub/types';
```

### @nukleohub/db
Client Prisma et schéma de base de données.

```typescript
import { prisma } from '@nukleohub/db';
```

### @nukleohub/commercial
Module Commercial complet.

```typescript
import { KanbanBoard, OpportunityForm } from '@nukleohub/commercial';
import type { CommercialStats } from '@nukleohub/commercial/types';
```

## Mise à Jour des Fichiers

### 1. Fichiers dans `apps/web/app/`

Remplacer :
- `@/components/common` → `@nukleohub/ui`
- `@/components/commercial` → `@nukleohub/commercial/components`
- `@/types/commercial` → `@nukleohub/types` ou `@nukleohub/commercial/types`
- `@/lib/utils/cn` → `@nukleohub/ui/lib/utils/cn`
- `@/lib/db` → `@nukleohub/db`

### 2. Fichiers dans `packages/commercial/`

Remplacer :
- `@/components/common` → `@nukleohub/ui`
- `@/lib/utils/cn` → `@nukleohub/ui/lib/utils/cn`
- `@/types/commercial` → `./types` (import relatif)

### 3. Fichiers dans `packages/ui/`

Remplacer :
- `@/lib/utils/cn` → `../lib/utils/cn` (import relatif)

## Script de Migration Automatique

Vous pouvez utiliser un script de recherche/remplacement pour automatiser la migration :

```bash
# Dans apps/web/app/
find . -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i 's/@\/components\/common/@nukleohub\/ui/g'
find . -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i 's/@\/components\/commercial/@nukleohub\/commercial\/components/g'
find . -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i 's/@\/types\/commercial/@nukleohub\/types/g'
find . -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i 's/@\/lib\/utils\/cn/@nukleohub\/ui\/lib\/utils\/cn/g'
find . -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i 's/@\/lib\/db/@nukleohub\/db/g'
```

## Vérification

Après la migration, vérifiez que :
1. Tous les imports sont corrects
2. Le build fonctionne : `pnpm build`
3. Le dev fonctionne : `pnpm dev`
4. Les types sont corrects : `pnpm type-check`

