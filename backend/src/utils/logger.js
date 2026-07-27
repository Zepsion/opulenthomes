/**
 * Minimal structured logger.
 * Swap the implementation for winston/pino later without touching call sites,
 * since every other file imports `logger` from here, not console directly.
 */
const timestamp = () => new Date().toISOString();

export const logger = {
  info: (msg) => console.log(`[INFO] ${timestamp()} - ${msg}`),
  warn: (msg) => console.warn(`[WARN] ${timestamp()} - ${msg}`),
  error: (msg) => console.error(`[ERROR] ${timestamp()} - ${msg}`),
  debug: (msg) => {
    if (process.env.NODE_ENV !== "production") {
      console.debug(`[DEBUG] ${timestamp()} - ${msg}`);
    }
  },
};
