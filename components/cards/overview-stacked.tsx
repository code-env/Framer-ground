"use client";

import { motion } from "framer-motion";
import { ChevronUp } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import { useState } from "react";

import { cn } from "@/lib/utils";
import image1 from "@/public/others/photo-1.jpg";
import image2 from "@/public/others/photo-2.jpg";
import image3 from "@/public/others/photo-3.jpg";
import image4 from "@/public/others/photo-4.jpg";
import image5 from "@/public/others/photo-5.jpg";

type Card = {
  id: number;
  title: string;
  image: StaticImageData;
  description: string;
  sm: string;
};

const CARDS: Card[] = [
  {
    id: 1,
    title: "The Oddysey",
    sm: "Explore unknow galexies.",
    image: image1,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lobortis, justo id ullamcorper fermentum, felis lectus facilisis ex, sed consectetur lectus nisi in metus.",
  },
  {
    id: 2,
    title: "Angry Rabit",
    sm: "They are coming for you.",
    image: image2,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lobortis, justo id ullamcorper fermentum, felis lectus facilisis ex, sed consectetur lectus nisi in metus.",
  },
  {
    id: 3,
    title: "Ghost town",
    sm: "Scary ghost.",
    image: image3,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lobortis, justo id ullamcorper fermentum, felis lectus facilisis ex, sed consectetur lectus nisi in metus.",
  },
  {
    id: 4,
    title: "Pirates in the jungle",
    sm: "Find the treasure.",
    image: image4,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lobortis, justo id ullamcorper fermentum, felis lectus facilisis ex, sed consectetur lectus nisi in metus.",
  },
  {
    id: 5,
    title: "Lost in the mountains",
    sm: "Be careful.",
    image: image5,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lobortis, justo id ullamcorper fermentum, felis lectus facilisis ex, sed consectetur lectus nisi in metus.",
  },
];

const OverviewStackeds = () => {
  const [stacked, setStacked] = useState<boolean>(false);

  return (
    <div className="h-screen w-full relative border-t flex items-center justify-center">
      <motion.div
        layout
        className="w-full flex flex-col items-center gap-10 max-w-md relative h-auto"
      >
        <div
          className="flex justify-between items-center gap-10 w-full"
          onClick={() => setStacked(!stacked)}
        >
          <h1 className="text-3xl font-semibold">Overview</h1>
          <button className="flex items-center gap-2 text-gray-500">
            <p className="flex items-center gap-2">
              {CARDS.length}
              <span>
                <ChevronUp
                  size={16}
                  className={cn(
                    "transition-all duration-150",
                    stacked && "rotate-180"
                  )}
                />
              </span>
            </p>
          </button>
        </div>
        <motion.ul
          className={`flex flex-col gap-4 justify-center items-center max-w-md w-full h-fit`}
          layout
          transition={{
            duration: 0.5,
            ease: "easeInOut",
          }}
          style={{
            flexDirection: "column",
            gap: "8px",
          }}
        >
          {CARDS.map((card, index) => (
            <Card key={card.id} card={card} stacked={stacked} index={index} />
          ))}
        </motion.ul>
      </motion.div>
    </div>
  );
};

function Card(props: { card: Card; stacked: boolean; index: number }) {
  return (
    <motion.li
      layout
      className={cn(
        "relative flex items-start space-x-4 border p-4 rounded-2xl bg-background",
        props.stacked ? "overflow-hidden" : ""
      )}
      style={{
        //position: props.stacked ? "absolute" : "static",
        width: props.stacked ? `calc(100% - ${props.index * 20}px)` : "auto",
        zIndex: CARDS.length - props.index,
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: props.stacked ? props.index * -130 : 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 30,
        mass: 1,
      }}
    >
      <div
        className="relative flex items-center justify-center w-16 h-16 shrink-0"
        style={{ borderRadius: "14px" }}
      >
        <Image
          src={props.card.image}
          alt={props.card.title}
          className="w-full h-full object-cover"
          style={{ borderRadius: "14px" }}
        />
      </div>
      <div className="overflow-hidden w-full">
        <div className="flex items-center justify-start gap-2">
          <h2 className="text-xl font-semibold truncate">{props.card.title}</h2>
          <span className="w-1 h-1 rounded-full bg-slate-800"></span>
          <p className="text-sm text-gray-600 line-clamp-1">{props.card.sm}</p>
        </div>
        <p className="text-sm text-gray-500 mt-1 mb-2 line-clamp-2">
          {props.card.description}
        </p>
        <p className="text-xs text-gray-400 w-full text-right pr-4">
          September 2024
        </p>
      </div>
    </motion.li>
  );
}

export default OverviewStackeds;
