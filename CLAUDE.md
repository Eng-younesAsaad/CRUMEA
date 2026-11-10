# CRUMÉA Luxury Artisan Bakery - CLAUDE Guide

## Architecture Summary

- **Framework**: Next.js 15 (App Router), React 19, TypeScript (Strict Mode).
- **Styling**: Tailwind CSS with `@theme` tokens in `app/globals.css` (the ONLY `.css` file in the repo).
- **Directory Layout**: Flat Root Architecture (No `src/` folder) matching course specifications:
  - `app/`: Next.js App Router routes (`layout.tsx`, `page.tsx`, `shop/`, `products/[id]/`, `cart/`, `checkout/`, `about/`, `not-found.tsx`, `globals.css`).
  - `components/ui/`: `shadcn/ui` accessible primitives (`button`, `input`, `card`, `badge`, `modal`, `label`, `textarea`, `radio-group`, `skeleton`).
  - `components/layout/`: Shared layout (`Header`, `Footer`, `ThemeProvider`, `ThemeToggle`, `ToastContainer`).
  - `components/home/`: Artisan homepage sections (`HeroSection`, `CategoryStrip`, `StorySection`, `GiftingSection`, `IngredientsSection`, `ReviewsSection`, `NewsletterSection`).
  - `features/products/`: Types, API mock client, logic, and catalog components (`ProductCard`, `ProductGrid`, `ProductFilters`, `ShopCatalogClient`, `ProductDetailActions`).
  - `features/cart/`: Types, pure logic, state persistence, context provider, and drawer/item components (`CartProvider`, `CartDrawer`, `CartItemRow`, `CartButton`).
  - `features/checkout/`: Zod validation schema, `CheckoutForm`, and `OrderConfirmation` receipt view.
  - `lib/`: `utils.ts` (`cn()`), `api/client.ts`, `context/ToastContext.tsx`.

## Strict Code Standards (Invariants)

- **Zero `any`**: Strictly prohibited. Narrow with runtime predicates (`data is T`) or Zod.
- **Zero `as`**: Never cast types (`as Product`, `as string`). Use runtime type predicates.
- **Zero `!`**: Never use non-null assertions. Use defensive checks and default fallbacks.
- **Paths**: Alias `"@/*": ["./*"]` in `tsconfig.json`.

## Quality Commands

- `npm run dev`: Start Next.js development server.
- `npm run typecheck`: Run TypeScript compiler check (`tsc --noEmit`).
- `npm run lint`: Run ESLint check.
- `npm run format`: Format codebase with Prettier.
- `npm run format:check`: Check formatting with Prettier.
- `npm run build`: Production Next.js build and static prerendering.
