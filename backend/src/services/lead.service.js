import { Lead } from "../models/Lead.model.js";
import { ApiError } from "../utils/ApiError.js";
import { getPagination } from "../utils/pagination.js";

/**
 * Creates a lead from a public inquiry (contact form, property enquiry,
 * or in future the AI Chatbot / CRM integrations via `source`).
 */
export const createLead = async (payload) => Lead.create(payload);

export const listLeads = async (query) => {
  const { skip, limit, buildMeta } = getPagination(query);
  const filter = { isArchived: false };
  if (query.status) filter.status = query.status;
  if (query.source) filter.source = query.source;
  if (query.assignedTo) filter.assignedTo = query.assignedTo;

  const [items, total] = await Promise.all([
    Lead.find(filter)
      .populate("property", "title slug")
      .populate("assignedTo", "name email")
      .sort("-createdAt")
      .skip(skip)
      .limit(limit),
    Lead.countDocuments(filter),
  ]);

  return { items, meta: buildMeta(total) };
};

export const getLeadById = async (id) => {
  const lead = await Lead.findById(id).populate("property").populate("assignedTo", "name email");
  if (!lead) throw ApiError.notFound("Lead not found");
  return lead;
};

export const updateLeadStatus = async (id, status) => {
  const lead = await Lead.findByIdAndUpdate(id, { status }, { new: true });
  if (!lead) throw ApiError.notFound("Lead not found");
  return lead;
};

export const addLeadNote = async (id, text, userId) => {
  const lead = await Lead.findById(id);
  if (!lead) throw ApiError.notFound("Lead not found");

  lead.notes.push({ text, addedBy: userId });
  await lead.save();
  return lead;
};

export const assignLead = async (id, assignedTo) => {
  const lead = await Lead.findByIdAndUpdate(id, { assignedTo }, { new: true });
  if (!lead) throw ApiError.notFound("Lead not found");
  return lead;
};

export const archiveLead = async (id) => {
  const lead = await Lead.findByIdAndUpdate(id, { isArchived: true }, { new: true });
  if (!lead) throw ApiError.notFound("Lead not found");
  return lead;
};
