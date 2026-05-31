# Deployment Guide

This guide walks through setting up **Cloudflare R2** (image hosting) and **Netlify** (site hosting)
from scratch, then wiring them together via GitHub Actions for push-to-deploy.

---

## Overview

```
Your photos
    │
    ▼
Cloudflare R2 Bucket  ──►  Public CDN URL  ──►  NUXT_PUBLIC_R2_BASE_URL env var
                                                         │
GitHub repo (main branch)                               │
    │                                                    │
    ▼  (push triggers)                                  │
GitHub Actions CI                                        │
    │  npm ci → npm run build (injects env var) ◄────────┘
    │  netlify deploy --prod
    ▼
Netlify (SSR via Netlify Functions)
    │
    ▼
Live site at https://yoursite.netlify.app
```

**What you need before starting:**

- A [Cloudflare account](https://dash.cloudflare.com/sign-up) (free)
- A [Netlify account](https://app.netlify.com/signup) (free)
- A [GitHub account](https://github.com) with this repo pushed to it

---

## Part 1 — Cloudflare R2 (Image Hosting)

R2 stores your photos and serves them via a public URL you put in `NUXT_PUBLIC_R2_BASE_URL`.
Zero egress fees — Cloudflare does not charge you for image downloads.

### Step 1 — Enable R2 on your Cloudflare account

1. Log in to [dash.cloudflare.com](https://dash.cloudflare.com)
2. In the left sidebar, click **R2 Object Storage**
3. If prompted, click **Purchase R2** — it is free up to 10 GB storage / 10M reads per month,
   no credit card required for the free tier (you may need to add a card to unlock the service)

### Step 2 — Create a bucket

1. Click **Create bucket**
2. **Bucket name:** use something like `portfolio-photos` (lowercase, hyphens only)
3. **Location:** leave as _Automatic_ unless you have a specific region preference
4. Click **Create bucket**

### Step 3 — Upload your photos

1. Open the bucket you just created
2. Click **Upload** → drag and drop your `.jpg` / `.webp` files
3. Keep filenames clean — lowercase, hyphens, no spaces (e.g. `qwer-rockation-01.jpg`)
4. These filenames are what you put in `albums.json` under `"filename"` and `"cover"`

> **Tip:** You can create "folders" by prefixing filenames with a path like `events/filename.jpg`,
> but the portfolio just uses flat filenames — keep it simple.

### Step 4 — Enable public access

By default R2 buckets are private. You need to make yours publicly readable.

1. Inside your bucket, go to the **Settings** tab
2. Scroll to **Public access**
3. Under **R2.dev subdomain**, click **Allow Access**
4. Confirm the prompt — Cloudflare will give you a URL like:
   ```
   https://pub-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.r2.dev
   ```
   Copy this — it becomes your `NUXT_PUBLIC_R2_BASE_URL`.

> **Recommended instead — Custom domain (cleaner URLs):**
> If you have a domain on Cloudflare (e.g. `amiridlan.my`), you can serve images from
> `cdn.amiridlan.my` instead of the long `r2.dev` URL.
>
> 1. In bucket **Settings → Custom Domains**, click **Connect Domain**
> 2. Enter a subdomain like `cdn.amiridlan.my`
> 3. Cloudflare auto-creates the DNS record — approve it
> 4. Use `https://cdn.amiridlan.my` as your `NUXT_PUBLIC_R2_BASE_URL`

### Step 5 — Test your URL

After enabling public access, test that a photo is reachable by opening:

```
https://YOUR_R2_URL/your-photo.jpg
```

in a browser. You should see the image. If you get a 403, go back to Step 4 — access is not yet public.

### Step 6 — Note your R2 URL

Write down your public base URL (no trailing slash):

```
https://pub-xxxxxxxxxxxxxxxx.r2.dev
   or
https://cdn.amiridlan.my
```

You will use this in Part 2 and Part 3.

---

## Part 2 — Netlify (Site Hosting)

### Step 1 — Push the repo to GitHub

If you have not already done this:

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/nuxt-portfolio.git
git push -u origin main
```

### Step 2 — Create a new Netlify site

1. Log in to [app.netlify.com](https://app.netlify.com)
2. Click **Add new site → Import an existing project**
3. Choose **GitHub** and authorise Netlify to access your repos
4. Select your `nuxt-portfolio` repository

### Step 3 — Configure the build settings

Netlify may auto-detect these from `netlify.toml` — verify they match:

| Setting               | Value             |
| --------------------- | ----------------- |
| **Base directory**    | _(leave blank)_   |
| **Build command**     | `npm run build`   |
| **Publish directory** | `.netlify/static` |

> These are already set correctly in `netlify.toml` at the project root — Netlify reads it
> automatically. You should not need to change anything here.

### Step 4 — Add environment variables in Netlify

1. In your Netlify site dashboard, go to **Site configuration → Environment variables**
2. Click **Add a variable** for each of the following:

| Variable                    | Value                                       |
| --------------------------- | ------------------------------------------- |
| `NUXT_PUBLIC_R2_BASE_URL`   | Your R2 public URL from Part 1 Step 6       |
| `NUXT_PUBLIC_INSTAGRAM_URL` | e.g. `https://www.instagram.com/_amirmir6/` |
| `NUXT_PUBLIC_WEBSITE_URL`   | e.g. `https://amiridlan.my/`                |
| `NUXT_PUBLIC_CONTACT_EMAIL` | e.g. `amiridlan6@gmail.com`                 |

> These are **not** the same as GitHub secrets. Netlify's env vars are used when you trigger a
> build directly from the Netlify dashboard. GitHub secrets (Part 3) are used when CI builds.

### Step 5 — Deploy from Netlify dashboard (first deploy)

1. Click **Deploy site** — Netlify will clone your repo, run `npm run build`, and go live
2. Once done, your site will be live at a URL like `https://random-name-123.netlify.app`
3. You can rename this in **Site configuration → Site details → Change site name**

### Step 6 — Add custom domain (photography.amiridlan.my)

Since `amiridlan.my` is on Cloudflare, the DNS record needs to be set there, not in Netlify.

**In Netlify:**

1. Go to **Domain management → Add a domain**
2. Enter `photography.amiridlan.my` and click **Verify** → **Add domain**
3. Netlify will show a pending DNS verification screen — leave this open

**In Cloudflare (amiridlan.my zone):**

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com) → select `amiridlan.my` → **DNS → Records**
2. Click **Add record**:

   | Type    | Name          | Target                       | Proxy status              |
   | ------- | ------------- | ---------------------------- | ------------------------- |
   | `CNAME` | `photography` | `your-site-name.netlify.app` | **DNS only (grey cloud)** |

   > The target is your Netlify subdomain — find it in **Site configuration → Site details → Netlify subdomain**.
   > The proxy **must be grey cloud (DNS only)** — orange cloud (proxied) will break Netlify's SSL certificate provisioning.

3. Save the record — DNS propagation takes 1–5 minutes (sometimes up to an hour)

**Back in Netlify:** 4. Click **Verify DNS configuration** — once it detects the record, Netlify automatically provisions a free SSL certificate via Let's Encrypt 5. Your site will be live at `https://photography.amiridlan.my`

> **HTTPS:** Netlify handles SSL automatically — no extra setup needed.

---

## Part 3 — GitHub Actions (Push-to-Deploy)

The CI/CD pipeline (`.github/workflows/deploy.yml`) automatically builds and deploys to Netlify
every time you push to `main`. This requires three GitHub secrets.

### Step 1 — Get your Netlify Auth Token

1. In Netlify, click your **avatar (top right) → User settings → Applications**
2. Under **Personal access tokens**, click **New access token**
3. Give it a name like `github-actions` and click **Generate token**
4. Copy the token — you will not see it again

### Step 2 — Get your Netlify Site ID

1. In your Netlify site dashboard, go to **Site configuration → Site details**
2. Copy the **App ID** (also called Site ID) — it looks like `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`

### Step 3 — Add secrets to GitHub

1. Go to your GitHub repository → **Settings → Secrets and variables → Actions**
2. Click **New repository secret** for each:

| Secret name          | Value                                 |
| -------------------- | ------------------------------------- |
| `NETLIFY_AUTH_TOKEN` | Token from Step 1                     |
| `NETLIFY_SITE_ID`    | Site ID from Step 2                   |
| `R2_BASE_URL`        | Your R2 public URL from Part 1 Step 6 |

> Note: The CI workflow injects `R2_BASE_URL` as `NUXT_PUBLIC_R2_BASE_URL` at build time.
> The other social/contact env vars default to the values hardcoded in `nuxt.config.ts` —
> add them as GitHub secrets too if you want to override them in CI:
> `NUXT_PUBLIC_INSTAGRAM_URL`, `NUXT_PUBLIC_WEBSITE_URL`, `NUXT_PUBLIC_CONTACT_EMAIL`

### Step 4 — Trigger your first CI deploy

Push any change to `main`:

```bash
git add .
git commit -m "chore: trigger first CI deploy"
git push origin main
```

Then go to your GitHub repo → **Actions** tab to watch the workflow run. A green tick means
the deploy succeeded. A red cross means something failed — click the job to see the logs.

---

## Part 4 — Adding Photos to an Album

Once deployed, adding new photos is a two-step process:

1. **Upload to R2** — drag the file into your R2 bucket (Cloudflare dashboard)
2. **Update `albums.json`** — add the entry and push to `main`; CI redeploys automatically

```json
{
  "id": "new-event-2026",
  "slug": "new-event-2026",
  "title": "NEW EVENT 2026",
  "description": "Short description shown on the album page.",
  "cover": "new-event-cover.jpg",
  "photos": [
    {
      "id": "new-event-01",
      "filename": "new-event-01.jpg",
      "title": "Shot title",
      "alt": "Descriptive text for screen readers",
      "aspectRatio": "3/2"
    }
  ]
}
```

**Common aspect ratios:**

| Value    | Shape                 |
| -------- | --------------------- |
| `"2/3"`  | Tall portrait (35mm)  |
| `"3/2"`  | Landscape             |
| `"4/5"`  | Slight portrait       |
| `"1/1"`  | Square                |
| `"16/9"` | Widescreen / panorama |

---

## Troubleshooting

### Photos show skeleton loaders only

- Check `NUXT_PUBLIC_R2_BASE_URL` is set correctly (no trailing slash)
- Open `https://YOUR_R2_URL/your-cover.jpg` directly in a browser — if you get a 403, public
  access on the R2 bucket is not enabled (Part 1 Step 4)

### GitHub Actions deploy fails

- Go to **Actions → failed run → Build and Deploy** job and expand the failing step
- `npm ci` failure: check `package-lock.json` is committed (`git add package-lock.json`)
- `netlify deploy` failure: double-check `NETLIFY_AUTH_TOKEN` and `NETLIFY_SITE_ID` secrets are
  set exactly as shown — no extra spaces, no quotes around the value

### Netlify SSR 404 on page refresh (e.g. `/albums/wild-landscapes`)

The Nuxt Netlify preset generates its own routing configuration automatically during `npm run build` — no manual redirect rules needed. If you see 404s, confirm `netlify.toml` is committed at the repo root and the publish directory is `.netlify/static`.

### Site builds locally but fails on Netlify

- Ensure Node 20+ is set in `netlify.toml` under `[build.environment]` — already configured
- Run `npm run build` locally and check for errors before pushing
