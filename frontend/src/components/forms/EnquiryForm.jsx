"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { submitLead } from "@lib/api-client.js";

const EnquiryForm = ({ propertyId, source = "website", title = "Send an Enquiry", theme = "light" }) => {
  const [status, setStatus] = useState("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (values) => {
    setStatus("submitting");
    try {
      await submitLead({ ...values, property: propertyId, source });
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  const isDark = theme === "dark";
  const inputClasses = `w-full rounded-lg border px-4 py-3 text-sm transition-colors focus:border-gold-500 ${
    isDark
      ? "border-ivory/20 bg-ivory/5 text-ivory placeholder:text-ivory/40"
      : "border-charcoal-900/10 bg-white text-charcoal-900 placeholder:text-charcoal-500/50"
  }`;
  const labelClasses = `text-xs font-semibold uppercase tracking-widest2 ${
    isDark ? "text-ivory/70" : "text-charcoal-500"
  }`;

  return (
    <div>
      {title && (
        <h3 className={`mb-6 font-display text-2xl ${isDark ? "text-ivory" : "text-charcoal-900"}`}>
          {title}
        </h3>
      )}

      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-xl border px-5 py-6 text-sm ${
              isDark
                ? "border-gold-500/30 bg-gold-500/10 text-ivory"
                : "border-gold-500/30 bg-gold-50 text-charcoal-900"
            }`}
          >
            Thank you — we've received your enquiry. An advisor will reach out within one
            business day.
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col gap-1.5">
              <label className={labelClasses}>Full Name</label>
              <input
                type="text"
                placeholder="Your name"
                className={inputClasses}
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && <span className="text-xs text-red-500">{errors.name.message}</span>}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className={labelClasses}>Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className={inputClasses}
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <span className="text-xs text-red-500">{errors.email.message}</span>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className={labelClasses}>Phone</label>
              <input
                type="tel"
                placeholder="+91 XXXXX XXXXX"
                className={inputClasses}
                {...register("phone", { required: "Phone number is required" })}
              />
              {errors.phone && (
                <span className="text-xs text-red-500">{errors.phone.message}</span>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className={labelClasses}>Message (optional)</label>
              <textarea
                rows={4}
                placeholder="Tell us what you're looking for..."
                className={inputClasses}
                {...register("message")}
              />
            </div>

            {status === "error" && (
              <p className="text-sm text-red-500">
                Something went wrong sending this. Please try again.
              </p>
            )}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="mt-2 rounded-full bg-gold-500 px-6 py-3 text-sm font-medium uppercase tracking-widest2 text-charcoal-900 transition-colors hover:bg-gold-300 disabled:opacity-60"
            >
              {status === "submitting" ? "Sending..." : "Send Enquiry"}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EnquiryForm;
