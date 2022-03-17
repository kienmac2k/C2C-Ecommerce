import React from "react";
import good1 from "../assets/img/home/11.png";
import good2 from "../assets/img/home/12.png";
import good3 from "../assets/img/home/34.png";
import good4 from "../assets/img/home/35.png";

const text1 = <>Enjoy Massive Clearance on Gas Cooker</>;
const text2 = (
  <>
    Participate in the live bid for unique <br /> American fridge
  </>
);

export const product = [
  {
    img1: good1,
    img2: good2,
    statement1: text1,
    statement2: "& on selected items up to",
    percentageoff: " 70% OFF",
    enddate: "Clearance ends on Fri 09/08, 12pm GMT",
    linktext: "Buy Now",
  },

  {
    img1: good3,
    img2: good4,
    statement1: text2,
    enddate: "Bid Starts : Tue 04/18, 12pm GMT",
    linktext: "Bid Now",
  },
];
