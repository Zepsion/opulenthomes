import Container from "@components/common/Container.jsx";
import PageHeader from "@components/common/PageHeader.jsx";
import BuilderCard from "@components/builder/BuilderCard.jsx";
import EmptyState from "@components/common/EmptyState.jsx";
import { getBuilders } from "@lib/api-server.js";

export const metadata = {
  title: "Verified Builders",
  description:
    "Meet the verified builder partners behind Opulent Homes listings across Mira Road, Bhayandar, and Mumbai.",
  alternates: { canonical: "/builders" },
};

export default async function BuildersPage() {
  const { data: builders } = await getBuilders({ limit: 24 });

  return (
    <>
      <PageHeader
        eyebrow="Our Partners"
        title="Developers we vouch for."
        description="We only work with builders whose track record, RERA compliance, and construction quality we've verified ourselves — not just whoever pays for a listing."
      />

      <section className="bg-ivory py-16 lg:py-24">
        <Container>
          {(!builders || builders.length === 0) ? (
            <EmptyState
              title="No builder profiles yet"
              description="Verified builder partners will appear here as they're onboarded."
            />
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {builders.map((builder, index) => (
                <BuilderCard key={builder._id} builder={builder} index={index} />
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
