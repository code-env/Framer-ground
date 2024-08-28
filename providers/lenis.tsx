"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { ReactNode } from "react";

function LenisProvider({ children }: { children: ReactNode }) {
  const lenis = useLenis(({ scroll }) => {});

  return <ReactLenis root>{children}</ReactLenis>;
}

export default LenisProvider;
