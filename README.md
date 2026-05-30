# Photography Portfolio

A minimal, performance-first photography portfolio built with **Nuxt 4**, deployed on **Netlify** with SSR via Netlify Functions, and serving images from **Cloudflare R2**.

## Features

- Dark **Muji / Japandi** design system — 60/30/10 palette (charcoal · warm stone · sage) defined as Tailwind tokens
- Shared header with **Instagram** (left) and **Website** (right) icon links + footer
- **Album-based browsing** — responsive 3:4 cover grid on the home page; each album opens its own page
- Pinterest-style masonry grid inside each album — zero layout shifts (CLS = 0)
- **Equipment** section (data-driven) and **Contact** section (email · Instagram · website links) on the home page
- Skeleton loaders with smooth opacity cross-fades
- Full-screen lightbox (Escape / ✕ / outside-click to close)
- Native lazy loading (`loading="lazy"`, `decoding="async"`)
- Inline SVG icons — no icon library
- Dynamic SEO meta tags — Open Graph + Twitter Cards
- Automated CI/CD via GitHub Actions → Netlify

---

## Architecture

```
┌──────────────────────────────────────────────────────────┐
│                      User's Browser                       │
└────────────────────────────┬─────────────────────────────┘
                             │ HTTPS Request
                             ▼
┌──────────────────────────────────────────────────────────┐
│                  Netlify CDN + Edge Network               │
│  ┌─────────────────────────────────────────────────────┐ │
│  │  Nuxt 4 SSR → Netlify Functions (Nitro preset)      │ │
│  │  Renders HTML server-side, hydrates on client       │ │
│  └─────────────────────────────────────────────────────┘ │
│  ┌─────────────────────────────────────────────────────┐ │
│  │  Static assets cached at Netlify CDN edge nodes     │ │
│  └─────────────────────────────────────────────────────┘ │
└────────────────────────────┬─────────────────────────────┘
                             │ <img src="..."> requests
                             ▼
┌──────────────────────────────────────────────────────────┐
│                  Cloudflare R2 Bucket                     │
│  Custom public domain: https://cdn.yourdomain.com        │
│  Stores: iceland.jpg · desert.jpg · forest.jpg · ...     │
│  Zero egress fees · Global delivery via Cloudflare CDN   │
└──────────────────────────────────────────────────────────┘

Data flow:
  gallery.json (local metadata) → Nuxt page (SSR render)
  → HTML with <img src="${R2_URL}/filename.jpg">
  → Browser fetches images directly from Cloudflare R2
```

### Why this stack?

| Layer | Choice | Reason |
|-------|--------|--------|
| Framework | Nuxt 4 | SSR for SEO, Vue 3 Composition API, file-based routing |
| Hosting | Netlify | Serverless SSR via Netlify Functions, global CDN, free tier |
| Images | Cloudflare R2 | Zero egress fees, Cloudflare's global network, S3-compatible |
| Styling | Tailwind CSS | Utility-first, no runtime CSS, purge-ready for production |
| CI/CD | GitHub Actions | Push-to-deploy on `main`, built-in secrets management |

---

## Quick Start

### Prerequisites

- Node.js 20+
- npm 10+

### Install

```bash
git clone https://github.com/YOUR_USERNAME/nuxt-portfolio.git
cd nuxt-portfolio
npm install
```

### Configure

Create a `.env` file at the project root:

```env
# Your Cloudflare R2 bucket's public custom domain
NUXT_PUBLIC_R2_BASE_URL=https://cdn.yourdomain.com

# Social / contact links (header, footer, contact section)
NUXT_PUBLIC_INSTAGRAM_URL=https://instagram.com/yourhandle
NUXT_PUBLIC_WEBSITE_URL=https://yourdomain.com
NUXT_PUBLIC_CONTACT_EMAIL=hello@yourdomain.com
```

> During development, the placeholder URL (`https://example.com`) is used.
> Images will show the skeleton loader indefinitely until a real R2 URL is set.

### Run

```bash
# Start dev server with hot reload at http://localhost:3000
npm run dev

# Build for production (outputs to .output/)
npm run build

# Preview the production build locally
npm run preview

# TypeScript type checking
npm run typecheck
```

---

## Project Structure

