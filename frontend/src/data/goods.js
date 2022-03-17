import good7 from "../assets/img/homegoods/7.png";
import good8 from "../assets/img/homegoods/8.png";
import good9 from "../assets/img/homegoods/9.png";
import good10 from "../assets/img/homegoods/10.png";
import good11 from "../assets/img/homegoods/11.png";

import item1 from "../assets/img/homegoods/goods2/1.png";
import item2 from "../assets/img/homegoods/goods2/2.png";
import item3 from "../assets/img/homegoods/goods2/69.png";
import item4 from "../assets/img/homegoods/goods2/70.png";

import item5 from "../assets/img/homegoods/3.png";
import item6 from "../assets/img/homegoods/4.png";
import item7 from "../assets/img/homegoods/5.png";

export default {
  items: [
    {
      img: item1,
      type: "Cooking Pots",
      path: "/kitchen-equipments",
      category: "cooking pots",
    },

    {
      img: item2,
      type: "Fitted Kitchen",
      path: "/kitchen-equipments",
      category: "fitted kitchen",
    },
    {
      img: item3,
      type: "Cutleries",
      path: "/kitchen-equipments",
      category: "cutleries",
    },

    {
      img: item4,
      type: "Food Processor",
      path: "/kitchen-equipments",
      category: "food processor",
    },
  ],

  items2: [
    {
      img: item5,
      type: "bedroom",
      path: "/bedroom-equipments",
    },

    {
      img: item6,
      type: "bathroom",
      path: "/bathroom-equipments",
    },
    {
      img: item7,
      type: "dinningroom",
      path: "/dinningroom-equipments",
    },
  ],

  pricedgoods: [
    {
      img: good7,
      type: "doublebed",
      price: "380,000",
      path: "/bedroom-equipments",
    },

    {
      img: good8,
      type: "single dining chair",
      price: "30,000",
      path: "/livingroom-equipments",
    },
    {
      img: good9,
      type: "kitchen dining set",
      price: "160,000",
      path: "/kitchen-equipments",
    },

    {
      img: good10,
      type: "toilet seat",
      price: "40,000",
      path: "/bathroom-equipments",
    },

    {
      img: good11,
      type: "wall shelf",
      price: "73,000",
      path: "/livingroom-equipments",
    },
  ],
};
