import { allDocs } from "contentlayer/generated";
import { MainNavItem, SidebarNavItem } from "@/types";

interface DocsConfig {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
}

const sortAlphabetically = (a: SidebarNavItem, b: SidebarNavItem) => {
  return (a.sortId ?? a.title)
    .toLowerCase()
    .localeCompare((b.sortId ?? b.title).toLowerCase());
};

const createComponentsLink = (category: string) => {
  return allDocs
    .filter(
      (doc) =>
        doc.slug.startsWith(`/docs/components/${category}`) && doc.published
    )
    .map((doc) => ({
      // Make sure the index page is the first item
      title: doc.title,
      sortId: doc.slug === `/docs/${category}` ? "000" : doc.title,
      href: doc.slug,
      items: [],
    }))
    .sort(sortAlphabetically);
};

const createLink = (category: string) => {
  return allDocs
    .filter((doc) => doc.slug.startsWith(`/docs/${category}`) && doc.published)
    .map((doc) => ({
      // Make sure the index page is the first item
      title: doc.title,
      sortId: doc.slug === `/docs/${category}` ? "000" : doc.title,
      href: doc.slug,
      items: [],
    }))
    .sort(sortAlphabetically);
};

const sidebarNav: SidebarNavItem[] = [
  {
    title: "Getting Started",
    items: [
      {
        title: "Introduction",
        href: "/docs",
        items: [],
      },
      {
        title: "Setup",
        href: "/docs/setup",
        items: [],
      },
    ],
  },
  {
    title: "Contributing",
    href: "/docs/contributing",
    items: [
      {
        title: "Overview",
        href: "/docs/contributing",
        items: [],
      },
      {
        title: "Running locally",
        href: "/docs/contributing/running-locally",
        items: [],
      },
      {
        title: "Adding components",
        href: "/docs/contributing/components",
        items: [],
      },
      {
        title: "Folder structure",
        href: "/docs/contributing/folder-structure",
        items: [],
      },
      {
        title: "Guidelines",
        href: "/docs/contributing/guidelines",
        items: [],
      },
      {
        title: "Best practices",
        href: "/docs/contributing/best-practices",
        items: [],
      },
    ],
  },
  {
    icon: "buttons",
    title: "Button",
    label: -1 + createComponentsLink("button").length + "",
    href: "/docs/components/button",
    items: createComponentsLink("button"),
  },
  {
    title: "Menu",
    label: createComponentsLink("menu").length + "",
    href: "/docs/menu",
    items: createComponentsLink("menu"),
  },
  {
    title: "Navbars",
    label: createComponentsLink("navbars").length + "",
    href: "/docs/components/navbars/liquid",
    items: createComponentsLink("navbars"),
  },
  {
    title: "Gallery",
    label: createComponentsLink("gallery").length + "",
    href: "/docs/components/gallery/one",
    items: createComponentsLink("gallery"),
  },
  {
    title: "Inputs",
    label: createComponentsLink("inputs").length + "",
    href: "/docs/components/inputs/iMessage",
    items: createComponentsLink("inputs"),
  },
  {
    title: "Without Framer Motion",
    items: createLink("without-framer-motion"),
  },
]
  .filter((category) => Boolean(category.items?.length || category.label))
  .sort((a, b) => {
    if (a.title === "Getting Started") {
      return -1;
    }
    if (b.title === "Getting Started") {
      return 1;
    }

    if (a.title === "Contributing") {
      return -1;
    }

    if (b.title === "Contributing") {
      return 1;
    }

    return a.title.localeCompare(b.title);
  });

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "Docs",
      href: "/docs",
    },
    {
      title: "Components",
      href: sidebarNav[2].items?.[0]?.href ?? sidebarNav[2]?.href,
    },
  ],
  sidebarNav,
};
