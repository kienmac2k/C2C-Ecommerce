import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Slide1, Slide2 } from "./Slide";

class Showcase extends Component {
  render() {
    var settings = {
      dots: false,
      infinite: true,
      speed: 1000,
      autoplaySpeed: 3000,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
    };
    return (
      <Slider {...settings}>
        <Slide1 />
        <Slide2 />
      </Slider>
    );
  }
}

export default Showcase;
