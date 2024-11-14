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

const createLinks = (category: string) => {
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
    title: "Text",
    items: createLinks("text"),
  },
  {
    title: "Background",
    items: createLinks("background"),
  },
  {
    title: "Image",
    items: createLinks("image"),
  },
  {
    title: "Layout",
    items: createLinks("layout"),
  },
  {
    title: "List",
    items: createLinks("list"),
  },
  {
    title: "Container",
    items: createLinks("container"),
  },
  {
    title: "Cards",
    items: createLinks("cards"),
  },
  {
    title: "Icon",
    items: createLinks("icon"),
  },
  {
    title: "Progress",
    items: createLinks("progress"),
  },
  {
    title: "Graphs & charts",
    items: createLinks("graphs"),
  },
  {
    title: "Overlay",
    items: createLinks("overlay"),
  },
  {
    icon: "buttons",
    title: "Button",
    label: -1 + createLinks("button").length + "",
    href: "/docs/button",
    items: createLinks("button"),
  },
  {
    title: "Menu",
    label: createLinks("menu").length + "",
    href: "/docs/menu",
    items: createLinks("menu"),
  },
  {
    title: "Navbars",
    label: createLinks("navbars").length + "",
    href: "/docs/navbars/liquid",
    items: createLinks("navbars"),
  },
  {
    title: "Gallery",
    label: createLinks("gallery").length + "",
    href: "/docs/gallery/one",
    items: createLinks("gallery"),
  },
  {
    title: "Inputs",
    label: createLinks("inputs").length + "",
    href: "/docs/inputs/iMessage",
    items: createLinks("inputs"),
  },
  {
    title: "Hero",
    items: createLinks("hero"),
  },
  {
    title: "Scroll",
    items: createLinks("scroll"),
  },
  {
    title: "Carousel",
    items: createLinks("carousel"),
  },
  {
    title: "Without Framer Motion",
    items: createLinks("without-framer-motion"),
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
