import Footer from "@/components/shared/footer";
import Navbar from "@/components/shared/navbar";
import Link from "next/link";
import React, { ReactNode } from "react";

const MarkettingLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen">
      <Link
        href="https://pro.bossadizenith.me"
        className="h-12 border-b bg-muted flex items-center"
        target="_blank"
        rel="noreferrer"
      >
        <div className="mx-auto w-full max-w-3xl flex items-center justify-center">
          🎉 Exciting News! 🎉. Ground v1 is now available. Animations
          build for performance.
        </div>
      </Link>
      <Navbar />
      {children}

      <Footer />
    </div>
  );
};

export default MarkettingLayout;
