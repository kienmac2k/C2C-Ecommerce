import React, { Component } from "react";
import Slider from "react-slick";
import banner1 from "../../assets/img/slides/37.png";
import banner2 from "../../assets/img/slides/36.png";

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
    };
    return (
      <div>
        <Slider {...settings}>
          <div className="vertical-slide">
            <img src={banner1} alt="banner" />
          </div>

          <div className="vertical-slide">
            <img src={banner2} alt="banner" />
          </div>
        </Slider>
      </div>
    );
  }
}
