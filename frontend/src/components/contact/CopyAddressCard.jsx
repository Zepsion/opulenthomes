"use client";

import { useState } from "react";
import { HiOutlineLocationMarker } from "react-icons/hi";

const CopyAddressCard = ({ label, value }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="flex w-full items-start gap-4 rounded-2xl border border-charcoal-900/10 bg-white p-6 text-left transition-colors hover:border-gold-500/50"
      aria-label={`Copy office address: ${value}`}
    >
      <HiOutlineLocationMarker className="mt-0.5 shrink-0 text-xl text-gold-500" />
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-widest2 text-charcoal-500">{label}</p>
        <p className="mt-1 text-sm text-charcoal-900">{value}</p>
        <p className="mt-2 text-xs font-medium text-gold-700">{copied ? "Copied" : "Click to copy"}</p>
      </div>
    </button>
  );
};

export default CopyAddressCard;
