"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const PropertyGallery = ({ images, title }) => {
  const [activeImage, setActiveImage] = useState(0);
  const gallery = images?.length ? images : [{ url: null, publicId: "placeholder" }];

  return (
    <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1fr_320px]">
      <motion.div
        key={activeImage}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="aspect-[16/10] overflow-hidden rounded-2xl bg-charcoal-700"
      >
        {gallery[activeImage]?.url ? (
          <img src={gallery[activeImage].url} alt={title} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs uppercase tracking-widest2 text-ivory/40">
            No image available
          </div>
        )}
      </motion.div>

      <div className="grid grid-cols-3 gap-3 lg:grid-cols-1">
        {gallery.slice(0, 3).map((img, index) => (
          <button
            key={img.publicId || index}
            onClick={() => setActiveImage(index)}
            className={`aspect-[16/10] overflow-hidden rounded-xl border-2 transition-colors ${
              activeImage === index ? "border-gold-500" : "border-transparent"
            }`}
          >
            {img.url ? (
              <img src={img.url} alt="" className="h-full w-full object-cover" />
            ) : (
              <div className="h-full w-full bg-charcoal-700" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PropertyGallery;
