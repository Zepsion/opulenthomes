"use client";

import { useState } from "react";
import { HiOutlinePlus, HiOutlinePencil, HiOutlineTrash, HiOutlineBadgeCheck } from "react-icons/hi";
import { useFetch } from "@hooks/useFetch.js";
import { getBuilders, createBuilder, updateBuilder, deleteBuilder } from "@services/builder.service.js";
import PageHeader from "@components/common/PageHeader.jsx";
import Button from "@components/common/Button.jsx";
import Modal from "@components/common/Modal.jsx";
import ConfirmDialog from "@components/common/ConfirmDialog.jsx";
import Loader from "@components/common/Loader.jsx";
import ErrorState from "@components/common/ErrorState.jsx";
import EmptyState from "@components/common/EmptyState.jsx";
import BuilderForm from "@components/forms/BuilderForm.jsx";

const toFormValues = (builder) => ({
  name: builder.name,
  description: builder.description,
  establishedYear: builder.establishedYear,
  headquarters: builder.headquarters,
  website: builder.website,
  contactEmail: builder.contactEmail,
  contactPhone: builder.contactPhone,
  isFeatured: builder.isFeatured,
});

export default function BuildersPage() {
  const { data: builders, isLoading, error, refetch } = useFetch(() => getBuilders({ limit: 50 }), []);
  const [modalState, setModalState] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      if (modalState.mode === "edit") {
        await updateBuilder(modalState.id, formData);
      } else {
        await createBuilder(formData);
      }
      setModalState(null);
      refetch();
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to save builder");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteBuilder(deleteTarget._id);
      setDeleteTarget(null);
      refetch();
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to delete builder");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div>
      <PageHeader
        title="Builders"
        description="Manage verified developer partners."
        action={<Button variant="gold" onClick={() => setModalState({ mode: "create" })}><HiOutlinePlus /> Add Builder</Button>}
      />

      {isLoading && <Loader label="Loading builders" />}
      {error && <ErrorState message={error} onRetry={refetch} />}
      {!isLoading && !error && builders?.length === 0 && (
        <EmptyState title="No builders yet" action={<Button variant="gold" size="sm" onClick={() => setModalState({ mode: "create" })}>Add Builder</Button>} />
      )}

      {!isLoading && !error && builders?.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {builders.map((builder) => (
            <div key={builder._id} className="flex flex-col gap-4 rounded-2xl border border-charcoal-100 bg-white p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-charcoal-50">
                  {builder.logo?.url ? (
                    <img src={builder.logo.url} alt={builder.name} className="h-full w-full object-cover" />
                  ) : (
                    <span className="font-display text-lg text-gold-700">{builder.name?.[0]}</span>
                  )}
                </div>
                <div className="min-w-0">
                  <p className="flex items-center gap-1.5 truncate font-medium text-charcoal-900">
                    {builder.name}
                    {builder.isVerified && <HiOutlineBadgeCheck className="shrink-0 text-gold-500" />}
                  </p>
                  <p className="truncate text-xs text-charcoal-500">{builder.headquarters || "—"}</p>
                </div>
              </div>

              <div className="flex justify-end gap-2 border-t border-charcoal-100 pt-3">
                <button
                  onClick={() => setModalState({ mode: "edit", property: toFormValues(builder), id: builder._id })}
                  className="rounded-lg p-2 text-charcoal-500 hover:bg-gold-50 hover:text-gold-700" aria-label="Edit"
                >
                  <HiOutlinePencil />
                </button>
                <button onClick={() => setDeleteTarget(builder)} className="rounded-lg p-2 text-charcoal-500 hover:bg-red-50 hover:text-red-600" aria-label="Delete">
                  <HiOutlineTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={!!modalState} onClose={() => setModalState(null)} title={modalState?.mode === "edit" ? "Edit Builder" : "Add Builder"}>
        {modalState && (
          <BuilderForm
            initialValues={modalState.mode === "edit" ? modalState.property : undefined}
            onSubmit={handleSubmit}
            onCancel={() => setModalState(null)}
            isSubmitting={isSubmitting}
          />
        )}
      </Modal>

      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Builder"
        description={`Delete "${deleteTarget?.name}"? This is blocked if any properties are still linked to this builder.`}
        isLoading={isDeleting}
      />
    </div>
  );
}
