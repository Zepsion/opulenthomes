"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { LuBedDouble, LuBath, LuSquare } from "react-icons/lu";
import { formatCurrency, formatArea } from "@lib/formatters.js";
import { PROPERTY_STATUS_LABELS } from "@lib/constants.js";

const PropertyCard = ({ property, index = 0 }) => {
  const cover = property.images?.find((img) => img.isCover) || property.images?.[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <Link href={`/properties/${property.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-charcoal-200">
          {cover?.url ? (
            <img
              src={cover.url}
              alt={property.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-charcoal-100 text-xs uppercase tracking-widest2 text-charcoal-500">
              No image yet
            </div>
          )}

          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-charcoal-900/70 to-transparent" />

          {property.isFeatured && (
            <span className="absolute left-4 top-4 rounded-full bg-gold-500 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest2 text-charcoal-900">
              Featured
            </span>
          )}
          <span className="absolute right-4 top-4 rounded-full bg-charcoal-900/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest2 text-ivory backdrop-blur">
            {PROPERTY_STATUS_LABELS[property.status] || property.status}
          </span>

          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-ivory">
            <span className="font-display text-xl">
              {property.price?.priceOnRequest
                ? "Price on Request"
                : formatCurrency(property.price?.amount)}
            </span>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-2">
          <h3 className="font-display text-xl text-charcoal-900 transition-colors group-hover:text-gold-700">
            {property.title}
          </h3>
          <p className="flex items-center gap-1.5 text-sm text-charcoal-500">
            <HiOutlineLocationMarker className="text-gold-500" />
            {property.location?.name}, {property.location?.city}
          </p>

          <div className="mt-1 flex items-center gap-4 border-t border-charcoal-900/10 pt-3 text-sm text-charcoal-500">
            {property.bedrooms > 0 && (
              <span className="flex items-center gap-1.5">
                <LuBedDouble className="text-gold-500" />
                {property.bedrooms} Beds
              </span>
            )}
            {property.bathrooms > 0 && (
              <span className="flex items-center gap-1.5">
                <LuBath className="text-gold-500" />
                {property.bathrooms} Baths
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <LuSquare className="text-gold-500" />
              {formatArea(property.area?.value, property.area?.unit)}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default PropertyCard;
