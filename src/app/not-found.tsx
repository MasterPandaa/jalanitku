import Link from "next/link";
import { JalanMin } from "@/components/mascot/JalanMin";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export default function NotFound() {
  return (
    <main
      id="main-content"
      className="min-h-screen bg-paper flex flex-col items-center justify-center p-6 text-center selection:bg-accent-yellow selection:text-ink"
    >
      <div className="w-full max-w-lg p-8 md:p-10 bg-surface border-4 md:border-5 border-ink shadow-nb-lg flex flex-col items-center gap-6">
        {/* Header Badge */}
        <div className="flex items-center gap-3">
          <span className="font-heading font-black text-5xl md:text-6xl text-ink leading-none">
            404
          </span>
          <div className="text-left">
            <Badge variant="pink" size="sm">
              4xx • CLIENT ERROR
            </Badge>
            <div className="font-mono text-xs font-bold text-ink/70 uppercase mt-0.5">
              Not Found
            </div>
          </div>
        </div>

        {/* Maskot JalanMin */}
        <div className="p-4 bg-paper border-3 border-ink shadow-nb-sm">
          <JalanMin state="neutral" size={130} />
        </div>

        {/* Copy Penjelasan */}
        <div className="space-y-2">
          <h1 className="font-heading font-black text-2xl md:text-3xl text-ink uppercase tracking-tight">
            Rute Tidak Ditemukan
          </h1>
          <p className="text-ink/80 text-sm md:text-base font-sans leading-relaxed max-w-sm mx-auto">
            Detektif JalanMin sudah mencari ke setiap sudut, namun alamat URL yang kamu tuju belum terdaftar di peta JalanITku.
          </p>
        </div>

        {/* Tombol Aksi */}
        <div className="pt-2 flex flex-col sm:flex-row items-center gap-3 w-full justify-center">
          <Button href="/" variant="primary" size="md" className="w-full sm:w-auto">
            ← Kembali ke Beranda
          </Button>
          <Button href="/status" variant="white" size="md" className="w-full sm:w-auto">
            Pusat Kode HTTP (3xx/4xx/5xx) →
          </Button>
        </div>
      </div>
    </main>
  );
}
