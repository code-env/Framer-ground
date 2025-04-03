"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const getDaysInMonth = (month: number, year: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [direction, setDirection] = useState<"next" | "prev">("next");

  // Get the total days for the current, previous, and next months
  const daysInCurrentMonth = getDaysInMonth(
    currentDate.getMonth(),
    currentDate.getFullYear()
  );
  const daysInPreviousMonth = getDaysInMonth(
    currentDate.getMonth() - 1,
    currentDate.getFullYear()
  );

  // Get the first and last days of the current month
  const startDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();
  const endDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    daysInCurrentMonth
  ).getDay();

  // Generate the calendar days including previous and next month days
  const generateCalendarDays = () => {
    let daysArray = [];

    // Add days from the previous month if the month doesn't start on Sunday
    if (startDayOfMonth > 0) {
      for (let i = startDayOfMonth - 1; i >= 0; i--) {
        daysArray.push({
          day: daysInPreviousMonth - i,
          currentMonth: false, // mark as previous month
        });
      }
    }

    // Add actual days of the current month
    for (let day = 1; day <= daysInCurrentMonth; day++) {
      daysArray.push({
        day,
        currentMonth: true,
      });
    }

    // Add days from the next month to complete the week (if necessary)
    if (endDayOfMonth < 6) {
      for (let i = 1; i <= 6 - endDayOfMonth; i++) {
        daysArray.push({
          day: i,
          currentMonth: false, // mark as next month
        });
      }
    }

    return daysArray;
  };

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

  const calendarDays = generateCalendarDays();

  return (
    <div className="center size-full flex-col">
      <div className="max-w-xl w-full">
        {/* Header with month and year */}
        <div className="flex items-center gap-10 mb-10">
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
          <div className="relative w-40 h-10 text-center">
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

        {/* Days of the week */}
        <div className="grid grid-cols-7 gap-2 mb-3 text-center font-bold ">
          {daysOfWeek.map((day) => (
            <motion.div
              layout
              key={day}
              className="bg-muted text-muted-foreground text-sm py-1 rounded-full uper"
            >
              {day}
            </motion.div>
          ))}
        </div>

        {/* Calendar days with animations */}
        <div className="relative h-[460px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentDate.toISOString()} // key for AnimatePresence
              className="grid grid-cols-7 gap-2 text-center absolute inset-0 w-full"
              initial={{ x: direction === "next" ? 50 : -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: direction === "next" ? -50 : 50, opacity: 0 }}
              transition={{ duration: 0.1 }}
            >
              {calendarDays.map((date, index) => (
                <motion.div
                  key={index}
                  className={`p-2 rounded-lg center cursor-pointer ${
                    date.currentMonth &&
                    date.day === new Date().getDate() &&
                    currentDate.getMonth() === new Date().getMonth() &&
                    currentDate.getFullYear() === new Date().getFullYear()
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : date.currentMonth
                      ? "bg-muted/90 hover:bg-muted/65"
                      : "bg-neutral-300 dark:bg-neutral-900 text-gray-400 dark:text-gray-500"
                  }`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.1 }}
                >
                  {date.day}
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
