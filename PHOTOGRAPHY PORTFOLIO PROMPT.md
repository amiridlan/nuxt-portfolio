# Role & Project Overview
Your task is to plan, document, and generate a highly optimized photography portfolio website based on the technical and structural specifications below.

## Tech Stack & Architecture

- **Framework**: Nuxt 3 (Configured for universal/on-demand SSR rendering)
- **Deployment Platform**: Netlify (Utilizing Netlify Functions for SSR execution)
- **Styling**: Tailwind CSS
- **Media Hosting**: Cloudflare R2 Bucket (Assets served via a public custom domain)
- **State/Data**: Local JSON file for image metadata
- **CI/CD**: GitHub Actions automation targeting Netlify production branches

## Performance & UX Requirements

1. **Zero Layout Shifts**: Every image container must prevent Cumulative Layout Shift (CLS) by utilizing modern CSS aspect-ratio properties based on the image's original dimensions.
2. **Masonry Flex Grid**: Build a multi-column CSS columns layout (`columns-1 md:columns-2 lg:columns-3 gap-4`) to support a seamless, fluid Pinterest-style layout handling vertical and horizontal photos elegantly.
3. **Typography**: Image titles and captions must render cleanly *below* each respective photo, not as a hover overlay.
4. **Loading Skeletons**: Display a matching aspect-ratio skeleton placeholder loader while the image is fetching. Ensure smooth opacity cross-fades when the real image finishes loading.
5. **Lazy Loading**: Implement native browser lazy loading (`loading="lazy"`) and asynchronous decoding (`decoding="async"`) for all grid images below the fold.
6. **No Bulky Libraries**: Avoid heavy third-party carousel or lightbox dependencies. Use lightweight, native Vue Composition API logic for UI interactions.

## Directory Structure to Create

Please set up a modular Nuxt 3 layout including:

- `/data/gallery.json` (The local metadata registry)
- `/components/ImageGrid.vue` (The responsive masonry portfolio grid with skeletons)
- `/components/Lightbox.vue` (A clean, performance-optimized full-screen viewer)
- `/pages/index.vue` (The main landing page with dynamic SEO)
- `nuxt.config.ts` (With explicit Netlify Nitro presets and performance tweaks)
- `.github/workflows/deploy.yml` (The automated GitHub Actions CI/CD pipeline)
- `README.md` (Project and onboarding documentation)
- `CLAUDE.md` (Developer/Agent guide for commands and code style guidelines)

## Detailed File & Documentation Specifications

### 1. Project Management: Agile Sprint Plan

Before outputting code files, output a clean, markdown-table-based **2-Week Sprint Plan** breaking down the development process.

- **Sprint 1 (Week 1)**: Core infrastructure, data structures, and baseline masonry grid templates.
- **Sprint 2 (Week 2)**: Lightbox UI integration, performance tweaking, skeleton polish, dynamic SEO, and production GitHub Actions setup.

### 2. Project Documentation (`README.md`)

Create an end-user readable overview detailing:

- Setup instructions (`npm install`, `npm run dev`, `npm run build`).
- Architecture map explaining the relationship between the Nuxt SSR front-end, Netlify deployment hooks, and the external Cloudflare R2 image bucket storage system.

### 3. Agent & Developer Operations Guide (`CLAUDE.md`)

Create a strict operations file detailing:

- **Build/Lint Commands**: Explicit list of build, dev, and type-check terminal commands.
- **Code Style Guidelines**: Standard syntax preferences (Composition API, `<script setup>`, explicit TypeScript typings for the gallery schema, precise Tailwind class pattern rules).

### 4. Metadata Schema (`/data/gallery.json`)

Populate this with a mock array of 4 items featuring mixed aspect ratios (portrait and landscape) using this structure:
[
{
"id": "sample-1",
"filename": "iceland.jpg",
"title": "Icelandic Highlands",
"alt": "Dramatic mountains in Iceland",
"aspectRatio": "2/3"
},
{
"id": "sample-2",
"filename": "desert.jpg",
"title": "Sahara Dunes",
"alt": "Sands under sunset",
"aspectRatio": "3/2"
}
]

### 5. Configuration (`nuxt.config.ts`)

Set up a clean config. Explicitly define the `nitro: { preset: 'netlify' }` architecture parameter to ensure proper SSR serverless function routing. Hardcode a constant placeholder for the Cloudflare R2 public base URL (e.g., `https://example.com`). Ensure default meta tags for mobile responsiveness are included.

### 6. Main Page with Dynamic SEO (`/pages/index.vue`)

- Import the gallery data registry.
- Implement Nuxt 3 `useHead` or `useSeoMeta` to dynamically map page meta tags (Title, Description, OpenGraph Image, and Twitter Cards) targeting the portfolio archive.

### 7. The Grid & Skeleton Component (`/components/ImageGrid.vue`)

- Map through the JSON data using Tailwind's column layout (`break-inside-avoid-column mb-4`).
- Base URL constant should point to your public R2 domain placeholder.
- Add a local template `boolean` reactive state for each image (`isLoaded = false`).
- Render a pulse-animated Tailwind skeleton (`animate-pulse bg-gray-200`) explicitly maintaining the image's layout reservation (`:style="{ aspectRatio: photo.aspectRatio }"`) while `isLoaded` is false.
- Trigger `@load="isLoaded = true"` on the native `<img>` element to cleanly transition the opacity from the skeleton to the image.
- Emits an event to open the Lightbox component when an image container is clicked.

### 8. The Lightbox Component (`/components/Lightbox.vue`)

- Create a minimal modal overlay that triggers when a grid image is selected.
- Must include smooth fade-in transitions using standard Nuxt `<Transition>`.
- Implement closing mechanisms via keyboard 'Escape' key listener, clicking an 'X' button, or clicking outside the photo layout framework.

### 9. GitHub Actions Workflows (`.github/workflows/deploy.yml`)

Provide a standard GitHub Action template file triggered on `push` events to the `main` branch.

- It must checkout the code, setup Node.js, cache `node_modules`, install dependencies using `npm ci`, and execute the `npm run build` command.
- Include placeholders for deploying directly via the `Netlify CLI` (`netlify-cli`) using repository secret strings (`secrets.NETLIFY_AUTH_TOKEN` and `secrets.NETLIFY_SITE_ID`).

## Output Deliverables

Please output the Agile sprint plan, then write the complete, production-ready code files for `README.md`, `CLAUDE.md`, `nuxt.config.ts`, `gallery.json`, `index.vue`, `ImageGrid.vue`, `Lightbox.vue`, and `deploy.yml`.