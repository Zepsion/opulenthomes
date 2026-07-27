"use client";

import { motion } from "framer-motion";
import Container from "@components/common/Container.jsx";
import SectionHeading from "@components/common/SectionHeading.jsx";
import Button from "@components/common/Button.jsx";

const STATS = [
  { value: "120+", label: "Residences Curated" },
  { value: "18", label: "Verified Builder Partners" },
  { value: "3", label: "Core Markets" },
];

const AboutTeaser = () => {
  return (
    <section className="bg-white py-24 lg:py-32">
      <Container className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative aspect-[4/5] overflow-hidden rounded-3xl"
        >
          <img
            src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1400&auto=format&fit=crop"
            alt="An Opulent Homes advisor reviewing a residence with a client"
            className="h-full w-full object-cover"
          />
        </motion.div>

        <div className="flex flex-col gap-10">
          <SectionHeading
            eyebrow="Why Opulent Homes"
            title="We don't list everything. We list what's worth your time."
            description="Every residence on this site has been walked through, cross-checked against builder credentials, and benchmarked against comparable resale value before it ever reaches you. It's a slower way to sell real estate — and the only one we're interested in."
          />

          <div className="grid grid-cols-3 gap-6 border-t border-charcoal-900/10 pt-8">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-3xl text-gold-700">{stat.value}</p>
                <p className="mt-1 text-xs uppercase tracking-widest2 text-charcoal-500">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <Button href="/about" variant="dark" size="md" className="w-fit">
            More About Us
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default AboutTeaser;
