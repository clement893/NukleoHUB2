# Nukleo HUB 2.0

Modern ERP Platform built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Tech Stack

- **Frontend:** Next.js 15, React 19, TypeScript, Tailwind CSS 4
- **Backend:** Node.js, Next.js API Routes
- **Database:** PostgreSQL, Prisma ORM
- **Cache:** Redis
- **Authentication:** Google OAuth, JWT
- **Storage:** AWS S3
- **AI:** OpenAI API
- **Deployment:** Railway

## 📁 Project Structure

```
nukleohub2/
├── app/                    # Next.js App Router
├── components/             # React Components
├── hooks/                  # Custom React Hooks
├── lib/                    # Utilities & Services
├── types/                  # TypeScript Types
├── stores/                 # Zustand Stores
├── providers/              # React Context Providers
├── styles/                 # Tailwind CSS Styles
├── config/                 # Configuration Files
├── prisma/                 # Database Schema & Migrations
├── tests/                  # Unit, Integration & E2E Tests
└── docs/                   # Documentation
```

## 📚 Documentation

- [Database Strategy](docs/DATABASE_STRATEGY.md) - Database architecture and recommendations
- [Project Architecture](docs/PROJECT_ARCHITECTURE.md) - Complete project architecture
- [Tailwind Refactor Guide](docs/TAILWIND_REFACTOR_GUIDE.md) - Design system setup
- [Components Refactor Guide](docs/COMPONENTS_REFACTOR_GUIDE.md) - Reusable components
- [Implementation Guide](docs/IMPLEMENTATION_GUIDE.md) - Step-by-step implementation

## 🛠️ Setup

### Prerequisites

- Node.js 18+
- pnpm 8+
- PostgreSQL 14+
- Redis 7+

### Installation

```bash
# Install dependencies
pnpm install

# Setup environment variables
cp .env.example .env.local

# Run database migrations
pnpm prisma migrate dev

# Start development server
pnpm dev
```

## 🌐 Environment Variables

```env
# Database
DATABASE_URL=postgresql://...
REDIS_URL=redis://...

# Authentication
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
JWT_SECRET=...

# AWS S3
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_REGION=...
AWS_BUCKET_NAME=...

# OpenAI
OPENAI_API_KEY=...

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 🚢 Deployment

This project is configured for deployment on Railway.

### Deploy to Railway

1. Connect your GitHub repository to Railway
2. Add environment variables in Railway dashboard
3. Deploy automatically on push to `main` branch

## 📦 Modules

### 1. Commercial
- Opportunities management
- Contacts & Companies
- Sales pipeline (Kanban)
- Testimonials

### 2. Projects
- Project management
- Tasks & Milestones
- Phases & Workflows
- Document management
- Approval workflows

### 3. Team
- Employee management
- Time tracking
- Timesheets
- Vacation management
- Workload tracking

### 4. Billing
- Invoices & Quotes
- Payments
- Payment reminders
- Financial reports

### 5. Communication
- Communication strategies
- Content calendar
- Campaigns & Newsletters
- Brand assets

### 6. Contracts
- Contract management
- Templates
- Electronic signatures
- Renewals & Amendments

### 7. Admin
- User management
- Access control
- API keys
- System settings

### 8. Portals
- Client portal
- Employee portal
- Secure access
- Notifications

## 🧪 Testing

```bash
# Run unit tests
pnpm test

# Run integration tests
pnpm test:integration

# Run E2E tests
pnpm test:e2e

# Run all tests with coverage
pnpm test:coverage
```

## 📝 Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm type-check   # Run TypeScript compiler
pnpm format       # Format code with Prettier
```

## 🤝 Contributing

1. Create a feature branch from `staging`
2. Make your changes
3. Run tests and linting
4. Submit a pull request to `staging`

## 📄 License

Private - All Rights Reserved

## 👥 Team

Developed by Nukleo Team
