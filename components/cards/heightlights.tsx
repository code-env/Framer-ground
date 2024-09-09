"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

const Hightlights = () => {
  const [index, setIndex] = useState(0);

  return (
    <div className="h-screen center w-full bg-background">
      <div className="h-[1000px] w-[1000px]  rounded-3xl flex overflow-hidden">
        {/* the first layer */}
        <div className="flex-1 h-full flex flex-col bg-background">
          <div className="flex-1 h-full p-2">
            <div
              className="border rounded-2xl h-full w-full cursor-pointer"
              onMouseEnter={() => setIndex(1)}
              onMouseLeave={() => setIndex(0)}
            >
              {/* your content here */}
            </div>
          </div>
          <div className="flex-[0.5] h-full">
            <div className="h-full w-full  ">
              <div className="rounded-2xl h-full w-full rounded-l-none border-l-0 bg-gradient-to-r via-background from-background to-muted"></div>
            </div>
          </div>
          <div className="flex-1 h-full p-2">
            <div
              className="border rounded-2xl h-full w-full cursor-pointer"
              onMouseEnter={() => setIndex(2)}
              onMouseLeave={() => setIndex(0)}
            >
              {/* your content here */}
            </div>
          </div>
        </div>
        {/* end of first layer */}

        {/* the second layer */}
        <div className="flex-[0.5] h-full flex flex-col bg-background">
          <div className="flex-1 rounded-2xl bg-gradient-to-b from-background to-muted via-background rounded-t-none" />
          <div className="flex-[0.5] p-2">
            {/* the middle square */}
            <div className="w-[200px] h-[200px] border rounded-2xl center overflow-hidden relative">
              <div className="w-[80%] h-[80%] border rounded-full center">
                <div className="h-20 w-20 bg-red-500 rounded-full"></div>
              </div>
              <div
                className={cn(
                  "w-10 h-10  bg-red-500 absolute transition-all duration-300 -top-0 -left-full before:h-full before:w-10 before:bg-background before:absolute before:top-[30%] before:left-[30%] before:rounded-full",
                  index === 1 && "-top-2 -left-2"
                )}
              />
              <div
                className={cn(
                  "w-10 h-10 bg-red-500 absolute transition-all duration-300 -bottom-full -left-full before:h-10 before:w-10 before:bg-background before:absolute before:rounded-full before:bottom-[30%] before:left-[30%] ",
                  index === 2 && "-bottom-2 -left-2"
                )}
              />
              <div
                className={cn(
                  "w-10 h-10 bg-red-500 absolute transition-all duration-300 -top-full -right-full before:h-10 before:w-10 before:bg-background before:absolute before:top-[30%] before:right-[30%] before:rounded-full",
                  index === 3 && "-top-2 -right-2"
                )}
              />
              <div
                className={cn(
                  "w-10 h-10 bg-red-500 absolute transition-all duration-300 -bottom-full -right-full before:h-10 before:w-10 before:bg-background before:absolute before:bottom-[30%] before:right-[30%] before:rounded-full",
                  index === 4 && "-bottom-2 -right-2"
                )}
              />
              <svg
                width="140"
                height="140"
                viewBox="0 0 130 130"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={cn(
                  "absolute inset-0 m-auto opacity-0 transition-all duration-300 rounded-full",
                  index > 0 && "opacity-100"
                )}
                style={{
                  transform: `rotate(${(index === 4 && 10) || (index === 2 && -270) || (index === 1 && 180) || (index === 3 && 270)}deg)`,
                  // animation: "spin 2s linear infinite",
                }}
              >
                <path
                  d="M130 65C130 79.4936 125.156 93.5715 116.238 104.996C107.319 116.421 94.8383 124.538 80.7782 128.056L75.8039 108.177C85.4314 105.768 93.9776 100.21 100.084 92.387C106.191 84.5639 109.508 74.9243 109.508 65H130Z"
                  fill="#EF4444"
                />
              </svg>
            </div>

            {/* end of middle square */}
          </div>
          <div className="flex-1  rounded-2xl bg-gradient-to-t from-background to-muted via-background rounded-b-none" />
        </div>
        {/* end of second layer */}

        {/* the third layer */}
        <div className="flex-1  h-full flex flex-col bg-background">
          <div className="flex-1 h-full  p-2">
            <div
              className="border rounded-2xl h-full w-full cursor-pointer"
              onMouseEnter={() => setIndex(3)}
              onMouseLeave={() => setIndex(0)}
            >
              {/* your content here */}
            </div>
          </div>
          <div className="flex-[0.5] h-full">
            <div className="h-full w-full">
              <div className="rounded-2xl h-full w-full rounded-r-none border-r-0 bg-gradient-to-l from-background to-muted via-background/50"></div>
            </div>
          </div>
          <div className="flex-1 h-full p-2">
            <div
              className="border rounded-2xl h-full w-full cursor-pointer"
              onMouseEnter={() => setIndex(4)}
              onMouseLeave={() => setIndex(0)}
            >
              {/* your content here */}
            </div>
          </div>
        </div>
        {/* end of third layer */}
      </div>
    </div>
  );
};

export default Hightlights;
