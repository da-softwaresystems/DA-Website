import { LegalPage } from "@/components/legal-page";
import { siteConfig, type LegalSection } from "@/data/site";

type LegalDocumentProps = { document: { title: string; subtitle: string; introductory: readonly string[]; sections: readonly LegalSection[] } };

export function LegalDocument({ document }: LegalDocumentProps) {
  return <LegalPage title={document.title} subtitle={document.subtitle}>
    <div className="space-y-7 text-slate-600 [&_h2]:mt-9 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-ink [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-6">
      {document.introductory.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      {document.sections.map((section) => <section key={section.heading}><h2>{section.heading}</h2>{section.paragraphs?.map((paragraph) => <p key={paragraph} className="mt-4">{paragraph}</p>)}{section.items && <ul className="mt-4">{section.items.map((item) => <li key={item}>{item}</li>)}</ul>}</section>)}
      <section><h2>Contact</h2><p className="mt-4">For questions, email <a className="font-semibold text-brand underline" href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>.</p></section>
    </div>
  </LegalPage>;
}
