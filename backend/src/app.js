import "express-async-errors";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";

import { env } from "./config/env.js";
import routes from "./routes/index.js";
import { notFoundHandler, errorHandler } from "./middleware/error.middleware.js";

const app = express();

// ---- Security & core middleware ----
app.use(helmet());
app.use(
  cors({
    origin: [env.CLIENT_URL, env.ADMIN_URL],
    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());
app.use(mongoSanitize()); // strips $ and . operators from user input
app.use(xss()); // sanitizes user input against basic XSS

// ---- Rate limiting (applies to all /api routes) ----
const apiLimiter = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MS,
  max: env.RATE_LIMIT_MAX_REQUESTS,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many requests, please try again later" },
});
app.use(`/api/${env.API_VERSION}`, apiLimiter);

// ---- Logging ----
if (env.isDevelopment) {
  app.use(morgan("dev"));
}

// ---- Routes ----
app.get("/", (_req, res) => {
  res.status(200).json({ success: true, message: "Welcome to the Opulent Homes API" });
});
app.use(`/api/${env.API_VERSION}`, routes);

// ---- 404 + global error handler (must be last) ----
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
