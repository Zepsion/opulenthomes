"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { HiOutlineBadgeCheck } from "react-icons/hi";

const BuilderCard = ({ builder, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
    >
      <Link
        href={`/builders/${builder.slug}`}
        className="group flex flex-col items-center gap-5 rounded-2xl border border-charcoal-900/10 bg-white p-8 text-center shadow-card transition-transform hover:-translate-y-1"
      >
        <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-charcoal-50">
          {builder.logo?.url ? (
            <img src={builder.logo.url} alt={builder.name} className="h-full w-full object-cover" />
          ) : (
            <span className="font-display text-2xl text-gold-700">{builder.name?.[0]}</span>
          )}
        </div>

        <div>
          <h3 className="flex items-center justify-center gap-1.5 font-display text-lg text-charcoal-900 group-hover:text-gold-700">
            {builder.name}
            {builder.isVerified && <HiOutlineBadgeCheck className="text-gold-500" />}
          </h3>
          {builder.headquarters && (
            <p className="mt-1 text-xs uppercase tracking-widest2 text-charcoal-500">
              {builder.headquarters}
            </p>
          )}
        </div>

        {builder.totalProjectsCompleted > 0 && (
          <p className="text-xs text-charcoal-500">
            {builder.totalProjectsCompleted}+ projects completed
          </p>
        )}
      </Link>
    </motion.div>
  );
};

export default BuilderCard;
