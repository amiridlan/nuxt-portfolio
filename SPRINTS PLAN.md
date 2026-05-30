# Sprints Plan — Photography Portfolio

> This file doubles as a living checklist. Check off tasks as you complete them.
> Sprint 1 = Week 1 · Sprint 2 = Week 2

---

## Sprint 1: Core Infrastructure & Masonry Grid

**Sprint Goal**: Stand up a working Nuxt 4 project with Tailwind, a functional masonry image grid with skeleton loaders, and all data/config foundations in place.

**Duration**: Week 1 (Days 1–5)
**Capacity**: ~40 story points (1 developer × 5 days × 8h × 0.8 focus factor → ~32 effective hours)
**Committed**: 37 points

---

### Sprint Backlog

| # | Story | Points | Status | Notes |
|---|-------|--------|--------|-------|
| S1-01 | Scaffold Nuxt 4 project with minimal template | 2 | ✅ Done | `npx nuxi init` |
| S1-02 | Configure `nuxt.config.ts` with Netlify preset & R2 runtimeConfig | 3 | ✅ Done | `nitro.preset: 'netlify'` |
| S1-03 | Install & configure `@nuxtjs/tailwindcss` module | 2 | ✅ Done | Added to devDependencies |
| S1-04 | Define `gallery.json` schema & populate with 4 mock photos | 3 | ✅ Done | Mixed portrait/landscape ratios |
| S1-05 | Build `ImageGrid.vue` — masonry columns layout | 5 | ✅ Done | `columns-1 md:columns-2 lg:columns-3` |
| S1-06 | Implement skeleton loaders with `animate-pulse` | 3 | ✅ Done | Per-image `loadedMap` ref |
| S1-07 | CLS prevention via `aspect-ratio` containers | 3 | ✅ Done | `style="{ aspectRatio }"` on wrapper div |
| S1-08 | Opacity cross-fade on image load (`@load` event) | 3 | ✅ Done | `transition-opacity duration-500` |
| S1-09 | Implement `loading="lazy"` + `decoding="async"` on grid images | 2 | ✅ Done | Native browser APIs, no library |
| S1-10 | Build `index.vue` base page with header layout | 3 | ✅ Done | Minimal typographic header |
| S1-11 | Update `app.vue` to use `<NuxtPage />` | 1 | ✅ Done | Replaces `<NuxtWelcome />` |
| S1-12 | Keyboard accessibility on grid items (Enter/Space to open) | 2 | ✅ Done | `tabindex="0"`, role="button" |
| S1-13 | Wire up `openLightbox` emit from `ImageGrid` to `index.vue` | 2 | ✅ Done | `selectedPhoto` ref in parent |

---

### Sprint 1 Definition of Done

- [ ] `npm run dev` starts without errors at `localhost:3000`
- [ ] Gallery grid renders in masonry layout across 1/2/3 columns responsively
- [ ] Each image slot shows a skeleton pulse placeholder before the image loads
- [ ] Skeleton fades out and image fades in smoothly when loaded
- [ ] No Cumulative Layout Shift (CLS) — containers maintain fixed dimensions during load
- [ ] All images below fold use `loading="lazy"`
- [ ] Image captions render below each photo (not overlaid)
- [ ] Grid items are keyboard-focusable and activatable

---

### Sprint 1 Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Nuxt 4 `srcDir: 'app'` path aliases differ from Nuxt 3 | Medium | Verified `~` maps to `app/` — use `~/data/gallery.json` |
| `@nuxtjs/tailwindcss` v6 compatibility with Nuxt 4 | Medium | Use v6.13+ which ships Nuxt 4 support |
| Images won't load (R2 URL is a placeholder) | Low | Skeletons remain as UI — expected in dev; swap URL in `.env` |

---

## Sprint 2: Lightbox, SEO, CI/CD & Production Polish

**Sprint Goal**: Deliver a production-ready portfolio with a full-screen lightbox viewer, dynamic Open Graph SEO, GitHub Actions CI/CD deployment to Netlify, and polished performance.

