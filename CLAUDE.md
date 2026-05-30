# CLAUDE.md — Developer & Agent Operations Guide

This file defines the commands, code conventions, and architecture rules for the `nuxt-portfolio` project.
Follow these guidelines strictly when reading, writing, or modifying any file in this repository.

---

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server at `http://localhost:3000` with HMR |
| `npm run build` | Production build — outputs SSR bundle to `.output/` |
| `npm run preview` | Preview the production build locally |
| `npm run generate` | Fully static output (alternative to SSR) |
| `npm run typecheck` | TypeScript type checking via `nuxt typecheck` |
| `npm install` | Install all dependencies from `package.json` |
| `npm ci` | Clean install (CI/CD use only — requires `package-lock.json`) |

---

## Directory Structure

```
nuxt-portfolio/
├── app/                         ← srcDir (Nuxt 4 default)
│   ├── app.vue                  ← Root — wraps <NuxtPage> in <NuxtLayout>; no route logic here
│   ├── error.vue                ← Dark-themed error page (404 / 500); rendered outside layouts
│   ├── layouts/
│   │   └── default.vue          ← Dark shell: bg-ink/text-bone + AppHeader + AppFooter
│   ├── pages/
│   │   ├── index.vue            ← Home — album-cover grid + equipment + contact sections
│   │   └── albums/
│   │       └── [slug].vue       ← Album detail — masonry grid + lightbox; owns lightbox state
│   ├── components/
│   │   ├── AppHeader.vue        ← IG (left) · wordmark + nav (Albums/Equipment/Contact) · Website (right)
│   │   ├── AppFooter.vue        ← Footer: copyright + social links
│   │   ├── IconInstagram.vue    ← Inline SVG icon (currentColor, no icon library)
│   │   ├── IconWebsite.vue      ← Inline SVG globe icon (currentColor)
│   │   ├── AlbumGrid.vue        ← Responsive 3:4 album-cover grid (home)
│   │   ├── EquipmentSection.vue ← Home equipment list (grouped, from equipment.json)
│   │   ├── ContactSection.vue   ← Home contact links: email · Instagram · website
│   │   ├── ImageGrid.vue        ← Masonry grid + skeleton loaders (album detail)
│   │   └── Lightbox.vue         ← Full-screen viewer modal
│   └── data/
│       ├── albums.json          ← Single source of truth: albums + nested photos
│       └── equipment.json       ← Equipment groups for the home Equipment section
├── public/                      ← Static files served at root (favicon, robots.txt)
├── .github/workflows/
│   └── deploy.yml               ← CI/CD: push to main → Netlify deploy
├── nuxt.config.ts               ← Nuxt + Nitro config
├── package.json
└── tsconfig.json
```

**Key rule**: All Vue source files live under `app/`. The `~` alias maps to `app/` (srcDir).

---

## Code Style

### Vue Components

- Always use `<script setup lang="ts">` — no Options API, no `export default defineComponent`
- All props use generic TypeScript: `defineProps<{ ... }>()`
- All emits use generic TypeScript: `defineEmits<{ eventName: [arg: Type] }>()`
- Component filenames: PascalCase (`ImageGrid.vue`, `Lightbox.vue`)
- Page filenames: lowercase kebab-case (`index.vue`, `about.vue`)

### TypeScript

- No `any` — always type explicitly
- Define interfaces at the top of the script block
- The canonical photo type (copy this wherever `GalleryPhoto` is needed):

```typescript
interface GalleryPhoto {
  id: string
  filename: string   // filename only, no path — e.g. "iceland.jpg"
  title: string      // display title shown in caption
  alt: string        // screen-reader description
  aspectRatio: string // CSS aspect-ratio value — e.g. "3/2", "16/9", "2/3"
}

// Albums are the top-level unit. Photos nest inside an album.
interface Album {
  id: string
  slug: string         // URL segment — e.g. "wild-landscapes"
  title: string
  description: string  // shown on the album detail page
  cover: string        // cover image filename, framed 3:4 on the home grid
  photos: GalleryPhoto[]
}
```

