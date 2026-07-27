"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Container from "@components/common/Container.jsx";
import Button from "@components/common/Button.jsx";
import SearchBar from "@components/home/SearchBar.jsx";

const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative flex min-h-[100svh] flex-col overflow-hidden bg-charcoal-900">
      <motion.div
        style={{ y: imageY }}
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal-900/60 via-charcoal-900/70 to-charcoal-900" />

      <motion.div style={{ opacity: contentOpacity }} className="relative flex flex-1 flex-col justify-center pt-20">
        <Container>
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mb-6 inline-flex w-fit items-center gap-3 text-xs font-semibold uppercase tracking-widest2 text-gold-500"
          >
            <span className="h-px w-8 bg-gold-500" />
            Mira Road · Bhayandar · Mumbai
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl font-display text-5xl leading-[1.1] text-ivory sm:text-6xl lg:text-7xl"
          >
            Addresses built for a life <span className="italic text-gold-500">well chosen.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-ivory/70 sm:text-lg"
          >
            Opulent Homes curates a small number of exceptional residences across Mumbai's
            fastest-growing western suburbs — each one vetted for design, developer credibility,
            and long-term value.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Button href="/properties" variant="gold" size="lg">
              Explore Properties
            </Button>
            <Button href="/contact" variant="ghostLight" size="lg">
              Talk to an Advisor
            </Button>
          </motion.div>
        </Container>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="relative z-10 pb-10"
      >
        <Container>
          <SearchBar />
        </Container>
      </motion.div>
    </section>
  );
};

export default Hero;
