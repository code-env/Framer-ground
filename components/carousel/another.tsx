"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { Dispatch, SetStateAction, useState } from "react";

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

const Swipe = () => {
  const [cards, setCards] = useState<Card[]>(cardsData);
  return (
    <div className="h-screen w-full grid place-items-center">
      {cards
        .slice()
        .reverse()
        .map((card, index) => (
          <Card
            key={card.id}
            item={card}
            cards={cards}
            setCards={setCards}
            index={index}
          />
        ))}
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
  const frontCard = index === 0;

  const cardsRotation = useTransform(x, [-160, 160], [-20, 20]);

  const rotate = useTransform(() => {
    const newOffset = frontCard ? 0 : index % 2 ? 10 : -10;

    return `${cardsRotation.get() + newOffset}deg`;
  });

  return (
    <motion.img
      src={item.image}
      alt="bossadi zenith"
      className="h-96 origin-bottom border-4 w-96 rounded-2xl object-cover"
      style={{
        transition: "0.125s transform",
        gridRow: 1,
        gridColumn: 1,
        rotate,
      }}
    />
  );
}

export default Swipe;
