# Opulent Homes — Frontend (Next.js, SSR)

The public-facing website, rebuilt on **Next.js 15 (App Router)** so search
engines see real, rendered content instead of an empty React root — the one
thing the previous Vite SPA structurally couldn't do.

## Why This Migration

A Vite/React SPA renders entirely in the browser: the HTML Google's crawler
first sees is basically `<div id="root"></div>`. Content, titles, and meta
tags only exist after JavaScript runs. Next.js Server Components fetch data
**before** sending HTML to the browser, so:

- Every page has a real `<title>` and `<meta description>` specific to its
  content (see `generateMetadata()` in `app/properties/[slug]/page.jsx`)
- Property pages include JSON-LD structured data so Google can show price
  and availability in rich results
- A dynamic `sitemap.xml` (`app/sitemap.js`) lists every property and builder
  page automatically — Google doesn't have to crawl links to discover them
- `robots.js` points crawlers to that sitemap

## Server vs. Client Components

- **Server Components** (no `"use client"`): all `page.jsx` files fetch data
  directly from the backend via `src/lib/api-server.js` and render real HTML.
  `Footer`, `Button`, `PropertyGrid` are also server-safe (no interactivity).
- **Client Components** (`"use client"`): anything with animation
  (Framer Motion), state (`useState`), or forms (`react-hook-form`) —
  `Navbar`, `Hero`, `SearchBar`, `PropertyCard`, `PropertyFilters`,
  `EnquiryForm`, `PropertyGallery`, `BuilderCard`.

The pattern throughout: a Server Component page fetches data and passes it
as props into Client Components that only handle presentation/interactivity.
This keeps the data fetch (and therefore the SEO-relevant content) on the
server, while animations and forms still work exactly as before.

## Folder Structure

```
src/
├── app/                 App Router — folder structure = routes
│   ├── layout.jsx        Root layout: fonts (next/font), global <head> defaults
│   ├── page.jsx           Home
│   ├── properties/
│   │   ├── page.jsx        Properties list (reads ?filters from searchParams)
│   │   └── [slug]/page.jsx  Property details — generateMetadata + JSON-LD
│   ├── builders/
│   │   ├── page.jsx
│   │   └── [slug]/page.jsx  Builder details (new — didn't exist in the Vite app)
│   ├── about/page.jsx
│   ├── contact/page.jsx
│   ├── services/page.jsx
│   ├── sitemap.js         Dynamic sitemap including every property/builder
│   ├── robots.js
│   ├── not-found.jsx
│   └── globals.css
├── components/            Same component set as before, split into
│                          Server-safe and "use client" as described above
├── lib/
│   ├── api-server.js      fetch() wrapper used ONLY in Server Components
│   ├── api-client.js      Axios instance used ONLY in Client Components
│   │                      (form submissions)
│   ├── constants.js
│   └── formatters.js
└── hooks/, context/        Reserved — no client-side data-fetching hooks
                            needed anymore now that pages fetch server-side
```

## Path Aliases

Configured in `jsconfig.json`: `@/*`, `@components/*`, `@lib/*`, `@hooks/*`,
`@context/*`.

## Getting Started

```bash
cp .env.example .env
npm install
npm run dev          # http://localhost:3000
```

Note the port changed from Vite's `5173` to Next.js's default `3000`. If
you deploy this, set `NEXT_PUBLIC_SITE_URL` to your real domain — it's used
in `sitemap.js`, `robots.js`, and Open Graph metadata.

## What Changed vs. the Vite Version

- Port: `5173` → `3000`
- `react-router-dom` → Next.js file-based routing (`next/link`,
  `next/navigation`)
- Client-side `useFetch` hook → server-side `fetch()` in Server Components
- No more loading spinners on first load for Home/Properties/PropertyDetails
  — the data is already in the HTML
- Builder detail pages now actually exist (`/builders/[slug]`)
- Customer login/register was dropped from scope (it existed in the old
  `AuthContext` but no UI was ever built for it) — re-add if you need
  customer accounts on the public site
