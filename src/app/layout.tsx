import type { Metadata } from "next";
import { Archivo_Black, Space_Grotesk, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const archivo = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-archivo",
});

const space = Space_Grotesk({
  weight: ["500", "700"],
  subsets: ["latin"],
  variable: "--font-space",
});

const dm = DM_Sans({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-dm",
});

const jetbrains = JetBrains_Mono({
  weight: ["500"],
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: "JalanITku — Temukan dan Uji Arah Karier IT Impianmu",
  description:
    "Platform untuk membantu teman-teman IT (mahasiswa, fresh graduate, career switcher) menemukan role IT yang cocok lewat JalanKarir dan menguji kecocokan lewat tes teknis di JalanRapor.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.svg",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={`scroll-smooth ${archivo.variable} ${space.variable} ${dm.variable} ${jetbrains.variable}`}
    >
      <body
        suppressHydrationWarning
        className="min-h-screen bg-paper text-ink font-sans selection:bg-accent-yellow selection:text-ink"
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent-yellow focus:text-ink focus:border-3 focus:border-ink focus:shadow-nb-sm focus:font-mono focus:font-bold focus:text-sm"
        >
          Lewati ke konten utama
        </a>
        {children}
      </body>
    </html>
  );
}
