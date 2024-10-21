"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Icons } from "../shared/icons";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

// Days of the week
const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

type Company = {
  name: string;
  icon: React.ReactElement<SVGElement>;
  color: string;
};

type DaysOfMonth = {
  day: number;
  subscription?: {
    name: string;
    companies: Company[];
  };
};

// Hardcoded days array with subscription
const daysOfMonth: DaysOfMonth[] = [
  {
    day: 1,
    subscription: {
      name: "Friend's Birthday",
      companies: [
        {
          name: "paypal",
          icon: <Icons.paypal />,
          color: "#003087",
        },
      ],
    },
  },
  { day: 2 },
  {
    day: 3,
    subscription: {
      name: "Work Meeting",
      companies: [
        {
          name: "zoom",
          icon: <Icons.apple />,
          color: "#2D8CFF",
        },
      ],
    },
  },
  { day: 4 },
  {
    day: 5,
    subscription: {
      name: "Anniversary",
      companies: [
        {
          name: "flowers",
          icon: <Icons.npm />,
          color: "#FF69B4",
        },
        {
          name: "chocolates",
          icon: <Icons.aria />,
          color: "#D2691E",
        },
      ],
    },
  },
  { day: 6 },
  {
    day: 7,
    subscription: {
      name: "Doctor Appointment",
      companies: [
        {
          name: "hospital",
          icon: <Icons.twitter />,
          color: "#FF0000",
        },
      ],
    },
  },
  { day: 8 },
  { day: 9 },
  { day: 10 },
  { day: 11 },
  {
    day: 12,
    subscription: {
      name: "Conference",
      companies: [
        {
          name: "tech",
          icon: <Icons.twitter />,
          color: "#00FF00",
        },
        {
          name: "networking",
          icon: <Icons.tailwind />,
          color: "#0000FF",
        },
      ],
    },
  },
  { day: 13 },
  { day: 14 },
  {
    day: 15,
    subscription: {
      name: "Friend's Wedding",
      companies: [
        {
          name: "wedding",
          icon: <Icons.bento />,
          color: "#FFD700",
        },
      ],
    },
  },
  { day: 16 },
  { day: 17 },
  { day: 18 },
  { day: 19 },
  { day: 20 },
  {
    day: 21,
    subscription: {
      name: "Team Meeting",
      companies: [
        {
          name: "slack",
          icon: <Icons.nextJS />,
          color: "#4A154B",
        },
        {
          name: "zoom",
          icon: <Icons.pnpm />,
          color: "#2D8CFF",
        },
      ],
    },
  },
  { day: 22 },
  { day: 23 },
  { day: 24 },
  { day: 25 },
  {
    day: 26,
    subscription: {
      name: "Project Deadline",
      companies: [
        {
          name: "jira",
          icon: <Icons.framerMotion />,
          color: "#0052CC",
        },
        {
          name: "github",
          icon: <Icons.google />,
          color: "#000000",
        },
      ],
    },
  },
  { day: 27 },
  { day: 28 },
  { day: 29 },
  { day: 30 },
  { day: 31 },
];

