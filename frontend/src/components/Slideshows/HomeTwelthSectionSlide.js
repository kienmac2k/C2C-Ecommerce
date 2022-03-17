import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Slide5, Slide6 } from "./Slide";

class Showcase extends Component {
  render() {
    var settings = {
      dots: false,
      infinite: true,
      speed: 2000,
      autoplaySpeed: 5000,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
    };
    return (
      <Slider {...settings}>
        <Slide5 />
        <Slide6 />
      </Slider>
    );
  }
}

export default Showcase;