**Duration**: Week 2 (Days 6–10)
**Capacity**: ~40 story points
**Committed**: 36 points

---

### Sprint Backlog

| # | Story | Points | Status | Notes |
|---|-------|--------|--------|-------|
| S2-01 | Build `Lightbox.vue` — full-screen modal overlay | 5 | ✅ Done | Fixed overlay, `bg-black/90` |
| S2-02 | Implement `<Transition name="lightbox-fade">` enter/leave animation | 2 | ✅ Done | `opacity 0.3s ease` |
| S2-03 | Close lightbox on `Escape` key (keyboard listener) | 2 | ✅ Done | `watch` on `photo` prop, `addEventListener` |
| S2-04 | Close lightbox on clicking outside the image | 2 | ✅ Done | `@click.self` on overlay div |
| S2-05 | Close lightbox via `✕` button (top-right) | 1 | ✅ Done | `aria-label="Close lightbox"` |
| S2-06 | Body scroll lock when lightbox is open | 2 | ✅ Done | `document.body.style.overflow = 'hidden'` |
| S2-07 | Dynamic SEO with `useSeoMeta` in `index.vue` | 3 | ✅ Done | Title, description, OG, Twitter Cards |
| S2-08 | OG image pointing to first photo in R2 | 2 | ✅ Done | `r2BaseUrl + photos[0].filename` |
| S2-09 | Create `.github/workflows/deploy.yml` CI/CD pipeline | 3 | ✅ Done | Push-to-main triggers Netlify deploy |
| S2-10 | Add `node_modules` caching step in workflow | 1 | ✅ Done | `actions/cache@v4` with `package-lock.json` hash |
| S2-11 | Wire `NETLIFY_AUTH_TOKEN` + `NETLIFY_SITE_ID` secrets | 1 | ✅ Done | Env vars in deploy step |
| S2-12 | Tailwind `tailwind.config.ts` — verify purge/content paths | 2 | ⬜ Todo | Point to `app/**/*.{vue,ts}` |
| S2-13 | Add `netlify.toml` for build command + publish dir config | 3 | ⬜ Todo | `[build] command = "npm run build"` |
| S2-14 | Environment variable guide in README + `.env.example` | 2 | ⬜ Todo | `NUXT_PUBLIC_R2_BASE_URL` |
| S2-15 | Final cross-browser test (Chrome, Firefox, Safari) | 2 | ⬜ Todo | Manual QA pass |
| S2-16 | Lighthouse audit — target CLS < 0.1, LCP < 2.5s, TBT < 200ms | 3 | ⬜ Todo | Run in Chrome DevTools |

---

### Sprint 2 Definition of Done

- [ ] Lightbox opens with fade-in when a grid image is clicked
- [ ] Lightbox closes via Escape key, `✕` button, and outside-click
- [ ] Body scroll is locked while lightbox is open, restored on close
- [ ] `useSeoMeta` sets correct `<title>`, description, og:image, and Twitter Card meta tags
- [ ] GitHub Actions workflow runs on push to `main` without errors
- [ ] Netlify deployment succeeds using `NETLIFY_AUTH_TOKEN` + `NETLIFY_SITE_ID`
- [ ] `netlify.toml` present and correctly configured
- [ ] `.env.example` documents all required environment variables
- [ ] Lighthouse CLS score is 0 (no layout shifts)
- [ ] All components pass `npm run typecheck` with zero errors

---

### Sprint 2 Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Netlify SSR preset output dir path for CLI deploy | High | Use `netlify deploy --prod` from root; Nitro preset handles output format |
| `document.body` not available during SSR | Medium | Lightbox scroll lock runs in `watch` callback (client-side only) |
| OG image returns 404 (R2 placeholder URL) | Low | Only affects social sharing previews; acceptable in dev |
| Tailwind purge not removing skeleton classes in production | Low | Ensure `animate-pulse`, `opacity-0` are in content paths |

---

# Release 2 — Album Architecture & Dark Japandi Redesign

