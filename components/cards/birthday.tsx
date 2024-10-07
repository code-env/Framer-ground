"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Grip, Plus } from "lucide-react";

interface Birthday {
  name: string;
  image: string;
  dateOfBirth: string;
}

const months = [
  {
    id: 1,
    name: "Jan",
    items: [
      {
        name: "Alice",
        image: "https://avatar.iran.liara.run/public/82",
        dateOfBirth: "1990-01-15",
      },
      {
        name: "Bob",
        image: "https://avatar.iran.liara.run/public/30",
        dateOfBirth: "1988-01-24",
      },
      {
        name: "Charlie",
        image: "https://avatar.iran.liara.run/public/31",
        dateOfBirth: "1992-01-10",
      },
    ],
  },
  {
    id: 2,
    name: "Feb",
    items: [
      {
        name: "David",
        image: "https://avatar.iran.liara.run/public/3",
        dateOfBirth: "1991-02-05",
      },
    ],
  },
  {
    id: 3,
    name: "Mar",
    items: [
      {
        name: "Eva",
        image: "https://avatar.iran.liara.run/public/60",
        dateOfBirth: "1993-03-20",
      },
      {
        name: "Frank",
        image: "https://avatar.iran.liara.run/public/39",
        dateOfBirth: "1989-03-15",
      },
      {
        name: "Grace",
        image: "https://avatar.iran.liara.run/public/51",
        dateOfBirth: "1995-03-30",
      },
      {
        name: "Hannah",
        image: "https://avatar.iran.liara.run/public/94",
        dateOfBirth: "1994-03-22",
      },
    ],
  },
  {
    id: 4,
    name: "Apr",
    items: [
      {
        name: "Ivy",
        image: "https://avatar.iran.liara.run/public/92",
        dateOfBirth: "1992-04-11",
      },
      {
        name: "Jack",
        image: "https://avatar.iran.liara.run/public/36",
        dateOfBirth: "1987-04-05",
      },
    ],
  },
  {
    id: 5,
    name: "May",
    items: [
      {
        name: "Liam",
        image: "https://avatar.iran.liara.run/public/75",
        dateOfBirth: "1990-05-03",
      },
      {
        name: "Mia",
        image: "https://avatar.iran.liara.run/public/96",
        dateOfBirth: "1992-05-15",
      },
      {
        name: "Noah",
        image: "https://avatar.iran.liara.run/public/47",
        dateOfBirth: "1985-05-25",
      },
    ],
  },
  {
    id: 6,
    name: "Jun",
    items: [
      {
        name: "Olivia",
        image: "https://avatar.iran.liara.run/public/58",
        dateOfBirth: "1991-06-09",
      },
    ],
  },
  {
    id: 7,
    name: "Jul",
    items: [
      {
        name: "Penny",
        image: "https://avatar.iran.liara.run/public/13",
        dateOfBirth: "1989-07-20",
      },
      {
        name: "Quinn",
        image: "https://avatar.iran.liara.run/public/93",
        dateOfBirth: "1993-07-04",
      },
      {
        name: "Riley",
        image: "https://avatar.iran.liara.run/public/67",
        dateOfBirth: "1988-07-11",
      },
      {
        name: "Sophia",
        image: "https://avatar.iran.liara.run/public/89",
        dateOfBirth: "1992-07-15",
      },
      {
        name: "Toby",
        image: "https://avatar.iran.liara.run/public/18",
        dateOfBirth: "1994-07-29",
      },
    ],
  },
  {
    id: 8,
    name: "Aug",
    items: [
      {
        name: "Uma",
        image: "https://avatar.iran.liara.run/public/15",
        dateOfBirth: "1995-08-02",
      },
      {
        name: "Violet",
        image: "https://avatar.iran.liara.run/public/79",
        dateOfBirth: "1993-08-21",
      },
    ],
  },
  {
    id: 9,
    name: "Sep",
    items: [
      {
        name: "Will",
        image: "https://avatar.iran.liara.run/public/4",
        dateOfBirth: "1987-09-19",
      },
      {
        name: "Xander",
        image: "https://avatar.iran.liara.run/public/7",
        dateOfBirth: "1991-09-14",
      },
    ],
  },
  {
    id: 10,
    name: "Oct",
    items: [
      {
        name: "Zoe",
        image: "https://avatar.iran.liara.run/public/57",
        dateOfBirth: "1985-10-03",
      },
      {
        name: "Aaron",
        image: "https://avatar.iran.liara.run/public/21",
        dateOfBirth: "1990-10-16",
      },
      {
        name: "Bella",
        image: "https://avatar.iran.liara.run/public/91",
        dateOfBirth: "1992-10-22",
      },
      {
        name: "Cody",
        image: "https://avatar.iran.liara.run/public/26",
        dateOfBirth: "1994-10-30",
      },
    ],
  },
  {
    id: 11,
    name: "Nov",
    items: [
      {
        name: "Yara",
        image: "https://avatar.iran.liara.run/public/20",
        dateOfBirth: "1992-11-12",
      },
    ],
  },
  {
    id: 12,
    name: "Dec",
    items: [
      {
        name: "Diana",
        image: "https://avatar.iran.liara.run/public/95",
        dateOfBirth: "1991-12-05",
      },
      {
        name: "Ethan",
        image: "https://avatar.iran.liara.run/public/41",
        dateOfBirth: "1989-12-15",
      },
      {
        name: "Fiona",
        image: "https://avatar.iran.liara.run/public/88",
        dateOfBirth: "1992-12-25",
      },
    ],
  },
];

