import { Router } from "express";
import * as leadController from "../controllers/lead.controller.js";
import { authenticate, authorize } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import { USER_ROLES } from "../constants/index.js";
import {
  createLeadSchema,
  updateLeadStatusSchema,
  addLeadNoteSchema,
} from "../validators/lead.validator.js";
import { idParamSchema } from "../validators/common.validator.js";

const router = Router();
const STAFF_ROLES = [USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN, USER_ROLES.BROKER];

// Public: contact form / property enquiry submission
router.post("/", validate(createLeadSchema), leadController.submitLead);

// Protected: CRM-style lead management for staff
router.get("/", authenticate, authorize(...STAFF_ROLES), leadController.getLeads);
router.get(
  "/:id",
  authenticate,
  authorize(...STAFF_ROLES),
  validate(idParamSchema),
  leadController.getLeadById
);
router.patch(
  "/:id/status",
  authenticate,
  authorize(...STAFF_ROLES),
  validate(updateLeadStatusSchema),
  leadController.updateLeadStatus
);
router.patch(
  "/:id/notes",
  authenticate,
  authorize(...STAFF_ROLES),
  validate(addLeadNoteSchema),
  leadController.addLeadNote
);
router.patch(
  "/:id/assign",
  authenticate,
  authorize(...STAFF_ROLES),
  validate(idParamSchema),
  leadController.assignLead
);
router.patch(
  "/:id/archive",
  authenticate,
  authorize(...STAFF_ROLES),
  validate(idParamSchema),
  leadController.archiveLead
);

export default router;
