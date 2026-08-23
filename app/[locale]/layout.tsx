import type { Metadata } from "next";
 import '../globals.css';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

export const metadata: Metadata = {
  title: "METAMOGRAPHIC — Motion · Design · Experience",
  description: "Elevating brands through high-end motion graphics, kinetic design, and precision video editing. We turn static ideas into fluid cinematic experiences.",
  keywords: ["motion graphics", "video editing", "VFX", "animation", "motion design", "metamographic"],
  authors: [{ name: "METAMOGRAPHIC" }],
  openGraph: {
    title: "METAMOGRAPHIC — Motion · Design · Experience",
    description: "Elevating brands through high-end motion graphics, kinetic design, and precision video editing.",
    type: "website",
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>; // ✅ Next.js 15: params adalah Promise
}) {
  const { locale } = await params; // ✅ harus di-await
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
