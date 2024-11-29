"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface DayType {
  day: string;
  classNames: string;
  details?: {
    income: number;
    expenses: number;
  };
}

interface CashflowContextProps {
  currentMonth: Date;
  setCurrentMonth: (month: Date) => void;
  direction: number;
  setDirection: (direction: number) => void;
  view: "all" | "income" | "expenses";
  setView: (view: "all" | "income" | "expenses") => void;
  hoveredDay: DayType | null;
  setHoveredDay: (day: DayType | null) => void;
}

const CashflowContext = createContext<CashflowContextProps | undefined>(
  undefined
);

export const CashflowProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [direction, setDirection] = useState(0);
  const [view, setView] = useState<"all" | "income" | "expenses">("all");
  const [hoveredDay, setHoveredDay] = useState<DayType | null>(null);

  return (
    <CashflowContext.Provider
      value={{
        currentMonth,
        setCurrentMonth,
        direction,
        setDirection,
        view,
        setView,
        hoveredDay,
        setHoveredDay,
      }}
    >
      {children}
    </CashflowContext.Provider>
  );
};

export const useCashflow = () => {
  const context = useContext(CashflowContext);
  if (!context) {
    throw new Error("useCashflow must be used within a CashflowProvider");
  }
  return context;
};
