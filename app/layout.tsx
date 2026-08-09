import type { Metadata } from "next";
import "./globals.css";
import ClientCursor from "@/components/ui/ClientCursor";
import { Manrope } from "next/font/google";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "METAMOGRAPHIC — Motion · Design · Experience",
  description:
    "Elevating brands through high-end motion graphics, kinetic design, and precision video editing. We turn static ideas into fluid cinematic experiences.",
  keywords: ["motion graphics", "video editing", "VFX", "animation", "motion design", "metamographic"],
  authors: [{ name: "METAMOGRAPHIC" }],
  openGraph: {
    title: "METAMOGRAPHIC — Motion · Design · Experience",
    description:
      "Elevating brands through high-end motion graphics, kinetic design, and precision video editing.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}