### Design System — Dark Japandi (60/30/10)

The site is **fully dark** with a Muji / Japandi aesthetic. Color tokens are defined **once** in
`tailwind.config.ts` under `theme.extend.colors`. **Always use these tokens — never hardcode hex or
use default Tailwind grays/whites in components.**

| Role | Weight | Token classes | Hex | Usage |
|------|--------|---------------|-----|-------|
| Background base | **60%** | `bg-ink` | `#191A18` | Page background (applied by `layouts/default.vue`) |
| Surfaces / cards | **30%** | `bg-stone` / `bg-stone-light` | `#262825` / `#2F312D` | Cards, panels, **skeletons**, elevated surfaces |
| Accent | **10%** | `text-sage` / `text-sage-light` / `ring-sage` | `#8A9A82` / `#9DAE94` | Links, icon hover, **focus rings**, active states — used *sparingly* |
| Text primary | — | `text-bone` | `#E6E6E1` | Headings & body copy |
| Text muted | — | `text-muted` | `#A6A69E` | Captions, metadata, secondary copy |
| Hairline | — | `border-line` | `#34362F` | 1px dividers & borders |

**Principles:** generous whitespace, restrained type with wide tracking, matte surfaces (no glossy
gradients), photographs are the only saturated color. Accent sage is for interaction states and
small marks only — never large fills. All text/background pairs must clear **WCAG AA (4.5:1)**.

### Tailwind CSS Classes

Use Tailwind utilities exclusively. No custom CSS except scoped `<style scoped>` for `<Transition>` named animations.

| Pattern | Class |
|---------|-------|
| Masonry grid container | `columns-1 md:columns-2 lg:columns-3 gap-4` |
| Column break prevention | `break-inside-avoid-column mb-4` |
| Skeleton placeholder | `animate-pulse bg-stone` |
| Image opacity transition | `transition-opacity duration-500` |
| Lightbox overlay | `fixed inset-0 z-50 bg-black/90` |
| Aspect-ratio wrapper | `relative w-full overflow-hidden rounded` |
| Image fill inside wrapper | `absolute inset-0 w-full h-full object-cover` |
| Focus ring (interactive) | `focus:outline-none focus-visible:ring-2 focus-visible:ring-sage` |
| Icon link hit target | `inline-flex h-11 w-11 items-center justify-center` |

### Composables & Runtime

- Access R2 base URL via `useRuntimeConfig().public.r2BaseUrl` — never hardcode URLs
- Build image src as: `` `${r2BaseUrl}/${photo.filename}` ``
- Social/contact links come from runtimeConfig too — never hardcode:
  `useRuntimeConfig().public.instagramUrl`, `.websiteUrl`, `.contactEmail`
- Use `useSeoMeta()` for all SEO in pages (not `useHead()` for meta tags)
- Use `ref<Record<string, boolean>>({})` for per-image loaded state maps
- External links (Instagram, Website) must use `target="_blank" rel="noopener noreferrer"` + `aria-label`

---

## Routing

| Route | Page file | Renders |
|-------|-----------|---------|
| `/` | `pages/index.vue` | 3:4 album-cover grid (`AlbumGrid`) + equipment & contact (S5) |
| `/albums/[slug]` | `pages/albums/[slug].vue` | Album's masonry `ImageGrid` + `Lightbox` |

- Album pages resolve `useRoute().params.slug` against `albums.json`.
- Unknown slug → `throw createError({ statusCode: 404, fatal: true })`, rendered by `app/error.vue`.
- The masonry grid + lightbox live **only** on album detail pages, never on the home page.

---

## Data Schema

`app/data/albums.json` is the single source of truth — a JSON array of `Album` objects, each with
a nested `photos` array of `GalleryPhoto`. (The legacy flat `gallery.json` was removed in Sprint 5.)