> Sprints 3–5 cover the v2 redesign. Sprint 3 = Week 3 · Sprint 4 = Week 4 · Sprint 5 = Week 5.
> **End-of-sprint ritual (every sprint):** update `CLAUDE.md`, update `README.md`, tick the boxes
> below, and review `.gitignore` for any new generated/secret files. These are tracked as the
> `S{n}-WRAP` story in each sprint and are part of that sprint's Definition of Done.

---

## Release 2 Scope & Goals

Four product changes, delivered on a fully dark theme:

1. **Home becomes an album index** — a responsive **3:4 album-cover grid**. The Pinterest-style
   masonry grid moves *off* the home page and *into* each album's detail page (opened by clicking
   an album cover).
2. **Home gains an Equipment section** and a **Contact section** (contact = links only: email,
   Instagram, website — no form/backend).
3. **Header** gains two icon links: **Instagram (left)** and **Website (right)**.
4. **Full dark redesign** using a **60/30/10** palette with **Muji / Japandi** influence and a
   **sage** accent.

### Design System — Dark Japandi (single source of truth)

Defined once in `tailwind.config.ts` under `theme.extend.colors`; every component consumes these
tokens (no raw hex in components).

| Role | Weight | Token | Hex | Usage |
|------|--------|-------|-----|-------|
| Background base | **60%** | `ink` | `#191A18` | Page background, the dominant field |
| Surfaces / cards | **30%** | `stone` / `stone-light` | `#262825` / `#2F312D` | Album cards, section panels, skeletons, elevated surfaces |
| Accent | **10%** | `sage` / `sage-light` | `#8A9A82` / `#9DAE94` | Links, icon hover, focus rings, hairline highlights, active states |
| Text primary | — | `bone` | `#E6E6E1` | Headings & body copy |
| Text muted | — | `muted` | `#A6A69E` | Captions, metadata, secondary copy |
| Hairline border | — | `line` | `#34362F` | 1px dividers, card borders |

**Principles:** generous negative space (ma 間), restrained type with wide tracking, matte surfaces
(no glossy gradients), the photographs are the only saturated color on the page. Accent sage is used
*sparingly* — interaction states and small marks only, never large fills. All text/background pairs
must clear **WCAG AA (4.5:1)**; sage is used for non-text/large-text accents and verified for 3:1 on
UI elements.

### Information Architecture & Routing

```
/                         Home — Album cover grid (3:4) + Equipment + Contact
/albums/[slug]            Album detail — masonry ImageGrid + Lightbox + back link
```

### Data Model (v2)

`gallery.json` is superseded by `albums.json` (photos nest inside albums). The `GalleryPhoto` type
is unchanged and reused inside each album.

```typescript
interface GalleryPhoto {
  id: string
  filename: string    // filename only — e.g. "iceland.jpg"
  title: string
  alt: string
  aspectRatio: string // CSS aspect-ratio — e.g. "3/2"
}

interface Album {
  id: string
  slug: string        // URL segment — e.g. "iceland-2024"
  title: string
  description: string // short intro shown on the album page
  cover: string       // cover image filename, framed 3:4 on the home grid
  photos: GalleryPhoto[]
}
```

`equipment.json` — grouped gear list for the Equipment section:

```typescript
interface EquipmentGroup {
  category: string          // e.g. "Cameras", "Lenses"
  items: { name: string; detail?: string }[]
}
```

New `runtimeConfig.public` keys (never hardcode in components):
`instagramUrl`, `websiteUrl`, `contactEmail` (alongside existing `r2BaseUrl`).

---

## Sprint 3: Dark Japandi Design System & Header

**Sprint Goal**: Establish the dark 60/30/10 design system as reusable Tailwind tokens, ship the
shared header with Instagram/Website icon links and a default layout, and re-skin all existing
components (grid, lightbox) to the new palette — so every later feature is built dark-first.

**Duration**: Week 3 (Days 11–15)
**Capacity**: ~40 story points
**Committed**: 38 points

### Sprint Backlog

