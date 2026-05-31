# Amir Idlan — Photography Portfolio

A minimal, performance-first photography portfolio built with **Nuxt 4**, statically generated and deployed on **Netlify**, with images served from **Cloudflare R2**.

---

## Quick Start

### Prerequisites

- Node.js 20+
- npm 10+

### Install

```bash
git clone https://github.com/amiridlan/nuxt-portfolio.git
cd nuxt-portfolio
npm install
```

### Configure

Create a `.env` file at the project root:

```env
# Cloudflare R2 bucket public custom domain
NUXT_PUBLIC_R2_BASE_URL=https://cdn.yourdomain.com

# Social / contact links (header, footer, contact section)
NUXT_PUBLIC_INSTAGRAM_URL=https://instagram.com/yourhandle
NUXT_PUBLIC_WEBSITE_URL=https://yourdomain.com
NUXT_PUBLIC_CONTACT_EMAIL=hello@yourdomain.com
```

> Images show skeleton loaders until a real `R2_BASE_URL` is set.

### Run

```bash
npm run dev        # Dev server with HMR at http://localhost:3000
npm run generate   # Fully static output → .output/public/
npm run build      # SSR production build → .output/
npm run preview    # Preview production build locally
npm run typecheck  # TypeScript type checking
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
│   │   ├── AppHeader.vue        ← Instagram (left) · wordmark + nav · Website (right)
│   │   ├── AppFooter.vue        ← Copyright + social links
│   │   ├── IconInstagram.vue    ← Inline SVG icon
│   │   ├── IconWebsite.vue      ← Inline SVG icon
│   │   ├── AlbumGrid.vue        ← Responsive 3:4 album-cover grid
│   │   ├── EquipmentSection.vue ← Grouped equipment list (home)
│   │   ├── ContactSection.vue   ← Email · Instagram · website links (home)
│   │   ├── ImageGrid.vue        ← Masonry grid with aspect-ratio skeletons
│   │   └── Lightbox.vue         ← Full-screen viewer with fade transition
│   └── data/
│       ├── albums.json          ← Albums + nested photo metadata (single source of truth)
│       └── equipment.json       ← Equipment groups shown on the home page
├── public/                      ← Static assets served as-is
├── .github/
│   └── workflows/
│       └── deploy.yml           ← GitHub Actions: generate + deploy to Netlify
├── nuxt.config.ts               ← Nuxt config: runtimeConfig, Nitro prerender
├── tailwind.config.ts           ← Design tokens (Japandi color palette)
└── CLAUDE.md                    ← Developer & agent operations guide
```

---

## Adding Albums & Photos

1. Upload images to your Cloudflare R2 bucket (AVIF recommended)
2. Open `app/data/albums.json` and add an album or photos to an existing one:

```json
{
  "id": "your-album-id",
  "slug": "your-album-slug",
  "title": "Album Title",
  "description": "Short intro shown on the album page.",
  "cover": "folder/cover.avif",
  "photos": [
    {
      "id": "unique-photo-id",
      "filename": "folder/photo.avif",
      "title": "Display Title",
      "alt": "Descriptive alt text for accessibility",
      "aspectRatio": "3/2"
    }
  ]
}
```

> `slug` becomes the URL path (`/albums/your-album-slug`) — use kebab-case.

**Common aspect ratios:**

| Value    | Shape                             |
| -------- | --------------------------------- |
| `"2/3"`  | Tall portrait (35mm)              |
| `"3/2"`  | Wide landscape                    |
| `"4/5"`  | Slight portrait (Instagram-style) |
| `"1/1"`  | Square                            |
| `"16/9"` | Widescreen / panorama             |

---

## Deploying to Netlify

### 1. Set up Cloudflare R2

1. Create an R2 bucket in your Cloudflare dashboard
2. Upload your photos
3. Enable **Public Access** and add a **Custom Domain** (e.g. `cdn.yourdomain.com`)

### 2. Add GitHub Secrets

**Settings → Secrets and variables → Actions → New repository secret**

| Secret name                 | Description                                              |
| --------------------------- | -------------------------------------------------------- |
| `NETLIFY_AUTH_TOKEN`        | Netlify → User Settings → Personal access tokens         |
| `NETLIFY_SITE_ID`           | Netlify → Site configuration → API ID                    |
| `R2_BASE_URL`               | Your R2 custom domain, e.g. `https://cdn.yourdomain.com` |
| `NUXT_PUBLIC_INSTAGRAM_URL` | Full Instagram profile URL                               |
| `NUXT_PUBLIC_WEBSITE_URL`   | Your website URL                                         |
| `NUXT_PUBLIC_CONTACT_EMAIL` | Contact email address                                    |

### 3. Push to Deploy

```bash
git push origin main
```

GitHub Actions runs `npm run generate`, outputs to `.output/public/`, and deploys via Netlify CLI.

---

## Troubleshooting

**Images show skeleton loaders indefinitely** — `NUXT_PUBLIC_R2_BASE_URL` is not set or the R2 bucket does not have public access enabled.

**TypeScript errors on JSON import** — cast the import explicitly: `const albums = albumsData as Album[]`

---

## License

MIT
