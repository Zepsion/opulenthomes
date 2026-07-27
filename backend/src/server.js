import { env, validateEnv } from "./config/env.js";
import { connectDB } from "./config/db.js";
import { logger } from "./utils/logger.js";
import app from "./app.js";

validateEnv();

let server;

const start = async () => {
  await connectDB();

  server = app.listen(env.PORT, () => {
    logger.info(`🚀 Opulent Homes API running in ${env.NODE_ENV} mode on port ${env.PORT}`);
    logger.info(`   Health check: http://localhost:${env.PORT}/api/${env.API_VERSION}/health`);
  });
};

// ---- Graceful shutdown & crash safety ----
process.on("unhandledRejection", (reason) => {
  logger.error(`Unhandled Rejection: ${reason}`);
  server?.close(() => process.exit(1));
});

process.on("uncaughtException", (error) => {
  logger.error(`Uncaught Exception: ${error.message}`);
  process.exit(1);
});

process.on("SIGTERM", () => {
  logger.info("SIGTERM received. Shutting down gracefully...");
  server?.close(() => process.exit(0));
});

start();
