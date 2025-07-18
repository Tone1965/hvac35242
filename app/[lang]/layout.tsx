import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { translations } from "@/lib/translations";

const inter = Inter({ subsets: ["latin"] });

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'es' }]
}

export async function generateMetadata({
  params,
}: {
  params: { lang: 'en' | 'es' }
}): Promise<Metadata> {
  const t = translations[params.lang]
  
  return {
    title: t.seo.metaTitle,
    description: t.seo.metaDesc,
    alternates: {
      languages: {
        'en': '/en',
        'es': '/es',
      }
    }
  }
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: 'en' | 'es' };
}) {
  return (
    <html lang={params.lang}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}