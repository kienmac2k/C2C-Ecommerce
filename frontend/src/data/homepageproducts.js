import React from "react";
import item1 from "../assets/img/home/1.png";
import item2 from "../assets/img/home/2.png";
import item3 from "../assets/img/home/3.png";
import item4 from "../assets/img/home/4.png";

const text1 = (
  <>
    Office <br /> Furnitures
  </>
);
const text2 = (
  <>
    Office <br /> Equipments
  </>
);

export default [
  {
    img: item1,
    type: "Home Goods",
    path: "/homegoods",
  },

  {
    img: item4,
    type: "Corporate Gifts",
    path: "/corporate-gifts",
  },

  {
    img: item2,
    type: text1,
    path: "/office-furnitures",
  },
  {
    img: item3,
    type: text2,
    path: "/office-equipments",
  },
];
