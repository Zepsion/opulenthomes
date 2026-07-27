import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker, HiOutlineClock } from "react-icons/hi";
import Container from "@components/common/Container.jsx";
import PageHeader from "@components/common/PageHeader.jsx";
import EnquiryForm from "@components/forms/EnquiryForm.jsx";

export const metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Opulent Homes for real estate enquiries in Mira Road, Bhayandar, and Mumbai. Talk to a real advisor, not a bot.",
  alternates: { canonical: "/contact" },
};

const CONTACT_DETAILS = [
  { icon: HiOutlinePhone, label: "Phone", value: "+91 22 1234 5678", href: "tel:+912212345678" },
  {
    icon: HiOutlineMail,
    label: "Email",
    value: "hello@opulenthomes.in",
    href: "mailto:hello@opulenthomes.in",
  },
  {
    icon: HiOutlineLocationMarker,
    label: "Office",
    value: "Mira Road (E), Thane, Maharashtra",
  },
  { icon: HiOutlineClock, label: "Hours", value: "Mon–Sat, 10:00 AM – 7:00 PM" },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Get In Touch"
        title="Tell us what you're looking for."
        description="Whether you're buying, renting, or just exploring the market — one message gets you a real answer from a real advisor, not an automated drip campaign."
      />

      <section className="bg-ivory py-16 lg:py-24">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-[380px_1fr]">
          <div className="flex flex-col gap-6">
            {CONTACT_DETAILS.map((detail) => (
              <div
                key={detail.label}
                className="flex items-start gap-4 rounded-2xl border border-charcoal-900/10 bg-white p-6"
              >
                <detail.icon className="mt-0.5 shrink-0 text-xl text-gold-500" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest2 text-charcoal-500">
                    {detail.label}
                  </p>
                  {detail.href ? (
                    <a href={detail.href} className="mt-1 block text-sm text-charcoal-900 hover:text-gold-700">
                      {detail.value}
                    </a>
                  ) : (
                    <p className="mt-1 text-sm text-charcoal-900">{detail.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-charcoal-900/10 bg-white p-8 sm:p-10">
            <EnquiryForm source="website" title="Send Us a Message" />
          </div>
        </Container>
      </section>
    </>
  );
}
