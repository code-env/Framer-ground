import CardOne from "@/components/cards/card-one";
import CheckCard from "@/components/cards/check-card";
import React from "react";

const Cards = () => {
  return (
    <div className="min-h-screen flex-col center bg-white/90">
      <CardOne />
      <CheckCard />
    </div>
  );
};

export default Cards;
