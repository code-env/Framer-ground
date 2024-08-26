"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
interface Element {
  id: number;
  width: number;
  img: string;
}

interface Column {
  id: number;
  elements: Element[];
}

const items: Column[] = [
  {
    id: 1,
    elements: [
      { id: 1, width: 250, img: "/others/photo-1.jpg" },
      { id: 2, width: 100, img: "/others/photo-2.jpg" },
    ],
  },
  {
    id: 2,
    elements: [
      { id: 3, width: 100, img: "/others/photo-6.jpg" },
      { id: 4, width: 250, img: "/others/photo-7.jpg" },
    ],
  },
];

const GalleryOne = () => {
  const [activeItem, setActiveItem] = useState<Element | null>(null);

  const allElements = items.flatMap((column) => column.elements);

  const handleItemClick = (ele: Element) => {
    setActiveItem(ele);
  };

  return (
    <div className="h-screen center w-full flex flex-col gap-5 relative">
      <motion.div
        className={cn("flex flex-col gap-5")}
        layout
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {items.map((column) => (
          <motion.div
            className={cn("flex items-center justify-center gap-5")}
            key={column.id}
            animate={{
              opacity: activeItem !== null ? 0 : 1,
              willChange: "auto",
            }}
          >
            {column.elements.map((ele, index) => (
              <Gallery
                item={ele}
                key={index}
                onClick={() => setActiveItem(ele)}
              />
            ))}
          </motion.div>
        ))}
      </motion.div>

      {activeItem && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, willChange: "auto" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-screen overflow-hidden"
        >
          <AnimatePresence mode="popLayout">
            <motion.div
              key={activeItem.id}
              className="w-full h-screen flex items-center justify-center gap-10 overflow-hidden "
              transition={{ duration: 0.5, ease: "easeInOut" }}
              layout
            >
              <motion.div
                layoutId={`card-${activeItem.id}`}
                className="w-[400px] h-[400px] rounded-3xl center font-bold text-5xl cursor-pointer overflow-hidden z-10"
                onClick={() => setActiveItem(null)}
              >
                <img
                  src={activeItem.img}
                  alt=""
                  className="w-full object-cover h-full"
                />
              </motion.div>
              <motion.div
                className="flex flex-col gap-4 justify-center items-center"
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                {allElements
                  .filter((ele) => ele.id !== activeItem.id)
                  .map((ele) => (
                    <Gallery
                      key={ele.id}
                      item={ele}
                      onClick={() => handleItemClick(ele)}
                      isSmall
                    />
                  ))}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
};

const Gallery = (props: {
  item: Element;
  onClick: () => void;
  isSmall?: boolean;
}) => {
  return (
    <motion.div
      style={{
        width: props.isSmall ? 80 : props.item.width,
        height: props.isSmall ? 80 : 150,
      }}
      className={cn(
        "rounded-2xl cursor-pointer text-3xl center overflow-hidden relative"
      )}
      layoutId={`card-${props.item.id}`}
      onClick={props.onClick}
    >
      <motion.img
        src={props.item.img}
        alt=""
        className="w-full object-cover h-full"
        whileHover={{ scale: 1.05 }}
        transition={{
          duration: 0.3,
        }}
      />
    </motion.div>
  );
};

export default GalleryOne;
