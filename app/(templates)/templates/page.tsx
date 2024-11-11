import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { DiscordLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";

const Templates = () => {
  return (
    <div className="min-h-screen py-10 flex flex-col gap-10">
      <div className="center flex-col pt-40">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl flex gap-3  gradient-text py-3 dark:from-neutral-200 dark:to-neutral-500">
          Ground. Templates.
        </h1>
        <p className="mx-auto max-w-[800px] text-muted-foreground md:text-lg xl:text-xl text-center">
          These templates are designed to help you get started with your next
          project. They are fully customizable and built with React, NextJS,
          TailwindCSS, Framer Motion and Typescript.
        </p>
      </div>
      <div className="max-w-sm mx-auto  h-fit">
        <div className="border p-10 center flex-col gap-4 rounded-xl">
          <h2 className="text-center">
            New templates are coming be the first to know. Join our discord
          </h2>
          <Link
            className={buttonVariants({
              variant: "outline",
              className: "flex items-center gap-3",
            })}
            href={siteConfig.links.discord}
          >
            <DiscordLogoIcon />
            <span>Discord</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Templates;
