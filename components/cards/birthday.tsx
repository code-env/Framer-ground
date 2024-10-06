"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Grip, Plus } from "lucide-react";

interface Birthday {
  name: string;
  image: string;
}

const months = [
  {
    id: 1,
    items: [
      { name: "Alice", image: "https://via.placeholder.com/40" },
      { name: "Bob", image: "https://via.placeholder.com/40" },
      { name: "Charlie", image: "https://via.placeholder.com/40" },
    ],
    name: "Jan",
  },
  {
    id: 2,
    items: [{ name: "David", image: "https://via.placeholder.com/40" }],
    name: "Feb",
  },
  {
    id: 3,
    items: [
      { name: "Eva", image: "https://via.placeholder.com/40" },
      { name: "Frank", image: "https://via.placeholder.com/40" },
      { name: "Grace", image: "https://via.placeholder.com/40" },
      { name: "Hannah", image: "https://via.placeholder.com/40" },
    ],
    name: "Mar",
  },
  {
    id: 4,
    items: [
      { name: "Ivy", image: "https://via.placeholder.com/40" },
      { name: "Jack", image: "https://via.placeholder.com/40" },
    ],
    name: "Apr",
  },
  {
    id: 5,
    items: [
      { name: "Liam", image: "https://via.placeholder.com/40" },
      { name: "Mia", image: "https://via.placeholder.com/40" },
      { name: "Noah", image: "https://via.placeholder.com/40" },
    ],
    name: "May",
  },
  {
    id: 6,
    items: [{ name: "Olivia", image: "https://via.placeholder.com/40" }],
    name: "Jun",
  },
  {
    id: 7,
    items: [
      { name: "Penny", image: "https://via.placeholder.com/40" },
      { name: "Quinn", image: "https://via.placeholder.com/40" },
      { name: "Riley", image: "https://via.placeholder.com/40" },
      { name: "Sophia", image: "https://via.placeholder.com/40" },
      { name: "Toby", image: "https://via.placeholder.com/40" },
    ],
    name: "Jul",
  },
  {
    id: 8,
    items: [
      { name: "Uma", image: "https://via.placeholder.com/40" },
      { name: "Violet", image: "https://via.placeholder.com/40" },
    ],
    name: "Aug",
  },
  {
    id: 9,
    items: [
      { name: "Will", image: "https://via.placeholder.com/40" },
      { name: "Xander", image: "https://via.placeholder.com/40" },
    ],
    name: "Sep",
  },
  {
    id: 11,
    items: [
      { name: "Zoe", image: "https://via.placeholder.com/40" },
      { name: "Aaron", image: "https://via.placeholder.com/40" },
      { name: "Bella", image: "https://via.placeholder.com/40" },
      { name: "Cody", image: "https://via.placeholder.com/40" },
    ],
    name: "Oct",
  },
  {
    id: 10,
    items: [{ name: "Yara", image: "https://via.placeholder.com/40" }],
    name: "Nov",
  },
  {
    id: 12,
    items: [
      { name: "Diana", image: "https://via.placeholder.com/40" },
      { name: "Ethan", image: "https://via.placeholder.com/40" },
      { name: "Fiona", image: "https://via.placeholder.com/40" },
    ],
    name: "Dec",
  },
];

const Month = ({ month }: { month: (typeof months)[number] }) => {
  const firstThree = month.items.slice(0, 3);
  const remainingBirthdays = month.items.length - firstThree.length;

  return (
    <motion.div
      layoutId={`month-${month.name}`}
      key={month.id}
      className="flex flex-col gap-2"
    >
      <span className="uppercase text-muted-foreground text-sm font-medium">
        {month.name}
      </span>
      <div className="flex">
        {firstThree.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <img
              src={item.image}
              alt={item.name}
              className="rounded-full w-10 h-10 min-w-10"
            />
          </div>
        ))}
        {remainingBirthdays > 0 && (
          <div className="size-10 center bg-muted/90 rounded-full text-muted-foreground -ml-2 border border-dashed border-red-500 font-bold text-sm">
            <span>
              <Plus className="size-4" />
            </span>{" "}
            {remainingBirthdays === 1 ? "1" : `+${remainingBirthdays}`}
          </div>
        )}
      </div>
    </motion.div>
  );
};

