"use client";

import { randomNumberGenerator } from "@/constants";
import { stagger, useAnimate, animate } from "framer-motion";
import { Star } from "lucide-react";
import React from "react";

type AnimationSequence = Parameters<typeof animate>[0];

const Button = ({ text, starLength }: { text: string; starLength: number }) => {
  const [scope, animate] = useAnimate();
  const letters = text.split("");

  const handleBtnClick = () => {
    const sparkles = Array.from({ length: starLength });

    const sparkleAnimation: AnimationSequence = sparkles.map((_, index) => [
      `.sparkle-${index}`,
      {
        x: randomNumberGenerator(-100, 100),
        y: randomNumberGenerator(-100, 100),
        scale: randomNumberGenerator(1, 0.5),
        opacity: 1,
      },
      {
        duration: 0.4,
        at: "<",
      },
    ]);
    const sparkesFadeOut: AnimationSequence = sparkles.map((_, index) => [
      `.sparkle-${index}`,
      {
        opacity: 0,
        scale: 0,
      },
      {
        duration: 0.3,
        at: "<",
      },
    ]);
    const sparcleReset: AnimationSequence = sparkles.map((_, index) => [
      `.sparkle-${index}`,
      {
        x: 0,
        y: 0,
      },
      {
        duration: 0.00000000001,
        at: "<",
      },
    ]);

    animate([
      ...sparcleReset,
      [".letter", { y: -32 }, { duration: 0.2, delay: stagger(0.05) }],
      ["button", { scale: 0.8 }, { duration: 0.1, at: "<" }],
      ["button", { scale: 1 }, { duration: 0.1 }],
      ...sparkleAnimation,
      [".letter", { y: 0 }, { duration: 0.00000000001 }],
      ...sparkesFadeOut,
    ]);
  };
  return (
    <div ref={scope}>
      <button
        onClick={handleBtnClick}
        className="border-2 text-2xl px-10 py-1.5 rounded-full transition-colors duration-150 border-blue-500 hover:bg-blue-100 text-blue-500 relative"
      >
        <span className="sr-only">{text}</span>
        <span
          className="flex items-center justify-center overflow-hidden h-8"
          aria-hidden
        >
          {letters.map((letter, index) => (
            <span
              data-letter={letter}
              className="letter inline-block relative h-8 after:h-8 after:absolute after:left-0 after:top-full after:content-[attr(data-letter)] leading-8"
              key={index}
            >
              {letter}
            </span>
          ))}
        </span>
        <span className="absolute inset-0 block -z-10 pointer-events-none">
          {Array.from({ length: starLength }).map((_, index) => (
            <Star
              className={`w-4 h-4 absolute opacity-0 left-1/2 top-1/2 sparkle-${index}`}
              fill="blue"
              key={index}
            />
          ))}
        </span>
      </button>
    </div>
  );
};

export default Button;
