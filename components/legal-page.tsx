import Image from "next/image";
import Link from "next/link";

export function LegalPage({ title, subtitle, children }: Readonly<{ title: string; subtitle: string; children: React.ReactNode }>) {
  return <main className="min-h-screen bg-mist">
    <header className="border-b border-slate-200 bg-white"><div className="mx-auto flex max-w-5xl items-center px-5 py-4 lg:px-8"><Link href="/"><Image src="/images/Logo2.png" alt="DA Software Systems" width={174} height={54} className="h-11 w-auto" priority /></Link></div></header>
    <section className="bg-ink px-5 py-16 text-white"><div className="mx-auto max-w-5xl"><p className="mb-3 text-sm font-semibold tracking-[0.16em] text-sky-300 uppercase">DA Software Systems</p><h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{title}</h1><p className="mt-4 text-lg text-slate-200">{subtitle}</p></div></section>
    <article className="mx-auto max-w-5xl px-5 py-10 lg:px-8"><div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-10">{children}</div></article>
    <footer className="mx-auto max-w-5xl px-5 py-8 text-sm text-slate-500 lg:px-8">© {new Date().getFullYear()} DA Software Systems. <Link className="underline hover:text-brand" href="/">Back to home</Link></footer>
  </main>;
}
