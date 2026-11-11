# CRUMÉA Luxury Artisan Bakery - Agent Rules & Architecture Guide

## 1. Project Overview & Architectural Boundaries

CRUMÉA is built on **Next.js 15 (App Router)**, **React 19**, **Strict TypeScript**, and **Tailwind CSS**.
The project strictly adheres to a **Root-level Feature Architecture** with **NO `src/` directory**, matching the target class slide specification.

### Exact Root Directory Structure:

```
crumea_shop/
├── app/                  # ONLY Next.js App Router routes & globals.css (thin route wrappers < 60 lines)
│   ├── layout.tsx        # Root layout with providers, fonts, header & footer
│   ├── page.tsx          # Home page entry route
│   ├── shop/             # Shop catalog route & loading skeleton
│   ├── products/[id]/    # Dynamic product detail route & loading skeleton
│   ├── cart/             # Shopping cart route
│   ├── checkout/         # Atelier checkout route
│   ├── about/            # Atelier story & heritage route
│   ├── globals.css       # THE ONLY .css file in repository (@theme + :root/.dark)
│   ├── loading.tsx       # Route loading skeleton UI
│   ├── error.tsx         # Route error boundary ("use client")
│   └── not-found.tsx     # Custom 404 page ("Crumb Not Found")
├── components/           # Strictly ONLY shared ui primitives and layout shells
│   ├── ui/               # shadcn/ui accessible primitives (cva, Radix UI)
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   ├── modal.tsx
│   │   ├── label.tsx
│   │   ├── textarea.tsx
│   │   ├── radio-group.tsx
│   │   └── skeleton.tsx
│   └── layout/           # Shared layout components
│       ├── Header.tsx
│       ├── HeaderNav.tsx
│       ├── MobileNavDrawer.tsx
│       ├── Footer.tsx
│       ├── ThemeProvider.tsx
│       ├── ThemeToggle.tsx
│       └── ToastContainer.tsx
├── features/             # Domain feature modules (all components decomposed < 140 lines)
│   ├── home/             # Home page sections & visual story
│   │   └── components/   # HeroSection, CategoryStrip, StorySection, GiftingSection, etc.
│   ├── about/            # Atelier about view & sub-sections
│   │   └── components/   # AboutView, AboutHero, AboutPhilosophy, AboutManifesto, AboutAtelier
│   ├── products/         # Catalog & product detail domain
│   │   ├── products.types.ts
│   │   ├── products.api.ts
│   │   ├── products.logic.ts
│   │   └── components/   # ProductCard, ProductGrid, ProductFilters, ProductDetailView, etc.
│   ├── cart/             # Zero-network cart domain (pure math & localStorage snapshot sync)
│   │   ├── cart.types.ts
│   │   ├── cart.logic.ts
│   │   ├── cart.state.ts
│   │   ├── CartProvider.tsx
│   │   └── components/   # CartDrawer, CartView, CartSummaryCard, CartItemRow, etc.
│   └── checkout/         # Checkout flow & order confirmation
│       ├── checkout.schema.ts
│       └── components/   # CheckoutView, CheckoutForm, ShippingAddressSection, OrderConfirmation, etc.
├── lib/                  # Shared utilities and core cross-cutting logic
│   ├── utils.ts          # cn() classnames helper (clsx + tailwind-merge)
│   ├── api/
│   │   └── client.ts     # Central HTTP client (ApiError, runtime predicates, modes)
│   └── context/
│       └── ToastContext.tsx # Centralized non-blocking toast notifications
├── public/               # Static assets
├── components.json       # shadcn/ui configuration
├── tailwind.config.ts    # Tailwind CSS config
├── tsconfig.json         # Strict TypeScript configuration ("@/*": ["./*"])
└── package.json
```

---

## 2. Strict TypeScript Rules (Invariants)

1. **Zero `any`**:
   - `any` is strictly prohibited throughout the entire codebase.
   - Use explicit interfaces, generic parameters, or `unknown` narrowed with type guards (`data is T`).

2. **Zero `as` Type Casting**:
   - Do NOT use `as Product`, `as ApiProduct`, or `as string` to force type assertions.
   - All external data (API responses, `localStorage` JSON, URL params) must be validated using runtime type predicates (`isProduct`, `isCartItem`, `isTheme`, etc.) or Zod schemas.

3. **Zero `!` Non-Null Assertions**:
   - Do NOT use the `!` operator to assert existence.
   - Use optional chaining (`?.`), nullish coalescing (`??`), or defensive `if (!value) return` guards.

4. **Compiler Rigor**:
   - `"strict": true` in `tsconfig.json`.
   - `npm run typecheck` (`tsc --noEmit`) must always exit with **0 errors**.

---

## 3. shadcn/ui Usage Rules

