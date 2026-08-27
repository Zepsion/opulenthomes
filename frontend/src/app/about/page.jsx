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
        align="center"
        eyebrow="Our Story"
        title="Built by people who grew up in these suburbs."
        description="Finding a property in Mira Road and Bhayandar should be straightforward. Yet buyers often have to deal with outdated listings, incomplete information, changing prices, unclear project details, and properties that look very different online compared with reality. We saw an opportunity to do things differently. Opulent Homes started with the intention of bringing greater clarity, verification, and local knowledge into the property-buying experience. Instead of treating real estate as a numbers game where more listings automatically mean better service, we chose a more careful path. "
      />

      <section className="bg-white py-24 lg:py-32">
        <Container className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <div className="order-2 flex flex-col gap-6 lg:order-1">
            <SectionHeading
              eyebrow="Our Mission"
              title="A shorter path between a good home and the right buyer."
              description="Buying a home is one of the biggest financial decisions most people make. It deserves more than attractive photographs and a list of amenities."
            />
            <p className="text-base leading-relaxed text-charcoal-500">
            Our mission is to create a trusted real estate experience in Mira Road, Bhayandar, and the wider Mumbai western suburbs by bringing together verified property information, local market understanding, and honest guidance.
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
