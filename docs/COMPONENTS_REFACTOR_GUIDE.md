# Guide de Refactorisation : Composants Réutilisables

## 1. Objectif

Créer une librairie de composants React réutilisables et typés qui suivent le design system Tailwind CSS. Chaque composant doit être accessible (ARIA), flexible (avec des variants) et exempt de duplication de code.

---

## 2. Structure des Composants

Tous les composants doivent être organisés dans le dossier `src/components/` selon leur catégorie :

```
src/components/
├── common/                 # Composants génériques
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Input.tsx
│   ├── Select.tsx
│   ├── Textarea.tsx
│   ├── Checkbox.tsx
│   ├── Radio.tsx
│   ├── Modal.tsx
│   ├── Alert.tsx
│   ├── Loader.tsx
│   ├── Skeleton.tsx
│   ├── Badge.tsx
│   ├── Tooltip.tsx
│   └── Pagination.tsx
│
├── layout/                 # Composants de layout
│   ├── Sidebar.tsx
│   ├── Header.tsx
│   ├── Navigation.tsx
│   ├── Footer.tsx
│   └── Container.tsx
│
├── forms/                  # Composants de formulaires
│   ├── FormField.tsx
│   ├── FormLabel.tsx
│   ├── FormError.tsx
│   └── FormGroup.tsx
│
├── commercial/             # Composants métier
├── projects/
├── team/
├── billing/
├── communication/
└── contracts/
```

---

## 3. Composants Essentiels

### 3.1 Button Component

Le composant `Button` doit supporter plusieurs variants et états.

**Spécifications:**
- Variants: `primary`, `secondary`, `outline`, `ghost`, `danger`
- États: `default`, `hover`, `active`, `disabled`, `loading`
- Tailles: `sm`, `md`, `lg`
- Icônes: Support pour icônes avant/après le texte
- Accessibilité: Attributs ARIA, focus visible

**Exemple d'utilisation:**
```tsx
<Button variant="primary" size="lg" isLoading={false}>
  Click me
</Button>

<Button variant="outline" disabled>
  Disabled Button
</Button>

<Button variant="danger" icon={<TrashIcon />}>
  Delete
</Button>
```

**Implémentation TypeScript:**
```tsx
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils/cn';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/90',
        outline: 'border border-gray-300 hover:bg-gray-50',
        ghost: 'hover:bg-gray-100',
        danger: 'bg-error text-white hover:bg-error/90',
      },
      size: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4 text-base',
        lg: 'h-12 px-6 text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      isLoading,
      icon,
      iconPosition = 'left',
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        disabled={disabled || isLoading}
        ref={ref}
        {...props}
      >
        {isLoading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
        {icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>}
        {children}
        {icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
```

### 3.2 Card Component

Le composant `Card` est un conteneur de base pour regrouper du contenu.

**Spécifications:**
- Padding, border, shadow définis via le design system
- Support pour header, content, footer
- Variantes: `default`, `elevated`, `outlined`
- Responsive

**Exemple d'utilisation:**
```tsx
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Contenu principal */}
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

### 3.3 Input Components

Les composants d'entrée doivent supporter plusieurs types et états.

**Spécifications:**
- Types: `text`, `email`, `password`, `number`, `date`, `tel`, `url`
- États: `default`, `focus`, `error`, `disabled`, `readonly`
- Support pour placeholder, label, error message, helper text
- Accessibilité: Labels associés, attributs ARIA

**Exemple d'utilisation:**
```tsx
<Input
  type="email"
  placeholder="Enter your email"
  label="Email Address"
  error="Invalid email format"
  required
/>

<Textarea
  placeholder="Enter your message"
  label="Message"
  rows={5}
/>

<Checkbox label="I agree to the terms" />

<Radio
  name="option"
  options={[
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
  ]}
/>
```

### 3.4 Select Component

Le composant `Select` pour les listes déroulantes.

**Spécifications:**
- Support pour options simples et groupées
- Recherche/filtrage optionnel
- Multi-select optionnel
- Accessibilité: ARIA attributes, keyboard navigation

**Exemple d'utilisation:**
```tsx
<Select
  label="Choose an option"
  options={[
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
  ]}
  onChange={(value) => console.log(value)}
/>
```

### 3.5 Modal Component

Le composant `Modal` pour les dialogues.

**Spécifications:**
- Overlay avec fermeture au clic
- Boutons d'action (OK, Cancel)
- Support pour header, body, footer
- Accessibilité: Focus trap, ARIA attributes

**Exemple d'utilisation:**
```tsx
<Modal isOpen={isOpen} onClose={onClose} title="Confirm Action">
  <p>Are you sure you want to proceed?</p>
  <ModalFooter>
    <Button variant="outline" onClick={onClose}>
      Cancel
    </Button>
    <Button variant="primary" onClick={onConfirm}>
      Confirm
    </Button>
  </ModalFooter>
</Modal>
```

### 3.6 Alert Component

Le composant `Alert` pour les messages.

**Spécifications:**
- Variantes: `success`, `warning`, `error`, `info`
- Support pour titre et description
- Icônes automatiques selon le type
- Fermeture optionnelle

**Exemple d'utilisation:**
```tsx
<Alert variant="success" title="Success">
  Your action was completed successfully.
</Alert>

<Alert variant="error" title="Error" onClose={onClose}>
  Something went wrong. Please try again.
