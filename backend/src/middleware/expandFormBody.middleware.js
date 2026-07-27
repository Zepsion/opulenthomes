/**
 * Multer parses multipart/form-data fields as a flat key-value map —
 * unlike express.urlencoded({ extended: true }), it does NOT expand
 * bracket notation (e.g. "price[amount]") into nested objects.
 *
 * Admin/frontend clients send nested fields as FormData using bracket
 * notation (price[amount], area[value], etc.) so this middleware runs
 * right after Multer and before Zod validation to reconstruct the
 * nested shape validators expect.
 *
 * Also splits a few known comma-separated list fields (amenities) into
 * arrays, since FormData has no native array type for text fields.
 */
const LIST_FIELDS = new Set(["amenities"]);

const setNestedValue = (target, path, value) => {
  const keys = path.replace(/\]/g, "").split("[");
  let cursor = target;
  keys.forEach((key, index) => {
    if (index === keys.length - 1) {
      cursor[key] = value;
    } else {
      cursor[key] = cursor[key] || {};
      cursor = cursor[key];
    }
  });
};

export const expandFormBody = (req, _res, next) => {
  if (!req.body || typeof req.body !== "object") return next();

  const expanded = {};

  for (const [key, value] of Object.entries(req.body)) {
    if (LIST_FIELDS.has(key) && typeof value === "string") {
      expanded[key] = value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
      continue;
    }

    if (key.includes("[")) {
      setNestedValue(expanded, key, value);
    } else {
      expanded[key] = value;
    }
  }

  req.body = expanded;
  next();
};
