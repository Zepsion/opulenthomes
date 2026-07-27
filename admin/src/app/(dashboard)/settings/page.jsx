"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import PageHeader from "@components/common/PageHeader.jsx";
import { FormField } from "@components/common/FormField.jsx";
import Button from "@components/common/Button.jsx";
import { useAuth } from "@hooks/useAuth.js";
import { apiClient } from "@services/apiClient.js";

export default function SettingsPage() {
  const { user } = useAuth();
  const [status, setStatus] = useState("idle");
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (values) => {
    setStatus("submitting");
    try {
      await apiClient.patch("/auth/change-password", {
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      });
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <div>
      <PageHeader title="Settings" description="Manage your account and security preferences." />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-charcoal-100 bg-white p-6">
          <h3 className="mb-4 font-display text-lg text-charcoal-900">Profile</h3>
          <div className="flex flex-col gap-3 text-sm">
            <div>
              <p className="text-xs uppercase tracking-widest2 text-charcoal-500">Name</p>
              <p className="text-charcoal-900">{user?.name}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest2 text-charcoal-500">Email</p>
              <p className="text-charcoal-900">{user?.email}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest2 text-charcoal-500">Role</p>
              <p className="capitalize text-charcoal-900">{user?.role?.replace("_", " ")}</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-charcoal-100 bg-white p-6">
          <h3 className="mb-4 font-display text-lg text-charcoal-900">Change Password</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <FormField label="Current Password" type="password" error={errors.currentPassword?.message} {...register("currentPassword", { required: "Required" })} />
            <FormField label="New Password" type="password" error={errors.newPassword?.message} {...register("newPassword", { required: "Required", minLength: 8 })} />

            {status === "success" && <p className="text-sm text-emerald-600">Password updated successfully.</p>}
            {status === "error" && <p className="text-sm text-red-600">Failed to update password. Check your current password.</p>}

            <Button type="submit" variant="gold" disabled={status === "submitting"} className="w-fit">
              {status === "submitting" ? "Updating..." : "Update Password"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
