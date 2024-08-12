import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";

export const metadata: Metadata = {
  title: {
    default: "Framer Ground",
    template: " %s | Framer Ground",
  },
  description: "Your Event management software ",
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
    <html lang="en">
      <body className={satoshi.className}>{children}</body>
    </html>
  );
}
