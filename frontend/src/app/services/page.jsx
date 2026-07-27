import { LuSearch, LuFileCheck2, LuHandshake, LuKeyRound } from "react-icons/lu";
import Container from "@components/common/Container.jsx";
import PageHeader from "@components/common/PageHeader.jsx";
import SectionHeading from "@components/common/SectionHeading.jsx";
import LuxuryCTA from "@components/home/LuxuryCTA.jsx";

export const metadata = {
  title: "Our Services",
  description:
    "From buying assistance to legal documentation — see how Opulent Homes supports you end-to-end across Mira Road, Bhayandar, and Mumbai real estate.",
  alternates: { canonical: "/services" },
};

const SERVICES = [
  {
    title: "Buying Assistance",
    description:
      "End-to-end support from shortlisting to final paperwork — including builder due diligence and price benchmarking against comparable resales.",
  },
  {
    title: "Rental Management",
    description:
      "Tenant sourcing, background verification, and lease drafting for owners who want rental income without the day-to-day management.",
  },
  {
    title: "Resale & Exit",
    description:
      "Valuation, staging guidance, and buyer matching for owners ready to sell — priced against real transaction data, not asking-price averages.",
  },
  {
    title: "Legal & Documentation",
    description:
      "Title verification, RERA checks, and agreement review handled by our in-house legal partners before you sign anything.",
  },
];

const PROCESS = [
  {
    icon: LuSearch,
    title: "Discover",
    description: "Tell us your budget, market, and must-haves. We shortlist within 48 hours.",
  },
  {
    icon: LuFileCheck2,
    title: "Verify",
    description: "We walk every shortlisted property and confirm builder and legal credentials.",
  },
  {
    icon: LuHandshake,
    title: "Negotiate",
    description: "Your advisor handles price discussions and paperwork on your behalf.",
  },
  {
    icon: LuKeyRound,
    title: "Move In",
    description: "Final registration support and handover coordination, start to finish.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="What We Do"
        title="Everything between browsing and owning."
        description="Buying property shouldn't require you to become a part-time lawyer, appraiser, and project manager. That's what we're here for."
      />

      <section className="bg-white py-24 lg:py-32">
        <Container>
          <SectionHeading eyebrow="Our Services" title="Four ways we make this easier." />
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {SERVICES.map((service) => (
              <div
                key={service.title}
                className="flex flex-col gap-3 rounded-2xl border border-charcoal-900/10 bg-ivory p-8"
              >
                <h3 className="font-display text-xl text-charcoal-900">{service.title}</h3>
                <p className="text-sm leading-relaxed text-charcoal-500">{service.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-charcoal-900 py-24 lg:py-32">
        <Container>
          <SectionHeading
            theme="dark"
            align="center"
            eyebrow="How It Works"
            title="A four-step process, start to finish."
            className="mx-auto"
          />

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((step, index) => (
              <div key={step.title} className="relative flex flex-col gap-4 rounded-2xl border border-ivory/10 p-8">
                <span className="font-display text-sm text-gold-500">0{index + 1}</span>
                <step.icon className="text-2xl text-gold-500" />
                <h3 className="font-display text-lg text-ivory">{step.title}</h3>
                <p className="text-sm leading-relaxed text-ivory/60">{step.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <LuxuryCTA
        eyebrow="Ready When You Are"
        title="Start with a single conversation."
        description="No commitment, no pressure — just a clear read on what's realistic for your budget and timeline."
        actionLabel="Talk to an Advisor"
      />
    </>
  );
}
