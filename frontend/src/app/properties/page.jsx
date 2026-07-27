import Container from "@components/common/Container.jsx";
import PageHeader from "@components/common/PageHeader.jsx";
import PropertyFilters from "@components/property/PropertyFilters.jsx";
import PropertyGrid from "@components/property/PropertyGrid.jsx";
import { getProperties } from "@lib/api-server.js";

export const metadata = {
  title: "Properties",
  description:
    "Browse verified property listings for sale and rent across Mira Road, Bhayandar, and Mumbai. Filter by type, budget, and market.",
  alternates: { canonical: "/properties" },
};

export default async function PropertiesPage({ searchParams }) {
  const params = await searchParams;
  const { data: properties } = await getProperties(params);

  return (
    <>
      <PageHeader
        eyebrow="The Full Collection"
        title="Every residence, one search away."
        description="Filter by market, property type, and budget to find the address that fits. New listings are added as they're vetted by our team."
      />

      <section className="bg-ivory py-16 lg:py-24">
        <Container className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[280px_1fr]">
          <aside className="lg:sticky lg:top-28">
            <PropertyFilters />
          </aside>

          <div>
            <PropertyGrid properties={properties} />
          </div>
        </Container>
      </section>
    </>
  );
}
