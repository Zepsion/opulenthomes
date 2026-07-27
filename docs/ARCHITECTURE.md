# Opulent Homes — Architecture Overview

## System Shape

Opulent Homes is a monorepo containing three independent applications that
share a single backend API contract:

```
opulent-homes/
├── frontend/   Customer-facing site (React, port 5173)
├── admin/      Internal admin panel (React, port 5174)
├── backend/    Shared REST API (Express + MongoDB, port 5000)
└── docs/       This folder
```

Neither `frontend` nor `admin` ever import from each other or share a build
step — they're deployed, versioned, and scaled independently. The only
contract between them is the JSON shape returned by `backend`.

```
                     ┌────────────────┐
                     │   MongoDB      │
                     └───────▲────────┘
                             │
                     ┌───────┴────────┐
                     │  backend (API) │  ← Express, JWT auth, Cloudinary
                     └───────▲────────┘
                 ┌───────────┴───────────┐
        ┌────────┴────────┐     ┌────────┴────────┐
        │   frontend       │     │     admin        │
        │ (customers)      │     │  (staff/admins)  │
        └──────────────────┘     └──────────────────┘
```

## Why This Shape

- **Independent deploys.** The marketing/customer site can ship changes daily
  without redeploying the admin panel, and vice versa.
- **Independent auth boundaries.** Customer accounts and staff accounts share
  the same `User` model and JWT mechanism, but the admin app explicitly
  rejects any role other than `admin`/`super_admin` at login — see
  `admin/src/context/AuthContext.jsx`.
- **One source of truth for business rules.** Both apps are UI over the same
  backend; there's no risk of the admin panel and the public site disagreeing
  about what a "sold" property means, because that logic lives once, in
  `backend/src/services/`.

## Backend: Clean/Layered Architecture

```
routes → controllers → services → models
```

- **routes** wire URLs to controllers and apply middleware (auth, validation,
  file upload).
- **controllers** are thin — they translate HTTP in and out, nothing more.
- **services** hold all business logic and are the only layer that talks to
  Mongoose models directly for writes/complex reads.
- **models** define schema, indexes, and instance methods only.

This means the business logic is testable independent of Express, and any
future consumer of the backend (see below) reuses the same services if it's
ever built server-side (e.g. a scheduled CRM sync job).

## Designed for Future Growth

The following are structurally anticipated but intentionally not built yet:

| Future capability | How the current architecture already supports it |
|---|---|
| **Mobile App** | Consumes the same REST API as `frontend`/`admin` — no backend changes needed, just a new client. |
| **AI Chatbot** | `LEAD_SOURCE.CHATBOT` already exists in `constants/index.js`; a chatbot service can call `POST /api/v1/leads` exactly like the contact form does. |
| **CRM** | `LEAD_SOURCE.CRM` reserved; `Lead` model already has `status`, `assignedTo`, and a `notes` timeline suitable for two-way sync. |
| **Broker Portal** | `USER_ROLES.BROKER` reserved; `Lead.assignedTo` already references `User`, ready for broker-scoped lead queues. |
| **Builder Portal** | `USER_ROLES.BUILDER` reserved; `Builder.portalUser` already links a `User` account that could authenticate and manage that builder's own listings. |

Adding any of these is additive: new model/service/controller/route files
plus (if needed) a new role check in `authorize()` — no existing module needs
to change.

## Data Model Summary

- **User** — customers, admins, and (future) brokers/builders in one
  collection, differentiated by `role`.
- **Property** — the core listing entity; references `Location` and
  optionally `Builder`.
- **Builder** — developer/builder profiles; can later be linked to a portal
  `User` account.
- **Location** — named areas (e.g. Mira Road, Bhayandar) properties belong to.
- **Lead** — inbound inquiries, with a status pipeline and notes timeline
  suitable for basic CRM workflows today and full CRM sync later.

See `backend/README.md` for the request/response conventions and
`docs/API.md` for the endpoint reference.
