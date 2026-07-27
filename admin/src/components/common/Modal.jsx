"use client";

import { AnimatePresence, motion } from "framer-motion";
import { HiOutlineX } from "react-icons/hi";

const Modal = ({ isOpen, onClose, title, children, maxWidth = "max-w-2xl" }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal-900/60 p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className={`max-h-[90vh] w-full ${maxWidth} overflow-y-auto rounded-2xl bg-white shadow-card`}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-charcoal-100 bg-white px-6 py-4">
              <h3 className="font-display text-lg text-charcoal-900">{title}</h3>
              <button onClick={onClose} aria-label="Close" className="rounded-full p-1.5 text-charcoal-500 hover:bg-charcoal-50 hover:text-charcoal-900">
                <HiOutlineX className="text-lg" />
              </button>
            </div>
            <div className="px-6 py-6">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
