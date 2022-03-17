import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from "../../assets/img/22.png";
import img2 from "../../assets/img/slides/49.png";

class HorizontalSlide extends Component {
  render() {
    var settings = {
      dots: false,
      infinite: true,
      speed: 1000,
      autoplaySpeed: 3000,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      className: "horizontal_advert_slide",
    };
    return (
      <Slider {...settings}>
        <div>
          <img src={img1} alt="banner" />
        </div>
        <div>
          <img src={img2} alt="banner" />
        </div>
      </Slider>
    );
  }
}

export default HorizontalSlide;
