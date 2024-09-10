"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import React, { Dispatch, SetStateAction, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Card = {
  id: number;
  image: string;
};

const cardsData: Card[] = [
  {
    id: 1,
    image: "/others/photo-1.jpg",
  },
  {
    id: 2,
    image: "/others/photo-2.jpg",
  },
  {
    id: 3,
    image: "/others/photo-3.jpg",
  },
  {
    id: 4,
    image: "/others/photo-4.jpg",
  },
  {
    id: 5,
    image: "/others/photo-5.jpg",
  },
];

const Nothing = () => {
  const [cards, setCards] = useState<Card[]>(cardsData);

  const moveCardToBack = () => {
    setCards((prevCards) => {
      const newCards = [...prevCards];
      const lastCard = newCards.pop();
      if (lastCard) newCards.unshift(lastCard);
      return newCards;
    });
  };

  const moveCardToFront = () => {
    setCards((prevCards) => {
      const newCards = [...prevCards];
      const firstCard = newCards.shift();
      if (firstCard) newCards.push(firstCard);
      return newCards;
    });
  };

  return (
    <div className="h-screen w-full grid place-items-center">
      <div className="relative">
        {cards.map((card, index) => (
          <Card
            key={card.id}
            item={card}
            cards={cards}
            setCards={setCards}
            index={index}
          />
        ))}
        <button
          className="absolute left-[-40px] top-1/2 transform -translate-y-1/2 bg-primary text-primary-foreground rounded-full p-2 shadow-md"
          onClick={moveCardToFront}
        >
          <ChevronLeft size={24} />
        </button>
        <button
          className="absolute right-[-40px] top-1/2 transform -translate-y-1/2 bg-primary text-primary-foreground rounded-full p-2 shadow-md"
          onClick={moveCardToBack}
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

interface CardProps {
  cards: Card[];
  item: Card;
  setCards: Dispatch<SetStateAction<Card[]>>;
  index: number;
}

function Card({ item, cards, setCards, index }: CardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useMotionValue(0);

  const opacity = useTransform(x, [-200, 0, 200], [0, 1, 0]);

  const frontCard = index === cards.length - 1;

  const handleDragEnd = () => {
    if (Math.abs(x.get()) > 100) {
      setCards((prevCards) => prevCards.filter((card) => card.id !== item.id));
    } else {
      animate(x, 0);
      animate(y, 0);
      animate(rotate, 0);
    }
  };

  return (
    <motion.div
      style={{
        x,
        y,
        rotate,
        opacity,
        zIndex: cards.length - index,
        gridRow: 1,
        gridColumn: 1,
      }}
      drag={frontCard ? true : false}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      onDragEnd={handleDragEnd}
      initial={{ scale: 0.9, y: 30, opacity: 0 }}
      animate={{ scale: 1, y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.img
        src={item.image}
        alt="card image"
        className="h-96 w-80 rounded-2xl object-cover border-4 border-white shadow-xl"
      />
    </motion.div>
  );
}

export default Nothing;
