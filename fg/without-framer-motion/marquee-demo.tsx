import { cn } from "@/lib/utils";
import React from "react";
import Marquee from "./marquee";
import { Star } from "lucide-react";

const MarqueeDemo = () => {
  return (
    <>
      <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden py-10">
        <Marquee
          pauseOnHover
          style={{ "--duration": "20s" }}
          className="select-none"
        >
          {Array.from({ length: 5 }).map((_, index) => (
            <MarqueeItem key={index} />
          ))}
        </Marquee>
        <Marquee
          pauseOnHover
          reverse
          style={{ "--duration": "30s" }}
          className="select-none"
        >
          {Array.from({ length: 5 }).map((_, index) => (
            <MarqueeItem key={index} />
          ))}
        </Marquee>
      </div>
    </>
  );
};

const MarqueeItem = () => {
  return (
    <figure
      className={cn(
        "relative w-96  overflow-hidden rounded-xl border p-4 flex flex-col gap-2",
        "border-border/10 bg-primary backdrop-blur-lg text-primary-foreground "
      )}
    >
      <div className="flex">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star className="w-6 h-6 fill-greenPrimary stroke-none" key={index} />
        ))}
      </div>
      <blockquote className="mt-2 text-lg">
        "Ground took the guesswork out of investing for me. I'm seeing real
        returns with no hassle."
      </blockquote>
      <figcaption className="mt-4 text-lg font-medium">@username</figcaption>
    </figure>
  );
};

export default MarqueeDemo;
