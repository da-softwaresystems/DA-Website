"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { siteConfig } from "@/data/site";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur">
    <nav className="mx-auto flex h-18 max-w-6xl items-center justify-between px-5 lg:px-8" aria-label="Main navigation">
      <Link href="/" className="flex items-center" aria-label={`${siteConfig.name} home`}>
        <Image {...siteConfig.logo} className="h-11 w-auto" priority />
      </Link>
      <div className="hidden items-center gap-7 md:flex">
        {siteConfig.navigation.map(({ label, href }) => <a key={href} href={href} className="text-sm font-medium text-slate-600 transition hover:text-brand">{label}</a>)}
        <a href={siteConfig.primaryCta.href} className="rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-deep">{siteConfig.primaryCta.label}</a>
      </div>
      <button className="rounded-lg p-2 text-ink md:hidden" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} onClick={() => setOpen(!open)}>
        {open ? <X /> : <Menu />}
      </button>
    </nav>
    {open && <div className="border-t border-slate-100 bg-white px-5 py-4 md:hidden">
      <div className="mx-auto flex max-w-6xl flex-col gap-1">
        {siteConfig.navigation.map(({ label, href }) => <a key={href} href={href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 font-medium text-slate-700 hover:bg-mist">{label}</a>)}
      </div>
    </div>}
  </header>;
}
