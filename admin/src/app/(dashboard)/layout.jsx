"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@hooks/useAuth.js";
import { ROUTES } from "@lib/constants.js";
import Sidebar from "@components/layout/Sidebar.jsx";
import Topbar from "@components/layout/Topbar.jsx";

/**
 * Every route inside the (dashboard) group renders through this layout.
 * It's the Next.js equivalent of the old ProtectedRoute + DashboardLayout
 * combo — checks auth once, redirects unauthenticated visitors to /login,
 * and otherwise wraps children in the Sidebar/Topbar shell.
 */
export default function DashboardGroupLayout({ children }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace(ROUTES.LOGIN);
    }
  }, [isLoading, user, router]);

  if (isLoading || !user) {
    return null;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-charcoal-50">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-8">{children}</main>
      </div>
    </div>
  );
}