const getCurrentMonth = () => {
  const date = new Date();
  return date.getMonth(); // 0 = January, 1 = February, ..., 11 = December
};

const Month = ({
  month,
  index,
}: {
  month: (typeof months)[number];
  index: number;
}) => {
  const firstThree = month.items.slice(0, 3);
  const remainingBirthdays = month.items.length - firstThree.length;
  const currentMonthIndex = getCurrentMonth() === index;

  return (
    <motion.div
      layoutId={`month-${month.name}`}
      key={month.id}
      className="flex flex-col gap-2"
    >
      <p className="flex items-center gap-2">
        {currentMonthIndex && (
          <span className="size-2 rounded-full bg-red-500" />
        )}
        <span className="uppercase text-muted-foreground text-sm font-medium">
          {month.name}
        </span>
      </p>
      <div className="flex">
        {firstThree.map((item, index) => (
          <div
            key={index}
            className="size-10 center dark:bg-neutral-300 border border-border/50 bg-neutral-800 rounded-full text-muted-foreground -ml-2 font-bold text-sm"
          >
            <img
              src={item.image}
              alt={item.name}
              className="rounded-full w-10 h-10"
            />
          </div>
        ))}
        {remainingBirthdays > 0 && (
          <div className="size-10 center rounded-full text-muted-foreground -ml-2 dark:bg-neutral-300 border border-border/50 bg-neutral-800 font-bold text-sm">
            <span>
              <Plus className="size-4" />
            </span>{" "}
            {remainingBirthdays}
          </div>
        )}
      </div>
    </motion.div>
  );
};

