"use client";

import { cn } from "@/lib/utils";
import { useCashflow } from "@/providers/cash-flow";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import React, { useState } from "react";

interface DayProps {
  classNames: string;
  day: DayType;
  details?: {
    income: number;
    expenses: number;
  };
}

const Day: React.FC<DayProps> = ({ classNames, details, day }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { setView, setHoveredDay, view, hoveredDay, currentMonth } =
    useCashflow();

  const currentMonthDate = new Date(currentMonth);
  const currentMonthYear = currentMonthDate.getFullYear();
  const hoveredDayDate = hoveredDay
    ? new Date(
        `${currentMonthYear}-${currentMonthDate.getMonth() + 1}-${
          hoveredDay.day
        }`
      )
    : null;

  return (
    <>
      <div
        className={cn(
          "relative flex items-center justify-center py-1 duration-300 transition-opacity",
          classNames
        )}
        style={{
          height: 80,
          borderRadius: 10,
        }}
        onMouseEnter={() => {
          setHoveredDay(day.details ? day : null);
          setIsHovered(true);
        }}
        onMouseLeave={() => {
          setHoveredDay(null);
          setIsHovered(false);
        }}
        id={`day-${day.day}`}
      >
        <motion.div className="flex flex-col items-center justify-center z-10 ">
          <span
            className={cn(
              "text-lg block mt-1 font-semibold transition-all duration-300",
              isHovered && details && "text-primary-foreground"
            )}
            style={{
              fontSize: day.details ? "1.2rem" : "1rem",
            }}
          >
            {day.day}
          </span>
        </motion.div>
        {details && (
          <div
            className="flex flex-col items-center justify-center absolute inset-0 w-full overflow-hidden h-full"
            style={{
              borderRadius: 10,
            }}
          >
            {details.income > 0 && (
              <div
                className={cn(
                  "bg-muted w-full flex justify-center items-start pt-0.5 transition-all duration-300 rounded-t-lg",
                  isHovered && "bg-green-100 text-green-400"
                )}
                style={{
                  height: `${(details.income / 1000) * 100}%`,
                  color: isHovered ? "#4ade80" : "",
                  background: isHovered ? "#dcfce7" : "",
                  opacity:
                    view === "all" || view === "income" || isHovered ? 1 : 0,
                }}
              >
                <span className="text-sm font-medium w-full text-center block">
                  ${formatNumber(details.income)}
                </span>
              </div>
            )}
            {details.expenses > 0 && (
              <div
                className={cn(
                  "bg-muted-foreground w-full flex justify-center items-end pb-0.5  transition-all duration-300"
                )}
                style={{
                  height: `${(details.expenses / 1000) * 100}%`,
                  color: isHovered ? "#f87171" : "",
                  background: isHovered ? "#fee2e2" : "gray",
                  opacity:
                    view === "all" || view === "expenses" || isHovered ? 1 : 0,
                }}
              >
                <span className="text-sm font-medium w-full text-center block">
                  ${formatNumber(details.expenses)}
                </span>
              </div>
            )}
          </div>
        )}
        <AnimatePresence>
          {details && isHovered && (
            <motion.div
              className="absolute w-[250px] overflow-y-auto z-50"
              style={{
                bottom: 100,
              }}
              initial={{ scale: 0, y: 10, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0, y: 10, opacity: 0 }}
            >
              <div
                className="w-full mb-1 p-1 bg-background text-foreground border border-muted rounded-xl font-medium flex items-center justify-center"
                style={{
                  borderRadius: 20,
                }}
              >
                <div className="w-full p-3 rounded-2xl overflow-y-auto">
                  <span className="block mb-1.5 text-muted-foreground">
                    {hoveredDayDate
                      ? hoveredDayDate.toLocaleString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })
                      : ""}
                  </span>
                  <div className="w-full flex flex-col">
                    <div
                      className="w-full flex items-center justify-between gap-2"
                      onClick={() => {
                        setView("income");
                        setIsHovered(false);
                      }}
                    >
                      <span>Income</span>
                      <span
                        className="text-green-400 font-semibold"
                        style={{
                          color: "#4ade80",
                        }}
                      >
                        ${details.income.toFixed(2)}
                      </span>
                    </div>
                    <div
                      className="w-full flex items-center justify-between gap-2"
                      onClick={() => {
                        setView("expenses");
                        setIsHovered(false);
                      }}
                    >
                      <span>Expenses</span>
                      <span
                        className="text-red-400 font-semibold"
                        style={{
                          color: "#f87171",
                        }}
                      >
                        ${details.expenses.toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <div className="h-[1px] w-full my-2"></div>
                  <div className="w-full flex items-center justify-between">
                    <span className="text-lg font-semibold">Net Total</span>
                    <span className="flex items-center gap-1 text-lg">
                      {details.income - details.expenses > 0 ? (
                        <ArrowUpRight
                          size={22}
                          style={{
                            color: "#4ade80",
                          }}
                        />
                      ) : (
                        <ArrowDownLeft
                          size={22}
                          style={{
                            color: "#f87171",
                          }}
                        />
                      )}
                      ${(details.income - details.expenses).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

const CalendarGrid: React.FC<{
  currentMonth: Date;
  DAYS: DayType[];
  view: "all" | "income" | "expenses";
}> = ({ currentMonth, DAYS, view }) => {
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    const days: DayType[] = [];

    const prevMonth = new Date(year, month, 0);
    const prevMonthDays = prevMonth.getDate();
    for (let i = 0; i < firstDayOfMonth; i++) {
      const day = prevMonthDays - firstDayOfMonth + i + 1;
      days.push({
        day: day.toString(),
        classNames: "opacity-50",
      });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const dayString = i.toString().padStart(2, "0");
      const existingDay = DAYS.find((d) => d.day === dayString);
      days.push(existingDay || { day: dayString, classNames: "" });
    }

    const remainingDays = 35 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({ day: i.toString(), classNames: "bg-transparent opacity-50" });
    }

    return days;
  };

  const monthDays = getDaysInMonth(currentMonth);

  return (
    <div className="grid grid-cols-7 gap-2">
      {monthDays.map((day, index) => (
        <Day
          key={`${day.day}-${index}`}
          classNames={day.classNames}
          details={day.details}
          day={day}
        />
      ))}
    </div>
  );
};

const CashflowHeatmap = () => {
  const {
    currentMonth,
    setCurrentMonth,
    direction,
    setDirection,
    view,
    setView,
  } = useCashflow();

  const VIEWS: {
    key: "all" | "income" | "expenses";
    label: string;
    title: string;
  }[] = [
    { key: "all", label: "All", title: "Cashflow" },
    { key: "income", label: "Income", title: "Income" },
    { key: "expenses", label: "Expenses", title: "Expenses" },
  ];

  const changeMonth = (newDirection: "prev" | "next") => {
    setDirection(newDirection === "prev" ? -1 : 1);
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + (newDirection === "prev" ? -1 : 1));
    setCurrentMonth(newMonth);
  };

  const monthName = currentMonth.toLocaleString("en-US", { month: "long" });
  const year = currentMonth.getFullYear();

  return (
    <div className="center w-full min-h-screen border-b">
      <div
        className="relative p-4 w-full border rounded-2xl"
        style={{
          maxWidth: 672,
        }}
      >
        <motion.div layout>
          <motion.div
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.5 }}
            transition={{ duration: 0.15 }}
            className="w-full flex-col flex gap-4"
          >
            <div className="w-full flex justify-between items-center">
              <h1 className="text-xl font-semibold">Cashflow Heatmap</h1>
              <div className="flex items-center bg-muted p-1 rounded-lg">
                {VIEWS.map((v) => (
                  <button
                    key={v.key}
                    className="py-1 text-sm font-semibold px-4 rounded-md relative"
                    onClick={() => setView(v.key)}
                  >
                    <span
                      className={cn(
                        "z-10 relative duration-300 transition-colors text-muted-foreground "
                      )}
                      style={{
                        color: view === v.key ? "white" : "",
                      }}
                    >
                      {v.label}
                    </span>
                    {view === v.key && (
                      <motion.div
                        className="absolute bg-background inset-0 w-full h-full"
                        style={{ borderRadius: 8 }}
                        layoutId="indicator"
                      ></motion.div>
                    )}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-7 gap-2">
              {daysOfWeek.map((day) => (
                <div
                  key={day}
                  className="text-xs text-muted-foreground text-center py-1 px-0/5 rounded-xl"
                >
                  {day[0]}
                </div>
              ))}
            </div>
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={`${monthName}-${year}-grid`}
                initial={{ x: direction * 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: direction * -50, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="z-20"
              >
                <CalendarGrid
                  currentMonth={currentMonth}
                  DAYS={DAYS}
                  view={view}
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default CashflowHeatmap;

const formatNumber = (num: number): string => {
  if (num < 1000) {
    return num.toFixed(1);
  }

  const formatted = (num / 1000).toFixed(1);

  const final = formatted.endsWith(".0") ? formatted.slice(0, -2) : formatted;

  return `${final}K`;
};

type DayType = {
  day: string;
  classNames: string;
  details?: {
    income: number;
    expenses: number;
  };
};

const DAYS: DayType[] = [
  { day: "01", classNames: "bg-transparent" },
  {
    day: "02",
    classNames: "bg-orange-500 cursor-pointer",
    details: {
      income: 1893.99,
      expenses: 1234.48,
    },
  },
  { day: "03", classNames: "bg-transparent" },
  { day: "04", classNames: "bg-transparent" },
  { day: "05", classNames: "bg-transparent" },
  { day: "06", classNames: "bg-transparent" },
  {
    day: "07",
    classNames: "bg-orange-500 cursor-pointer",
    details: {
      income: 2378.23,
      expenses: 1076.58,
    },
  },
  { day: "08", classNames: "bg-transparent" },
  { day: "09", classNames: "bg-transparent" },
  { day: "10", classNames: "bg-transparent" },
  {
    day: "11",
    classNames: "bg-orange-500 cursor-pointer",
    details: {
      income: 0,
      expenses: 1234.48,
    },
  },
  {
    day: "12",
    classNames: "bg-orange-500 cursor-pointer",
    details: {
      income: 1893.99,
      expenses: 345.67,
    },
  },
  { day: "13", classNames: "bg-transparent" },
  { day: "14", classNames: "bg-transparent" },
  {
    day: "15",
    classNames: "bg-orange-500 cursor-pointer",
    details: {
      income: 2378.23,
      expenses: 2456.78,
    },
  },
  { day: "16", classNames: "bg-transparent" },
  { day: "17", classNames: "bg-transparent" },
  { day: "18", classNames: "bg-transparent" },
  { day: "19", classNames: "bg-transparent" },
  { day: "20", classNames: "bg-transparent" },
  { day: "21", classNames: "bg-transparent" },
  { day: "22", classNames: "bg-transparent" },
  { day: "23", classNames: "bg-transparent" },
  {
    day: "24",
    classNames: "bg-orange-500 cursor-pointer",
    details: {
      income: 678.23,
      expenses: 1234.48,
    },
  },
  { day: "25", classNames: "bg-transparent" },
  { day: "26", classNames: "bg-transparent" },
  {
    day: "27",
    classNames: "bg-orange-500 cursor-pointer",
    details: {
      income: 2378.23,
      expenses: 0,
    },
  },
  { day: "28", classNames: "bg-transparent" },
  { day: "29", classNames: "bg-transparent" },
  {
    day: "30",
    classNames: "bg-orange-500 cursor-pointer",
    details: {
      income: 890.23,
      expenses: 1234.48,
    },
  },
];

const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