</Alert>
```

### 3.7 Loader / Spinner Component

Le composant `Loader` pour les états de chargement.

**Spécifications:**
- Tailles: `sm`, `md`, `lg`
- Support pour texte de chargement
- Animations fluides

**Exemple d'utilisation:**
```tsx
<Loader size="md" />
<Loader size="lg" text="Loading..." />
```

### 3.8 Skeleton Component

Le composant `Skeleton` pour les états de chargement (placeholders).

**Spécifications:**
- Variantes: `text`, `circle`, `rect`
- Tailles personnalisables
- Animation de pulsation

**Exemple d'utilisation:**
```tsx
<Skeleton variant="text" width="100%" height="20px" />
<Skeleton variant="circle" width="40px" height="40px" />
<Skeleton variant="rect" width="100%" height="200px" />
```

### 3.9 Badge Component

Le composant `Badge` pour les étiquettes.

**Spécifications:**
- Variantes: `primary`, `secondary`, `success`, `warning`, `error`
- Tailles: `sm`, `md`, `lg`
- Support pour icônes

**Exemple d'utilisation:**
```tsx
<Badge variant="primary">New</Badge>
<Badge variant="success" icon={<CheckIcon />}>
  Approved
</Badge>
```

### 3.10 Pagination Component

Le composant `Pagination` pour la navigation entre pages.

**Spécifications:**
- Support pour page actuelle, total de pages
- Boutons précédent/suivant
- Numéros de page cliquables
- États désactivés pour première/dernière page

**Exemple d'utilisation:**
```tsx
<Pagination
  currentPage={1}
  totalPages={10}
  onPageChange={(page) => console.log(page)}
/>
```

---

## 4. Composants de Layout

### 4.1 Sidebar Component

Navigation latérale avec support pour menus imbriqués.

### 4.2 Header Component

En-tête de page avec logo, navigation, actions utilisateur.

### 4.3 Navigation Component

Barre de navigation principale ou secondaire.

### 4.4 Footer Component

Pied de page avec liens, copyright, etc.

### 4.5 Container Component

Conteneur avec padding et max-width pour centrer le contenu.

---

## 5. Composants de Formulaires

### 5.1 FormField Component

Wrapper pour les champs de formulaire avec label, input, error message.

### 5.2 FormLabel Component

Label associé à un champ de formulaire.

### 5.3 FormError Component

Message d'erreur pour un champ.

### 5.4 FormGroup Component

Groupement de champs de formulaire.

---

## 6. Bonnes Pratiques

1. **Utiliser `cva` (class-variance-authority)** pour gérer les variants de classes.
2. **Utiliser `cn()` (classnames)** pour fusionner les classes Tailwind.
3. **Typer les props** avec TypeScript et `React.FC<Props>`.
4. **Utiliser `React.forwardRef`** pour les composants qui nécessitent une ref.
5. **Ajouter des attributs ARIA** pour l'accessibilité.
6. **Tester les composants** avec Vitest et React Testing Library.
7. **Documenter les composants** avec des exemples d'utilisation.

---

## 7. Exemple Complet : Composant Input

```tsx
// src/components/common/Input.tsx
import React from 'react';
import { cn } from '@/lib/utils/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, fullWidth = true, className, ...props }, ref) => {
    return (
      <div className={cn(fullWidth && 'w-full')}>
        {label && (
          <label className="block text-sm font-medium text-foreground mb-2">
            {label}
            {props.required && <span className="text-error">*</span>}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            'w-full px-3 py-2 border border-gray-300 rounded-lg',
            'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
            'disabled:bg-gray-100 disabled:cursor-not-allowed',
            error && 'border-error focus:ring-error',
            className
          )}
          aria-invalid={!!error}
          aria-describedby={error ? `${props.id}-error` : undefined}
          {...props}
        />
        {error && (
          <p id={`${props.id}-error`} className="text-sm text-error mt-1">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p className="text-sm text-gray-500 mt-1">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
```

---

## 8. Checklist de Création de Composant

Pour chaque nouveau composant, vérifier :

- [ ] Composant créé dans le bon dossier
- [ ] Types TypeScript définis
- [ ] Variants définis avec `cva`
- [ ] Props acceptées et documentées
- [ ] Attributs ARIA ajoutés
- [ ] Styles Tailwind utilisés (pas de CSS personnalisé)
- [ ] Tokens du design system utilisés
- [ ] Exemple d'utilisation documenté
- [ ] Tests unitaires écrits
- [ ] Composant exporté depuis `index.ts`

---

## 9. Intégration dans les Pages

Une fois les composants créés, les pages doivent être refactorisées pour les utiliser :

**Avant:**
```tsx
<div className="bg-white p-6 rounded-lg shadow-md">
  <h2 className="text-2xl font-bold mb-4">Title</h2>
  <p className="text-gray-600">Content</p>
  <button className="bg-blue-500 text-white px-4 py-2 rounded">Action</button>
</div>
```

**Après:**
```tsx
import { Card, CardTitle, CardContent } from '@/components/common/Card';
import { Button } from '@/components/common/Button';

<Card>
  <CardTitle>Title</CardTitle>
  <CardContent>
    <p>Content</p>
  </CardContent>
  <Button variant="primary">Action</Button>
</Card>
```

Cette refactorisation garantit une base de code plus propre, maintenable et cohérente.
