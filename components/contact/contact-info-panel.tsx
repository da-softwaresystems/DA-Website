"use client";

import { Clock, Mail, MapPin, Phone, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { BrandIcon } from "@/components/contact/brand-icon";
import { homeContent, siteConfig } from "@/data/site";

export function ContactInfoPanel() {
  const { info, social } = homeContent.contact;
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.contact.address)}`;

  return (
    <div className="flex h-full flex-col gap-6">
      <div className="rounded-3xl bg-gradient-to-br from-ink to-slate-900 p-8 text-white shadow-2xl shadow-slate-900/20">
        <h3 className="text-lg font-bold">{info.officeName}</h3>
        <p className="mt-1 flex items-center gap-2 text-sm text-slate-300">
          <MapPin size={15} aria-hidden="true" className="shrink-0 text-sky-300" />
          {info.location}
        </p>

        <div className="mt-6 grid gap-4 border-t border-white/10 pt-6 text-sm">
          <a href={`mailto:${info.businessEmail}`} className="group flex items-start gap-3 text-slate-300 transition hover:text-white">
            <Mail size={17} aria-hidden="true" className="mt-0.5 shrink-0 text-sky-300" />
            <span>
              <span className="block font-semibold text-white">Business Email</span>
              <span className="group-hover:underline">{info.businessEmail}</span>
            </span>
          </a>

          <a href={siteConfig.contact.phoneHref} className="group flex items-start gap-3 text-slate-300 transition hover:text-white">
            <Phone size={17} aria-hidden="true" className="mt-0.5 shrink-0 text-sky-300" />
            <span>
              <span className="block font-semibold text-white">Phone</span>
              <span className="group-hover:underline">{info.phone}</span>
            </span>
          </a>

          <div className="flex items-start gap-3 text-slate-300">
            <Clock size={17} aria-hidden="true" className="mt-0.5 shrink-0 text-sky-300" />
            <span>
              <span className="block font-semibold text-white">Working Hours</span>
              {info.hours.days} · {info.hours.time}
            </span>
          </div>

          <div className="flex items-start gap-3 text-slate-300">
            <Zap size={17} aria-hidden="true" className="mt-0.5 shrink-0 text-sky-300" />
            <span>
              <span className="block font-semibold text-white">Quick Response</span>
              {info.responseTime}
            </span>
          </div>
        </div>

        <a
          href={mapsHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition duration-300 hover:border-white/40 hover:bg-white/10"
        >
          <MapPin size={16} aria-hidden="true" />
          View on Google Maps
        </a>

        <div className="mt-6 flex gap-2.5 border-t border-white/10 pt-6">
          {social.map((item) => (
            <motion.a
              key={item.label}
              href={item.href}
              aria-label={item.label}
              whileHover={{ y: -3, scale: 1.08 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-accent text-white shadow-md shadow-brand/20"
            >
              <BrandIcon brand={item.icon} size={17} />
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
}