const Birthday = () => {
  const [status, setStatus] = useState<string>("idle");
  const isOpen = status === "open";
  const [selected, setSelected] = useState<null | Birthday>(null);

  const [upcomingBirthdays, setUpcomingBirthdays] = useState<Birthday[]>([]);

  useEffect(() => {
    const monthIndex = getCurrentMonth(); // Get current month index
    setUpcomingBirthdays(months[monthIndex].items); // Set items for current month
  }, []);

  const calculateAge = (dateOfBirth: string): number => {
    if (!dateOfBirth) return 0; // Handle empty dateOfBirth

    const birthDate = new Date(dateOfBirth);
    if (isNaN(birthDate.getTime())) return 0; // Check if the date is valid

    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    // Adjust age if the birthday hasn't occurred yet this year
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  const getRemainingDays = (dateOfBirth: string): number => {
    if (!dateOfBirth) return -1; // Handle empty dateOfBirth

    const today = new Date();
    const birthDateThisYear = new Date(
      today.getFullYear(),
      new Date(dateOfBirth).getMonth(),
      new Date(dateOfBirth).getDate()
    );

    // If the birthday has already occurred this year, calculate for next year
    if (birthDateThisYear < today) {
      birthDateThisYear.setFullYear(today.getFullYear() + 1);
    }

    // Calculate the difference in time
    const differenceInTime = birthDateThisYear.getTime() - today.getTime();
    if (differenceInTime < 0) return -1; // Handle any negative difference

    // Convert time difference to days
    return Math.ceil(differenceInTime / (1000 * 3600 * 24));
  };

  const formatDate = (dateOfBirth: string): string => {
    const date = new Date(dateOfBirth);
    const options: Intl.DateTimeFormatOptions = {
      month: "long", // 'long' gives full month name
      day: "numeric", // numeric gives the day without leading zeros
    };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <div className="h-screen w-full center border-y border-red-500">
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            className="p-4 bg-primary text-primary-foreground"
            layoutId="wrapper"
            style={{ borderRadius: 22, height: 430, width: 500 }}
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
              {months.map((month, index) => (
                <Month key={month.id} month={month} index={index} />
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
                {months.map((month, index) => (
                  <Month key={month.id} month={month} index={index} />
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
                      transition={{ delay: (3 - index) * 0.06 }} // for it to have the reversed staggering
                      layoutId={`birthday-${birthday.name}`}
                      onClick={() => setSelected(birthday)}
                    >
                      <motion.div
                        layoutId={`profile-${birthday.name}`}
                        className="size-10 rounded-full bg-neutral-600 min-w-10"
                      >
                        <img
                          src={birthday.image}
                          alt={birthday.name}
                          className="rounded-full w-10 h-10"
                        />
                      </motion.div>
                      <motion.div
                        layoutId={`profile-info-${birthday.name}`}
                        className="flex justify-between flex-1"
                      >
                        <p className="flex flex-col">
                          <span>{birthday.name}</span>
                          <span className="text-xs">
                            {formatDate(birthday.dateOfBirth)}
                          </span>
                        </p>
                        <p>{calculateAge(birthday.dateOfBirth)}y</p>
                      </motion.div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              <AnimatePresence>
                {selected !== null && (
                  <motion.div
                    layoutId={`birthday-${selected.name}`}
                    className="absolute -left-4 h-[calc(100%_+16px)] w-[calc(100%_+32px)] rounded-[22px] dark:bg-neutral-300 bg-neutral-800 p-4 flex flex-col gap-5 text-primary-foreground"
                  >
                    <div
                      className="absolute top-2 left-0 right-0 w-20 rounded-full h-2 bg-primary cursor-pointer mx-auto"
                      onClick={() => setSelected(null)}
                    />
                    <div className="flex gap-2 items-center">
                      <motion.div
                        layoutId={`profile-${selected.name}`}
                        className="size-16 rounded-full bg-neutral-600 min-w-10"
                      >
                        <img
                          src={selected.image}
                          alt={selected.name}
                          className="rounded-full size-full"
                        />
                      </motion.div>
                      <motion.div
                        layoutId={`profile-info-${selected.name}`}
                        className="flex justify-between flex-1"
                      >
                        <p className="flex flex-col">
                          <span className="font-semibold text-2xl">
                            {selected.name}
                          </span>
                          <span className="text-base">
                            {formatDate(selected.dateOfBirth)} .{" "}
                            <span className="text-sm text-neutral-500">
                              in {getRemainingDays(selected.dateOfBirth)} days
                            </span>
                          </span>
                        </p>
                        <p className="text-2xl font-semibold">
                          {calculateAge(selected.dateOfBirth)}y
                        </p>
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
