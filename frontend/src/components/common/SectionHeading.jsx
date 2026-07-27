"use client";

import { motion } from "framer-motion";

const SectionHeading = ({
  eyebrow,
  title,
  description,
  align = "left",
  theme = "light",
  className = "",
}) => {
  const alignment = align === "center" ? "items-center text-center mx-auto" : "items-start text-left";
  const titleColor = theme === "dark" ? "text-ivory" : "text-charcoal-900";
  const descColor = theme === "dark" ? "text-ivory/70" : "text-charcoal-500";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`flex max-w-2xl flex-col gap-4 ${alignment} ${className}`}
    >
      {eyebrow && (
        <span className="text-xs font-semibold uppercase tracking-widest2 text-gold-500">
          {eyebrow}
        </span>
      )}
      <h2 className={`font-display text-3xl leading-tight sm:text-4xl lg:text-[2.75rem] ${titleColor}`}>
        {title}
      </h2>
      {description && <p className={`text-base leading-relaxed ${descColor}`}>{description}</p>}
    </motion.div>
  );
};

export default SectionHeading;
