# Opulent Homes — API Reference

Base URL: `http://localhost:5000/api/v1` (development)

All responses share this envelope:

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Human-readable message",
  "data": {},
  "meta": { "page": 1, "limit": 12, "totalItems": 42, "totalPages": 4 }
}
```

Errors share the same shape with `"success": false` and an `"errors"` array
for field-level validation issues.

Protected routes require `Authorization: Bearer <accessToken>`. The refresh
token is delivered as an httpOnly cookie and never touched by frontend code
directly — call `POST /auth/refresh` to mint a new access token.

---

## Auth — `/auth`

| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/auth/register` | Public | Create a customer account |
| POST | `/auth/login` | Public | Log in, returns access token + sets refresh cookie |
| POST | `/auth/logout` | Public | Clears the refresh cookie |
| POST | `/auth/refresh` | Cookie | Exchanges refresh cookie for a new access token |
| GET | `/auth/me` | Bearer | Returns the authenticated user |
| PATCH | `/auth/change-password` | Bearer | Change the current user's password |

## Properties — `/properties`

| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/properties` | Public | List properties. Query: `page, limit, propertyType, listingType, status, location, builder, minPrice, maxPrice, search, sort` |
| GET | `/properties/slug/:slug` | Public | Get one property by slug (increments view count) |
| GET | `/properties/:id` | Staff | Get one property by ID (admin edit view) |
| POST | `/properties` | Staff | Create a property. `multipart/form-data`, field `images[]` (max 10) |
| PATCH | `/properties/:id` | Staff | Update a property; optionally append more `images[]` |
| DELETE | `/properties/:id` | Staff | Delete a property (and its Cloudinary images) |
| PATCH | `/properties/:id/remove-image` | Staff | Body: `{ publicId }` — removes one image |

## Builders — `/builders`

| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/builders` | Public | List builders. Query: `page, limit, search` |
| GET | `/builders/slug/:slug` | Public | Get one builder + its active properties |
| POST | `/builders` | Staff | Create a builder. `multipart/form-data`, field `logo` |
| PATCH | `/builders/:id` | Staff | Update a builder; optionally replace `logo` |
| DELETE | `/builders/:id` | Staff | Delete a builder (blocked if it has linked properties) |

## Locations — `/locations`

| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/locations` | Public | List locations. Query: `page, limit, city` |
| GET | `/locations/slug/:slug` | Public | Get one location |
| POST | `/locations` | Staff | Create a location. `multipart/form-data`, field `coverImage` |
| PATCH | `/locations/:id` | Staff | Update a location; optionally replace `coverImage` |
| DELETE | `/locations/:id` | Staff | Delete a location (blocked if it has linked properties) |

## Leads — `/leads`

| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/leads` | Public | Submit a contact/enquiry form. Body: `name, email, phone, message?, property?, source?` |
| GET | `/leads` | Staff | List leads. Query: `page, limit, status, source, assignedTo` |
| GET | `/leads/:id` | Staff | Get one lead |
| PATCH | `/leads/:id/status` | Staff | Body: `{ status }` |
| PATCH | `/leads/:id/notes` | Staff | Body: `{ text }` — appends a timestamped note |
| PATCH | `/leads/:id/assign` | Staff | Body: `{ assignedTo }` — assigns to a staff User ID |
| PATCH | `/leads/:id/archive` | Staff | Archives the lead (soft-hide from default list) |

## Users — `/users`

All routes require `super_admin`.

| Method | Path | Description |
|---|---|---|
| GET | `/users` | List users. Query: `page, limit, role, search` |
| GET | `/users/:id` | Get one user |
| POST | `/users` | Create a staff account (`admin`, `broker`, or `builder` role) |
| PATCH | `/users/:id/status` | Body: `{ isActive }` — activate/deactivate |
| PATCH | `/users/:id/role` | Body: `{ role }` — reassign role (cannot assign `super_admin`) |

## Health

| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/health` | Public | Returns `{ success: true, message: "Opulent Homes API is healthy" }` |

---

## Roles

Defined in `backend/src/constants/index.js`:

- `super_admin`, `admin` — full staff access to all `Staff` routes above
- `customer` — default role on public registration
- `broker`, `builder` — reserved for future Broker/Builder portals; not yet
  wired to any route guard
