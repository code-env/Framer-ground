"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import image1 from "@/public/others/photo-1.jpg";
import image2 from "@/public/others/photo-2.jpg";
import image3 from "@/public/others/photo-3.jpg";
import image4 from "@/public/others/photo-4.jpg";
import { cn } from "@/lib/utils";

const items = [
  {
    title: "Orlando Beach",
    city: "Orlando",
    state: "FL",
    image: image1,
  },
  {
    title: "Mount Elbert",
    city: "Leadville",
    state: "CO",
    image: image2,
  },
  {
    title: "Mount Rainier",
    city: "Paradise",
    state: "WA",
    image: image3,
  },
  {
    title: "Galt Ranch",
    city: "White Sulphur Springs",
    state: "MT",
    image: image4,
  },
];

function NavigationIndicator({ index }: { index: number }) {
  return (
    <div className="absolute right-0 top-0 z-10 flex gap-1 p-[75px] px-16">
      {Array.from({ length: items.length }).map((_, i) => (
        <motion.div
          key={i}
          animate={{
            width: index === i ? 20 : 10,
          }}
          className={cn("h-[3px] rounded-full bg-white/30 transition-colors", {
            "bg-white": index === i,
          })}
        />
      ))}
    </div>
  );
}

function NavButton({
  direction,
  index,
  setIndex,
  setStatus,
}: {
  direction: "next" | "previous";
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
}) {
  const handleClick = () => {
    if (direction === "previous" && index > 0) {
      setIndex((prev) => prev - 1);
    } else if (direction === "next" && index < items.length - 1) {
      setIndex((prev) => prev + 1);
    }
  };

  const isPrevious = direction === "previous";

  return (
    <button
      aria-label={isPrevious ? "Previous" : "Next"}
      type="button"
      onMouseDown={() => setStatus(direction)}
      onMouseUp={() => setStatus("idle")}
      onClick={handleClick}
      className={cn(
        "group absolute top-0 isolate flex h-full w-1/3 items-center",
        isPrevious ? "!left-0 pl-8 " : "right-0 justify-end pr-8"
      )}
    >
      <div
        className={cn(
          "size-full absolute top-0 opacity-0 backdrop-blur-md transition-opacity duration-500 ease-out inset-0",
          isPrevious
            ? "[mask:linear-gradient(90deg,rgba(0,0,0,1)_0%,rgba(0,0,0,0)_100%)] group-hover:opacity-100"
            : "[mask:linear-gradient(270deg,rgba(0,0,0,1)_0%,rgba(0,0,0,0)_100%)] group-hover:opacity-100"
        )}
      />
      <div
        className={cn(
          "size-full absolute top-0  from-black/0 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100",
          isPrevious ? "bg-gradient-to-l" : "to-transparent bg-gradient-to-r"
        )}
      />
      {isPrevious ? (
        <ChevronLeft className="size-8 z-10 text-white/30 transition-colors duration-500 ease-out group-hover:text-white" />
      ) : (
        <ChevronRight className="size-8 z-10 text-white/30 transition-colors duration-500 ease-out group-hover:text-white" />
      )}
    </button>
  );
}

const TiltContainer = ({
  index,
  setIndex,
  status,
  setStatus,
}: {
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  status: string;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const location = items[index];
  const isPressingNext = status === "next";
  const isPressingPrevious = status === "previous";

  return (
    <div className="h-screen center border-y border-red-500">
      <div className="size-[500px] relative isolate overflow-hidden rounded-[100px] border border-border bg-[#e3e3e3] font-medium tracking-tight">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={index}
            initial={{
              filter: "blur(8px)",
              transform: "perspective(2000px) rotateY(0deg)",
            }}
            animate={
              isPressingNext
                ? {
                    transform: "perspective(800px) rotateY(10deg)",
                    filter: "blur(0px)",
                  }
                : isPressingPrevious
                ? {
                    transform: "perspective(800px) rotateY(-10deg)",
                    filter: "blur(0px)",
                  }
                : { filter: "blur(0px)" }
            }
            exit={{ filter: "blur(8px)" }}
            className="size-full relative"
          >
            <Image
              src={location.image}
              alt={location.title}
              className="size-full scale-150 object-cover"
            />
          </motion.div>
        </AnimatePresence>

        <div className="absolute left-0 top-0 z-0 h-1/2 w-full backdrop-blur-md [mask:linear-gradient(180deg,rgba(0,0,255,1)_0%,rgba(0,0,255,0)_100%)]" />
        <div className="absolute left-0 top-0 z-0 h-1/2 w-full bg-gradient-to-b from-black/40" />

        <motion.div
          initial={{
            transform: "perspective(1000px) rotateY(0deg)",
          }}
          animate={
            isPressingNext
              ? {
                  transform: "perspective(800px) rotateY(20deg)",
                }
              : isPressingPrevious
              ? {
                  transform: "perspective(800px) rotateY(-20deg)",
                }
              : {}
          }
          className="absolute left-0 top-0 z-20 w-full p-14 px-16"
        >
          <p className="text-3xl font-normal leading-[1.4] tracking-wide text-primary-foreground flex flex-col">
            <span>{location.title}</span>
            <span>{location.city}</span>
            <span>{location.state}</span>
          </p>
        </motion.div>

        <NavigationIndicator index={index} />

        <NavButton
          direction="previous"
          index={index}
          setIndex={setIndex}
          setStatus={setStatus}
        />

        <NavButton
          direction="next"
          index={index}
          setIndex={setIndex}
          setStatus={setStatus}
        />
      </div>
    </div>
  );
};

const Tilt = () => {
  const [index, setIndex] = React.useState(2);
  const [status, setStatus] = React.useState("idle");

  return (
    <TiltContainer
      index={index}
      setIndex={setIndex}
      status={status}
      setStatus={setStatus}
    />
  );
};

export default Tilt;
