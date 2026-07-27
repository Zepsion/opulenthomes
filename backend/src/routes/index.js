import { Router } from "express";
import authRoutes from "./auth.routes.js";
import propertyRoutes from "./property.routes.js";
import builderRoutes from "./builder.routes.js";
import locationRoutes from "./location.routes.js";
import leadRoutes from "./lead.routes.js";
import userRoutes from "./user.routes.js";

const router = Router();

/**
 * All feature routers are mounted here and consumed once from app.js
 * as `app.use('/api/v1', routes)`.
 *
 * Adding a new module (e.g. Broker Portal, Builder Portal) means:
 *   1. model -> service -> controller -> routes file
 *   2. import + router.use() below
 * No changes needed anywhere else.
 */
router.use("/auth", authRoutes);
router.use("/properties", propertyRoutes);
router.use("/builders", builderRoutes);
router.use("/locations", locationRoutes);
router.use("/leads", leadRoutes);
router.use("/users", userRoutes);

router.get("/health", (_req, res) => {
  res.status(200).json({ success: true, message: "Opulent Homes API is healthy" });
});

export default router;
