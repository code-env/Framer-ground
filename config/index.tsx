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
  "vercel-navbar": {
    name: "github",
    registryDependencies: undefined,
    files: ["registry/new-york/ui/alert.tsx"],
    component: React.lazy(() => import("@/fg/navbar/vercel")),
  },
  "liquid-navbar": {
    name: "github",
    registryDependencies: undefined,
    files: ["registry/new-york/ui/alert.tsx"],
    component: React.lazy(() => import("@/fg/navbar/liquid")),
  },
  "reveal-navbar": {
    name: "github",
    registryDependencies: undefined,
    files: ["registry/new-york/ui/alert.tsx"],
    component: React.lazy(() => import("@/fg/navbar/reveal")),
  },
  "one-gallery": {
    name: "github",
    registryDependencies: undefined,
    files: ["registry/new-york/ui/alert.tsx"],
    component: React.lazy(() => import("@/fg/gallery/one")),
  },
  "two-gallery": {
    name: "github",
    registryDependencies: undefined,
    files: ["registry/new-york/ui/alert.tsx"],
    component: React.lazy(() => import("@/fg/gallery/two")),
  },
  "booking-cards": {
    name: "github",
    registryDependencies: undefined,
    files: ["registry/new-york/ui/alert.tsx"],
    component: React.lazy(() => import("@/fg/cards/booking")),
  },
  "notch-cards": {
    name: "github",
    registryDependencies: undefined,
    files: ["registry/new-york/ui/alert.tsx"],
    component: React.lazy(() => import("@/fg/cards/notch")),
  },
  "linear-cards": {
    name: "github",
    registryDependencies: undefined,
    files: ["registry/new-york/ui/alert.tsx"],
    component: React.lazy(() => import("@/fg/cards/linear")),
  },
  "hello-world-cards": {
    name: "github",
    registryDependencies: undefined,
    files: ["registry/new-york/ui/alert.tsx"],
    component: React.lazy(() => import("@/fg/cards/hello-world")),
  },
  "strike-cards": {
    name: "github",
    registryDependencies: undefined,
    files: ["registry/new-york/ui/alert.tsx"],
    component: React.lazy(() => import("@/fg/cards/strike")),
  },
};
