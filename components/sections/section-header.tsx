type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  description?: string;
  align?: "center" | "left";
  tone?: "light" | "dark";
};

export function SectionHeader({ eyebrow, title, subtitle, description, align = "center", tone = "light" }: SectionHeaderProps) {
  const isCenter = align === "center";
  const isDark = tone === "dark";

  return (
    <div className={`max-w-3xl ${isCenter ? "mx-auto text-center" : "text-left"}`}>
      <span className={`inline-flex items-center rounded-full border px-4 py-1.5 text-xs font-semibold tracking-[0.2em] uppercase ${isDark ? "border-white/20 bg-white/5 text-sky-300" : "border-brand/20 bg-brand/5 text-brand"}`}>{eyebrow}</span>
      <h2 className={`mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl ${isDark ? "text-white" : "text-slate-900"}`}>{title}</h2>
      {subtitle && <p className={`mt-5 text-xl font-medium sm:text-2xl ${isDark ? "text-slate-300" : "text-slate-600"}`}>{subtitle}</p>}
      {description && <p className={`mt-4 text-base leading-7 ${isCenter ? "mx-auto max-w-xl" : "max-w-xl"} ${isDark ? "text-slate-400" : "text-slate-500"}`}>{description}</p>}
    </div>
  );
}
