"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HiOutlineHome,
  HiOutlineOfficeBuilding,
  HiOutlineUserGroup,
  HiOutlineLocationMarker,
  HiOutlineInboxIn,
  HiOutlineUsers,
  HiOutlineCog,
  HiOutlineLogout,
} from "react-icons/hi";
import { useAuth } from "@hooks/useAuth.js";
import { SIDEBAR_LINKS } from "@lib/constants.js";

const ICONS = {
  Dashboard: HiOutlineHome,
  Properties: HiOutlineOfficeBuilding,
  Builders: HiOutlineUserGroup,
  Locations: HiOutlineLocationMarker,
  Leads: HiOutlineInboxIn,
  Users: HiOutlineUsers,
  Settings: HiOutlineCog,
};

const Sidebar = () => {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-charcoal-100 bg-white">
      <div className="flex h-20 items-center px-6">
        <span className="font-display text-xl text-charcoal-900">Opulent</span>
        <span className="font-display text-xl italic text-gold-500">Homes</span>
      </div>

      <nav className="flex-1 space-y-1 px-4">
        {SIDEBAR_LINKS.map((link) => {
          const Icon = ICONS[link.label] || HiOutlineHome;
          const isActive = link.path === "/" ? pathname === "/" : pathname?.startsWith(link.path);
          return (
            <Link
              key={link.path}
              href={link.path}
              className={`flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                isActive ? "bg-gold-50 text-gold-700" : "text-charcoal-500 hover:bg-charcoal-50 hover:text-charcoal-900"
              }`}
            >
              <Icon className="text-lg" />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-charcoal-100 p-4">
        <div className="mb-3 flex items-center gap-3 px-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-charcoal-900 text-sm font-medium text-gold-500">
            {user?.name?.[0]?.toUpperCase() || "A"}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-charcoal-900">{user?.name}</p>
            <p className="truncate text-xs capitalize text-charcoal-500">{user?.role?.replace("_", " ")}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-charcoal-500 hover:bg-red-50 hover:text-red-600"
        >
          <HiOutlineLogout className="text-lg" />
          Log Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
