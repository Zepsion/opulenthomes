import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import * as leadService from "../services/lead.service.js";

export const submitLead = asyncHandler(async (req, res) => {
  const lead = await leadService.createLead(req.body);
  res.status(201).json(new ApiResponse(201, lead, "Thank you, we'll be in touch shortly"));
});

export const getLeads = asyncHandler(async (req, res) => {
  const { items, meta } = await leadService.listLeads(req.query);
  res.status(200).json(new ApiResponse(200, items, "Leads fetched successfully", meta));
});

export const getLeadById = asyncHandler(async (req, res) => {
  const lead = await leadService.getLeadById(req.params.id);
  res.status(200).json(new ApiResponse(200, lead, "Lead fetched successfully"));
});

export const updateLeadStatus = asyncHandler(async (req, res) => {
  const lead = await leadService.updateLeadStatus(req.params.id, req.body.status);
  res.status(200).json(new ApiResponse(200, lead, "Lead status updated"));
});

export const addLeadNote = asyncHandler(async (req, res) => {
  const lead = await leadService.addLeadNote(req.params.id, req.body.text, req.user._id);
  res.status(200).json(new ApiResponse(200, lead, "Note added successfully"));
});

export const assignLead = asyncHandler(async (req, res) => {
  const lead = await leadService.assignLead(req.params.id, req.body.assignedTo);
  res.status(200).json(new ApiResponse(200, lead, "Lead assigned successfully"));
});

export const archiveLead = asyncHandler(async (req, res) => {
  const lead = await leadService.archiveLead(req.params.id);
  res.status(200).json(new ApiResponse(200, lead, "Lead archived successfully"));
});
