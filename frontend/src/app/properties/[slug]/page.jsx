import { notFound } from "next/navigation";
import Link from "next/link";
import {
  HiOutlineLocationMarker,
  HiOutlineArrowLeft,
  HiOutlineBadgeCheck,
} from "react-icons/hi";
import { LuBedDouble, LuBath, LuSquare, LuCar, LuBuilding2 } from "react-icons/lu";
import Container from "@components/common/Container.jsx";
import EnquiryForm from "@components/forms/EnquiryForm.jsx";
import PropertyGallery from "@components/property/PropertyGallery.jsx";
import { getPropertyBySlug } from "@lib/api-server.js";
import { formatCurrency, formatArea } from "@lib/formatters.js";
import { PROPERTY_STATUS_LABELS, SITE_URL } from "@lib/constants.js";

/**
 * Runs at request time (or build time) — this is what actually gives
 * Google a unique title/description/OG image per property instead of
 * one generic title for every listing, which is what the old
 * client-only SPA was stuck with.
 */
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { data: property, notFound: isNotFound } = await getPropertyBySlug(slug);
  if (isNotFound || !property) return { title: "Property Not Found" };

  const cover = property.images?.find((img) => img.isCover) || property.images?.[0];
  const description = property.description?.slice(0, 155);

  return {
    title: property.title,
    description,
    alternates: { canonical: `/properties/${slug}` },
    openGraph: {
      title: property.title,
      description,
      images: cover?.url ? [{ url: cover.url }] : [],
    },
  };
}

export default async function PropertyDetailsPage({ params }) {
  const { slug } = await params;
  const { data: property, notFound: isNotFound } = await getPropertyBySlug(slug);

  if (isNotFound || !property) notFound();

  const specs = [
    { icon: LuBedDouble, label: "Bedrooms", value: property.bedrooms },
    { icon: LuBath, label: "Bathrooms", value: property.bathrooms },
    { icon: LuSquare, label: "Area", value: formatArea(property.area?.value, property.area?.unit) },
    { icon: LuCar, label: "Parking", value: property.parkingSpaces },
    { icon: LuBuilding2, label: "Floors", value: property.floors },
  ].filter((spec) => spec.value);

  const cover = property.images?.find((img) => img.isCover) || property.images?.[0];

  // JSON-LD structured data — helps Google understand this is a real
  // estate listing and can surface price/location in rich results.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: property.title,
    description: property.description,
    image: cover?.url,
    url: `${SITE_URL}/properties/${property.slug}`,
    offers: {
      "@type": "Offer",
      price: property.price?.amount,
      priceCurrency: property.price?.currency || "INR",
      availability:
        property.status === "available"
          ? "https://schema.org/InStock"
          : "https://schema.org/SoldOut",
    },
  };

  return (
    <div className="pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="bg-charcoal-900 pb-6 pt-10">
        <Container>
          <Link
            href="/properties"
            className="mb-6 inline-flex items-center gap-2 text-xs uppercase tracking-widest2 text-ivory/60 hover:text-gold-500"
          >
            <HiOutlineArrowLeft />
            Back to Properties
          </Link>

          <PropertyGallery images={property.images} title={property.title} />
        </Container>
      </section>

      <section className="bg-ivory py-16 lg:py-24">
        <Container className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_380px]">
          <div>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest2 text-gold-700">
                  {PROPERTY_STATUS_LABELS[property.status] || property.status}
                </span>
                <h1 className="mt-2 font-display text-3xl text-charcoal-900 sm:text-4xl">
                  {property.title}
                </h1>
                <p className="mt-2 flex items-center gap-1.5 text-sm text-charcoal-500">
                  <HiOutlineLocationMarker className="text-gold-500" />
                  {property.location?.name}, {property.location?.city}, {property.location?.state}
                </p>
              </div>
              <p className="font-display text-3xl text-gold-700">
                {property.price?.priceOnRequest
                  ? "Price on Request"
                  : formatCurrency(property.price?.amount)}
              </p>
            </div>

            {specs.length > 0 && (
              <div className="mt-8 grid grid-cols-2 gap-4 border-y border-charcoal-900/10 py-8 sm:grid-cols-3 lg:grid-cols-5">
                {specs.map((spec) => (
                  <div key={spec.label} className="flex flex-col items-center gap-2 text-center">
                    <spec.icon className="text-xl text-gold-500" />
                    <span className="font-display text-lg text-charcoal-900">{spec.value}</span>
                    <span className="text-xs uppercase tracking-widest2 text-charcoal-500">
                      {spec.label}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-8">
              <h2 className="font-display text-2xl text-charcoal-900">About This Property</h2>
              <p className="mt-4 whitespace-pre-line text-base leading-relaxed text-charcoal-700">
                {property.description}
              </p>
            </div>

            {property.amenities?.length > 0 && (
              <div className="mt-10">
                <h2 className="font-display text-2xl text-charcoal-900">Amenities</h2>
                <div className="mt-4 flex flex-wrap gap-3">
                  {property.amenities.map((amenity) => (
                    <span
                      key={amenity}
                      className="rounded-full border border-charcoal-900/10 px-4 py-2 text-sm text-charcoal-700"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {property.builder && (
              <div className="mt-10 flex items-center gap-4 rounded-2xl border border-charcoal-900/10 bg-white p-6">
                <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-charcoal-50">
                  {property.builder.logo?.url ? (
                    <img src={property.builder.logo.url} alt="" className="h-full w-full object-cover" />
                  ) : (
                    <span className="font-display text-xl text-gold-700">
                      {property.builder.name?.[0]}
                    </span>
                  )}
                </div>
                <div>
                  <p className="flex items-center gap-1.5 font-display text-lg text-charcoal-900">
                    {property.builder.name}
                    {property.builder.isVerified && <HiOutlineBadgeCheck className="text-gold-500" />}
                  </p>
                  <Link
                    href={`/builders/${property.builder.slug}`}
                    className="text-xs uppercase tracking-widest2 text-gold-700 hover:text-gold-500"
                  >
                    View Builder Profile
                  </Link>
                </div>
              </div>
            )}
          </div>

          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-2xl border border-charcoal-900/10 bg-white p-8 shadow-card">
              <EnquiryForm propertyId={property._id} title="Enquire About This Property" />
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
