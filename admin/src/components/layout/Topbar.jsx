"use client";

import { HiOutlineExternalLink } from "react-icons/hi";

const Topbar = () => {
  const today = new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  return (
    <header className="flex h-20 items-center justify-between border-b border-charcoal-100 bg-white px-8">
      <p className="text-sm text-charcoal-500">{today}</p>
      <a
        href={process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000"}
        target="_blank"
        rel="noreferrer"
        className="flex items-center gap-2 text-sm font-medium text-charcoal-700 hover:text-gold-700"
      >
        View Live Site
        <HiOutlineExternalLink />
      </a>
    </header>
  );
};

export default Topbar;
