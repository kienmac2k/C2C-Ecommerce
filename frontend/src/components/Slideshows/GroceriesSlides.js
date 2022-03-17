import React from "react";
import { UncontrolledCarousel } from "reactstrap";

import img1 from "../../assets/img/home/9.png";
import img2 from "../../assets/img/home/20.png";
import img3 from "../../assets/img/home/21.png";

const items = [
  {
    src: img1,
    key: "1",
  },
  {
    src: img2,
    key: "2",
  },
  {
    src: img3,
    key: "3",
  },
];

const Example = () => (
  <UncontrolledCarousel controls={false} indicators={false} items={items} />
);

export default Example;
