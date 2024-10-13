import React from "react";

import Booking from "@/components/cards/booking";
import CardOne from "@/components/cards/card-one";
import CheckCard from "@/components/cards/check-card";
import CreditCards from "@/components/cards/credit-card";
import Gallery from "@/components/cards/gallery";
import GalleryTwo from "@/components/cards/gallery-two";
import LinearCards from "@/components/cards/linear";
import SmNavbar from "@/components/cards/sm-navbar";
import Words from "@/components/cards/words";
import Add from "@/components/cards/add";
import PianoVisualization from "@/components/cards/piano";
import Vercel from "@/components/cards/vercel";
import Drop from "@/components/cards/drop";
import Overview from "@/components/cards/overview";
import Hightlights from "@/components/cards/heightlights";
import Experience from "@/components/cards/experience";
import Nothing from "@/components/cards/nothing";
import OverviewStackeds from "@/components/cards/overview-stacked";
import Pill from "@/components/cards/pill";
import CreateNew from "@/components/buttons/create-new";
import Birthday from "@/components/cards/birthday";
import Wheel from "@/components/cards/wheel";
import CircularMenu from "@/components/cards/menu";
import Loading from "@/components/cards/loading";
import Call from "@/components/cards/call";

const Cards = () => {
  return (
    <div className="min-h-screen flex-col center overflow-x-hidden">
      <CardOne />
      <CheckCard />
      <Booking />
      <SmNavbar />
      <Gallery />
      <LinearCards />
      <Words />
      <GalleryTwo />
      <CreditCards />
      <Add />
      <PianoVisualization />
      <Vercel />
      <Drop />
      <Overview />
      <Hightlights />
      <Experience />
      <Nothing />
      <OverviewStackeds />
      <Pill />
      <CreateNew />
      <Birthday />
      <Wheel />
      <CircularMenu />
      <Loading />
      <Call />
    </div>
  );
};

export default Cards;
