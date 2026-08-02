import { homeContent } from "@/data/site";
import { ProcessCta } from "@/components/process/process-cta";
import { ProcessTimeline } from "@/components/process/process-timeline";

export function ProcessSection() {
  const { eyebrow, title, subtitle, description } = homeContent.process;

  return (
    <section id="process" className="relative overflow-hidden bg-gradient-to-b from-white via-sky-50/50 to-white py-24 sm:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-brand/10 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-32 right-1/4 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full border border-brand/20 bg-brand/5 px-4 py-1.5 text-xs font-semibold tracking-[0.2em] text-brand uppercase">{eyebrow}</span>
          <h2 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">{title}</h2>
          <p className="mt-5 text-xl font-medium text-slate-600 sm:text-2xl">{subtitle}</p>
          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-slate-500">{description}</p>
        </div>

        <ProcessTimeline />
        <ProcessCta />
      </div>
    </section>
  );
}
