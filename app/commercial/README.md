# Module Commercial

Le module Commercial permet de gérer l'ensemble du cycle de vente, de la prospection à la signature du contrat.

## Fonctionnalités

### Pipeline Kanban
- Vue d'ensemble des opportunités par étape (Nouveau, Qualification, Proposition, Négociation, Gagné, Perdu)
- Drag & drop pour changer l'étape d'une opportunité
- Affichage du montant total par colonne

### Gestion des Opportunités
- Création, modification et suppression d'opportunités
- Liste tabulaire avec filtres et recherche
- Page de détail avec toutes les informations

### Gestion des Contacts
- Création, modification et suppression de contacts
- Association avec une entreprise
- Liste avec recherche

### Gestion des Entreprises
- Création, modification et suppression d'entreprises
- Affichage des contacts et opportunités associés
- Liste avec recherche

### Tableau de Bord
- KPIs clés (taux de conversion, CA prévisionnel, etc.)
- Répartition des opportunités par étape
- Graphiques et statistiques

## Structure

### Modèles de Données

Les modèles Prisma sont définis dans `prisma/schema.prisma` :
- `Opportunity` : Opportunités commerciales
- `Contact` : Contacts (clients, prospects)
- `Company` : Entreprises clientes

### API Routes

Toutes les routes API sont dans `app/api/commercial/` :
- `/api/commercial/opportunities` : CRUD des opportunités
- `/api/commercial/contacts` : CRUD des contacts
- `/api/commercial/companies` : CRUD des entreprises

### Pages

- `/commercial` : Page principale avec Kanban et Dashboard
- `/commercial/opportunities` : Liste des opportunités
- `/commercial/opportunities/[id]` : Détail d'une opportunité
- `/commercial/opportunities/new` : Création d'une opportunité
- `/commercial/contacts` : Liste des contacts
- `/commercial/contacts/[id]` : Détail d'un contact
- `/commercial/contacts/new` : Création d'un contact
- `/commercial/companies` : Liste des entreprises
- `/commercial/companies/[id]` : Détail d'une entreprise
- `/commercial/companies/new` : Création d'une entreprise

### Composants

Tous les composants spécifiques sont dans `components/commercial/` :
- `KanbanBoard` : Tableau Kanban avec drag & drop
- `OpportunityCard` : Carte d'opportunité pour le Kanban
- `OpportunityForm` : Formulaire de création/modification d'opportunité
- `ContactForm` : Formulaire de création/modification de contact
- `CompanyForm` : Formulaire de création/modification d'entreprise
- `CommercialDashboard` : Tableau de bord avec KPIs

## Installation

### 1. Installer Prisma (si pas déjà fait)

```bash
pnpm add -D prisma
pnpm add @prisma/client
```

### 2. Configurer la base de données

Ajoutez `DATABASE_URL` dans votre fichier `.env` :

```env
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
```

### 3. Générer le client Prisma

```bash
npx prisma generate
```

### 4. Créer les migrations

```bash
npx prisma migrate dev --name init_commercial
```

### 5. Activer Prisma dans les API routes

Décommentez les lignes Prisma dans les fichiers API routes et supprimez les données mockées.

## Utilisation

### Créer une opportunité

1. Aller sur `/commercial/opportunities/new`
2. Remplir le formulaire
3. Sélectionner un contact et une entreprise (créer d'abord si nécessaire)
4. Sauvegarder

### Gérer le pipeline

1. Aller sur `/commercial`
2. Utiliser l'onglet "Pipeline Kanban"
3. Glisser-déposer les opportunités entre les colonnes pour changer leur étape

### Consulter les statistiques

1. Aller sur `/commercial`
2. Utiliser l'onglet "Tableau de Bord"
3. Consulter les KPIs et graphiques

## Notes

- Les données sont actuellement stockées en mémoire (mockées) pour le développement
- Pour la production, décommentez les lignes Prisma dans les API routes
- Les utilisateurs sont actuellement mockés - intégrez avec votre système d'authentification

