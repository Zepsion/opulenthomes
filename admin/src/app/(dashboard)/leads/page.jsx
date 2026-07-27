"use client";

import { useState } from "react";
import { HiOutlineEye, HiOutlineArchive } from "react-icons/hi";
import { useFetch } from "@hooks/useFetch.js";
import { getLeads, updateLeadStatus, addLeadNote, archiveLead } from "@services/lead.service.js";
import PageHeader from "@components/common/PageHeader.jsx";
import Badge from "@components/common/Badge.jsx";
import Modal from "@components/common/Modal.jsx";
import Button from "@components/common/Button.jsx";
import { FormSelect, FormTextarea } from "@components/common/FormField.jsx";
import Loader from "@components/common/Loader.jsx";
import ErrorState from "@components/common/ErrorState.jsx";
import EmptyState from "@components/common/EmptyState.jsx";
import { formatDate } from "@lib/formatters.js";

const STATUSES = ["new", "contacted", "qualified", "negotiation", "converted", "lost"];
const STATUS_TONES = { new: "blue", contacted: "gold", qualified: "gold", negotiation: "gold", converted: "green", lost: "red" };

export default function LeadsPage() {
  const { data: leads, isLoading, error, refetch } = useFetch(() => getLeads({ limit: 50 }), []);
  const [activeLead, setActiveLead] = useState(null);
  const [noteText, setNoteText] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleStatusChange = async (id, status) => {
    await updateLeadStatus(id, status);
    refetch();
    if (activeLead?._id === id) setActiveLead((prev) => ({ ...prev, status }));
  };

  const handleAddNote = async () => {
    if (!noteText.trim()) return;
    setIsSaving(true);
    try {
      const { data } = await addLeadNote(activeLead._id, noteText);
      setActiveLead(data.data);
      setNoteText("");
      refetch();
    } finally {
      setIsSaving(false);
    }
  };

  const handleArchive = async (id) => {
    await archiveLead(id);
    setActiveLead(null);
    refetch();
  };

  return (
    <div>
      <PageHeader title="Leads" description="Every enquiry submitted through the site, in one place." />

      {isLoading && <Loader label="Loading leads" />}
      {error && <ErrorState message={error} onRetry={refetch} />}
      {!isLoading && !error && leads?.length === 0 && (
        <EmptyState title="No leads yet" description="Enquiries submitted from the website will appear here." />
      )}

      {!isLoading && !error && leads?.length > 0 && (
        <div className="overflow-hidden rounded-2xl border border-charcoal-100 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-charcoal-100 bg-charcoal-50/50 text-xs uppercase tracking-widest2 text-charcoal-500">
              <tr>
                <th className="px-6 py-3 font-medium">Name</th>
                <th className="px-6 py-3 font-medium">Contact</th>
                <th className="px-6 py-3 font-medium">Property</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Received</th>
                <th className="px-6 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-charcoal-100">
              {leads.map((lead) => (
                <tr key={lead._id} className="hover:bg-charcoal-50/40">
                  <td className="px-6 py-4 font-medium text-charcoal-900">{lead.name}</td>
                  <td className="px-6 py-4 text-charcoal-700">
                    <p>{lead.email}</p>
                    <p className="text-xs text-charcoal-500">{lead.phone}</p>
                  </td>
                  <td className="px-6 py-4 text-charcoal-700">{lead.property?.title || "General Enquiry"}</td>
                  <td className="px-6 py-4">
                    <Badge tone={STATUS_TONES[lead.status] || "gray"}>{lead.status}</Badge>
                  </td>
                  <td className="px-6 py-4 text-charcoal-500">{formatDate(lead.createdAt)}</td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => setActiveLead(lead)} className="rounded-lg p-2 text-charcoal-500 hover:bg-gold-50 hover:text-gold-700" aria-label="View">
                        <HiOutlineEye />
                      </button>
                      <button onClick={() => handleArchive(lead._id)} className="rounded-lg p-2 text-charcoal-500 hover:bg-red-50 hover:text-red-600" aria-label="Archive">
                        <HiOutlineArchive />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal isOpen={!!activeLead} onClose={() => setActiveLead(null)} title="Lead Details" maxWidth="max-w-xl">
        {activeLead && (
          <div className="flex flex-col gap-5">
            <div>
              <p className="font-display text-lg text-charcoal-900">{activeLead.name}</p>
              <p className="text-sm text-charcoal-500">{activeLead.email} · {activeLead.phone}</p>
            </div>

            {activeLead.message && (
              <p className="rounded-lg bg-charcoal-50 p-4 text-sm text-charcoal-700">{activeLead.message}</p>
            )}

            <FormSelect label="Status" value={activeLead.status} onChange={(e) => handleStatusChange(activeLead._id, e.target.value)}>
              {STATUSES.map((status) => <option key={status} value={status}>{status}</option>)}
            </FormSelect>

            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest2 text-charcoal-500">Notes</p>
              <div className="mb-3 flex max-h-40 flex-col gap-2 overflow-y-auto">
                {activeLead.notes?.length ? (
                  activeLead.notes.map((note, i) => (
                    <div key={i} className="rounded-lg bg-charcoal-50 p-3 text-sm text-charcoal-700">
                      {note.text}
                      <p className="mt-1 text-xs text-charcoal-400">{formatDate(note.addedAt)}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-charcoal-400">No notes yet.</p>
                )}
              </div>
              <FormTextarea rows={2} placeholder="Add an internal note..." value={noteText} onChange={(e) => setNoteText(e.target.value)} />
              <Button size="sm" variant="gold" className="mt-3" onClick={handleAddNote} disabled={isSaving}>
                {isSaving ? "Saving..." : "Add Note"}
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