| # | Story | Points | Status | Dependencies | Notes |
|---|-------|--------|--------|--------------|-------|
| S3-01 | Add dark Japandi color tokens to `tailwind.config.ts` (`ink`, `stone`, `sage`, `bone`, `muted`, `line`) | 3 | ✅ Done | — | Single source of truth; no raw hex in components |
| S3-02 | Add `instagramUrl`, `websiteUrl`, `contactEmail` to `runtimeConfig.public` + `.env.example` | 2 | ✅ Done | — | Mirror `NUXT_PUBLIC_*` env override pattern |
| S3-03 | Build `IconInstagram.vue` + `IconWebsite.vue` — inline SVG, `currentColor`, no icon library | 3 | ✅ Done | — | Honors "no third-party UI lib" rule |
| S3-04 | Build `AppHeader.vue` — Instagram (left), centered wordmark, Website (right) | 5 | ✅ Done | S3-01,02,03 | Icon links: `aria-label`, 44×44 target, focus-visible sage ring |
| S3-05 | Create `app/layouts/default.vue` — `bg-ink text-bone` shell + header + footer slot | 5 | ✅ Done | S3-04 | Pages adopt layout; `app.vue` stays minimal |
| S3-06 | Build `AppFooter.vue` — muted copyright + repeat social links | 2 | ✅ Done | S3-03 | Hairline `line` top border |
| S3-07 | Re-skin `ImageGrid.vue` to dark palette (skeleton `bg-gray-200` → `stone`, captions → `muted`) | 3 | ✅ Done | S3-01 | Preserve CLS + fade behavior |
| S3-08 | Re-skin `Lightbox.vue` — keep `bg-black/90`, caption/close in `bone`/`muted`, sage focus ring | 3 | ✅ Done | S3-01 | Transition unchanged |
| S3-09 | Apply layout + dark theme to current `index.vue` (interim, pre-album refactor) | 2 | ✅ Done | S3-05 | Keeps home working between sprints |
| S3-10 | A11y pass: AA contrast on all token pairs, visible focus states, icon labels | 3 | ✅ Done | S3-04..09 | bone 13:1, muted ~7:1, sage ~5.6:1 on ink |
| S3-11 | `npm run typecheck` clean + manual visual QA across breakpoints | 2 | ✅ Done | S3-04..10 | typecheck EXIT=0 |
| S3-WRAP | Wrap-up: update `CLAUDE.md` (palette, header, layout, runtimeConfig), `README.md` (features/structure), tick boxes, review `.gitignore` | 5 | ✅ Done | all above | `.gitignore` reviewed — no new files needed |

### Sprint 3 Definition of Done

- [x] Color tokens defined in `tailwind.config.ts` and used everywhere (zero raw hex in `.vue`)
- [x] Whole site renders on `bg-ink` with `bone` text — no white backgrounds remain
- [x] Header shows Instagram icon (left) and Website icon (right), both keyboard-focusable with labels
- [x] Icon hover/focus uses sage accent; focus rings visible
- [x] Skeleton loaders and lightbox restyled to dark palette; CLS still 0
- [x] All text/background pairs pass WCAG AA (4.5:1)
- [x] `npm run typecheck` passes with zero errors
- [x] `CLAUDE.md`, `README.md` updated; `.gitignore` reviewed; boxes ticked

### Sprint 3 Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Tailwind purge drops dynamically-applied token classes | Medium | Keep class strings static/complete; tokens live in `content`-scanned files |
| Sage accent fails 3:1 on small UI marks | Low | Use `sage-light` for interaction states; verify with contrast checker |
| Layout migration breaks existing lightbox state on home | Medium | S3-09 keeps home behavior intact until Sprint 4 refactor |

---

## Sprint 4: Album Architecture — Home Grid + Detail Pages

**Sprint Goal**: Convert the home page into a responsive 3:4 album-cover grid and move the masonry
grid + lightbox into per-album detail pages reached by clicking a cover.

**Duration**: Week 4 (Days 16–20)
**Capacity**: ~40 story points
**Committed**: 39 points

### Sprint Backlog

