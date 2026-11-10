# CRUMÉA Luxury Artisan Bakery - Design System & Tokens

## 1. Brand Identity & Color Tokens

CRUMÉA's aesthetic evokes the timeless warmth of high-end Parisian pâtisseries, combining deep roasted tones with warm alabaster creams and burnished gold accents.

### Core Color Palette

| Token Name | CSS Variable | Hex Code | Purpose |
| :--- | :--- | :--- | :--- |
| **Deep Espresso** | `--color-espresso` | `#1A110B` | Primary headings, dark mode background, contrast headers |
| **Roasted Cocoa** | `--color-cocoa` | `#241710` | Secondary dark, card surfaces in dark mode, footer |
| **Warm Alabaster Cream** | `--color-cream` | `#FAF6F0` | Light mode primary canvas background, soft highlights |
| **Soft Oat** | `--color-oat` | `#F3ECE1` | Secondary containers, subtle badges, light mode secondary |
| **Card Cream** | `--color-card-cream` | `#F5EFE6` | Light mode card surfaces and product tiles |
| **Burnished Gold** | `--color-gold` | `#C89B68` | Primary CTA buttons, accents, gold badges, focus rings |
| **Gold Hover** | `--color-gold-hover` | `#B88956` | Interactive hover state for primary gold elements |
| **Espresso Ink** | `--color-espresso-ink` | `#2A1E17` | Primary body typography for maximum legibility |
| **Muted Mocha** | `--color-mocha` | `#6E5A4F` | Captions, subtitles, secondary metadata, subtle borders |
| **Warm Border** | `--border` | `#E8DEC8` | Elegant divider borders in light mode |

---

## 2. Semantic Theme Mapping (`shadcn/ui`)

### Light Mode (`:root`)
- `--background`: `#FAF6F0` (Warm Alabaster Cream)
- `--foreground`: `#1A110B` (Deep Espresso)
- `--card`: `#F5EFE6` (Card Cream)
- `--card-foreground`: `#2A1E17` (Espresso Ink)
- `--primary`: `#C89B68` (Burnished Gold)
- `--primary-foreground`: `#1A110B` (Deep Espresso)
- `--secondary`: `#F3ECE1` (Soft Oat)
- `--secondary-foreground`: `#2A1E17` (Espresso Ink)
- `--muted`: `#6E5A4F` (Muted Mocha)
- `--muted-foreground`: `#6E5A4F`
- `--accent`: `#C89B68` (Burnished Gold)
- `--accent-foreground`: `#1A110B`
- `--destructive`: `#DC2626`
- `--destructive-foreground`: `#FAF6F0`
- `--border`: `#E8DEC8`
- `--ring`: `#C89B68`

### Dark Mode (`.dark`)
- `--background`: `#1A110B` (Deep Espresso)
- `--foreground`: `#FAF6F0` (Warm Alabaster Cream)
- `--card`: `#241710` (Roasted Cocoa)
- `--card-foreground`: `#FAF6F0`
- `--primary`: `#C89B68` (Burnished Gold)
- `--primary-foreground`: `#1A110B`
- `--secondary`: `#241710` (Roasted Cocoa)
- `--secondary-foreground`: `#FAF6F0`
- `--muted`: `#6E5A4F` (Muted Mocha)
- `--muted-foreground`: `#A89587`
- `--accent`: `#C89B68`
- `--accent-foreground`: `#1A110B`
- `--destructive`: `#EF4444`
- `--destructive-foreground`: `#FAF6F0`
- `--border`: `#352319`
- `--ring`: `#C89B68`

---

## 3. Typography

- **Editorial Display Serif**: `"Playfair Display", Georgia, serif` (`--font-serif`)
  - Used for Hero titles, section headings, and luxury callouts.
- **Geometric Sans**: `"Plus Jakarta Sans", system-ui, sans-serif` (`--font-sans`)
  - Used for navigation, product titles, UI controls, body text, and badges.

---

## 4. Radii & Elevation

- `--radius-sm`: `0.25rem` (4px)
- `--radius-md`: `0.5rem` (8px)
- `--radius-lg`: `0.75rem` (12px)
- `--radius-xl`: `1rem` (16px)
- **Shadows**:
  - `shadow-warm`: `0 2px 4px rgba(26, 17, 11, 0.05)`
  - `shadow-warm-md`: `0 4px 12px rgba(26, 17, 11, 0.08)`
  - `shadow-warm-lg`: `0 12px 28px rgba(26, 17, 11, 0.12)`

