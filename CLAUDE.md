# CRUMÉA Luxury Artisan Bakery - CLAUDE Guide

## Architecture Summary

- **Framework**: Next.js 15 (App Router), React 19, TypeScript (Strict Mode).
- **Styling**: Tailwind CSS with `@theme` tokens in `app/globals.css` (the ONLY `.css` file in the repo).
- **Directory Layout**: Flat Root Architecture (No `src/` folder) matching course specifications:
  - `app/`: Next.js App Router routes (`layout.tsx`, `page.tsx`, `shop/`, `products/[id]/`, `cart/`, `checkout/`, `about/`, `not-found.tsx`, `globals.css`). Thin entry wrappers (< 60 lines).
  - `components/ui/`: `shadcn/ui` accessible primitives (`button`, `input`, `card`, `badge`, `modal`, `label`, `textarea`, `radio-group`, `skeleton`).
  - `components/layout/`: Shared layout (`Header`, `HeaderNav`, `MobileNavDrawer`, `Footer`, `ThemeProvider`, `ThemeToggle`, `ToastContainer`).
  - `features/home/`: Artisan homepage sections (`HeroSection`, `CategoryStrip`, `FeaturedTreatsSection`, `StorySection`, `StoryVideoModal`, `GiftingSection`, `IngredientsSection`, `ReviewsSection`, `NewsletterSection`).
  - `features/about/`: Atelier heritage components (`AboutView`, `AboutHero`, `AboutPhilosophy`, `AboutManifesto`, `AboutAtelier`).
  - `features/products/`: Types, API mock client, logic, and catalog components (`ProductCard`, `ProductGrid`, `ProductFilters`, `ShopCatalogClient`, `ProductDetailView`, `ProductDetailActions`).
  - `features/cart/`: Types, pure logic, zero-network CartProvider (stores snapshot fields `{ productId, name, price, image, category, qty }`), and components (`CartDrawer`, `CartView`, `CartSummaryCard`, `CartItemRow`).
  - `features/checkout/`: Zod validation schema, `CheckoutView`, sub-sections (`ShippingAddressSection`, `DeliveryPaymentSection`, `CheckoutSummaryCard`), and `OrderConfirmation`.
  - `lib/`: `utils.ts` (`cn()`), `api/client.ts`, `context/ToastContext.tsx`.

## Strict Code Standards (Invariants)

- **Zero `any`**: Strictly prohibited. Narrow with runtime predicates (`data is T`) or Zod.
- **Zero `as`**: Never cast types (`as Product`, `as string`). Use runtime type predicates.
- **Zero `!`**: Never use non-null assertions. Use defensive checks and default fallbacks.
- **File Size Limit**: All component and route files decomposed under ~140 lines.
- **Zero-Network Cart**: `CartProvider` never uses `useEffect` network product fetching.
- **Paths**: Alias `"@/*": ["./*"]` in `tsconfig.json`.

## Quality Commands

- `npm run dev`: Start Next.js development server.
- `npm run typecheck`: Run TypeScript compiler check (`tsc --noEmit`).
- `npm run lint`: Run ESLint check.
- `npm run format`: Format codebase with Prettier.
- `npm run format:check`: Check formatting with Prettier.
- `npm run build`: Production Next.js build and static prerendering.
