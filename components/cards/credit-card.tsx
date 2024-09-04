"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy } from "lucide-react";

const CreditCards = () => {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [isHovering, setIsHovering] = useState<number | null>(null);

  const cards = [
    {
      name: "2{BKM}",
      background: "#3066BE",
      cardNumber: "123 456 789123 456 789",
    },
    {
      name: "Bossadi Zenith",
      background: "#7296D1",
      cardNumber: "123 456 789123 456 789",
    },
    {
      name: "Skaleway",
      background: "#B4C5E4",
      cardNumber: "123 456 789123 456 789",
    },
  ];

  return (
    <div className="h-screen center bg-slate-100 w-full">
      <motion.div
        className="w-[500px] shadow-lg relative flex py-5 px-10 flex-col bg-white rounded-t-3xl after:h-60 after:absolute after:w-full after:bg-white  after:-bottom-5  after:left-0 after:rounded-b-3xl after:z-20"
        animate={{ height: selectedCard !== null ? 740 : 420 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-between mb-10 font-semibold">
          <h1>My Wallet</h1>
          <p className="text-muted-foreground">{cards.length} cards</p>
        </div>

        {cards.map((item, index) => (
          <motion.div
            className="w-[90%] left-0 bottom-10 right-0 mb-auto mx-auto h-[300px] absolute rounded-3xl cursor-pointer flex flex-col justify-between p-5"
            key={index}
            style={{ backgroundColor: item.background }}
            initial={{ bottom: index * 20 }}
            animate={{
              bottom: selectedCard === index ? 370 : index * 20,
              zIndex: selectedCard === index ? 10 : 2 - index,
            }}
            whileHover={{ y: selectedCard === index ? 0 : -10 }}
            onDoubleClick={() =>
              setSelectedCard(selectedCard === index ? null : index)
            }
            transition={{ duration: 0.3 }}
          >
            <div className=""></div>
            <div className=" flex flex-col gap-3">
              <div className="">
                <div
                  className="w-fit relative"
                  onMouseEnter={() => setIsHovering(index)}
                  onMouseLeave={() => setIsHovering(null)}
                >
                  <motion.p
                    animate={{ scale: isHovering === index ? 0.9 : 1 }}
                    className="text-lg text-white"
                    transition={{
                      duration: 0.3,
                      ease: "easeInOut",
                    }}
                  >
                    {item.cardNumber}
                  </motion.p>
                  <AnimatePresence>
                    {isHovering === index && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        exit={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                          duration: 0.3,
                          ease: "easeInOut",
                        }}
                        className=" bg-white/10 backdrop-blur-sm rounded absolute inset-0 flex items-center justify-center"
                      >
                        <button className="text-xs bg-white px-3 p-0.5 rounded hover:bg-white/80 flex items-center gap-2">
                          <Copy className="h-3 w-3" /> <span>copy</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>{" "}
              <h1 className="text-white/80 font-semibold text-2xl">
                {item.name}
              </h1>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

const CreditCard = () => {
  return <div>CreditCard</div>;
};

export default CreditCards;
