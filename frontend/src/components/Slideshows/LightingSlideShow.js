import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class Showcase extends Component {
  render() {
    var settings = {
      dots: false,
      arrows: false,
      infinite: true,
      speed: 500,
      autoplaySpeed: 2000,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
    };
    return (
      <Slider {...settings}>
        <img src={this.props.slide1} alt="slide" />
        <img src={this.props.slide2} alt="slide" />
        <img src={this.props.slide3} alt="slide" />
      </Slider>
    );
  }
}

export default Showcase;
