# Opulent Homes — Admin Panel (Next.js)

Internal dashboard for staff to manage property listings, builders,
locations, and incoming leads. Migrated from Vite to Next.js for framework
consistency with the customer frontend — but unlike that app, **this one has
no SEO requirement** (it's `noindex`, login-gated), so it's essentially
client-rendered throughout, same behavior as the old Vite SPA.

## Stack

Next.js 15 (App Router) · React 19 · Tailwind CSS · Axios · React Hook Form ·
Framer Motion · Recharts

## Why (Almost) Everything Is `"use client"`

There's no benefit to server-rendering a dashboard only authenticated staff
ever see — search engines never index it, and the data is sensitive (leads,
user accounts). So every page keeps the same client-side data-fetching
pattern as the original Vite app (`useFetch` + Axios), just running inside
Next.js's router instead of React Router. Next.js is used here purely as the
framework/routing layer, not for its SSR benefits.

## Folder Structure

```
src/
├── app/
│   ├── layout.jsx          Root layout: fonts, AuthProvider, noindex metadata
│   ├── login/page.jsx       Public route
│   └── (dashboard)/         Route group — URL stays "/", "/properties" etc.
│       ├── layout.jsx        Auth guard + Sidebar/Topbar shell (replaces the
│       │                     old ProtectedRoute + DashboardLayout combo)
│       ├── page.jsx           Dashboard
│       ├── properties/page.jsx
│       ├── builders/page.jsx
│       ├── locations/page.jsx
│       ├── leads/page.jsx
│       ├── users/page.jsx
│       └── settings/page.jsx
├── components/              Same set as before: common/, layout/, forms/
├── services/                Axios calls, one file per resource
├── context/AuthContext.jsx  Gates login to admin/super_admin roles only
├── hooks/                   useAuth, useFetch
└── lib/                     constants.js, formatters.js
```

## Path Aliases

`@/*`, `@components/*`, `@services/*`, `@hooks/*`, `@context/*`, `@lib/*` —
see `jsconfig.json`.

## Route Protection

`app/(dashboard)/layout.jsx` checks `useAuth()` on mount and redirects to
`/login` if there's no valid session — this replaces the old React Router
`ProtectedRoute` component. The `(dashboard)` folder name is a Next.js
**route group**: it organizes files without adding `/dashboard` to the URL,
so `/properties` still resolves to `/properties`, not
`/dashboard/properties`.

## Getting Started

```bash
cp .env.example .env
npm install
npm run dev          # http://localhost:5174 (pinned via package.json scripts)
```

Log in with the super admin account created via the backend's `npm run seed`.

## What Changed vs. the Vite Version

- `react-router-dom` → Next.js (`next/link`, `next/navigation`)
- `<Outlet />` nesting → route groups + nested layouts
- Otherwise, functionally identical — same pages, same forms, same
  multipart image upload flow, same CRUD behavior.

## Notes

- All API calls flow through `src/services/apiClient.js`; it already
  handles attaching the JWT and silently refreshing it on 401s.
- `npm run build` has been verified to complete with zero errors (all 9
  routes generate successfully).
