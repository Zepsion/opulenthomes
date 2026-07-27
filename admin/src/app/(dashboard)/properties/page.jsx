"use client";

import { useState } from "react";
import { HiOutlinePlus, HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
import { useFetch } from "@hooks/useFetch.js";
import { getProperties, createProperty, updateProperty, deleteProperty } from "@services/property.service.js";
import PageHeader from "@components/common/PageHeader.jsx";
import Button from "@components/common/Button.jsx";
import Badge from "@components/common/Badge.jsx";
import Modal from "@components/common/Modal.jsx";
import ConfirmDialog from "@components/common/ConfirmDialog.jsx";
import Loader from "@components/common/Loader.jsx";
import ErrorState from "@components/common/ErrorState.jsx";
import EmptyState from "@components/common/EmptyState.jsx";
import PropertyForm from "@components/forms/PropertyForm.jsx";
import { formatCurrency } from "@lib/formatters.js";

const STATUS_TONES = {
  available: "green",
  sold: "red",
  rented: "blue",
  under_construction: "gold",
  draft: "gray",
};

const toFormValues = (property) => ({
  title: property.title,
  description: property.description,
  propertyType: property.propertyType,
  listingType: property.listingType,
  status: property.status,
  priceAmount: property.price?.amount,
  priceOnRequest: property.price?.priceOnRequest,
  areaValue: property.area?.value,
  areaUnit: property.area?.unit,
  bedrooms: property.bedrooms,
  bathrooms: property.bathrooms,
  parkingSpaces: property.parkingSpaces,
  floors: property.floors,
  amenities: property.amenities?.join(", "),
  location: property.location?._id || property.location,
  builder: property.builder?._id || property.builder || "",
  isFeatured: property.isFeatured,
});

export default function PropertiesPage() {
  const { data: properties, isLoading, error, refetch } = useFetch(() => getProperties({ limit: 50 }), []);

  const [modalState, setModalState] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      if (modalState.mode === "edit") {
        await updateProperty(modalState.id, formData);
      } else {
        await createProperty(formData);
      }
      setModalState(null);
      refetch();
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to save property");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteProperty(deleteTarget._id);
      setDeleteTarget(null);
      refetch();
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to delete property");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div>
      <PageHeader
        title="Properties"
        description="Manage every listing across the platform."
        action={<Button variant="gold" onClick={() => setModalState({ mode: "create" })}><HiOutlinePlus /> Add Property</Button>}
      />

      {isLoading && <Loader label="Loading properties" />}
      {error && <ErrorState message={error} onRetry={refetch} />}
      {!isLoading && !error && properties?.length === 0 && (
        <EmptyState title="No properties yet" description="Add your first listing to get started."
          action={<Button variant="gold" size="sm" onClick={() => setModalState({ mode: "create" })}>Add Property</Button>} />
      )}

      {!isLoading && !error && properties?.length > 0 && (
        <div className="overflow-hidden rounded-2xl border border-charcoal-100 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-charcoal-100 bg-charcoal-50/50 text-xs uppercase tracking-widest2 text-charcoal-500">
              <tr>
                <th className="px-6 py-3 font-medium">Property</th>
                <th className="px-6 py-3 font-medium">Type</th>
                <th className="px-6 py-3 font-medium">Price</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Featured</th>
                <th className="px-6 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-charcoal-100">
              {properties.map((property) => (
                <tr key={property._id} className="hover:bg-charcoal-50/40">
                  <td className="px-6 py-4">
                    <p className="font-medium text-charcoal-900">{property.title}</p>
                    <p className="text-xs text-charcoal-500">{property.location?.name}, {property.location?.city}</p>
                  </td>
                  <td className="px-6 py-4 capitalize text-charcoal-700">{property.propertyType}</td>
                  <td className="px-6 py-4 text-charcoal-700">
                    {property.price?.priceOnRequest ? "On Request" : formatCurrency(property.price?.amount)}
                  </td>
                  <td className="px-6 py-4">
                    <Badge tone={STATUS_TONES[property.status] || "gray"}>{property.status.replace("_", " ")}</Badge>
                  </td>
                  <td className="px-6 py-4">{property.isFeatured ? "Yes" : "—"}</td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setModalState({ mode: "edit", property: toFormValues(property), id: property._id, images: property.images || [] })}
                        className="rounded-lg p-2 text-charcoal-500 hover:bg-gold-50 hover:text-gold-700" aria-label="Edit"
                      >
                        <HiOutlinePencil />
                      </button>
                      <button onClick={() => setDeleteTarget(property)} className="rounded-lg p-2 text-charcoal-500 hover:bg-red-50 hover:text-red-600" aria-label="Delete">
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

      <Modal isOpen={!!modalState} onClose={() => setModalState(null)} title={modalState?.mode === "edit" ? "Edit Property" : "Add Property"} maxWidth="max-w-3xl">
        {modalState && (
          <PropertyForm
            propertyId={modalState.mode === "edit" ? modalState.id : undefined}
            existingImages={modalState.mode === "edit" ? modalState.images : undefined}
            initialValues={modalState.mode === "edit" ? modalState.property : undefined}
            onSubmit={handleSubmit}
            onCancel={() => setModalState(null)}
            isSubmitting={isSubmitting}
            onImagesChanged={refetch}
          />
        )}
      </Modal>

      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Property"
        description={`Are you sure you want to delete "${deleteTarget?.title}"? This also removes its images from Cloudinary and cannot be undone.`}
        isLoading={isDeleting}
      />
    </div>
  );
}
