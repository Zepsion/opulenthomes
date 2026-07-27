# Opulent Homes

Ultra-premium real estate platform for the Mira Road, Bhayandar, and Mumbai
markets. Monorepo containing three independent applications sharing a single
backend API.

```
opulent-homes/
├── frontend/   Customer-facing site — Next.js 15 (App Router), SSR for SEO
├── admin/      Internal admin panel — Next.js 15 (App Router), client-rendered
├── backend/    Shared REST API — Express, MongoDB, JWT, Cloudinary
└── docs/       Architecture notes and API reference
```

## Both Apps Are Now Next.js

- **Frontend**: uses Next.js Server Components to fetch data before sending
  HTML, so search engines see real property content and each page gets its
  own title/description/JSON-LD. See `frontend/README.md`.
- **Admin**: uses Next.js purely as the routing framework — since it's a
  login-gated internal tool with no SEO need, pages stay client-rendered
  exactly like the original Vite version. See `admin/README.md`.

## Quick Start

```bash
# 1. Backend API — http://localhost:5001 (or whatever PORT you set)
cd backend
cp .env.example .env    # fill in MongoDB URI, JWT secrets, Cloudinary keys
npm install
npm run dev
npm run seed             # first time only — creates the super admin account

# 2. Customer frontend — http://localhost:3000
cd frontend
cp .env.example .env     # set NEXT_PUBLIC_API_BASE_URL to match your backend port
npm install
npm run dev

# 3. Admin panel — http://localhost:5174
cd admin
cp .env.example .env     # set NEXT_PUBLIC_API_BASE_URL to match your backend port
npm install
npm run dev
```

## Documentation

- [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md) — system shape, layered
  backend design, and how this scaffold supports the planned Mobile App, AI
  Chatbot, CRM, Broker Portal, and Builder Portal without restructuring.
- [`docs/API.md`](./docs/API.md) — full REST endpoint reference.
- [`backend/README.md`](./backend/README.md) — backend folder-by-folder guide.
- [`frontend/README.md`](./frontend/README.md) — Next.js SSR/SEO details,
  Server vs. Client Component breakdown.
- [`admin/README.md`](./admin/README.md) — admin panel folder-by-folder guide.

## Tech Stack

**Frontend:** Next.js 15 (App Router) · Tailwind CSS · Framer Motion ·
React Hook Form

**Admin:** Next.js 15 (App Router) · Tailwind CSS · Axios · React Hook Form ·
Framer Motion · Recharts

**Backend:** Node.js · Express · MongoDB · Mongoose · JWT · Cloudinary ·
Multer · Bcrypt · Zod

## Status

All three apps are production-ready with real, complete UIs — no
placeholders. Both `frontend` and `admin` builds have been verified to
compile with zero errors.
