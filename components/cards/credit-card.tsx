"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CreditCards = () => {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  const cards = ["#3066BE", "#7296D1", "#B4C5E4"];

  return (
    <div className="h-screen center bg-slate-100 w-full">
      <motion.div
        className="w-[500px] shadow-lg relative flex p-10 flex-col bg-white rounded-t-3xl after:h-5 after:absolute after:w-full after:bg-white after:-bottom-5 after:left-0 after:rounded-b-3xl"
        animate={{ height: selectedCard !== null ? 540 : 320 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-between mb-10 font-semibold">
          <h1>My Wallet</h1>
          <p className="text-muted-foreground">{cards.length} cards</p>
        </div>

        {cards.map((item, index) => (
          <motion.div
            className="w-[90%] left-0 bottom-10 right-0 mb-auto mx-auto h-[200px] absolute rounded-3xl cursor-pointer"
            key={index}
            style={{ backgroundColor: item }}
            initial={{ bottom: index * 20 }}
            animate={{
              bottom: selectedCard === index ? 270 : index * 20,
              zIndex: selectedCard === index ? 10 : 2 - index,
            }}
            whileHover={{ y: selectedCard === index ? 0 : -10 }}
            onClick={() =>
              setSelectedCard(selectedCard === index ? null : index)
            }
            transition={{ duration: 0.3 }}
          >
            <div></div>
            <div className=""></div>
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
