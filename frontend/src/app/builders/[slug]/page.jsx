import { notFound } from "next/navigation";
import { HiOutlineBadgeCheck, HiOutlineGlobeAlt, HiOutlineMail, HiOutlinePhone } from "react-icons/hi";
import Container from "@components/common/Container.jsx";
import PageHeader from "@components/common/PageHeader.jsx";
import PropertyGrid from "@components/property/PropertyGrid.jsx";
import { getBuilderBySlug } from "@lib/api-server.js";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { data, notFound: isNotFound } = await getBuilderBySlug(slug);
  if (isNotFound || !data) return { title: "Builder Not Found" };

  return {
    title: data.builder.name,
    description:
      data.builder.description?.slice(0, 155) ||
      `View verified properties from ${data.builder.name}, a builder partner of Opulent Homes.`,
    alternates: { canonical: `/builders/${slug}` },
  };
}

export default async function BuilderDetailsPage({ params }) {
  const { slug } = await params;
  const { data, notFound: isNotFound } = await getBuilderBySlug(slug);

  if (isNotFound || !data) notFound();

  const { builder, properties } = data;

  return (
    <>
      <PageHeader eyebrow="Builder Profile" title={builder.name} description={builder.description} />

      <section className="bg-ivory py-16 lg:py-24">
        <Container>
          <div className="mb-14 grid grid-cols-1 gap-6 rounded-2xl border border-charcoal-900/10 bg-white p-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center gap-4 sm:col-span-2 lg:col-span-1">
              <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-charcoal-50">
                {builder.logo?.url ? (
                  <img src={builder.logo.url} alt={builder.name} className="h-full w-full object-cover" />
                ) : (
                  <span className="font-display text-2xl text-gold-700">{builder.name?.[0]}</span>
                )}
              </div>
              <div>
                <p className="flex items-center gap-1.5 font-display text-lg text-charcoal-900">
                  {builder.name}
                  {builder.isVerified && <HiOutlineBadgeCheck className="text-gold-500" />}
                </p>
                {builder.establishedYear && (
                  <p className="text-xs text-charcoal-500">Est. {builder.establishedYear}</p>
                )}
              </div>
            </div>

            {builder.headquarters && (
              <div>
                <p className="text-xs uppercase tracking-widest2 text-charcoal-500">Headquarters</p>
                <p className="mt-1 text-sm text-charcoal-900">{builder.headquarters}</p>
              </div>
            )}

            {builder.contactEmail && (
              <a
                href={`mailto:${builder.contactEmail}`}
                className="flex items-center gap-2 text-sm text-charcoal-700 hover:text-gold-700"
              >
                <HiOutlineMail className="text-gold-500" />
                {builder.contactEmail}
              </a>
            )}

            {builder.contactPhone && (
              <a
                href={`tel:${builder.contactPhone}`}
                className="flex items-center gap-2 text-sm text-charcoal-700 hover:text-gold-700"
              >
                <HiOutlinePhone className="text-gold-500" />
                {builder.contactPhone}
              </a>
            )}

            {builder.website && (
              <a
                href={builder.website}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-sm text-charcoal-700 hover:text-gold-700"
              >
                <HiOutlineGlobeAlt className="text-gold-500" />
                Visit Website
              </a>
            )}
          </div>

          <h2 className="mb-8 font-display text-2xl text-charcoal-900">
            Properties by {builder.name}
          </h2>
          <PropertyGrid
            properties={properties}
            emptyMessage={`${builder.name} doesn't have any active listings right now.`}
          />
        </Container>
      </section>
    </>
  );
}
