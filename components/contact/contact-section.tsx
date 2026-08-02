import { ContactFinalCta } from "@/components/contact/contact-final-cta";
import { ContactMain } from "@/components/contact/contact-main";
import { SectionHeader } from "@/components/sections/section-header";
import { WhyContactCards } from "@/components/contact/why-contact-cards";
import { homeContent } from "@/data/site";

export function ContactSection() {
  const { eyebrow, title, subtitle } = homeContent.contact;

  return (
    <section id="contact" className="relative overflow-hidden bg-mist py-24 sm:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute -top-24 left-[8%] h-80 w-80 rounded-full bg-brand/10 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 right-[8%] h-80 w-80 rounded-full bg-accent/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeader eyebrow={eyebrow} title={title} description={subtitle} />

        <div className="mt-16">
          <ContactMain />
        </div>

        <WhyContactCards />
        <ContactFinalCta />
      </div>
    </section>
  );
}
