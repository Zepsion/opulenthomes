import { ApiError } from "../utils/ApiError.js";

/**
 * Generic validation middleware factory driven by Zod schemas
 * defined in src/validators/. Validates body, params, and/or query
 * in one pass and normalizes the parsed (typed/coerced) result back
 * onto req, so controllers receive clean data.
 *
 * Usage:
 *   router.post("/", validate(createPropertySchema), controller.create)
 *
 * Where createPropertySchema = z.object({ body: z.object({...}) })
 */
export const validate = (schema) => (req, _res, next) => {
  const result = schema.safeParse({
    body: req.body,
    query: req.query,
    params: req.params,
  });

  if (!result.success) {
    const errors = result.error.issues.map((issue) => ({
      field: issue.path.join("."),
      message: issue.message,
    }));
    return next(ApiError.badRequest("Validation failed", errors));
  }

  if (result.data.body) req.body = result.data.body;
  if (result.data.params) req.params = result.data.params;
  // req.query is intentionally left untouched (read-only getter in Express 5)

  next();
};
