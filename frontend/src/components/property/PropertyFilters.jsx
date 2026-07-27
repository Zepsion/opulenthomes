"use client";

import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { PROPERTY_TYPE_OPTIONS, LISTING_TYPE_OPTIONS, BUDGET_OPTIONS } from "@lib/constants.js";

const PropertyFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      listingType: searchParams.get("listingType") || "",
      propertyType: searchParams.get("propertyType") || "",
      maxPrice: searchParams.get("maxPrice") || "",
      sort: searchParams.get("sort") || "-createdAt",
    },
  });

  const onSubmit = (values) => {
    const params = new URLSearchParams();
    Object.entries(values).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    router.push(`/properties?${params.toString()}`);
  };

  const onClear = () => {
    reset({ listingType: "", propertyType: "", maxPrice: "", sort: "-createdAt" });
    router.push("/properties");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6 rounded-2xl border border-charcoal-900/10 bg-white p-6"
    >
      <div className="flex items-center justify-between">
        <h3 className="font-display text-lg text-charcoal-900">Refine Search</h3>
        <button
          type="button"
          onClick={onClear}
          className="text-xs uppercase tracking-widest2 text-charcoal-500 hover:text-gold-700"
        >
          Clear
        </button>
      </div>

      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-semibold uppercase tracking-widest2 text-charcoal-500">
          Looking to
        </span>
        <select {...register("listingType")} className="rounded-lg border border-charcoal-900/10 px-3 py-2.5 text-sm focus:border-gold-500">
          <option value="">Buy or Rent</option>
          {LISTING_TYPE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-semibold uppercase tracking-widest2 text-charcoal-500">
          Property Type
        </span>
        <select {...register("propertyType")} className="rounded-lg border border-charcoal-900/10 px-3 py-2.5 text-sm focus:border-gold-500">
          <option value="">Any Type</option>
          {PROPERTY_TYPE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-semibold uppercase tracking-widest2 text-charcoal-500">
          Budget Up To
        </span>
        <select {...register("maxPrice")} className="rounded-lg border border-charcoal-900/10 px-3 py-2.5 text-sm focus:border-gold-500">
          <option value="">Any Budget</option>
          {BUDGET_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-semibold uppercase tracking-widest2 text-charcoal-500">
          Sort By
        </span>
        <select {...register("sort")} className="rounded-lg border border-charcoal-900/10 px-3 py-2.5 text-sm focus:border-gold-500">
          <option value="-createdAt">Newest First</option>
          <option value="price.amount">Price: Low to High</option>
          <option value="-price.amount">Price: High to Low</option>
        </select>
      </label>

      <button
        type="submit"
        className="rounded-full bg-charcoal-900 px-6 py-3 text-sm font-medium uppercase tracking-widest2 text-ivory transition-colors hover:bg-gold-500 hover:text-charcoal-900"
      >
        Apply Filters
      </button>
    </form>
  );
};

export default PropertyFilters;
