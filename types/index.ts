import { StaticImageData } from "next/image";

export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: string;
  label?: string;
  sortId?: string;
}

export interface NavItemWithChildren extends NavItem {
  items?: NavItemWithChildren[];
}

export interface MainNavItem extends NavItem {}

export interface SidebarNavItem extends NavItemWithChildren {}

export type DashboardConfig = {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
};

export type NavState = {
  opacity: number;
  top: number;
  height: number;
};

export interface Template {
  category: string;
  description: string;
  title: string;
  slug: string;
  url: string;
  label: string;
  disabled?: boolean;
  preview: StaticImageData;
  stack: string[];
}

export interface GroupedTemplates {
  category: string;
  elements: Template[];
}
