import { HiOutlineMail, HiOutlinePhone, HiOutlineClock } from "react-icons/hi";
import Container from "@components/common/Container.jsx";
import PageHeader from "@components/common/PageHeader.jsx";
import EnquiryForm from "@components/forms/EnquiryForm.jsx";
import GoogleMapSection from "@components/googleMap/GoogleMapSection.jsx";
import CopyAddressCard from "@components/contact/CopyAddressCard.jsx";

export const metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Opulent Homes for real estate enquiries in Mira Road, Bhayandar, and Mumbai. Talk to a real advisor, not a bot.",
  alternates: { canonical: "/contact" },
};

const CONTACT_DETAILS = [
  { icon: HiOutlinePhone, label: "Phone", value: "+91 9769444414", href: "tel:+9769444414" },
  {
    icon: HiOutlineMail,
    label: "Email",
    value: "opulenthomess@gmail.com",
    href: "mailto:opulenthomess@gmail.com",
  },
  {
    label: "Office",
    value:
      "Shop No-02 N.G Vedant  Opp RBK School,Poonam Garden Rd, Chandan Shanti, Mira Road East, Mira Bhayandar, Maharashtra 401107",
    copy: true,
  },
  { icon: HiOutlineClock, label: "Hours", value: "Everyday, 10:00 AM – 9:00 PM" },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Get In Touch"
        title="Tell us what you're looking for."
        description="Whether you're buying, renting, or just exploring the market one message gets you a real answer from a real advisor, not an automated drip campaign."
      />

      <section className="bg-ivory py-16 lg:py-24">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-[380px_1fr]">
          <div className="flex flex-col gap-6">
            {CONTACT_DETAILS.map((detail) =>
              detail.copy ? (
                <CopyAddressCard key={detail.label} label={detail.label} value={detail.value} />
              ) : (
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
              )
            )}
          </div>

          <div className="rounded-2xl border border-charcoal-900/10 bg-white p-8 sm:p-10">
            <EnquiryForm source="website" title="Send Us a Message" />
          </div>
        </Container>
      </section>
      <GoogleMapSection/>
    </>
  );
}
