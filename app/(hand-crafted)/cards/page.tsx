import Booking from "@/components/cards/booking";
import CardOne from "@/components/cards/card-one";
import CheckCard from "@/components/cards/check-card";
import Gallery from "@/components/cards/gallery";
import GalleryTwo from "@/components/cards/gallery-two";
import LinearCards from "@/components/cards/linear";
import SmNavbar from "@/components/cards/sm-navbar";
import Words from "@/components/cards/words";
import React from "react";

const Cards = () => {
  return (
    <div className="min-h-screen flex-col center overflow-x-clip">
      <CardOne />
      <CheckCard />
      <Booking />
      <SmNavbar />
      <Gallery />
      <LinearCards />
      <Words />
      <GalleryTwo />
    </div>
  );
};

export default Cards;