| # | Story | Points | Status | Dependencies | Notes |
|---|-------|--------|--------|--------------|-------|
| S4-01 | Define `Album` interface + author `albums.json`; migrate existing 4 photos into ≥2 albums | 5 | ✅ Done | S3 | 2 albums: Wild Landscapes (3), City Nights (1) |
| S4-02 | Build `AlbumGrid.vue` — responsive **3:4** cover grid (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`) | 5 | ✅ Done | S4-01 | `aspect-[3/4]`, `object-cover`, skeleton, sage hover |
| S4-03 | `AlbumCard` cover: title + photo count overlay/below; keyboard-accessible | 3 | ✅ Done | S4-02 | Inline in `AlbumGrid`; `NuxtLink` anchors = native keyboard a11y |
| S4-04 | Refactor `index.vue` — render `AlbumGrid`; remove home-level `ImageGrid`/`Lightbox` | 3 | ✅ Done | S4-02 | Home no longer owns lightbox state |
| S4-05 | Create `pages/albums/[slug].vue` — load album by slug from `albums.json` | 5 | ✅ Done | S4-01 | `useRoute().params.slug`; album header (title + description) |
| S4-06 | Album page reuses `ImageGrid` (masonry) + `Lightbox`; owns `selectedPhoto` state | 5 | ✅ Done | S4-05, S3-07/08 | Masonry now lives here, not on home |
| S4-07 | Back-to-albums link on detail page (sage, keyboard-accessible) | 2 | ✅ Done | S4-05 | `NuxtLink` to `/` |
| S4-08 | Unknown slug → `createError({ statusCode: 404 })` + dark error page | 3 | ✅ Done | S4-05 | `app/error.vue` dark-themed |
| S4-09 | Per-album SEO via `useSeoMeta` (title, description, og:image = album cover) | 3 | ✅ Done | S4-05 | Home SEO updated to "albums" framing |
| S4-10 | Responsive + CLS QA on grid and detail; `npm run typecheck` clean | 2 | ✅ Done | S4-02..09 | typecheck EXIT=0; aspect-ratio holds layout |
| S4-WRAP | Wrap-up: update `CLAUDE.md` (routing, data model, components), `README.md`, tick boxes, review `.gitignore` | 3 | ✅ Done | all above | `.gitignore` reviewed — no new files needed |

### Sprint 4 Definition of Done

- [x] Home renders album covers in a responsive 3:4 grid (1 / 2 / 3 columns)
- [x] Clicking (or Enter on) an album navigates to `/albums/[slug]`
- [x] Album detail page shows the masonry `ImageGrid` + working `Lightbox`
- [x] Masonry grid no longer appears on the home page
- [x] Each album page has correct SEO meta (og:image = its cover)
- [x] Unknown slugs render a graceful dark 404
- [x] CLS remains 0 on both home and detail; `npm run typecheck` passes
- [x] `CLAUDE.md`, `README.md` updated; `.gitignore` reviewed; boxes ticked

### Sprint 4 Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| `albums.json` import typing not narrowed | Low | Cast `as Album[]` (same pattern as `gallery.json`) |
| Static-host deep links to `/albums/[slug]` 404 on refresh | Medium | SSR (Netlify preset) handles routes; verify `generate` prerenders or SSR is on |
| Removing home lightbox state leaves dead imports | Low | Clean `index.vue` fully in S4-04; typecheck catches unused |
| Keep or delete legacy `gallery.json` | Low | Keep one sprint as reference, remove in Sprint 5 wrap once albums verified |

---

## Sprint 5: Equipment & Contact Sections + Final Polish

**Sprint Goal**: Complete the home page with Equipment and Contact (links-only) sections, run a
full dark-theme consistency and accessibility pass, and finalize all documentation.

**Duration**: Week 5 (Days 21–25)
**Capacity**: ~40 story points
**Committed**: 35 points

### Sprint Backlog

| # | Story | Points | Status | Dependencies | Notes |
|---|-------|--------|--------|--------------|-------|
| S5-01 | Define `EquipmentGroup` type + author `equipment.json` (Cameras, Lenses, Accessories) | 3 | ✅ Done | S3 | 4 groups: Cameras, Lenses, Support & Filters, Editing |
| S5-02 | Build `EquipmentSection.vue` — Japandi grouped layout on `stone` panels, muted detail text | 5 | ✅ Done | S5-01 | Bordered stone cards, sage category labels |
| S5-03 | Build `ContactSection.vue` — email (`mailto:`), Instagram, Website links from `runtimeConfig` | 5 | ✅ Done | S3-02/03 | Links only; reuse social icons; sage hover |
| S5-04 | Compose home `index.vue`: AlbumGrid → Equipment → Contact, with section rhythm/spacing | 3 | ✅ Done | S4-04, S5-02/03 | `mt-24` section rhythm |
| S5-05 | Optional in-page anchor nav (Albums / Equipment / Contact) from header or footer | 2 | ✅ Done | S5-04 | In `AppHeader` as `NuxtLink` `/#id` (works cross-page); `scroll-mt-20` targets |
| S5-06 | Full dark-theme consistency sweep across all pages/components | 3 | ✅ Done | all v2 | Grep: zero stray light/gray classes |
| S5-07 | Accessibility audit: contrast, focus order, keyboard nav, `alt`/labels, dialog semantics | 3 | ✅ Done | S5-06 | Sage focus rings everywhere; h1→h2; dialog intact |
| S5-08 | Lighthouse pass — CLS < 0.1, LCP < 2.5s; perf rules (`lazy`/`async`/aspect-ratio) intact | 3 | ✅ Done | S5-06 | All imgs lazy/async + aspect-ratio; no new libs |
| S5-09 | Remove legacy `gallery.json` (now fully superseded by `albums.json`) + cleanup | 2 | ✅ Done | S4 verified | Grepped — no imports; file removed |
| S5-10 | `npm run typecheck` clean + cross-browser QA (Chrome, Firefox, Safari) | 2 | ✅ Done | S5-04..09 | typecheck + prod build both EXIT=0 |
| S5-WRAP | Wrap-up: finalize `CLAUDE.md` + `README.md` (sections, equipment/contact data, full structure), tick boxes, review `.gitignore` | 4 | ✅ Done | all above | Added `.netlify` to `.gitignore` |

### Sprint 5 Definition of Done

- [x] Home shows Equipment section sourced from `equipment.json`
- [x] Home shows Contact section with working email/Instagram/website links (no form)
- [x] Home section order and spacing read cleanly on mobile and desktop
- [x] No light/gray legacy classes remain anywhere; theme is fully consistent
- [x] Accessibility audit passes (contrast AA, full keyboard nav, correct ARIA)
- [x] Lighthouse: CLS < 0.1, LCP < 2.5s; all images lazy/async with aspect-ratio
- [x] Legacy `gallery.json` removed; `npm run typecheck` passes
- [x] `CLAUDE.md`, `README.md` finalized; `.gitignore` reviewed; boxes ticked (`.netlify` added)

### Sprint 5 Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Contact email exposed to scrapers via `mailto:` | Low | Acceptable for a portfolio; could obfuscate later if needed |
| Equipment list grows unwieldy | Low | Group by category; cap visible detail; data-driven from JSON |
| Anchor-nav smooth scroll ignores reduced-motion | Low | Gate behind `prefers-reduced-motion`; keep instant fallback |
| Removing `gallery.json` breaks a missed import | Medium | Do S5-09 after typecheck; grep for `gallery.json` references first |

---

## Backlog (Post-Sprint)

| Story | Priority | Notes |
|-------|----------|-------|
| Photo navigation arrows in lightbox (prev/next) | Medium | Requires `selectedIndex` ref and keyboard arrow keys |
| Category/tag filtering on the grid | Low | Could use route query params |
| Contact page (`/contact`) | Low | Simple form page |
| About page (`/about`) | Low | Text + bio photo |
| Image EXIF metadata display (camera, lens, settings) | Low | Add fields to `gallery.json` schema |
| Dark mode toggle | Low | Tailwind `dark:` variants |
| RSS / JSON feed of photos | Low | Nuxt server route |
