# Guide d'Implémentation : Refactorisation Complète

## 1. Ordre de Travail Recommandé

1.  **Setup du Design System (Tailwind)** - `tailwind.config.js` et `globals.css`
2.  **Création des Composants de Base** - Button, Card, Inputs, etc.
3.  **Refactorisation des Pages** - Remplacer le markup par les nouveaux composants
4.  **Tests et Validation** - S'assurer que tout fonctionne comme prévu

---

## 2. Étape 1 : Setup du Design System

- **Action :** Mettre en place la configuration centrale de Tailwind CSS.
- **Fichiers à modifier :**
    - `tailwind.config.js`
    - `styles/globals.css`
    - `styles/components/*.css` (à créer)
- **Instructions :** Suivre le `TAILWIND_REFACTOR_GUIDE.md` pour définir la palette de couleurs, la typographie, l'espacement, etc.

---

## 3. Étape 2 : Création des Composants Réutilisables

- **Action :** Créer chaque composant réutilisable dans le dossier `components/`.
- **Instructions :** Suivre le `COMPONENTS_REFACTOR_GUIDE.md` pour l'implémentation de chaque composant.
- **Exemple de workflow pour le composant `Button`:**
    1.  Créer `components/common/Button.tsx`.
    2.  Définir les `variants` (primary, secondary, etc.) avec `cva`.
    3.  Utiliser les tokens Tailwind du design system (`bg-primary`, `text-primary-foreground`).
    4.  Ajouter les types TypeScript et les props (ex: `isLoading`, `disabled`).
    5.  Assurer l'accessibilité (attributs ARIA).

---

## 4. Étape 3 : Refactorisation des Pages

- **Action :** Remplacer le markup existant dans les pages par les nouveaux composants.
- **Exemple de refactorisation :**

**Avant :**
```tsx
<div style={{ backgroundColor: '#FFF', padding: '16px', borderRadius: '8px' }}>
  <h2 style={{ fontSize: '20px', fontWeight: 'bold' }}>Titre de la carte</h2>
  <p>Contenu de la carte...</p>
  <button style={{ backgroundColor: '#007BFF', color: 'white' }}>Cliquez ici</button>
</div>
```

**Après :**
```tsx
import { Card, CardTitle, CardContent } from '@/components/common/Card';
import { Button } from '@/components/common/Button';

<Card>
  <CardTitle>Titre de la carte</CardTitle>
  <CardContent>
    <p>Contenu de la carte...</p>
  </CardContent>
  <Button variant="primary">Cliquez ici</Button>
</Card>
```

---

## 5. Étape 4 : Tests et Validation

- **Action :** S'assurer que la refactorisation n'a pas introduit de régressions.
- **Tests à effectuer :**
    - **Tests Visuels :** Vérifier que l'UI est cohérente sur toutes les pages.
    - **Tests d'Interaction :** S'assurer que les composants (boutons, formulaires, etc.) fonctionnent correctement.
    - **Tests d'Accessibilité :** Utiliser des outils pour vérifier que les attributs ARIA sont corrects.
    - **Tests de Performance :** Mesurer l'impact sur le temps de chargement des pages.

Ce guide fournit une feuille de route claire pour une refactorisation réussie, garantissant une base de code propre, maintenable et cohérente.
