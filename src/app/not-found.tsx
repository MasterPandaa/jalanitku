import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-paper flex flex-col items-center justify-center p-6 text-center">
      <div className="w-full max-w-md p-8 bg-surface border-4 border-ink shadow-[8px_8px_0_#0A0A0A] rounded-2xl flex flex-col items-center gap-4">
        <div className="w-16 h-16 bg-accent-yellow border-3 border-ink rounded-xl flex items-center justify-center font-display text-2xl font-black shadow-[4px_4px_0_#0A0A0A]">
          404
        </div>
        <h1 className="font-display text-2xl font-black text-ink uppercase tracking-tight">
          Halaman Tidak Ditemukan
        </h1>
        <p className="text-ink-muted text-sm font-sans">
          Detektif JalanMin sudah mencari ke setiap sudut, namun rute yang kamu tuju belum terdaftar di peta JalanITku.
        </p>
        <Link
          href="/"
          className="mt-2 inline-flex items-center justify-center px-6 py-3 bg-accent-yellow text-ink font-heading font-bold border-3 border-ink shadow-[4px_4px_0_#0A0A0A] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_#0A0A0A] transition-all rounded-xl uppercase text-sm"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </main>
  );
}
