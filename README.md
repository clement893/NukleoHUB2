# NukleoHUB2 - Monorepo avec Turborepo

Ce projet est un monorepo géré par Turborepo, organisé en applications et packages partagés.

## Structure du Projet

```
nukleohub2/
├── apps/
│   └── web/              # Application Next.js principale
├── packages/
│   ├── ui/               # Librairie de composants UI partagés
│   ├── types/            # Types TypeScript partagés
│   ├── config/           # Configurations partagées (ESLint, TypeScript)
│   ├── db/               # Schéma Prisma et client de base de données
│   └── commercial/       # Module Commercial (composants, types, services)
├── package.json          # Configuration racine avec workspaces
└── turbo.json            # Configuration Turborepo
```

## Installation

```bash
# Installer toutes les dépendances
pnpm install
```

## Développement

```bash
# Démarrer toutes les applications en mode développement
pnpm dev

# Démarrer uniquement l'application web
pnpm --filter @nukleohub/web dev
```

## Build

```bash
# Construire tous les packages et applications
pnpm build

# Construire uniquement l'application web
pnpm --filter @nukleohub/web build
```

## Scripts Disponibles

- `pnpm dev` - Démarre toutes les apps en mode développement
- `pnpm build` - Construit tous les packages et apps
- `pnpm lint` - Lint tous les packages
- `pnpm type-check` - Vérifie les types TypeScript
- `pnpm clean` - Nettoie tous les dossiers de build

## Packages

### @nukleohub/ui
Librairie de composants UI réutilisables (26 composants).

### @nukleohub/types
Types TypeScript partagés entre les packages.

### @nukleohub/db
Schéma Prisma et client de base de données centralisé.

### @nukleohub/commercial
Module Commercial complet avec composants, types et services.

### @nukleohub/web
Application Next.js principale qui utilise tous les packages.

## Configuration de la Base de Données

1. Créer un fichier `.env` à la racine avec :
```env
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
```

2. Générer le client Prisma :
```bash
pnpm --filter @nukleohub/db db:generate
```

3. Créer les migrations :
```bash
pnpm --filter @nukleohub/db db:migrate
```

## Déploiement

L'application web (`apps/web`) peut être déployée sur Railway ou Vercel. Les autres packages sont des dépendances internes.

## Technologies

- **Turborepo** - Gestion du monorepo
- **Next.js 16** - Framework React
- **TypeScript** - Typage statique
- **Tailwind CSS** - Styling
- **Prisma** - ORM pour la base de données
- **pnpm** - Gestionnaire de packages
