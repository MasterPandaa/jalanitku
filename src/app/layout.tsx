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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${archivo.variable} ${space.variable} ${dm.variable} ${jetbrains.variable}`}
    >
      <body className="min-h-screen bg-paper text-ink font-sans selection:bg-accent-yellow selection:text-ink">
        {children}
      </body>
    </html>
  );
}
