import { Icon } from "@/components/shared/icons";
import { Github, Linkedin, Twitter } from "lucide-react";

export function randomNumberGenerator(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const stacks = [
  {
    label: "NextJs",
    icon: Icon.NextJS,
  },
  {
    label: "ReactJs",
    icon: Icon.ReactIcon,
  },
  {
    label: "Tailwind",
    icon: Icon.Tailwind,
  },
  {
    label: "Framer Motion",
    icon: Icon.FramerMotion,
  },
];

export const MarkettingNavbarRoutes = [
  {
    path: "#features",
    label: "Features",
  },
  {
    path: "#pricing",
    label: "Pricing",
  },
  {
    path: "/example",
    label: "Example",
  },
  {
    path: "/docs",
    label: "Documentation",
  },
];

export const MarkettingFooterResources = [
  {
    path: "#features",
    label: "Features",
  },
  {
    path: "#pricing",
    label: "Pricing",
  },
  {
    path: "/example",
    label: "Example",
  },
  {
    path: "/docs",
    label: "Documentation",
  },
];

export const MarkettingFooterServices = [
  {
    path: "#features",
    label: "Features",
  },
  {
    path: "#pricing",
    label: "Pricing",
  },
  {
    path: "/example",
    label: "Example",
  },
  {
    path: "/docs",
    label: "Documentation",
  },
];

export const MarkettingFooterRoutes = [
  {
    name: "Product",
    routes: MarkettingNavbarRoutes,
  },
  {
    name: "Resources",
    routes: MarkettingFooterResources,
  },
  {
    name: "Services",
    routes: MarkettingFooterServices,
  },
];

export const MarkettingSocialLinks = [
  {
    name: "LinkedIn",
    icon: Linkedin,
    path: "https://linkedin.com/in/codeenv",
  },
  {
    name: "Twitter",
    icon: Twitter,
    path: "https://x.com/@bossadizenith",
  },
  {
    name: "Github",
    icon: Github,
    path: "https://github.com/code-env",
  },
];

export const projectUrl = "https://github.com/code-env/framer-ground";
