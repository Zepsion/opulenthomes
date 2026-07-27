"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { HiOutlinePlus } from "react-icons/hi";
import { useFetch } from "@hooks/useFetch.js";
import { getUsers, createStaffUser, updateUserStatus } from "@services/user.service.js";
import PageHeader from "@components/common/PageHeader.jsx";
import Button from "@components/common/Button.jsx";
import Badge from "@components/common/Badge.jsx";
import Modal from "@components/common/Modal.jsx";
import Loader from "@components/common/Loader.jsx";
import ErrorState from "@components/common/ErrorState.jsx";
import EmptyState from "@components/common/EmptyState.jsx";
import { FormField, FormSelect } from "@components/common/FormField.jsx";
import { formatDate } from "@lib/formatters.js";

const ROLES = ["admin", "broker", "builder", "customer"];

const CreateStaffForm = ({ onSubmit, onCancel, isSubmitting }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: { role: "admin" } });
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <FormField label="Full Name" error={errors.name?.message} {...register("name", { required: "Required" })} />
      <FormField label="Email" type="email" error={errors.email?.message} {...register("email", { required: "Required" })} />
      <FormField label="Temporary Password" type="password" error={errors.password?.message} {...register("password", { required: "Required", minLength: 8 })} />
      <FormField label="Phone" {...register("phone")} />
      <FormSelect label="Role" {...register("role")}>
        {ROLES.map((role) => <option key={role} value={role}>{role}</option>)}
      </FormSelect>
      <div className="mt-2 flex justify-end gap-3 border-t border-charcoal-100 pt-5">
        <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
        <Button type="submit" variant="gold" disabled={isSubmitting}>{isSubmitting ? "Creating..." : "Create Account"}</Button>
      </div>
    </form>
  );
};

export default function UsersPage() {
  const { data: users, isLoading, error, refetch } = useFetch(() => getUsers({ limit: 50 }), []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreate = async (values) => {
    setIsSubmitting(true);
    try {
      await createStaffUser(values);
      setIsModalOpen(false);
      refetch();
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to create account");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleStatus = async (user) => {
    await updateUserStatus(user._id, !user.isActive);
    refetch();
  };

  return (
    <div>
      <PageHeader
        title="Users & Staff"
        description="Manage staff accounts with access to this admin panel. Super admin only."
        action={<Button variant="gold" onClick={() => setIsModalOpen(true)}><HiOutlinePlus /> Add Staff Account</Button>}
      />

      {isLoading && <Loader label="Loading users" />}
      {error && <ErrorState message={error} onRetry={refetch} />}
      {!isLoading && !error && users?.length === 0 && <EmptyState title="No users found" />}

      {!isLoading && !error && users?.length > 0 && (
        <div className="overflow-hidden rounded-2xl border border-charcoal-100 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-charcoal-100 bg-charcoal-50/50 text-xs uppercase tracking-widest2 text-charcoal-500">
              <tr>
                <th className="px-6 py-3 font-medium">Name</th>
                <th className="px-6 py-3 font-medium">Email</th>
                <th className="px-6 py-3 font-medium">Role</th>
                <th className="px-6 py-3 font-medium">Joined</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-charcoal-100">
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-charcoal-50/40">
                  <td className="px-6 py-4 font-medium text-charcoal-900">{user.name}</td>
                  <td className="px-6 py-4 text-charcoal-700">{user.email}</td>
                  <td className="px-6 py-4"><Badge tone="gold">{user.role.replace("_", " ")}</Badge></td>
                  <td className="px-6 py-4 text-charcoal-500">{formatDate(user.createdAt)}</td>
                  <td className="px-6 py-4">
                    <Badge tone={user.isActive ? "green" : "red"}>{user.isActive ? "Active" : "Inactive"}</Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {user.role !== "super_admin" && (
                      <button onClick={() => handleToggleStatus(user)} className="text-xs font-medium uppercase tracking-widest2 text-gold-700 hover:text-gold-500">
                        {user.isActive ? "Deactivate" : "Activate"}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Staff Account">
        <CreateStaffForm onSubmit={handleCreate} onCancel={() => setIsModalOpen(false)} isSubmitting={isSubmitting} />
      </Modal>
    </div>
  );
}
