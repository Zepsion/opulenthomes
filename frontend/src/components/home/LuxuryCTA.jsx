"use client";

import { motion } from "framer-motion";
import Container from "@components/common/Container.jsx";
import Button from "@components/common/Button.jsx";

const LuxuryCTA = ({
  eyebrow = "Private Consultations",
  title = "Let's find your next address.",
  description = "Share what you're looking for and one of our advisors will curate a shortlist within 24 hours — no listings spam, no follow-up calls you didn't ask for.",
  actionLabel = "Book a Consultation",
  actionHref = "/contact",
}) => {
  return (
    <section className="relative overflow-hidden bg-charcoal-900 py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(201,162,77,0.12),transparent_45%)]" />
      <Container className="relative flex flex-col items-center gap-6 text-center">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-xs font-semibold uppercase tracking-widest2 text-gold-500"
        >
          {eyebrow}
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="max-w-2xl font-display text-4xl leading-tight text-ivory sm:text-5xl"
        >
          {title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-xl text-base leading-relaxed text-ivory/70"
        >
          {description}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-4"
        >
          <Button href={actionHref} variant="gold" size="lg">
            {actionLabel}
          </Button>
        </motion.div>
      </Container>
    </section>
  );
};

export default LuxuryCTA;
