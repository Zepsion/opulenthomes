"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { FormField } from "@components/common/FormField.jsx";
import Button from "@components/common/Button.jsx";

const buildFormData = (values, coverImageFile) => {
  const formData = new FormData();
  formData.append("name", values.name);
  formData.append("city", values.city);
  formData.append("state", values.state);
  formData.append("country", values.country || "India");
  formData.append("pincode", values.pincode || "");
  if (values.lat) formData.append("coordinates[lat]", values.lat);
  if (values.lng) formData.append("coordinates[lng]", values.lng);
  formData.append("isFeatured", values.isFeatured ? "true" : "false");
  if (coverImageFile) formData.append("coverImage", coverImageFile);
  return formData;
};

const LocationForm = ({ initialValues, onSubmit, onCancel, isSubmitting }) => {
  const [coverImageFile, setCoverImageFile] = useState(null);
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues || { country: "India" } });

  const submit = (values) => onSubmit(buildFormData(values, coverImageFile));

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-5">
      <FormField label="Location Name" placeholder="e.g. Kanakia Road" error={errors.name?.message} {...register("name", { required: "Name is required" })} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField label="City" error={errors.city?.message} {...register("city", { required: "City is required" })} />
        <FormField label="State" error={errors.state?.message} {...register("state", { required: "State is required" })} />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField label="Country" {...register("country")} />
        <FormField label="Pincode" {...register("pincode")} />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField label="Latitude (optional)" type="number" step="any" {...register("lat")} />
        <FormField label="Longitude (optional)" type="number" step="any" {...register("lng")} />
      </div>
      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-semibold uppercase tracking-widest2 text-charcoal-500">Cover Image</span>
        <input
          type="file"
          accept="image/png,image/jpeg,image/webp"
          onChange={(e) => setCoverImageFile(e.target.files?.[0] || null)}
          className="text-sm text-charcoal-700 file:mr-4 file:rounded-lg file:border-0 file:bg-charcoal-900 file:px-4 file:py-2 file:text-xs file:font-medium file:uppercase file:tracking-widest2 file:text-white"
        />
      </label>
      <label className="flex items-center gap-2">
        <input type="checkbox" className="h-4 w-4 accent-gold-500" {...register("isFeatured")} />
        <span className="text-sm text-charcoal-700">Feature this location</span>
      </label>
      <div className="mt-2 flex justify-end gap-3 border-t border-charcoal-100 pt-5">
        <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
        <Button type="submit" variant="gold" disabled={isSubmitting}>{isSubmitting ? "Saving..." : "Save Location"}</Button>
      </div>
    </form>
  );
};

export default LocationForm;
