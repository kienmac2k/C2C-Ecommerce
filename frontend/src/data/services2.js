import React from "react";
import item1 from "../assets/img/59.png";
import link1 from "../assets/img/home/movenow.png";
import item2 from "../assets/img/monkheypayimg.png";
import link2 from "../assets/img/home/paynow.png";
import item3 from "../assets/img/creativespaceimg.png";
import link3 from "../assets/img/home/checkitout.png";

const text1 = (
  <>
    Move without stress. Get a hassle free <br /> movement that suits you
  </>
);

const text2 = (
  <>
    Enjoy secure and convienient ways <br /> to make payment
  </>
);

const text3 = (
  <>
    Explore our huge collection of templates <br /> from designers, developers,
    photographers, <br /> illustrators and producers
  </>
);

export const services = [
  {
    img: item1,
    url: link1,
    title: "2nd Street Logistics",
    content: text1,
    path: "https://11milesandco.ecscorppoc.com/",
  },

  {
    img: item2,
    url: link2,
    title: " Monkheypay",
    content: text2,
    path: "https://monkheypay.ecscorppoc.com/",
  },

  {
    img: item3,
    url: link3,
    title: " Creatice Space",
    content: text3,
    path: "https://tamalan.ecscorppoc.com/",
  },
];
