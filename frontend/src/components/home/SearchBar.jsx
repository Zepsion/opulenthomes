"use client";

import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { HiOutlineSearch } from "react-icons/hi";
import { PROPERTY_TYPE_OPTIONS, LISTING_TYPE_OPTIONS, BUDGET_OPTIONS } from "@lib/constants.js";

const SearchBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      listingType: searchParams.get("listingType") || "sale",
      propertyType: searchParams.get("propertyType") || "",
      maxPrice: searchParams.get("maxPrice") || "",
    },
  });

  const onSubmit = (values) => {
    const params = new URLSearchParams();
    Object.entries(values).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    router.push(`/properties?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid w-full grid-cols-1 gap-3 rounded-2xl border border-charcoal-900/5 bg-white/95 p-4 shadow-luxe backdrop-blur sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto] lg:p-5"
    >
      <label className="flex flex-col gap-1">
        <span className="text-[11px] font-semibold uppercase tracking-widest2 text-charcoal-500">
          Looking to
        </span>
        <select
          {...register("listingType")}
          className="rounded-lg border border-charcoal-900/10 bg-transparent px-3 py-2.5 text-sm text-charcoal-900 focus:border-gold-500"
        >
          {LISTING_TYPE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1">
        <span className="text-[11px] font-semibold uppercase tracking-widest2 text-charcoal-500">
          Property Type
        </span>
        <select
          {...register("propertyType")}
          className="rounded-lg border border-charcoal-900/10 bg-transparent px-3 py-2.5 text-sm text-charcoal-900 focus:border-gold-500"
        >
          <option value="">Any Type</option>
          {PROPERTY_TYPE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1">
        <span className="text-[11px] font-semibold uppercase tracking-widest2 text-charcoal-500">
          Budget Up To
        </span>
        <select
          {...register("maxPrice")}
          className="rounded-lg border border-charcoal-900/10 bg-transparent px-3 py-2.5 text-sm text-charcoal-900 focus:border-gold-500"
        >
          <option value="">Any Budget</option>
          {BUDGET_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </label>

      <button
        type="submit"
        className="flex items-center justify-center gap-2 rounded-lg bg-charcoal-900 px-6 py-2.5 text-sm font-medium uppercase tracking-widest2 text-ivory transition-colors hover:bg-gold-500 hover:text-charcoal-900 sm:col-span-2 lg:col-span-1"
      >
        <HiOutlineSearch className="text-base" />
        Search
      </button>
    </form>
  );
};

export default SearchBar;
