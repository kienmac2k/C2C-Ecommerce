import React from "react";
import { Link } from "react-router-dom";
import img1 from "../../assets/img/slides/1.png";
import img2 from "../../assets/img/slides/8.png";
import img3 from "../../assets/img/slides/16.png";
import img4 from "../../assets/img/slides/17.png";
import img5 from "../../assets/img/slides/28.png";
import img6 from "../../assets/img/slides/29.png";

export const Slide1 = () => (
  <div className="slide">
    <Link to="/homegoods">
      <img src={img1} alt="furniture" />
    </Link>
  </div>
);

export const Slide2 = () => (
  <div className="slide">
    <Link to="/homegoods">
      <img src={img2} alt="furniture" />
    </Link>
  </div>
);

export const Slide3 = () => (
  <div className="slide">
    <img src={img3} alt="advertismeent" />
  </div>
);

export const Slide4 = () => (
  <div className="slide">
    <img src={img4} alt="advertismeent" />
  </div>
);
export const Slide5 = () => (
  <div className="slide">
    <Link to="/homegoods">
      <img src={img5} alt="advertismeent" />
    </Link>
  </div>
);
export const Slide6 = () => (
  <div className="slide">
    <Link to="/office-furnitures">
      <img src={img6} alt="advertismeent" />
    </Link>
  </div>
);
