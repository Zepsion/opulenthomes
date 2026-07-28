"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import Container from "@components/common/Container.jsx";
import Button from "@components/common/Button.jsx";
import { NAV_LINKS } from "@lib/constants.js";

const Navbar = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-charcoal-900/90 backdrop-blur-md shadow-[0_1px_0_0_rgba(201,162,77,0.2)]"
          : "bg-transparent"
      }`}
    >
      <Container>
        <nav className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center">
            <img
              src="/OpulentHome-logo.png"
              alt="Opulent Homes"
              className="h-12 w-auto object-contain"
            />
          </Link>

          <div className="hidden items-center gap-10 lg:flex">
            {NAV_LINKS.map((link) => {
              const isActive = link.path === "/" ? pathname === "/" : pathname?.startsWith(link.path);
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`text-sm uppercase tracking-widest2 transition-colors ${
                    isActive ? "text-gold-500" : "text-ivory/80 hover:text-ivory"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="hidden lg:block">
            <Button href="/contact" variant="gold" size="md">
              Enquire Now
            </Button>
          </div>

          <button
            aria-label="Toggle menu"
            onClick={() => setIsMobileOpen((prev) => !prev)}
            className="text-2xl text-ivory lg:hidden"
          >
            {isMobileOpen ? <HiOutlineX /> : <HiOutlineMenu />}
          </button>
        </nav>
      </Container>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="overflow-hidden bg-charcoal-900 lg:hidden"
          >
            <Container className="flex flex-col gap-6 py-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`text-lg uppercase tracking-widest2 ${
                    pathname === link.path ? "text-gold-500" : "text-ivory/80"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Button href="/contact" variant="gold" size="md">
                Enquire Now
              </Button>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
