"use client";

import { ReactNode } from "react";

function GlobalProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export default GlobalProvider;