1. All UI primitives reside in `components/ui/` and are built on top of Radix UI primitives and `class-variance-authority` (`cva`).
2. Components must support polymorphic composition via `@radix-ui/react-slot` (`asChild`).
3. Primitives must consume CRUMÉA design tokens defined in `globals.css` and `tailwind.config.ts`.
4. Variants:
   - `Button`: `variant` (`default`, `primary`, `secondary`, `outline`, `ghost`, `destructive`), `size` (`default`, `sm`, `lg`, `icon`).
   - `Badge`: `variant` (`default`, `gold`, `secondary`, `outline`, `success`, `destructive`).
   - `Modal`: Accessible dialog built on `@radix-ui/react-dialog` with typed props: `isOpen`, `onClose`, `title`, `description`, `size`, `children`, `footer`.

---

## 4. Styling & `@theme` Tokens

- **Single CSS File Invariant**: `app/globals.css` is the **ONLY** `.css` file permitted in the repository.
- No ad-hoc inline styles for color or spacing.
- Both `@theme` and `:root` / `.dark` variables are synchronized for seamless light/dark mode transitions.
- Light mode: Warm Alabaster Cream background (`#FAF6F0`), Deep Espresso text (`#1A110B`).
- Dark mode: Deep Espresso background (`#1A110B`), Roasted Cocoa card surfaces (`#241710`), Soft Cream text (`#FAF6F0`).
- Accent: Burnished Gold (`#C89B68`).

---

## 5. Architectural Separation & File Size Limits

1. **Server Components by Default & Thin Routes**:
   - Page routes (`app/**/page.tsx`) remain thin Server Component entry wrappers (< 40–60 lines) that delegate UI rendering to their respective `features/*` modules.
2. **File Size Limit (< ~140 Lines)**:
   - All components, pages, and modules are cleanly decomposed into focused sub-components under ~140 lines for maximum maintainability and readability.
3. **`"use client"` Leaf Boundaries**:
   - Only interactive stateful components (`CartProvider`, `ThemeProvider`, `ToastProvider`, interactive forms, toggles) include `"use client"`.
4. **Pure Business Logic & Zero-Network Cart**:
   - Math and domain filtering logic live strictly in pure functions (`cart.logic.ts`, `products.logic.ts`).
   - `CartProvider` does NOT fetch the product catalog inside a `useEffect`. Instead, essential product snapshot fields (`productId`, `name`, `price`, `image`, `category`, `qty`) are stored directly in `CartItem`, enabling 100% synchronous, zero-network cart computations.
5. **Derived State**:
   - Subtotals, counts, and filtered lists are computed during render, never stored in redundant `useState` or synchronized via `useEffect`.

---

## 6. App Router Routes & Completed Domain Modules

- `app/layout.tsx`: Root shell mounting `ThemeProvider`, `ToastProvider`, `CartProvider`, `Header`, `CartDrawer`, `Footer`.
- `app/page.tsx`: Thin entry route delegating to `features/home/components/` (`HeroSection`, `CategoryStrip`, `FeaturedTreatsSection`, `StorySection`, `GiftingSection`, `IngredientsSection`, `ReviewsSection`, `NewsletterSection`).
- `app/shop/page.tsx`: Catalog route delegating to `features/products/components/ShopCatalogClient.tsx` (handles loading, error, empty, and no-match filter states).
- `app/products/[id]/page.tsx`: Dynamic detail page delegating to `features/products/components/ProductDetailView.tsx`.
- `app/cart/page.tsx`: Full-page cart delegating to `features/cart/components/CartView.tsx`.
- `app/checkout/page.tsx`: Checkout flow delegating to `features/checkout/components/CheckoutView.tsx`.
- `app/about/page.tsx`: Atelier heritage and philosophy page delegating to `features/about/components/AboutView.tsx`.
- `app/not-found.tsx`: Accessible custom 404 page ("Crumb Not Found").

---

## 7. Quality Gates

- `npm run typecheck`: Must pass with 0 errors (`tsc --noEmit`).
- `npm run lint`: Must pass with 0 warnings or errors (`next lint`).
- `npm run format:check`: Must pass Prettier verification.
- `npm run test`: Unit & component tests pass with Vitest.
- `npm run test:e2e`: Playwright end-to-end checkout suite passes.
- `npm run build`: Production compilation and static prerendering must succeed.

---

## 8. Testing Rules (Invariants)

1. **The Never-Edit-Tests Rule**:
   - Never edit, weaken, skip, or delete a failing test just to make the test suite pass. When a test fails, fix the underlying application code unless the product specification itself explicitly changed.
2. **Accessible Queries Only**:
   - Component and E2E tests must locate elements exclusively by accessible `role` or `label` (`getByRole`, `getByLabelText` / `page.getByRole`, `page.getByLabel`)—never by CSS class names, tag selectors, or test IDs.
3. **Descriptive Test Names**:
   - Every test name (`it(...)` / `test(...)`) must state a clear business truth about what must be true.