```json
[
  {
    "id": "wild-landscapes",
    "slug": "wild-landscapes",
    "title": "Wild Landscapes",
    "description": "Short intro shown on the album page.",
    "cover": "iceland.jpg",
    "photos": [
      {
        "id": "iceland",
        "filename": "iceland.jpg",
        "title": "Icelandic Highlands",
        "alt": "Descriptive sentence for screen readers and SEO",
        "aspectRatio": "2/3"
      }
    ]
  }
]
```

**Rules:**
- `id` and `slug` must be unique across all albums; photo `id` unique within the project
- `slug` is the URL segment — kebab-case, no spaces
- `cover` and each photo `filename` must match exactly the filename in the Cloudflare R2 bucket
- `aspectRatio` must be a valid CSS `aspect-ratio` value (`"W/H"` format)
- Do not store full URLs in `albums.json` — only filenames

### Equipment data

`app/data/equipment.json` is a JSON array of `EquipmentGroup` objects, rendered by
`EquipmentSection.vue` on the home page.

```typescript
interface EquipmentGroup {
  category: string                          // e.g. "Cameras", "Lenses"
  items: { name: string; detail?: string }[]
}
```

### Contact section

`ContactSection.vue` renders **links only** (no form/backend): email via `mailto:`, plus Instagram
and website. All three values come from `runtimeConfig.public` (`contactEmail`, `instagramUrl`,
`websiteUrl`) — never hardcode them.

---

## R2 Base URL

Configured in `nuxt.config.ts`:

```typescript
runtimeConfig: {
  public: {
    r2BaseUrl: 'https://example.com',                  // default/fallback
    instagramUrl: 'https://instagram.com/yourhandle',  // header + footer + contact
    websiteUrl: 'https://yourdomain.com',              // header + footer + contact
    contactEmail: 'hello@yourdomain.com',              // contact section (mailto:)
  },
},
```

Override at runtime with environment variables:

```env
NUXT_PUBLIC_R2_BASE_URL=https://cdn.yourdomain.com
NUXT_PUBLIC_INSTAGRAM_URL=https://instagram.com/yourhandle
NUXT_PUBLIC_WEBSITE_URL=https://yourdomain.com
NUXT_PUBLIC_CONTACT_EMAIL=hello@yourdomain.com
```

---

## Deployment

- **Preset**: `nitro.preset: 'netlify'` in `nuxt.config.ts`
- **Build output**: `.output/` (Netlify Functions + static assets)
- **Trigger**: Push to `main` branch runs `.github/workflows/deploy.yml`
- **Required secrets in GitHub**: `NETLIFY_AUTH_TOKEN`, `NETLIFY_SITE_ID`, `R2_BASE_URL`

---

## Performance Rules

1. Every `<img>` in `ImageGrid.vue` must have `loading="lazy"` and `decoding="async"`
2. Every image container must use CSS `aspect-ratio` to prevent CLS — never set explicit pixel heights
3. Never import a third-party carousel, lightbox, or animation library — use Vue `<Transition>` and native CSS
4. Skeleton loaders use Tailwind `animate-pulse bg-stone` — no JavaScript animation libraries
5. Icons are inline SVG components with `currentColor` — never add an icon library

---

## Accessibility Rules

1. Grid items must be keyboard-accessible: `tabindex="0"`, `role="button"`, respond to Enter and Space
2. Lightbox must set `role="dialog"` and `aria-modal="true"`
3. Lightbox close button must have `aria-label="Close lightbox"`
4. All `<img>` elements must have descriptive `alt` text from `gallery.json`
5. Icon-only links (header/footer social icons) must have an `aria-label`; SVGs are `aria-hidden`
6. All interactive elements must show a visible focus state: `focus-visible:ring-2 focus-visible:ring-sage`
7. Icon-link hit targets must be at least 44×44px (`h-11 w-11`)
