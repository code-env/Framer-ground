import type { Metadata } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/react";

import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import GlobalProvider from "@/providers/global";
import Footer from "@/components/shared/footer";
import "@/styles/mdx.css";
import "@/styles/globals.css";
import { ThemeProvider } from "@/components/providers";
import { CommandMenuProvider } from "@/context/command-menu";
import { CommandMenu } from "@/components/ui/command-menu";
import Link from "next/link";
import { Toaster } from "sonner";
import Feedback from "@/components/shared/feeback";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  metadataBase: new URL(siteConfig.url),
  description: siteConfig.description,
  keywords: [
    "Animation",
    "Interactive",
    "shadcn ui",
    "Next.js",
    "React",
    "Tailwind CSS",
    "Framer motion",
    "Radix UI",
  ],
  creator: "Bossadi Zenith",
  authors: [
    {
      name: "bossadizenith",
      url: "https://bossadizenith.me",
    },
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@framer-ground",
  },
  icons: {
    icon: "/logo.svg",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
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
      <head />
      <GlobalProvider>
        <body className={cn(satoshi.className, "z-0")}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <CommandMenuProvider>
              {children}
              <CommandMenu />
            </CommandMenuProvider>
            <Analytics />
            <Toaster />
            <Feedback />
          </ThemeProvider>
        </body>
      </GlobalProvider>
    </html>
  );
}