```
nuxt-portfolio/
├── app/                         ← Nuxt 4 source directory (srcDir)
│   ├── app.vue                  ← Root (NuxtRouteAnnouncer + NuxtLayout + NuxtPage)
│   ├── error.vue                ← Dark-themed 404 / error page
│   ├── layouts/
│   │   └── default.vue          ← Dark shell: header + footer + bg-ink/text-bone
│   ├── pages/
│   │   ├── index.vue            ← Home: album grid + equipment + contact + SEO
│   │   └── albums/
│   │       └── [slug].vue       ← Album detail: masonry grid + lightbox + SEO
│   ├── components/
│   │   ├── AppHeader.vue        ← Instagram (left) · wordmark · Website (right)
│   │   ├── AppFooter.vue        ← Copyright + social links
│   │   ├── IconInstagram.vue    ← Inline SVG icon
│   │   ├── IconWebsite.vue      ← Inline SVG icon
│   │   ├── AlbumGrid.vue        ← Responsive 3:4 album-cover grid
│   │   ├── EquipmentSection.vue ← Grouped equipment list (home)
│   │   ├── ContactSection.vue   ← Email · Instagram · website links (home)
│   │   ├── ImageGrid.vue        ← Masonry grid with aspect-ratio skeletons
│   │   └── Lightbox.vue         ← Full-screen viewer with fade transition
│   └── data/
│       ├── albums.json          ← Albums + nested photo metadata (edit to add albums/photos)
│       └── equipment.json       ← Equipment groups shown on the home page
├── public/                      ← Static assets served as-is
├── .github/
│   └── workflows/
│       └── deploy.yml           ← GitHub Actions CI/CD pipeline
├── nuxt.config.ts               ← Nuxt config: Nitro preset, modules, runtimeConfig
├── CLAUDE.md                    ← Developer & agent operations guide
└── SPRINTS PLAN.md              ← Agile sprint plan and task checklist
```

---

## Adding Albums & Photos

Photos live **inside albums**. The home page shows each album's 3:4 cover; clicking one opens
`/albums/[slug]` with that album's masonry grid.

1. Upload your images (and a cover) to your Cloudflare R2 bucket
2. Open `app/data/albums.json` and add an album, or add photos to an existing one:

```json
{
  "id": "your-album-id",
  "slug": "your-album-slug",
  "title": "Album Title",
  "description": "Short intro shown on the album page.",
  "cover": "cover-photo.jpg",
  "photos": [
    {
      "id": "your-unique-photo-id",
      "filename": "your-photo.jpg",
      "title": "Display Title",
      "alt": "Descriptive alt text for accessibility",
      "aspectRatio": "3/2"
    }
  ]
}
```

> `slug` becomes the URL (`/albums/your-album-slug`) — use kebab-case. `cover` is framed 3:4 on
> the home grid, so a portrait-ish image works best.

**Common aspect ratios:**

| Value | Shape | Use case |
|-------|-------|----------|
| `"2/3"` | Tall portrait | 35mm portrait orientation |
| `"3/2"` | Wide landscape | Standard landscape |
| `"4/5"` | Slight portrait | Instagram-style |
| `"1/1"` | Square | Detail shots |
| `"16/9"` | Widescreen | Panoramas |

---

## Deploying to Netlify

### 1. Set up Cloudflare R2

1. Create an R2 bucket in your Cloudflare dashboard
2. Upload your photos to the bucket
3. Enable **Public Access** on the bucket
4. Add a **Custom Domain** (e.g. `cdn.yourdomain.com`) — this becomes your `R2_BASE_URL`

### 2. Add GitHub Secrets

In your GitHub repository: **Settings → Secrets and variables → Actions → New repository secret**

| Secret name | Where to find it |
|-------------|-----------------|
| `NETLIFY_AUTH_TOKEN` | Netlify → User Settings → Applications → Personal access tokens |
| `NETLIFY_SITE_ID` | Netlify → Site → Site configuration → API ID |
| `R2_BASE_URL` | Your R2 custom domain, e.g. `https://cdn.yourdomain.com` |

### 3. Push to Deploy

```bash
git add .
git commit -m "Initial deploy"
git push origin main
```

GitHub Actions will install dependencies, build the Nuxt SSR bundle, and deploy to Netlify automatically.

---

## Troubleshooting

### Images show skeleton loaders indefinitely

**Cause:** `NUXT_PUBLIC_R2_BASE_URL` is not set or the R2 bucket is not publicly accessible.

**Fix:** Set the env variable in `.env` and confirm your R2 bucket has public access enabled.

### `npm run build` fails with Netlify preset error

**Cause:** Netlify preset requires a specific Node version or missing `netlify.toml`.

**Fix:** Ensure Node 20+ is installed. Add a `netlify.toml` to the project root:

```toml
[build]
  command = "npm run build"
  publish = ".netlify/static"

[build.environment]
  NODE_VERSION = "20"
```

### TypeScript errors on JSON import

**Cause:** TypeScript strict mode — JSON import type is not narrowed automatically.

**Fix:** Cast the import: `const photos = galleryData as GalleryPhoto[]`

---

## License

MIT
