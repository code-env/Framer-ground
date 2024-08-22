import Booking from "@/components/cards/booking";
import CardOne from "@/components/cards/card-one";
import CheckCard from "@/components/cards/check-card";
import SmNavbar from "@/components/cards/sm-navbar";
import React from "react";

const Cards = () => {
  return (
    <div className="min-h-screen flex-col center ">
      <CardOne />
      <CheckCard />
      <Booking />
      <SmNavbar />
    </div>
  );
};

export default Cards;