const Birthday = () => {
  const [status, setStatus] = useState<string>("idle");
  const isOpen = status === "open";
  const [selected, setSelected] = useState<null | number>(null);

  const [upcomingBirthdays, setUpcomingBirthdays] = useState<Birthday[]>([]);
  const getCurrentMonth = () => {
    const date = new Date();
    return date.getMonth(); // 0 = January, 1 = February, ..., 11 = December
  };

  useEffect(() => {
    const monthIndex = getCurrentMonth(); // Get current month index

    setUpcomingBirthdays(months[monthIndex].items); // Set items for current month
  }, []);

  return (
    <div className="h-screen w-full center border-y border-red-500">
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            className="p-4 bg-primary text-primary-foreground"
            layoutId="wrapper"
            style={{ borderRadius: 22, height: 420, width: 500 }}
          >
            <div className="flex items-center justify-between p-4">
              <motion.p layoutId="bt" className="text-3xl font-semibold">
                2025
              </motion.p>
              <Grip
                className="cursor-pointer"
                onClick={() => setStatus("idle")}
              />
            </div>
            <div className="grid grid-cols-3 gap-4 overflow-x-clip bar px-4">
              {months.map((month) => (
                <Month key={month.id} month={month} />
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            layoutId="wrapper"
            className="p-4 bg-primary text-primary-foreground flex flex-col gap-5"
            style={{ borderRadius: 22, width: 500, height: 510 }}
          >
            <div className="flex items-center justify-between p-4">
              <motion.p layoutId="bt" className="text-3xl font-semibold">
                Birthday
              </motion.p>
              <Grip
                className="cursor-pointer"
                onClick={() => setStatus("open")}
              />
            </div>
            <div className="relative">
              <div className="flex overflow-x-scroll bar gap-4 px-4">
                {months.map((month) => (
                  <Month key={month.id} month={month} />
                ))}
              </div>
              <div className="h-full w-10 bg-gradient-to-r from-primary to-transparent absolute top-0 left-0" />
              <div className="h-full w-10 bg-gradient-to-l from-primary to-transparent absolute top-0 right-0" />
            </div>
            <div className="flex-1 flex flex-col gap-5 relative">
              <p className="uppercase text-xs">Upcoming</p>
              <div className="flex flex-col gap-2">
                <AnimatePresence>
                  {upcomingBirthdays.map((birthday, index) => (
                    <motion.div
                      className="dark:bg-neutral-300 bg-neutral-800 hover:bg-neutral-800/80 p-2 rounded-xl flex gap-2 cursor-pointer hover:dark:bg-neutral-300/80 text-primary-foreground"
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ delay: (3 - index) * 0.06 }}
                      layoutId={`button-${index}`}
                      onClick={() => setSelected(index)}
                    >
                      <motion.div
                        layoutId="profile"
                        className="size-10 rounded-full bg-neutral-600 min-w-10"
                      />
                      <motion.div
                        layoutId="profile-info"
                        className="flex justify-between flex-1"
                      >
                        <p className="flex flex-col">
                          <span>{birthday.name}</span>
                          <span className="text-xs">November 23</span>
                        </p>
                        <p>35y</p>
                      </motion.div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              <AnimatePresence>
                {selected !== null && (
                  <motion.div
                    layoutId={`button-${selected}`}
                    className="absolute -left-4 h-[calc(100%_+16px)] w-[calc(100%_+32px)] rounded-[22px] dark:bg-neutral-300 bg-neutral-800 p-4 flex flex-col gap-5 text-primary-foreground"
                  >
                    <div
                      className="absolute top-2 left-0 right-0 w-20 rounded-full h-2 bg-primary cursor-pointer mx-auto"
                      onClick={() => setSelected(null)}
                    />
                    <div className="flex gap-2">
                      <motion.div
                        layoutId="profile"
                        className="size-10 rounded-full bg-neutral-600 min-w-10"
                      />
                      <motion.div
                        layoutId="profile-info"
                        className="flex justify-between flex-1"
                      >
                        <p className="flex flex-col">
                          <span>Bossadi Zenith</span>
                          <span className="text-xs">
                            November 23 . <span>in x days</span>
                          </span>
                        </p>
                        <p>35y</p>
                      </motion.div>
                    </div>
                    <p className="text-xs uppercase font-semibold">
                      gift ideas
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Birthday;
