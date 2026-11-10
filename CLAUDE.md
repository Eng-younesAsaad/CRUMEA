# CRUMÉA Luxury Artisan Bakery - CLAUDE Guide

## Architecture Summary
- **Framework**: Next.js 15 (App Router), React 19, TypeScript (Strict Mode).
- **Styling**: Tailwind CSS with `@theme` tokens in `app/globals.css` (the ONLY `.css` file).
- **Directory Layout**: Flat Root Architecture (No `src/` folder) matching class specifications.
- **Component Primitives**: `shadcn/ui` based on Radix UI and `class-variance-authority`.

## Strict Code Standards
- **Zero `any`**: Strictly prohibited. Use explicit interfaces or `unknown` with runtime type guards.
- **Zero `as`**: Never cast types. Narrow with runtime predicates (`isProduct`, `isCartItem`, etc.).
- **Zero `!`**: Never use non-null assertions. Use defensive checks and default fallbacks.
- **Paths**: Alias `"@/*": ["./*"]` in `tsconfig.json`.

## Key Commands
- `npm run dev`: Start Next.js development server.
- `npm run typecheck`: Run TypeScript compiler check (`tsc --noEmit`).
- `npm run build`: Production build.
- `npm run lint`: Run ESLint.

