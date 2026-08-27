import { FaWhatsapp } from "react-icons/fa";
import { HiOutlinePhone } from "react-icons/hi";
import { SOCIAL_LINKS, CONTACT_PHONE } from "@lib/constants.js";

const FloatingActions = () => {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
      <a
        href={SOCIAL_LINKS.whatsapp}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-2xl text-white shadow-luxe transition-transform hover:scale-105"
      >
        <FaWhatsapp />
      </a>
      <a
        href={`tel:${CONTACT_PHONE.tel}`}
        aria-label="Call Opulent Homes"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-charcoal-900 text-xl text-gold-500 shadow-luxe transition-transform hover:scale-105"
      >
        <HiOutlinePhone />
      </a>
    </div>
  );
};

export default FloatingActions;
