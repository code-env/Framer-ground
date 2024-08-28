import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { cn } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/react";
import Footer from "@/components/shared/footer";
import LenisProvider from "@/providers/lenis";

export const metadata: Metadata = {
  title: {
    default: "Framer Ground",
    template: " %s | Framer Ground",
  },
  description: "Your Event management software ",

  icons: {
    icon: [
      { url: "/logo.svg", media: "(prefers-color-scheme: dark)" },
      { url: "/logo-dark.svg", media: "(prefers-color-scheme: light)" },
    ],
  },
};

const satoshi = localFont({
  src: [
    {
      path: "../fonts/Satoshi-Light.otf",
      weight: "100",
    },
    {
      path: "../fonts/Satoshi-Regular.otf",
      weight: "300",
    },
    {
      path: "../fonts/Satoshi-Medium.otf",
      weight: "500",
    },
    {
      path: "../fonts/Satoshi-Bold.otf",
      weight: "700",
    },
    {
      path: "../fonts/Satoshi-Black.otf",
      weight: "900",
    },
  ],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <LenisProvider>
        <body className={cn(satoshi.className, "")}>
          {children}
          <Analytics />
          <Footer />
        </body>
      </LenisProvider>
    </html>
  );
}
