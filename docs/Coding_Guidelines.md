# Coding Guidelines & Project Standards

This document outlines the architecture, standards, and best practices for the Student Super-App project. Adherence to these guidelines is mandatory to ensure code quality, maintainability, and scalability.

### 1. Architecture

The application follows a modern, full-stack TypeScript architecture built around Next.js.

*   **Framework:** Next.js 14 (App Router) is used for both frontend rendering (React Server Components) and backend API routing.
*   **API Layer:** tRPC is used for end-to-end typesafe API communication between the client and server. This eliminates the need for manual API type definitions and ensures backend and frontend are always in sync.
*   **Database Interaction:** Prisma ORM is the sole interface for database communication. It provides type-safety at the database level and simplifies queries. All database logic must go through Prisma.
*   **Deployment:** The application is designed for serverless deployment on Vercel. This means no long-running server processes; API endpoints are Vercel Functions.
*   **Data Model:** The database schema is designed to be multi-tenant from day one, using `Faculty` and `Department` models to segregate data, even though the initial launch focuses on a single faculty.

### 2. Technology Stack

*   **Framework:** Next.js 14+
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS with `shadcn/ui` for component primitives.
*   **API:** tRPC
*   **Database ORM:** Prisma
*   **Database:** PostgreSQL (via Supabase or Vercel Postgres for production, SQLite for local dev)
*   **Authentication:** Next-Auth (v5 / Auth.js)
*   **File Storage:** Supabase Storage
*   **AI Integration:** LangChain.js / Vercel AI SDK, OpenAI/Cohere APIs
*   **Deployment:** Vercel

### 3. Project Directory Structure

The project will adhere to the following canonical structure:

```
/
├── .github/                      # GitHub specific files (e.g., Copilot instructions, workflows)
│   └── copilot-instructions.md
├── docs/                         # All project documentation
│   ├── Project_Requirements.md
│   └── Coding_Guidelines.md
├── prisma/                       # Prisma schema, migrations, and seed scripts
│   └── schema.prisma
├── public/                       # Static assets (images, fonts, etc.)
├── src/
│   ├── app/                      # Next.js App Router: pages, layouts, route handlers
│   │   ├── (auth)/               # Route group for auth pages
│   │   │   ├── login/page.tsx
│   │   │   └── signup/page.tsx
│   │   ├── api/trpc/[trpc]/route.ts # tRPC entry point
│   │   └── ... (other routes)
│   ├── components/               # Reusable React components
│   │   ├── ui/                   # Core UI elements (Button, Card, Input) from shadcn/ui
│   │   └── features/             # Components specific to a feature (e.g., AnnouncementCard)
│   ├── lib/                      # Helper functions, utilities, client initializations
│   │   ├── db.ts                 # Prisma client instance
│   │   ├── trpc.ts               # tRPC client setup
│   │   └── utils.ts              # General utility functions
│   ├── server/                   # Backend tRPC logic
│   │   ├── api/
│   │   │   ├── routers/          # tRPC routers for different features (e.g., announcement.ts)
│   │   │   └── root.ts           # The main AppRouter merging all sub-routers
│   │   └── auth.ts               # Next-Auth configuration
│   └── types/                    # Global TypeScript type definitions
├── .env.example                  # Example environment variables
├── package.json
└── tsconfig.json
```

### 4. Coding Style & Conventions

*   **Formatting:** Use Prettier for automatic code formatting. An ESLint configuration will be set up to enforce code quality.
*   **Naming Conventions:**
    *   Components: `PascalCase` (e.g., `AnnouncementCard.tsx`)
    *   Variables & Functions: `camelCase` (e.g., `getUserProfile`)
    *   Types & Interfaces: `PascalCase` (e.g., `type UserProfile = { ... }`)
*   **Imports:** Use absolute paths (`@/components/Button`) over relative paths (`../../../components/Button`) for better readability and refactoring. This is configured in `tsconfig.json`.
*   **Components:** Favor composition. Build small, single-purpose components and compose them into larger features. Use `shadcn/ui` as a base for accessible, unstyled primitives.
*   **State Management:** For simple client-side state, use React hooks (`useState`, `useContext`). For complex global state, consider Zustand if needed. Avoid prop-drilling.
*   **Comments:** Write comments for complex logic, business rules, or anything non-obvious. Explain *why*, not *what*.
