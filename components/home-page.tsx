import Image from "next/image";
import { About } from "@/components/sections/about";
import { ContactSection } from "@/components/contact/contact-section";
import { Features } from "@/components/sections/features";
import { Hero } from "@/components/sections/hero";
import { ProcessSection } from "@/components/process/process-section";
import { SiteHeader } from "@/components/site-header";
import { homeContent, siteConfig } from "@/data/site";

export function HomePage() {
  const { team } = homeContent;
  return <main><SiteHeader />
    <Hero />
    <About />
    <Features />
    <ProcessSection />
    <section id="team" className="bg-ink"><div className="mx-auto max-w-6xl px-5 py-20 lg:px-8"><p className="text-sm font-bold tracking-[0.14em] text-sky-300 uppercase">{team.eyebrow}</p><h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">{team.title}</h2><p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">{team.description}</p><div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">{team.members.map(({ image, name, role }) => <article key={name} className="overflow-hidden rounded-2xl bg-white"><Image src={image} alt={name} width={500} height={500} className="aspect-square w-full object-cover" /><div className="p-5"><h3 className="font-bold text-ink">{name}</h3><p className="mt-1 text-sm text-slate-600">{role}</p></div></article>)}</div></div></section>
    <ContactSection />
    <footer className="bg-slate-950"><div className="mx-auto flex max-w-6xl flex-col gap-5 px-5 py-8 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between lg:px-8"><p>Copyright {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p><div className="flex gap-5">{siteConfig.footerLinks.map(link => <a key={link.href} href={link.href} className="hover:text-white">{link.label}</a>)}</div></div></footer>
  </main>;
}
