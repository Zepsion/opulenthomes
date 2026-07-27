"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { FormField, FormTextarea } from "@components/common/FormField.jsx";
import Button from "@components/common/Button.jsx";

const buildFormData = (values, logoFile) => {
  const formData = new FormData();
  formData.append("name", values.name);
  formData.append("description", values.description || "");
  formData.append("establishedYear", values.establishedYear || "");
  formData.append("headquarters", values.headquarters || "");
  formData.append("website", values.website || "");
  formData.append("contactEmail", values.contactEmail || "");
  formData.append("contactPhone", values.contactPhone || "");
  formData.append("isFeatured", values.isFeatured ? "true" : "false");
  if (logoFile) formData.append("logo", logoFile);
  return formData;
};

const BuilderForm = ({ initialValues, onSubmit, onCancel, isSubmitting }) => {
  const [logoFile, setLogoFile] = useState(null);
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues || {} });

  const submit = (values) => onSubmit(buildFormData(values, logoFile));

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-5">
      <FormField label="Builder Name" placeholder="e.g. Skyline Developers" error={errors.name?.message} {...register("name", { required: "Name is required" })} />
      <FormTextarea label="Description" rows={3} {...register("description")} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField label="Established Year" type="number" {...register("establishedYear")} />
        <FormField label="Headquarters" {...register("headquarters")} />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField label="Contact Email" type="email" {...register("contactEmail")} />
        <FormField label="Contact Phone" {...register("contactPhone")} />
      </div>
      <FormField label="Website" placeholder="https://" {...register("website")} />
      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-semibold uppercase tracking-widest2 text-charcoal-500">Logo</span>
        <input
          type="file"
          accept="image/png,image/jpeg,image/webp"
          onChange={(e) => setLogoFile(e.target.files?.[0] || null)}
          className="text-sm text-charcoal-700 file:mr-4 file:rounded-lg file:border-0 file:bg-charcoal-900 file:px-4 file:py-2 file:text-xs file:font-medium file:uppercase file:tracking-widest2 file:text-white"
        />
      </label>
      <label className="flex items-center gap-2">
        <input type="checkbox" className="h-4 w-4 accent-gold-500" {...register("isFeatured")} />
        <span className="text-sm text-charcoal-700">Feature this builder</span>
      </label>
      <div className="mt-2 flex justify-end gap-3 border-t border-charcoal-100 pt-5">
        <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
        <Button type="submit" variant="gold" disabled={isSubmitting}>{isSubmitting ? "Saving..." : "Save Builder"}</Button>
      </div>
    </form>
  );
};

export default BuilderForm;
