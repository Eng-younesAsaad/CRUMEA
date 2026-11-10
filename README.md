# CRUMÉA &bull; Luxury Artisan Bakery

An editorial-grade artisan bakery e-commerce experience built with **Next.js 15 (App Router)**, **React 19**, **Strict TypeScript**, and **Tailwind CSS**. Designed with an authentic Parisian atelier aesthetic, high-craft typography, and robust state architecture.

---

## 1. Architectural Highlights

- **Flat Root Architecture (NO `src/`)**: Components, app routes, features, and library utilities live directly at the workspace root to conform strictly with syllabus specifications.
- **Single CSS File Invariant**: `app/globals.css` is the **ONLY** `.css` file in the entire repository, leveraging Tailwind CSS `@theme` tokens and synchronized CSS custom properties for seamless Light/Dark mode transitions.
- **Strict Invariants**:
  - **Zero `any`**: Strictly typed domain models with generic parameters or `unknown` narrowed with type guards (`data is T`).
  - **Zero `as` Type Assertions**: No type casting (`as Product`, `as string`). All external data (`localStorage`, API mocks, search params) is validated with runtime predicates or Zod schemas.
  - **Zero `!` Non-Null Assertions**: Always safe with optional chaining (`?.`), nullish coalescing (`??`), or defensive guards.
  - **Zero CSR Bailout**: URL search parameters and client navigation hooks are safely wrapped in `<Suspense>`.

---

## 2. Next.js App Router Routes

| Route            | Type             | Description                                                                                                                             | Key Components                                                                                       |
| ---------------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `/`              | Server Component | Home page featuring hero banner, category strip, featured treats, bakery story, gifting, and newsletter                                 | `HeroSection`, `CategoryStrip`, `ProductGrid`, `StorySection`, `GiftingSection`, `NewsletterSection` |
| `/shop`          | Server Component | Full catalog with live search, category pills, price sorting, diagnostic modes (`fail`, `empty`, `slow`), and 4-state handling          | `ProductFilters`, `ShopCatalogClient`, `ProductGrid`, `ProductSkeletonGrid`                          |
| `/products/[id]` | Server Component | Dynamic product detail route with metadata generation, breadcrumb trail, quantity stepper, and related category treats                  | `ProductDetailActions`, `Badge`, `ProductGrid`                                                       |
| `/cart`          | Client Component | Full-page shopping cart with free shipping progress tracker ($50 threshold), item rows, clear cart modal, and checkout link             | `CartItemRow`, `Modal`, `Button`, `Card`                                                             |
| `/checkout`      | Client Component | Atelier checkout flow featuring `react-hook-form` + `zodResolver`, address collection, delivery/payment choices, and order confirmation | `CheckoutForm`, `OrderConfirmation`, `RadioGroup`, `Input`, `Textarea`                               |
| `/about`         | Server Component | Editorial "Our Story" page featuring the 3 baking pillars, founder's pledge, and Parisian atelier address & baking hours                | `Card`, `Badge`, `Button`                                                                            |
| `/_not-found`    | Server Component | Custom 404 error page ("Crumb Not Found") with breadcrumb return CTAs                                                                   | `Button`                                                                                             |

---

## 3. Component Hierarchy & State Ownership

```
Root Layout (app/layout.tsx)
├── ThemeProvider (Dark / Light theme state in localStorage)
├── ToastProvider (Centralized non-blocking toast notifications)
└── CartProvider (Cart state synced with localStorage)
    ├── Header (Sticky navigation, mobile drawer, CartButton)
    ├── Page Route (app/[route]/page.tsx)
    ├── CartDrawer (Slide-over cart preview with free shipping tracker)
    └── Footer (Editorial brand footer with newsletter & links)
```

### State Ownership Table

| State Slice              | Owner                   | Storage / Lifetime             | Synchronization                        |
| ------------------------ | ----------------------- | ------------------------------ | -------------------------------------- |
| Theme (`light` / `dark`) | `ThemeProvider`         | `localStorage["crumea_theme"]` | `data-theme` attribute on `<html>`     |
| Toast Queue              | `ToastProvider`         | In-memory React state          | Auto-dismiss after 4000ms              |
| Cart Items               | `CartProvider`          | `localStorage["crumea_cart"]`  | Broadcasts live count & totals         |
| Shop Filters             | `ShopCatalogClient`     | React state + searchParams     | Instant client-side filter computation |
| Checkout Form            | `CheckoutForm`          | `react-hook-form`              | Validated by Zod `checkoutSchema`      |
| Confirmed Order          | `app/checkout/page.tsx` | React state                    | Rendered upon valid checkout submit    |

---

## 4. Design System & Color Palette

Synchronized inside `app/globals.css` with `@theme` and `:root` / `.dark` tokens:

- **Deep Espresso (`#1A110B`)**: Primary background for dark mode and header navigation.
- **Roasted Cocoa (`#241710`)**: Card surfaces, modal backgrounds, and dark accents.
- **Warm Alabaster Cream (`#FAF6F0`)**: Primary background for light mode and editorial typography.
- **Soft Oat (`#F3ECE1`)**: Alternate background for story sections and subtle card fills.
- **Burnished Gold (`#C89B68`)**: Accent color, primary buttons, badges, and rating stars.
- **Gold Hover (`#B88956`)**: Interactive hover state for gold buttons and links.

---

## 5. Development & Quality Verification

Run all quality gates locally:

```bash
# Start development server
npm run dev

# Run strict TypeScript compiler verification (Zero errors)
npm run typecheck

# Run ESLint validation
npm run lint

# Check Prettier formatting
npm run format:check

# Format all files
npm run format

# Production build and static page prerender
npm run build

# Start production server
npm run start
```

---

## 6. Repository

- **GitHub Remote**: [https://github.com/Eng-younesAsaad/CRUMEA.git](https://github.com/Eng-younesAsaad/CRUMEA.git)
- **Branch**: `main`
