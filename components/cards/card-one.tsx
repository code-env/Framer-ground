"use client";

import React, { useState } from "react";
import { delay, motion } from "framer-motion";
import { Button } from "../ui/button";

const CardOne = () => {
  const [animate, setAnimate] = useState(false);
  const [frontImage, setFrontImage] = useState<number | null>(null);

  const images = [
    { title: "Nothing", src: "/image1.jpg", tilt: 0 },
    { title: "Nothing", src: "/image2.jpg", tilt: -20 },
    { title: "Nothing", src: "/image3.jpg", tilt: 10 },
  ];

  const imageAnimationVariant = {
    initial: (index: number) => ({
      scale: 0,
      x: index === 1 ? -50 : index === 2 ? 50 : 0,
      zIndex: 0,
      opacity: 0,
    }),
    animate: (index: number) => ({
      scale: 1,
      x: 0,
      opacity: 1,
      zIndex: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: index * 0.15,
        duration: 5,
        ease: [0.9, 0.1, 0.25, 1],
      },
    }),
    front: {
      scale: 1.1,
      zIndex: 10,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    },
  };

  React.useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div className="center h-screen bg-white w-full flex-col">
      <div className="relativ cursor-pointer center bg-red-50 p-10 border-4 rounded-[25px] flex-col gap-10">
        <div className="relative h-32 w-32">
          {images.map((image, index) => (
            <motion.img
              key={index}
              src={image.src}
              alt={image.title}
              className="h-32 absolute w-32 object-cover border-8 border-white rounded-xl"
              style={{
                rotate: image.tilt,
                right: index === 2 ? index * -10 : index * 10,
                top: index >= 1 ? 25 : index * 10,
              }}
              variants={imageAnimationVariant}
              initial="initial"
              animate={
                frontImage === index ? "front" : animate ? "animate" : "initial"
              }
              custom={index}
              onClick={() => setFrontImage(index)}
            />
          ))}
        </div>
        <div className="mt-10 flex flex-col gap-5">
          <h1 className="font-semibold text-3xl text-center">
            Share this wishlist with your <br /> group
          </h1>
          <p className="text-xl text-muted-foreground text-center">
            Everyone can add homes, write notes and <br /> vote for their
            favorites
          </p>
        </div>
        <Button
          className="w-full font-semibold text-lg"
          size="lg"
          onClick={() => {
            setAnimate(false);
            setFrontImage(null);
            setTimeout(() => setAnimate(true), 10);
          }}
        >
          Got it
        </Button>
      </div>
    </div>
  );
};

export default CardOne;
