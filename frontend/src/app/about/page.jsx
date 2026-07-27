import Container from "@components/common/Container.jsx";
import PageHeader from "@components/common/PageHeader.jsx";
import SectionHeading from "@components/common/SectionHeading.jsx";
import LuxuryCTA from "@components/home/LuxuryCTA.jsx";

export const metadata = {
  title: "About Us",
  description:
    "Opulent Homes was built to give Mira Road and Bhayandar buyers verified, trustworthy real estate listings — learn about our mission and values.",
  alternates: { canonical: "/about" },
};

const VALUES = [
  {
    title: "Vetted, Not Volume",
    description:
      "Every listing is walked through by our team before it's published. We'd rather show you twelve exceptional homes than two hundred average ones.",
  },
  {
    title: "Builder Accountability",
    description:
      "We check RERA registration, construction history, and past-buyer feedback before we ever put a builder's name on this site.",
  },
  {
    title: "Advisory, Not Sales",
    description:
      "Our advisors are paid to match you with the right home, not to close the fastest deal. If nothing here fits, we'll tell you.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our Story"
        title="Built by people who grew up in these suburbs."
        description="Opulent Homes started with a simple frustration: real estate listings in Mira Road and Bhayandar were either outdated, misleading, or both. We set out to fix that, one verified listing at a time."
      />

      <section className="bg-white py-24 lg:py-32">
        <Container className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <div className="order-2 flex flex-col gap-6 lg:order-1">
            <SectionHeading
              eyebrow="Our Mission"
              title="A shorter path between a good home and the right buyer."
              description="Mumbai's western suburbs are growing faster than the information available about them. We built Opulent Homes to close that gap — combining on-ground verification with an experience that respects your time."
            />
            <p className="text-base leading-relaxed text-charcoal-500">
              Since our first listing, we've worked directly with families relocating for work,
              first-time investors, and long-time residents upgrading within the neighborhoods
              they already love. The common thread: they wanted a second opinion they could trust
              before signing anything.
            </p>
          </div>

          <div className="order-1 aspect-[4/5] overflow-hidden rounded-3xl lg:order-2">
            <img
              src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=1400&auto=format&fit=crop"
              alt="A residential skyline in Mumbai's western suburbs"
              className="h-full w-full object-cover"
            />
          </div>
        </Container>
      </section>

      <section className="bg-ivory py-24 lg:py-32">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="What We Stand For"
            title="Three commitments that don't change with the market."
            className="mx-auto"
          />

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {VALUES.map((value) => (
              <div
                key={value.title}
                className="flex flex-col gap-4 rounded-2xl border border-charcoal-900/10 bg-white p-8"
              >
                <span className="h-px w-10 bg-gold-500" />
                <h3 className="font-display text-xl text-charcoal-900">{value.title}</h3>
                <p className="text-sm leading-relaxed text-charcoal-500">{value.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <LuxuryCTA
        eyebrow="Work With Us"
        title="Come see what we mean."
        description="Book a no-obligation call with one of our advisors and tell us what you're looking for — we'll be honest if we can't help."
        actionLabel="Book a Call"
      />
    </>
  );
}
