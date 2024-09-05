import React from "react";

export const config = {
  isProduction: process.env.NODE_ENV === "production",
};

export const Index: Record<string, any> = {
  "github-button": {
    name: "github",
    registryDependencies: undefined,
    files: ["registry/new-york/ui/alert.tsx"],
    component: React.lazy(() => import("@/fg/button/github")),
  },
  "delete-button": {
    name: "github",
    registryDependencies: undefined,
    files: ["registry/new-york/ui/alert.tsx"],
    component: React.lazy(() => import("@/fg/button/delete")),
  },
};
