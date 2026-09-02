"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "@hooks/useAuth.js";
import { FormField } from "@components/common/FormField.jsx";
import Button from "@components/common/Button.jsx";
import { ROUTES } from "@lib/constants.js";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (values) => {
    setServerError("");
    setIsSubmitting(true);
    try {
      await login(values);
      router.replace(ROUTES.DASHBOARD);
    } catch (err) {
      setServerError(err?.response?.data?.message || err.message || "Login failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-charcoal-900 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-card"
      >
        <div className="mb-8 text-center">
          <p className="font-display text-2xl text-charcoal-900">
            Opulent<span className="italic text-gold-500"> Homes</span>
          </p>
          <p className="mt-1 text-xs uppercase tracking-widest2 text-charcoal-500">Admin Panel</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <FormField
            label="Email"
            type="email"
            placeholder="admin@opulenthomes.com"
            error={errors.email?.message}
            {...register("email", { required: "Email is required" })}
          />

          <div className="relative">
            <FormField
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              error={errors.password?.message}
              {...register("password", { required: "Password is required" })}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] text-charcoal-500 hover:text-charcoal-900"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {serverError && <p className="text-sm text-red-600">{serverError}</p>}

          <Button type="submit" variant="gold" className="mt-2 w-full" disabled={isSubmitting}>
            {isSubmitting ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </motion.div>
    </div>
  );
}