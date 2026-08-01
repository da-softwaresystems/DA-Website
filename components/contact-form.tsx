"use client";

import { FormEvent, useState } from "react";
import { siteConfig } from "@/data/site";

export function ContactForm() {
  const [status, setStatus] = useState("");
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`Website enquiry from ${form.get("name")}`);
    const body = encodeURIComponent(`Name: ${form.get("name")}\nEmail: ${form.get("email")}\nPhone: ${form.get("phone")}\n\nMessage:\n${form.get("message")}`);
    window.location.href = `mailto:${siteConfig.contact.email}?subject=${subject}&body=${body}`;
    setStatus("Your email app should now open with your enquiry prepared.");
  }
  return <form onSubmit={submit} className="grid gap-4" aria-describedby="form-status">
    <label className="grid gap-1.5 text-sm font-medium">Name<input name="name" required className="rounded-lg border border-slate-300 px-3 py-2.5 outline-none ring-brand focus:ring-2" /></label>
    <div className="grid gap-4 sm:grid-cols-2">
      <label className="grid gap-1.5 text-sm font-medium">Email<input name="email" type="email" required className="rounded-lg border border-slate-300 px-3 py-2.5 outline-none ring-brand focus:ring-2" /></label>
      <label className="grid gap-1.5 text-sm font-medium">Phone<input name="phone" type="tel" className="rounded-lg border border-slate-300 px-3 py-2.5 outline-none ring-brand focus:ring-2" /></label>
    </div>
    <label className="grid gap-1.5 text-sm font-medium">Tell us about your project<textarea name="message" required rows={5} className="rounded-lg border border-slate-300 px-3 py-2.5 outline-none ring-brand focus:ring-2" /></label>
    <button className="w-fit rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-deep">Send enquiry</button>
    <p id="form-status" role="status" className="text-sm text-slate-600">{status}</p>
  </form>;
}
