# Guide de Refactorisation : Design System avec Tailwind CSS

## 1. Objectif

Refactoriser le projet pour utiliser une configuration Tailwind CSS centralisée qui sert de source unique de vérité (Single Source of Truth) pour le design system. Cela garantira la cohérence visuelle, simplifiera la maintenance et réduira la duplication de code.

---

## 2. Configuration du Fichier Principal (`tailwind.config.js` ou `globals.css`)

L'objectif est de définir toutes les valeurs du design system dans un emplacement central.

### 2.1. Palette de Couleurs

Définir une palette de couleurs sémantique. Toutes les couleurs codées en dur (`#RRGGBB`, `rgb(...)`) dans le code base devront être remplacées par ces variables.

**Exemple (`tailwind.config.js` - pour v3):**
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        surface: 'hsl(var(--surface))',
        success: 'hsl(var(--success))',
        warning: 'hsl(var(--warning))',
        error: 'hsl(var(--error))',
        // ... autres couleurs sémantiques
      },
    },
  },
};
```

**Exemple (`globals.css` - pour v4):**
```css
/* styles/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;

    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;

    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;

    --success: 142.1 76.2% 36.3%;
    --warning: 47.9 95.8% 53.1%;
    --error: 0 84.2% 60.2%;

    /* ... autres variables de couleur */
  }
}
```

### 2.2. Échelle d'Espacement (Spacing)

Éviter les nombres magiques pour les marges, paddings, largeurs et hauteurs. Utiliser l'échelle d'espacement de Tailwind. Si nécessaire, étendre l'échelle pour des valeurs spécifiques.

**Exemple (`tailwind.config.js`):**
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      spacing: {
        '128': '32rem',
        '144': '36rem',
      }
    }
  }
}
```

### 2.3. Typographie

Définir les tailles de police, les hauteurs de ligne et les graisses de manière centralisée.

**Exemple (`tailwind.config.js`):**
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontSize: {
        'xs': '.75rem',    // 12px
        'sm': '.875rem',   // 14px
        'base': '1rem',     // 16px
        'lg': '1.125rem',  // 18px
        'xl': '1.25rem',   // 20px
        '2xl': '1.5rem',    // 24px
        '3xl': '1.875rem',  // 30px
        '4xl': '2.25rem',   // 36px
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        serif: ['var(--font-georgia)', 'serif'],
      },
    },
  },
};
```

### 2.4. Rayon de Bordure (Border Radius)

Standardiser les valeurs de `border-radius`.

**Exemple (`tailwind.config.js`):**
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      borderRadius: {
        'none': '0',
        'sm': '0.125rem',
        'DEFAULT': '0.25rem',
        'md': '0.375rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
        'full': '9999px',
      }
    }
  }
}
```

### 2.5. Ombres (Shadows)

Définir des préréglages pour les ombres portées.

**Exemple (`tailwind.config.js`):**
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      boxShadow: {
        'sm': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'DEFAULT': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        'md': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        'lg': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        'xl': '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        'inner': 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
      },
    },
  },
};
```

---

## 3. Composants CSS Réutilisables

Utiliser la directive `@apply` pour créer des classes de composants réutilisables. Organiser ces classes dans des fichiers séparés pour une meilleure maintenabilité.

**Structure de fichiers recommandée:**
```
styles/
├── globals.css         # Fichier principal
├── components/
│   ├── buttons.css
│   ├── cards.css
│   ├── forms.css
│   └── header.css
```

**Exemple (`styles/globals.css`):**
```css
/* styles/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@import "./components/buttons.css";
@import "./components/cards.css";
@import "./components/forms.css";
```

**Exemple (`styles/components/cards.css`):**
```css
/* styles/components/cards.css */
@layer components {
  .card {
    @apply bg-surface rounded-lg shadow-md p-6 border border-gray-200;
  }

  .card-title {
    @apply text-xl font-bold text-foreground mb-4;
  }

  .card-content {
    @apply text-gray-600;
  }
}
```

---

## 4. Plan d'Action pour la Refactorisation

1.  **Mettre à jour `tailwind.config.js`** : Intégrer toutes les définitions du design system (couleurs, espacement, typographie, etc.).
2.  **Créer les fichiers de composants CSS** : Définir les classes réutilisables (`.card`, `.btn-primary`, etc.) dans des fichiers séparés.
3.  **Scanner le Codebase** : Identifier toutes les valeurs codées en dur (couleurs, `px`, `rem`, etc.) et les styles en ligne (`style="..."`).
4.  **Remplacer les valeurs codées en dur** : Remplacer systématiquement les valeurs par les nouvelles classes et tokens Tailwind (ex: `bg-primary`, `p-4`, `rounded-lg`).
5.  **Supprimer les styles en ligne** : Migrer tous les styles en ligne vers des classes Tailwind.
6.  **Réduire la duplication de classes** : Utiliser `@apply` ou des composants React pour les motifs de classes répétitifs.
7.  **Vérification de la cohérence** : S'assurer que l'ensemble de l'application respecte le nouveau design system de manière cohérente.

Ce processus garantira une base de code plus propre, plus maintenable et visuellement cohérente.
