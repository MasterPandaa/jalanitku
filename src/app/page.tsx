import { getDictionary } from "@/lib/i18n";

export default function Home() {
  const dict = getDictionary();

  return (
    <main className="min-h-screen p-6 md:p-12 flex flex-col items-center justify-center">
      <div className="w-full max-w-2xl bg-surface border-4 border-ink shadow-nb-lg p-8 md:p-10 flex flex-col items-center text-center gap-6">
        {/* Logo Text */}
        <div className="flex items-center gap-2 font-heading text-4xl md:text-5xl leading-none text-ink">
          <span>Jalan</span>
          <span className="inline-block bg-accent-yellow text-ink border-3 md:border-4 border-ink shadow-nb-sm px-3 py-1 -rotate-3 text-[1.12em]">
            {dict.brand.highlight}
          </span>
          <span>ku</span>
        </div>

        <div className="inline-block bg-ink text-paper px-3 py-1 text-xs font-mono font-bold tracking-widest uppercase">
          Tahap 0: Fondasi Proyek
        </div>

        <p className="font-sans text-lg md:text-xl text-ink max-w-lg leading-relaxed">
          {dict.brand.tagline}
        </p>

        <div className="w-full border-t-3 border-ink pt-6 flex flex-col gap-3 text-left font-mono text-sm">
          <div className="flex items-center gap-2 text-accent-green font-bold bg-ink p-3">
            <span>✓</span>
            <span>Next.js 15 + TypeScript + Tailwind CSS Neo-brutalism</span>
          </div>
          <div className="flex items-center gap-2 text-accent-green font-bold bg-ink p-3">
            <span>✓</span>
            <span>i18n Multi-bahasa (Default: Bahasa Indonesia dari id.json)</span>
          </div>
          <div className="flex items-center gap-2 text-accent-green font-bold bg-ink p-3">
            <span>✓</span>
            <span>Dokumentasi docs/* lengkap (Brief, Design System, Data Schema, API Contract)</span>
          </div>
        </div>

        <div className="pt-2">
          <a
            href="/dev/components"
            className="nb-btn inline-block bg-accent-blue text-surface font-display font-bold text-lg px-6 py-3 border-4 border-ink shadow-nb-md"
          >
            Lanjut ke T1 (Galeri Komponen) →
          </a>
        </div>
      </div>
    </main>
  );
}
