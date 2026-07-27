/**
 * Wraps an async Express handler so any thrown/rejected error is
 * forwarded to next(), letting the global error middleware handle it.
 * Keeps controllers free of repetitive try/catch blocks.
 *
 * Example:
 *   export const getProperty = asyncHandler(async (req, res) => { ... });
 */
export const asyncHandler = (requestHandler) => (req, res, next) => {
  Promise.resolve(requestHandler(req, res, next)).catch(next);
};
