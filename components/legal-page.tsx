import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Archive,
  Baby,
  CalendarDays,
  Clock,
  Cloud,
  Database,
  KeyRound,
  ListChecks,
  Mail,
  Plug,
  RefreshCw,
  Send,
  ShieldCheck,
  Smartphone,
  Trash2,
  UserCog,
} from "lucide-react";
import { siteConfig } from "@/data/site";
import type { LegalBlock, LegalDocument, LegalIcon, LegalSection } from "@/data/legal";

const sectionIcons: Record<LegalIcon, typeof Database> = {
  database: Database,
  device: Smartphone,
  usage: ListChecks,
  cloud: Cloud,
  shield: ShieldCheck,
  plug: Plug,
  key: KeyRound,
  control: UserCog,
  children: Baby,
  refresh: RefreshCw,
  mail: Mail,
  send: Send,
  trash: Trash2,
  archive: Archive,
  clock: Clock,
};

function Blocks({ blocks, subject }: Readonly<{ blocks: readonly LegalBlock[]; subject: string }>) {
  return (
    <div className="mt-4 space-y-4">
      {blocks.map((block, index) => {
        if (block.kind === "text") {
          return <p key={index} className="text-[15px] leading-7 text-slate-600 sm:text-base sm:leading-8">{block.body}</p>;
        }

        if (block.kind === "list") {
          return (
            <ul key={index} className="grid gap-2.5 sm:grid-cols-2">
              {block.items.map((item) => (
                <li key={item} className="flex gap-2.5 rounded-xl bg-mist px-3.5 py-2.5 text-[15px] leading-6 text-slate-600">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-brand to-accent" />
                  {item}
                </li>
              ))}
            </ul>
          );
        }

        if (block.kind === "link") {
          return (
            <Link
              key={index}
              href={block.href}
              className="inline-flex items-center gap-1.5 rounded-full border border-brand/20 bg-brand/5 px-4 py-2 text-sm font-semibold text-brand transition hover:border-brand/40 hover:bg-brand/10"
            >
              {block.label}
              <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          );
        }

        return (
          <div key={index} className="rounded-2xl border border-slate-200/70 bg-mist p-5 sm:p-6">
            <p className="text-xs font-bold tracking-[0.16em] text-slate-500 uppercase">{block.title}</p>
            {block.email ? (
              <a
                href={`mailto:${block.email}?subject=${subject}`}
                className="mt-2 inline-flex items-center gap-2 text-base font-bold break-all text-brand underline decoration-brand/30 underline-offset-4 transition hover:decoration-brand sm:text-lg"
              >
                <Mail size={17} aria-hidden="true" className="shrink-0" />
                {block.email}
              </a>
            ) : null}
            {block.body ? <p className="mt-2 text-[15px] leading-7 text-slate-600">{block.body}</p> : null}
            {block.items ? (
              <ul className="mt-3 space-y-2">
                {block.items.map((item) => (
                  <li key={item} className="flex gap-2.5 text-[15px] leading-6 text-slate-600">
                    <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-brand to-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

function Section({ section, index, subject }: Readonly<{ section: LegalSection; index: number; subject: string }>) {
  const Icon = sectionIcons[section.icon];

  return (
    <section id={section.id} className="scroll-mt-24 border-t border-slate-200/80 pt-8 first:border-0 first:pt-0">
      <div className="flex items-start gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand to-accent text-white shadow-lg shadow-brand/20">
          <Icon size={20} aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <p className="text-xs font-bold tracking-[0.18em] text-slate-400 uppercase">
            {String(index + 1).padStart(2, "0")}
          </p>
          <h2 className="mt-0.5 text-xl font-bold tracking-tight text-ink sm:text-2xl">{section.title}</h2>
        </div>
      </div>
      <div className="sm:pl-15">
        <Blocks blocks={section.blocks} subject={subject} />
      </div>
    </section>
  );
}

export function LegalPage({ document }: Readonly<{ document: LegalDocument }>) {
  const { eyebrow, title, subtitle, effectiveDate, intro, sections, cta } = document;
  const subject = encodeURIComponent(`${title} — Study Library Manager`);
  const mailto = `mailto:${siteConfig.contact.email}?subject=${subject}`;

  return (
    <main className="min-h-screen bg-white">
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5 lg:px-8">
          <Link href="/" aria-label={`${siteConfig.name} home`}>
            <Image src={siteConfig.logo.src} alt={siteConfig.logo.alt} width={siteConfig.logo.width} height={siteConfig.logo.height} className="h-9 w-auto sm:h-10" priority />
          </Link>
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 transition hover:text-brand">
            <ArrowLeft size={15} aria-hidden="true" />
            <span className="hidden sm:inline">Back to site</span>
            <span className="sm:hidden">Home</span>
          </Link>
        </div>
      </header>

      <section className="relative overflow-hidden bg-ink px-5 py-16 text-white sm:py-20 lg:px-8">
        <div aria-hidden="true" className="pointer-events-none absolute -top-28 -right-24 h-96 w-96 rounded-full bg-brand/30 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 -left-24 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />

        <div className="relative mx-auto max-w-6xl">
          <p className="text-xs font-bold tracking-[0.2em] text-sky-300 uppercase sm:text-sm">{eyebrow}</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">{title}</h1>
          <p className="mt-4 max-w-2xl text-base text-slate-300 sm:text-lg">{subtitle}</p>

          <div className="mt-7 flex flex-wrap gap-2.5">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-slate-100 sm:text-sm">
              <CalendarDays size={14} aria-hidden="true" />
              Effective {effectiveDate}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-slate-100 sm:text-sm">
              <ShieldCheck size={14} aria-hidden="true" />
              {siteConfig.name}
            </span>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl gap-12 px-5 py-12 sm:py-16 lg:grid lg:grid-cols-[15rem_minmax(0,1fr)] lg:px-8">
        <nav aria-label="On this page" className="mb-10 lg:mb-0">
          <div className="lg:sticky lg:top-24">
            <p className="text-xs font-bold tracking-[0.18em] text-slate-400 uppercase">On this page</p>
            <ul className="mt-4 space-y-1 border-l border-slate-200 lg:mt-5">
              {sections.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`} className="-ml-px block border-l border-transparent py-1.5 pl-4 text-sm text-slate-500 transition hover:border-brand hover:text-brand">
                    {section.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <article>
          <div className="space-y-4 rounded-3xl border border-slate-200/70 bg-mist p-6 sm:p-8">
            {intro.map((paragraph) => (
              <p key={paragraph} className="text-[15px] leading-7 text-slate-600 sm:text-base sm:leading-8">{paragraph}</p>
            ))}
          </div>

          <div className="mt-12 space-y-10">
            {sections.map((section, index) => (
              <Section key={section.id} section={section} index={index} subject={subject} />
            ))}
          </div>

          <div className="mt-14 overflow-hidden rounded-3xl bg-gradient-to-br from-brand to-accent p-7 text-white shadow-xl shadow-brand/20 sm:p-9">
            <h2 className="text-xl font-bold tracking-tight sm:text-2xl">{cta.title}</h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-white/85 sm:text-base">{cta.description}</p>
            <a
              href={mailto}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-brand shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              <Mail size={16} aria-hidden="true" />
              {siteConfig.contact.email}
            </a>
          </div>
        </article>
      </div>

      <footer className="bg-slate-950">
        <div className="mx-auto flex max-w-6xl flex-col gap-5 px-5 py-8 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>Copyright {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <div className="flex gap-5">
            {siteConfig.footerLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-white">{link.label}</Link>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}
