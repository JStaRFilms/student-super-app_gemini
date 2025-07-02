# GitHub Copilot Instructions for Student Super-App

This is a Next.js 14 (App Router) project using the T3 Stack (TypeScript, Tailwind, tRPC, Prisma, Next-Auth).

- Adhere strictly to the file structure and conventions in `/docs/Coding_Guidelines.md`.
- All API logic is handled via tRPC. Define routers in `src/server/api/routers/` and the root router in `src/server/api/root.ts`.
- All database interactions MUST use the Prisma client, instantiated in `src/lib/db.ts`.
- Use absolute imports (`@/components/...`).
- Components from `shadcn/ui` are located in `src/components/ui`. Feature-specific components are in `src/components/features`.
- Authentication is handled by Next-Auth, configured in `src/server/auth.ts`.