// Helper function to get the number of days in a month
const getDaysInMonth = (month: number, year: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

// Helper function to get the starting day of the month (weekday)
const getStartDayOfMonth = (month: number, year: number): number => {
  return new Date(year, month, 1).getDay();
};

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [isActiveDay, setIsActiveDay] = useState<number | null>(null);
  const [active, setActive] = useState(false);

  const nextMonth = () => {
    setDirection("next");
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };

  const prevMonth = () => {
    setDirection("prev");
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };

  const daysInCurrentMonth = getDaysInMonth(
    currentDate.getMonth(),
    currentDate.getFullYear()
  );
  const startDayOfMonth = getStartDayOfMonth(
    currentDate.getMonth(),
    currentDate.getFullYear()
  );

  // Create an array of day objects (using hardcoded data, including previous/next month fillers)
  const calendarDays = [];
  const prevMonthDays = getDaysInMonth(
    currentDate.getMonth() - 1,
    currentDate.getFullYear()
  );

  // Add previous month's days if the month doesn't start on Sunday
  for (let i = startDayOfMonth - 1; i >= 0; i--) {
    calendarDays.push({
      day: prevMonthDays - i,
      currentMonth: false, // Mark these as belonging to the previous month
    });
  }

  // Add the current month's days using the hardcoded array
  for (let day = 0; day < daysInCurrentMonth; day++) {
    const dayObj = daysOfMonth[day] || { day: day + 1 }; // Use hardcoded array or fallback
    calendarDays.push({
      ...dayObj,
      currentMonth: true, // Mark these as belonging to the current month
    });
  }

  // Fill in the rest of the week with next month's days
  const remainingDays = 42 - calendarDays.length; // Ensure 6 weeks (7x6 = 42 slots)
  for (let i = 1; i <= remainingDays; i++) {
    calendarDays.push({
      day: i,
      currentMonth: false, // Mark these as belonging to the next month
    });
  }

  const handleClick = () => setActive((prev) => !prev);

  return (
    <div className="h-screen center flex-col w-full relative">
      <div className="max-w-xl w-full">
        {/* Header with month and year */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2">
              <motion.button
                whileTap={{
                  scale: 0.9,
                }}
                onClick={prevMonth}
                className="size-8 rounded-full center bg-muted"
              >
                <span className="sr-only">Prev</span>
                <ChevronLeft className="size-5" />
              </motion.button>
              <motion.button
                whileTap={{
                  scale: 0.9,
                }}
                onClick={nextMonth}
                className="size-8 rounded-full bg-muted center"
              >
                <span className="sr-only">Next</span>
                <ChevronRight className="size-5" />
              </motion.button>
            </div>
            <div className="w-40 h-10 text-center relative">
              <AnimatePresence mode="wait">
                <motion.h2
                  key={currentDate.toISOString()}
                  className="text-xl font-bold absolute inset-0 flex items-center w-full"
                  initial={{ y: direction === "next" ? -10 : 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: direction === "next" ? 10 : -10, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {currentDate.toLocaleString("default", { month: "long" })}{" "}
                  {currentDate.getFullYear()}
                </motion.h2>
              </AnimatePresence>
            </div>
          </div>
          <motion.button
            layoutId="expenditure"
            onClick={() => setActive(true)}
            className="font-bold text-xl"
          >
            $500
          </motion.button>
        </div>

        {/* Days of the week */}
        <div className="grid grid-cols-7 gap-2 mb-3 text-center font-bold ">
          {daysOfWeek.map((day) => (
            <motion.div
              layout
              key={day}
              className="bg-muted text-muted-foreground text-sm py-1 rounded-full"
            >
              {day}
            </motion.div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* Calendar days */}
          <motion.div
            key={currentDate.toISOString()}
            initial={{ x: direction === "next" ? 50 : -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction === "next" ? -50 : 50, opacity: 0 }}
            transition={{
              duration: 0.1,
            }}
            className="grid grid-cols-7 gap-2 text-center z-0 "
          >
            {calendarDays.map((date, index) => (
              <Day
                date={date}
                key={index}
                setIsActiveDay={setIsActiveDay}
                currentDate={currentDate}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
      <Modal active={active} onClick={handleClick} />
    </div>
  );
};

function Day({
  date,
  currentDate,
  setIsActiveDay,
}: {
  date: DaysOfMonth & { currentMonth: boolean };
  currentDate: Date;
  setIsActiveDay: Dispatch<SetStateAction<null | number>>;
}) {
  return (
    <HoverCard openDelay={100} closeDelay={10}>
      <HoverCardTrigger>
        <motion.div
          className={`p-2 rounded-lg h-[70px] center flex-col relative z-0   ${
            date.currentMonth &&
            date.day === new Date().getDate() &&
            currentDate.getMonth() === new Date().getMonth() &&
            currentDate.getFullYear() === new Date().getFullYear()
              ? "bg-primary text-primary-foreground"
              : date.currentMonth
              ? "bg-muted"
              : "bg-neutral-300 dark:bg-neutral-900 text-gray-400 dark:text-gray-500"
          }`}
          style={{
            zIndex: date.currentMonth ? -1 : 0,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          onMouseEnter={() =>
            date.subscription ? setIsActiveDay(date.day) : null
          }
          onMouseLeave={() => setIsActiveDay(null)}
        >
          {date.subscription && (
            <div className="w-full center">
              {typeof date.subscription !== "string" &&
                date.subscription?.companies.map(
                  (company: Company, index: number) => (
                    <motion.div
                      layoutId={`company-${company.name}`}
                      key={index}
                      className="flex items-center gap-1 last:-ml-2"
                    >
                      <span
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: company.color }}
                      ></span>
                    </motion.div>
                  )
                )}
            </div>
          )}

          {date.day}

          {date.subscription && (
            <motion.div
              layoutId={`active-day-${date.day}`}
              className="absolute top-2 right-2 size-2 bg-red-500 rounded-full"
            />
          )}
        </motion.div>
      </HoverCardTrigger>
      {date.subscription && (
        <HoverCardContent className="p-0">
          <div className="p-4 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
            <h3 className="font-bold text-lg">{date.subscription.name}</h3>
            <div className="flex items-center gap-2 mt-2">
              {date.subscription.companies.map((company, index) => (
                <div key={index} className="flex items-center gap-2">
                  {company.icon}
                  <span>{company.name}</span>
                </div>
              ))}
            </div>
          </div>
        </HoverCardContent>
      )}
    </HoverCard>
  );
}

function Modal(props: { active: boolean; onClick: () => void }) {
  const daysWithSubscription = daysOfMonth.filter((day) => day.subscription);

  // Sort days based on the number of subscriptions
  const sortedDays = daysWithSubscription.sort((a, b) => {
    return (
      (b.subscription?.companies.length || 0) -
      (a.subscription?.companies.length || 0)
    );
  });

  // Get the total number of subscriptions for scaling
  const maxSubscriptions = sortedDays[0]?.subscription?.companies.length || 1; // Avoid division by zero
  const totalSubscriptions = sortedDays.reduce(
    (acc, day) => acc + (day.subscription?.companies.length || 0),
    0
  ); // Total number of subscriptions

  const radius = 200; // Radius of the circle
  const centerX = 250; // Center X for the circle
  const centerY = 250; // Center Y for the circle

  const angleStep = (2 * Math.PI) / sortedDays.length;

  const positions = sortedDays.map((_, index) => ({
    cx: 250 + radius * Math.cos(angleStep * index),
    cy: 250 + radius * Math.sin(angleStep * index),
  }));

  function generateGradient(companies: Company[]) {
    return `url(#gradient-${companies[0].name})`; // Using the first company's name for a unique ID
  }

  return (
    <>
      <AnimatePresence>
        {!!props.active && (
          <motion.div
            className="fixed inset-0 z-10 flex flex-col items-center justify-center bg-background"
            onClick={props.onClick}
          >
            <div className="w-full max-w-lg relative flex">
              <svg width={500} height={500} viewBox="0 0 500 500">
                <defs>
                  {sortedDays.map((day, index) => {
                    const gradientId = `gradient-${day.subscription?.companies[0]?.name}`;
                    return (
                      <linearGradient
                        id={gradientId}
                        key={index}
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        {day.subscription?.companies.map(
                          (company, companyIndex) => (
                            <stop
                              offset={`${
                                (100 /
                                  (day.subscription?.companies.length || 1)) *
                                companyIndex
                              }%`}
                              stopColor={company.color}
                              key={companyIndex}
                            />
                          )
                        )}
                      </linearGradient>
                    );
                  })}
                </defs>

                <circle
                  cx={centerX}
                  cy={centerY}
                  r={radius}
                  fill="none"
                  stroke="none"
                  strokeWidth={20}
                />
                {sortedDays.map((day, index) => {
                  const subscriptionCount =
                    day.subscription?.companies.length || 0;

                  // Calculate the proportion of the circle this day should cover
                  const proportion = subscriptionCount / totalSubscriptions;
                  const angle = proportion * 2 * Math.PI; // Proportional angle

                  // Calculate the start and end angles for the path
                  const startAngle = sortedDays
                    .slice(0, index)
                    .reduce(
                      (acc, d) =>
                        acc +
                        ((d.subscription?.companies.length || 0) /
                          totalSubscriptions) *
                          2 *
                          Math.PI,
                      0
                    );
                  const endAngle = startAngle + angle;

                  const startX = centerX + radius * Math.cos(startAngle);
                  const startY = centerY + radius * Math.sin(startAngle);
                  const endX = centerX + radius * Math.cos(endAngle);
                  const endY = centerY + radius * Math.sin(endAngle);

                  const pathLength = radius * (endAngle - startAngle); // Arc length of the path

                  return (
                    <g key={index}>
                      <motion.path
                        d={`M ${startX} ${startY} A ${radius} ${radius} 0 0 1 ${endX} ${endY}`}
                        fill="none"
                        stroke={
                          day.subscription?.companies
                            ? generateGradient(day.subscription.companies)
                            : "none"
                        }
                        strokeWidth={30}
                        strokeLinecap="round"
                        initial={{ strokeDasharray: "0 1" }}
                        animate={{
                          strokeDasharray: `${pathLength - 50} ${pathLength}`,
                        }}
                        transition={{ duration: 0.5 }} // Increase duration for visibility
                      />
                    </g>
                  );
                })}
              </svg>
              <motion.button
                className="absolute top-0 left-0 right-0 bottom-0 w-fit m-auto h-fit"
                layoutId="expenditure"
                transition={{
                  delay: 0.1,
                }}
              >
                $500
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Calendar;
