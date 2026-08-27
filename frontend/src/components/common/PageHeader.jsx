"use client";

import { motion } from "framer-motion";
import Container from "@components/common/Container.jsx";

const PageHeader = ({ eyebrow, title, description, align = "left" }) => {
  const isCentered = align === "center";

  return (
    <section className="relative overflow-hidden bg-charcoal-900 pb-16 pt-36 sm:pb-20 sm:pt-40">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(201,162,77,0.15),transparent_50%)]" />
      <Container className={`relative ${isCentered ? "flex flex-col items-center text-center" : ""}`}>
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`mb-4 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-widest2 text-gold-500 ${
            isCentered ? "justify-center" : ""
          }`}
        >
          <span className="h-px w-8 bg-gold-500" />
          {eyebrow}
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className={`max-w-2xl font-display text-4xl leading-tight text-ivory sm:text-5xl ${
            isCentered ? "mx-auto" : ""
          }`}
        >
          {title}
        </motion.h1>
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className={`mt-5 text-base leading-relaxed text-ivory/70 ${
              isCentered ? "mx-auto max-w-3xl" : "max-w-xl"
            }`}
          >
            {description}
          </motion.p>
        )}
      </Container>
    </section>
  );
};

export default PageHeader;
