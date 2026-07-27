"use client";

import { useState } from "react";
import { HiOutlinePlus, HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
import { useFetch } from "@hooks/useFetch.js";
import { getLocations, createLocation, updateLocation, deleteLocation } from "@services/location.service.js";
import PageHeader from "@components/common/PageHeader.jsx";
import Button from "@components/common/Button.jsx";
import Modal from "@components/common/Modal.jsx";
import ConfirmDialog from "@components/common/ConfirmDialog.jsx";
import Loader from "@components/common/Loader.jsx";
import ErrorState from "@components/common/ErrorState.jsx";
import EmptyState from "@components/common/EmptyState.jsx";
import LocationForm from "@components/forms/LocationForm.jsx";

const toFormValues = (location) => ({
  name: location.name,
  city: location.city,
  state: location.state,
  country: location.country,
  pincode: location.pincode,
  lat: location.coordinates?.lat,
  lng: location.coordinates?.lng,
  isFeatured: location.isFeatured,
});

export default function LocationsPage() {
  const { data: locations, isLoading, error, refetch } = useFetch(() => getLocations({ limit: 50 }), []);
  const [modalState, setModalState] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      if (modalState.mode === "edit") {
        await updateLocation(modalState.id, formData);
      } else {
        await createLocation(formData);
      }
      setModalState(null);
      refetch();
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to save location");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteLocation(deleteTarget._id);
      setDeleteTarget(null);
      refetch();
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to delete location");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div>
      <PageHeader
        title="Locations"
        description="Manage the markets properties are grouped under."
        action={<Button variant="gold" onClick={() => setModalState({ mode: "create" })}><HiOutlinePlus /> Add Location</Button>}
      />

      {isLoading && <Loader label="Loading locations" />}
      {error && <ErrorState message={error} onRetry={refetch} />}
      {!isLoading && !error && locations?.length === 0 && (
        <EmptyState title="No locations yet" action={<Button variant="gold" size="sm" onClick={() => setModalState({ mode: "create" })}>Add Location</Button>} />
      )}

      {!isLoading && !error && locations?.length > 0 && (
        <div className="overflow-hidden rounded-2xl border border-charcoal-100 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-charcoal-100 bg-charcoal-50/50 text-xs uppercase tracking-widest2 text-charcoal-500">
              <tr>
                <th className="px-6 py-3 font-medium">Name</th>
                <th className="px-6 py-3 font-medium">City</th>
                <th className="px-6 py-3 font-medium">State</th>
                <th className="px-6 py-3 font-medium">Featured</th>
                <th className="px-6 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-charcoal-100">
              {locations.map((location) => (
                <tr key={location._id} className="hover:bg-charcoal-50/40">
                  <td className="px-6 py-4 font-medium text-charcoal-900">{location.name}</td>
                  <td className="px-6 py-4 text-charcoal-700">{location.city}</td>
                  <td className="px-6 py-4 text-charcoal-700">{location.state}</td>
                  <td className="px-6 py-4">{location.isFeatured ? "Yes" : "—"}</td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setModalState({ mode: "edit", property: toFormValues(location), id: location._id })}
                        className="rounded-lg p-2 text-charcoal-500 hover:bg-gold-50 hover:text-gold-700" aria-label="Edit"
                      >
                        <HiOutlinePencil />
                      </button>
                      <button onClick={() => setDeleteTarget(location)} className="rounded-lg p-2 text-charcoal-500 hover:bg-red-50 hover:text-red-600" aria-label="Delete">
                        <HiOutlineTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal isOpen={!!modalState} onClose={() => setModalState(null)} title={modalState?.mode === "edit" ? "Edit Location" : "Add Location"}>
        {modalState && (
          <LocationForm
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
        title="Delete Location"
        description={`Delete "${deleteTarget?.name}"? This is blocked if any properties are still linked to this location.`}
        isLoading={isDeleting}
      />
    </div>
  );
}
