import React, { Component } from "react";
import Slider from "react-slick";
import banner1 from "../../assets/img/slides/44.png";
import banner2 from "../../assets/img/slides/45.png";
import banner3 from "../../assets/img/slides/46.png";
import banner4 from "../../assets/img/slides/47.png";

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
        <Slider {...settings} className="horizontal_advert_slide">
          <div>
            <img src={banner1} alt="banner" />
          </div>
          <div>
            <img src={banner2} alt="banner" />
          </div>
          <div>
            <img src={banner3} alt="banner" />
          </div>
          <div>
            <img src={banner4} alt="banner" />
          </div>
        </Slider>
      </div>
    );
  }
}
