"use client";

import { animate, stagger, useAnimate } from "framer-motion";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";

type AnimationSequence = Parameters<typeof animate>[0];

const Sparkles = ({ text = "Nothing" }: { text: string }) => {
  const [starCount, setStarCount] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      setStarCount(randomNumberGenerator(2, 50));
    }, 1000);
  }, [starCount]);

  const randomNumberGenerator = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
  };
  const [scope, animate] = useAnimate();
  const letters = text.split("");

  const handleBtnClick = () => {
    const sparkles = Array.from({ length: starCount });

    const sparkleAnimation: AnimationSequence = sparkles.map((_, index) => [
      `.stars-${index}`,
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
      `.stars-${index}`,
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
      `.stars-${index}`,
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
    <div className="h-full center">
      <div ref={scope}>
        <button
          onClick={handleBtnClick}
          className="border-2 text-2xl px-10 py-1.5 rounded-full transition-colors duration-150 border-border  relative"
        >
          <span className="sr-only">{text}</span>
          <span
            className="flex items-center justify-center overflow-hidden h-8"
            aria-hidden
          >
            {letters.map((letter, index) => (
              <span
                data-letter={letter}
                className="letter inline-block relative h-8 after:h-8 after:absolute after:left-0 after:top-full after:content-[attr(data-letter)] leading-8 text-base"
                key={index}
              >
                {letter}
              </span>
            ))}
          </span>
          <span className="absolute inset-0 block -z-10 pointer-events-none">
            {Array.from({ length: starCount }).map((_, index) => (
              <Star
                className={`w-4 h-4 absolute opacity-0 left-1/2 top-1/2 stars-${index}`}
                fill="blue"
                key={index}
              />
            ))}
          </span>
        </button>
      </div>
    </div>
  );
};

export default Sparkles;
