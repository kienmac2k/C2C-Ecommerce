import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class Showcase extends Component {
  render() {
    var settings = {
      dots: false,
      infinite: true,
      speed: 2000,
      autoplaySpeed: 3000,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
    };
    return (
      <Slider {...settings}>
        <img src={this.props.banner1} alt="banner" />
        <img src={this.props.banner2} alt="banner" />
      </Slider>
    );
  }
}

export default Showcase;
