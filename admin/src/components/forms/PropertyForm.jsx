"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { HiOutlineX } from "react-icons/hi";
import { FormField, FormSelect, FormTextarea } from "@components/common/FormField.jsx";
import Button from "@components/common/Button.jsx";
import { useFetch } from "@hooks/useFetch.js";
import { getLocations } from "@services/location.service.js";
import { getBuilders } from "@services/builder.service.js";
import { removePropertyImage } from "@services/property.service.js";

const PROPERTY_TYPES = ["apartment", "villa", "penthouse", "plot", "commercial", "farmhouse"];
const LISTING_TYPES = ["sale", "rent"];
const STATUSES = ["available", "sold", "rented", "under_construction", "draft"];

const buildFormData = (values, imageFiles) => {
  const formData = new FormData();
  formData.append("title", values.title);
  formData.append("description", values.description);
  formData.append("propertyType", values.propertyType);
  formData.append("listingType", values.listingType);
  formData.append("status", values.status);
  formData.append("price[amount]", values.priceAmount);
  formData.append("price[currency]", "INR");
  formData.append("price[priceOnRequest]", values.priceOnRequest ? "true" : "false");
  formData.append("area[value]", values.areaValue);
  formData.append("area[unit]", values.areaUnit);
  formData.append("bedrooms", values.bedrooms || 0);
  formData.append("bathrooms", values.bathrooms || 0);
  formData.append("parkingSpaces", values.parkingSpaces || 0);
  formData.append("floors", values.floors || 1);
  formData.append("amenities", values.amenities || "");
  formData.append("location", values.location);
  if (values.builder) formData.append("builder", values.builder);
  formData.append("isFeatured", values.isFeatured ? "true" : "false");
  Array.from(imageFiles || []).forEach((file) => formData.append("images", file));
  return formData;
};

const PropertyForm = ({ propertyId, initialValues, existingImages, onSubmit, onCancel, isSubmitting, onImagesChanged }) => {
  const [imageFiles, setImageFiles] = useState(null);
  const [images, setImages] = useState(existingImages || []);
  const [removingId, setRemovingId] = useState(null);
  const { data: locations } = useFetch(() => getLocations({ limit: 100 }), []);
  const { data: builders } = useFetch(() => getBuilders({ limit: 100 }), []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues || {
      status: "available",
      listingType: "sale",
      propertyType: "apartment",
      areaUnit: "sqft",
    },
  });

  const submit = (values) => {
    onSubmit(buildFormData(values, imageFiles));
  };

  const handleRemoveImage = async (publicId) => {
    if (!propertyId) return;
    setRemovingId(publicId);
    try {
      await removePropertyImage(propertyId, publicId);
      setImages((prev) => prev.filter((img) => img.publicId !== publicId));
      onImagesChanged?.();
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to remove image");
    } finally {
      setRemovingId(null);
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-5">
      <FormField
        label="Title"
        placeholder="e.g. 3BHK Sea-Facing Apartment in Mira Road"
        error={errors.title?.message}
        {...register("title", { required: "Title is required" })}
      />

      <FormTextarea
        label="Description"
        rows={4}
        placeholder="Describe the property in detail..."
        error={errors.description?.message}
        {...register("description", { required: "Description is required" })}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <FormSelect label="Property Type" {...register("propertyType")}>
          {PROPERTY_TYPES.map((type) => <option key={type} value={type}>{type}</option>)}
        </FormSelect>
        <FormSelect label="Listing Type" {...register("listingType")}>
          {LISTING_TYPES.map((type) => <option key={type} value={type}>{type}</option>)}
        </FormSelect>
        <FormSelect label="Status" {...register("status")}>
          {STATUSES.map((status) => <option key={status} value={status}>{status.replace("_", " ")}</option>)}
        </FormSelect>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <FormField label="Price (₹)" type="number" error={errors.priceAmount?.message} {...register("priceAmount", { required: "Price is required", min: 0 })} />
        <FormField label="Area Value" type="number" {...register("areaValue", { required: true, min: 0 })} />
        <FormSelect label="Area Unit" {...register("areaUnit")}>
          <option value="sqft">sqft</option>
          <option value="sqm">sqm</option>
          <option value="acres">acres</option>
        </FormSelect>
        <label className="flex items-center gap-2 self-end pb-2.5">
          <input type="checkbox" className="h-4 w-4 accent-gold-500" {...register("priceOnRequest")} />
          <span className="text-xs text-charcoal-500">Price on Request</span>
        </label>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <FormField label="Bedrooms" type="number" {...register("bedrooms", { min: 0 })} />
        <FormField label="Bathrooms" type="number" {...register("bathrooms", { min: 0 })} />
        <FormField label="Parking" type="number" {...register("parkingSpaces", { min: 0 })} />
        <FormField label="Floors" type="number" {...register("floors", { min: 0 })} />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormSelect label="Location" error={errors.location?.message} {...register("location", { required: "Location is required" })}>
          <option value="">Select a location</option>
          {locations?.map((loc) => <option key={loc._id} value={loc._id}>{loc.name}, {loc.city}</option>)}
        </FormSelect>
        <FormSelect label="Builder (optional)" {...register("builder")}>
          <option value="">No builder</option>
          {builders?.map((builder) => <option key={builder._id} value={builder._id}>{builder.name}</option>)}
        </FormSelect>
      </div>

      <FormField label="Amenities (comma-separated)" placeholder="Swimming Pool, Gym, Clubhouse" {...register("amenities")} />

      {images.length > 0 && (
        <div>
          <span className="mb-2 block text-xs font-semibold uppercase tracking-widest2 text-charcoal-500">Current Images</span>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
            {images.map((img) => (
              <div key={img.publicId} className="group relative aspect-square overflow-hidden rounded-lg border border-charcoal-100">
                <img src={img.url} alt="" className="h-full w-full object-cover" />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(img.publicId)}
                  disabled={removingId === img.publicId}
                  className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-charcoal-900/80 text-white opacity-0 transition-opacity group-hover:opacity-100 disabled:opacity-100"
                  aria-label="Remove image"
                >
                  <HiOutlineX className="text-xs" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-semibold uppercase tracking-widest2 text-charcoal-500">
          {images.length > 0 ? "Add More Images" : "Property Images"}
        </span>
        <input
          type="file"
          multiple
          accept="image/png,image/jpeg,image/webp"
          onChange={(e) => setImageFiles(e.target.files)}
          className="text-sm text-charcoal-700 file:mr-4 file:rounded-lg file:border-0 file:bg-charcoal-900 file:px-4 file:py-2 file:text-xs file:font-medium file:uppercase file:tracking-widest2 file:text-white"
        />
        <span className="text-xs text-charcoal-500">Up to 10 images. First image becomes the cover.</span>
      </label>

      <label className="flex items-center gap-2">
        <input type="checkbox" className="h-4 w-4 accent-gold-500" {...register("isFeatured")} />
        <span className="text-sm text-charcoal-700">Feature this property on the homepage</span>
      </label>

      <div className="mt-2 flex justify-end gap-3 border-t border-charcoal-100 pt-5">
        <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
        <Button type="submit" variant="gold" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Property"}
        </Button>
      </div>
    </form>
  );
};

export default PropertyForm;
