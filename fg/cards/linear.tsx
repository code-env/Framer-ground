"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { ReactNode, useState } from "react";

export const CARDS: Card[] = [
  {
    id: 1,
    title: "Some title here",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus doloremque optio recusandae dolorem ipsa odit perferendis, repellat rem corporis sit soluta beatae neque illum molestias ex quidem delectus adipisci. Laboriosam!",
  },
  {
    id: 2,
    title: "Some title here",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus doloremque optio recusandae dolorem ipsa odit perferendis, repellat rem corporis sit soluta beatae neque illum molestias ex quidem delectus adipisci. Laboriosam!",
  },
  {
    id: 3,
    title: "Some title here",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus doloremque optio recusandae dolorem ipsa odit perferendis, repellat rem corporis sit soluta beatae neque illum molestias ex quidem delectus adipisci. Laboriosam!",
  },
];

type Card = {
  id: number;
  title: string;
  description: string;
};

const LinearCards = () => {
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);

  const [isHorizontal, setIsHorizontal] = useState(true);

  return (
    <>
      <main className="h-full center relative w-full">
        <div className="absolute top-10 right-10 flex items-center gap-2 p-2 border border-border rounded-full">
          <div
            className="h-6 w-8  flex items-center justify-center gap-1 cursor-pointer"
            onClick={() => setIsHorizontal(false)}
          >
            {Array.from({ length: 3 }).map((_, index) => (
              <span key={index} className="h-full w-1 bg-primary" />
            ))}
          </div>
          <div
            className="h-8 w-8 flex items-center justify-center flex-col gap-1 cursor-pointer"
            onClick={() => setIsHorizontal(true)}
          >
            {Array.from({ length: 3 }).map((_, index) => (
              <span key={index} className="h-1 w-full bg-primary" />
            ))}
          </div>
        </div>
        <motion.ul
          className={`flex flex-wrap gap-4 justify-center items-center size-full ${
            isHorizontal ? "flex-row" : "flex-col"
          }`}
          layout
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {CARDS.map((card) => (
            <Card
              key={card.id}
              card={card}
              onClick={() => setSelectedCard(card)}
            />
          ))}
        </motion.ul>
      </main>
      <Modal card={selectedCard} onClick={() => setSelectedCard(null)} />
    </>
  );
};

function Card(props: { card: Card; onClick: () => void }) {
  return (
    <motion.li
      key={props.card.title}
      className="text-white h-60 w-64 py-8 px-7 rounded-[30px] bg-black/20 text-[21px] hover:brightness-125 flex justify-end flex-col text-balance cursor-pointer"
      layoutId={`card-${props.card.id}`}
      onClick={props.onClick}
    >
      <div className="flex justify-between items-center">
        <motion.p
          className="text-balance"
          layoutId={`heading-${props.card.id}`}
        >
          {props.card.title}
        </motion.p>
        <Button>
          <Plus className="size-4" />
        </Button>
      </div>
      <motion.span layoutId={`description-${props.card.id}`} />
    </motion.li>
  );
}

function Modal(props: { card: Card | null; onClick: () => void }) {
  return (
    <>
      <AnimatePresence>
        {!!props.card && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-[1000000]"
            initial={{ backdropFilter: "blur(0px)" }}
            animate={{ backdropFilter: "blur(32px)" }}
            exit={{ backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!!props.card && (
          <motion.div
            className="fixed inset-0 z-10 flex flex-col justify-center"
            onClick={props.onClick}
          >
            <motion.div
              className="p-8 max-w-[500px] mx-auto h-[400px] rounded-[30px] relative overflow-hidden flex items-center justify-center flex-col bg-black/20"
              layoutId={`card-${props.card.id}`}
            >
              <div className="max-w-xl mx-auto">
                <motion.p
                  className="text-white font-medium text-balance"
                  layoutId={`heading-${props.card.id}`}
                >
                  {props.card.title}
                </motion.p>
                <motion.p
                  className="text-[#969799] font-medium text-[15px] mt-8"
                  layoutId={`description-${props.card.id}`}
                >
                  {props.card.description}
                </motion.p>
              </div>
              <Button className="absolute top-8 right-8">
                <Plus className="rotate-45" />
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function Button(props: { className?: string; children: ReactNode }) {
  return (
    <button
      className={`p-2 border-2 border-[#161616] rounded-full hover:bg-[#161616] flex items-center justify-center text-[#9C9BA1] hover:text-white ${
        props.className || ""
      }`.trim()}
    >
      {props.children}
    </button>
  );
}

export default LinearCards;
