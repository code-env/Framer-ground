import { buttonVariants } from "@/components/ui/button";
import { DiscordLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";

const Templates = () => {
  return (
    <div className="center min-h-screen px-10">
      <div className="border p-10 center flex-col gap-4 rounded-xl">
        <h2 className="text-center">
          Templates are coming be the first to know. Join our discord
        </h2>
        <Link
          className={buttonVariants({
            variant: "outline",
            className: "flex items-center gap-3",
          })}
          href="https://discord.gg/BE3TPK8jVH"
        >
          <DiscordLogoIcon />
          <span>Discord</span>
        </Link>
      </div>
    </div>
  );
};

export default Templates;
