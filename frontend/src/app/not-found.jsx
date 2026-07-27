import Link from "next/link";
import Container from "@components/common/Container.jsx";
import Button from "@components/common/Button.jsx";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-ivory pt-20">
      <Container className="flex flex-col items-center gap-6 text-center">
        <span className="text-xs font-semibold uppercase tracking-widest2 text-gold-700">
          404
        </span>
        <h1 className="font-display text-4xl text-charcoal-900">This page doesn't exist.</h1>
        <p className="max-w-md text-sm text-charcoal-500">
          The listing or page you're looking for may have been removed or the link is incorrect.
        </p>
        <Button href="/properties" variant="gold" size="md">
          Browse Properties
        </Button>
        <Link href="/" className="text-xs uppercase tracking-widest2 text-charcoal-500 hover:text-gold-700">
          Back to Home
        </Link>
      </Container>
    </section>
  );
}
