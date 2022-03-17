import React, { Component } from "react";
import Slider from "react-slick";
// import banner1 from "../assets/img/slides/superdeal11.png";
// import banner2 from "../assets/img/slides/superdeal6.png";
import banner3 from "../../assets/img/slides/superdeal7.png";

export default class VerticalMode extends Component {
  render() {
    const settings = {
      dots: false,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      vertical: true,
      verticalSwiping: true,
      autoplay: true,
      speed: 500,
      autoplaySpeed: 4000,
      adaptiveHeight: true,
    };
    return (
      <Slider {...settings}>
        <div>
          <img src={banner3} alt="banner" />
        </div>

        <div>
          <img src={banner3} alt="banner" />
        </div>
      </Slider>
    );
  }
}
