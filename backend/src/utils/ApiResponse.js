/**
 * Standardized success response shape so every endpoint — across
 * frontend, admin, and future mobile/CRM consumers — gets the same envelope:
 *   { success, statusCode, message, data, meta }
 *
 * Example:
 *   return res.status(200).json(new ApiResponse(200, properties, "Properties fetched"));
 */
export class ApiResponse {
  constructor(statusCode, data = null, message = "Success", meta = null) {
    this.success = statusCode < 400;
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    if (meta) this.meta = meta; // e.g. pagination info
  }
}
