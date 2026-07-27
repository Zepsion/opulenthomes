# Opulent Homes — Backend API

Node.js + Express + MongoDB REST API powering both the customer-facing
frontend and the internal admin panel from a single shared backend.

## Stack

Express.js · MongoDB (Mongoose) · JWT Auth · Cloudinary · Multer · Bcrypt · Zod

## Architecture

This backend follows a **layered, clean architecture** — each layer has exactly
one responsibility, and dependencies only ever point downward:

```
routes  →  controllers  →  services  →  models
             (thin)         (logic)     (data)
```

- **`routes/`** — Declares URL paths, applies middleware (auth, validation,
  upload), and wires each endpoint to its controller function. No logic lives
  here.
- **`controllers/`** — Thin HTTP adapters. Extract `req` data, call a service,
  shape the `res` with `ApiResponse`. Controllers never talk to Mongoose
  directly and never contain business rules.
- **`services/`** — All business logic: query building, validation rules that
  go beyond schema shape, cross-model checks (e.g. "can't delete a builder
  with linked properties"), Cloudinary orchestration. This is the layer you
  extend when requirements change.
- **`models/`** — Mongoose schemas for the 5 core collections: `User`,
  `Property`, `Builder`, `Location`, `Lead`. Includes indexes, virtuals, and
  instance methods (e.g. password hashing/comparison).
- **`validators/`** — Zod schemas per module, consumed by the generic
  `validate` middleware. Keeps request-shape validation declarative and
  separate from business validation (which lives in services).
- **`middleware/`** — Cross-cutting concerns: `authenticate`/`authorize`,
  request validation, file upload (Cloudinary via Multer), and the global
  error handler.
- **`utils/`** — Shared helpers with no framework dependencies of their own:
  `ApiError`, `ApiResponse`, `asyncHandler`, JWT signing, pagination, logging.
- **`constants/`** — Single source of truth for enums (roles, statuses, HTTP
  codes) so no magic strings are scattered across the codebase.
- **`config/`** — Environment loading (`env.js`), MongoDB connection, and
  Cloudinary configuration. Nothing else in the app touches `process.env`
  directly.

## Getting Started

```bash
cp .env.example .env      # fill in real secrets
npm install
npm run dev                # nodemon, http://localhost:5000
```

Create the first super admin account:

```bash
npm run seed
```

## API Conventions

- All responses use a consistent envelope via `ApiResponse`:
  ```json
  { "success": true, "statusCode": 200, "message": "...", "data": {}, "meta": {} }
  ```
- All errors are thrown as `ApiError` and normalized by the global error
  handler into the same shape with `success: false`.
- Protected routes require `Authorization: Bearer <accessToken>`. Refresh
  tokens are issued as an httpOnly cookie.
- List endpoints support `?page=&limit=` pagination, returned in the `meta`
  field of the response.

## Adding a New Module

To add a new resource (e.g. a future **Broker Portal** module):

1. Add a Mongoose model in `models/`.
2. Add Zod schemas in `validators/`.
3. Add business logic in `services/`.
4. Add thin handlers in `controllers/`.
5. Add a router in `routes/`, then mount it in `routes/index.js`.

No other file needs to change — this is what keeps the architecture scalable
as the platform grows toward mobile apps, an AI chatbot, CRM, and
Broker/Builder portals (see `constants/index.js`, where those roles and
sources are already reserved).
