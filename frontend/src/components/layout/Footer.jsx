import Link from "next/link";
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker } from "react-icons/hi";
import Container from "@components/common/Container.jsx";
import { NAV_LINKS, SOCIAL_LINKS } from "@lib/constants.js";

const MARKETS = ["Mira Road", "Bhayandar", "Mumbai"];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-charcoal-900 text-ivory">
      <Container className="grid grid-cols-1 gap-12 py-20 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-4">
        <Link href="/" className="flex items-center">
            <img
              src="/OpulentHome-logo.png"
              alt="Opulent Homes"
              className="h-12 w-auto object-contain"
            />
          </Link>
          <p className="max-w-xs text-sm leading-relaxed text-ivory/60">
          At Opulent Home, we believe finding the right property should feel reassuring, not overwhelming. That is why we take a more careful and transparent approach to real estate across Mira Road, Bhayandar, and Mumbai’s western suburbs.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="text-xs font-semibold uppercase tracking-widest2 text-gold-500">
            Navigate
          </h4>
          <ul className="flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <li key={link.path}>
                <Link href={link.path} className="text-sm text-ivory/70 hover:text-ivory">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="text-xs font-semibold uppercase tracking-widest2 text-gold-500">
            Markets
          </h4>
          <ul className="flex flex-col gap-3">
            {MARKETS.map((market) => (
              <li key={market} className="flex items-center gap-2 text-sm text-ivory/70">
                <HiOutlineLocationMarker className="text-gold-500" />
                {market}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="text-xs font-semibold uppercase tracking-widest2 text-gold-500">
            Get in Touch
          </h4>
          <a
            href="tel:+9769444414"
            className="flex items-center gap-2 text-sm text-ivory/70 hover:text-ivory"
          >
            <HiOutlinePhone className="text-gold-500" />
            +91 9769444414
          </a>
          <a
            href="mailto:hello@opulenthomes.in"
            className="flex items-center gap-2 text-sm text-ivory/70 hover:text-ivory"
          >
            <HiOutlineMail className="text-gold-500" />
            opulenthomess@gmail.com
          </a>
        </div>
      </Container>

      <div className="border-t border-ivory/10">
        <Container className="flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
          <p className="text-xs text-ivory/50">© {year} Opulent Homes. All rights reserved.</p>
          {/* <p className="text-xs text-ivory/50">RERA registration details available on request.</p> */}
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
