import React from "react";

export const config = {
  isProduction: process.env.NODE_ENV === "production",
};

export const Index: Record<string, any> = {
  "github-button": {
    registryDependencies: undefined,
    component: React.lazy(() => import("@/fg/button/github")),
  },
  "delete-button": {
    registryDependencies: undefined,
    component: React.lazy(() => import("@/fg/button/delete")),
  },
  "sparkles-button": {
    registryDependencies: undefined,
    component: React.lazy(() => import("@/fg/button/sparkles")),
  },
  "checkout-button": {
    registryDependencies: undefined,
    component: React.lazy(() => import("@/fg/button/checkout")),
  },
  "vercel-navbar": {
    registryDependencies: undefined,
    component: React.lazy(() => import("@/fg/navbar/vercel")),
  },
  "liquid-navbar": {
    registryDependencies: undefined,
    component: React.lazy(() => import("@/fg/navbar/liquid")),
  },
  "reveal-navbar": {
    registryDependencies: undefined,
    component: React.lazy(() => import("@/fg/navbar/reveal")),
  },
  "one-gallery": {
    registryDependencies: undefined,
    component: React.lazy(() => import("@/fg/gallery/one")),
  },
  "two-gallery": {
    registryDependencies: undefined,
    component: React.lazy(() => import("@/fg/gallery/two")),
  },
  "booking-cards": {
    registryDependencies: undefined,
    component: React.lazy(() => import("@/fg/cards/booking")),
  },
  "notch-cards": {
    registryDependencies: undefined,
    component: React.lazy(() => import("@/fg/cards/notch")),
  },
  "notch-two-cards": {
    registryDependencies: undefined,
    component: React.lazy(() => import("@/fg/cards/notch-two")),
  },
  "linear-cards": {
    registryDependencies: undefined,
    component: React.lazy(() => import("@/fg/cards/linear")),
  },
  "hello-world-cards": {
    registryDependencies: undefined,
    component: React.lazy(() => import("@/fg/cards/hello-world")),
  },
  "strike-cards": {
    registryDependencies: undefined,
    component: React.lazy(() => import("@/fg/cards/strike")),
  },
  "overview-cards": {
    registryDependencies: undefined,
    component: React.lazy(() => import("@/fg/cards/overview")),
  },
  "experience-cards": {
    registryDependencies: undefined,
    component: React.lazy(() => import("@/fg/cards/experience")),
  },
  "carousel-one": {
    registryDependencies: undefined,
    component: React.lazy(() => import("@/fg/carousel/one")),
  },
};
