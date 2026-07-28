import Hero from "@components/home/Hero.jsx";
import LocationMarquee from "@components/home/LocationMarquee.jsx";
import AboutTeaser from "@components/home/AboutTeaser.jsx";
import LuxuryCTA from "@components/home/LuxuryCTA.jsx";
import Container from "@components/common/Container.jsx";
import SectionHeading from "@components/common/SectionHeading.jsx";
import Button from "@components/common/Button.jsx";
import PropertyGrid from "@components/property/PropertyGrid.jsx";
import { getProperties } from "@lib/api-server.js";

export const metadata = {
  title: "Opulent Homes | Premium Real Estate in Mira Road, Bhayandar & Mumbai",
  description:
    "Curated, verified real estate listings across Mira Road, Bhayandar, and Mumbai. Explore featured residences from vetted builders.",
  alternates: { canonical: "/" },
};

export default async function Home() {
  const { data: properties } = await getProperties({ limit: 6, sort: "-createdAt" });
  const featuredOnly = properties?.filter((p) => p.isFeatured);
  const displayed = (featuredOnly?.length ? featuredOnly : properties)?.slice(0, 6);

  return (
    <>
      <Hero />
      <LocationMarquee />

      <section className="bg-ivory py-24 lg:py-32">
        <Container>
          <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="Curated Inventory"
              title="Featured properties in Mumbai"
              description="Browse all our luxurious properties with stunning views and world-class amenities in Mumbai."
            />
            <Button href="/properties" variant="ghost" size="md" className="w-fit shrink-0">
              View All Properties
            </Button>
          </div>

          <div className="mt-14">
            <PropertyGrid
              properties={displayed}
              emptyMessage="New listings are added regularly — check back soon, or tell us what you're looking for."
            />
          </div>
        </Container>
      </section>

      <AboutTeaser />
      <LuxuryCTA />
    </>
  );
}
