import { ApiError } from "../utils/ApiError.js";
import { env } from "../config/env.js";
import { logger } from "../utils/logger.js";

/**
 * Catches 404s for any route not matched by the router stack.
 * Must be registered after all routes, before errorHandler.
 */
export const notFoundHandler = (req, _res, next) => {
  next(ApiError.notFound(`Route not found - ${req.method} ${req.originalUrl}`));
};

/**
 * Single global error handler. Normalizes Mongoose/JWT/Multer errors
 * into ApiError shape, then sends one consistent JSON envelope.
 * Must be the LAST middleware registered in app.js.
 */
// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, req, res, next) => {
  let error = err;

  if (!(error instanceof ApiError)) {
    let statusCode = error.statusCode || 500;
    let message = error.message || "Internal server error";

    if (error.name === "CastError") {
      statusCode = 400;
      message = `Invalid value for ${error.path}`;
    }
    if (error.code === 11000) {
      statusCode = 409;
      const field = Object.keys(error.keyValue || {})[0];
      message = `${field ? `${field} already exists` : "Duplicate field value"}`;
    }
    if (error.name === "ValidationError") {
      statusCode = 400;
      message = Object.values(error.errors)
        .map((e) => e.message)
        .join(", ");
    }
    if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
      statusCode = 401;
      message = "Invalid or expired token";
    }

    error = new ApiError(statusCode, message, [], err.stack);
  }

  if (error.statusCode >= 500) {
    logger.error(`${req.method} ${req.originalUrl} - ${error.message}`);
  }

  res.status(error.statusCode).json({
    success: false,
    statusCode: error.statusCode,
    message: error.message,
    errors: error.errors,
    stack: env.isDevelopment ? error.stack : undefined,
  });
};
