import React from "react";
import Slider from "react-slick";

class Billboard extends React.Component {
  render() {
    var settings = {
      dots: false,
      infinite: true,
      speed: 500,
      autoplaySpeed: 5000,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      arrows: false,
      pauseOnFocus: true,
    };
    return (
      <Slider {...settings}>
        <div>
          <img
            src={require("../../assets/img/slides/cocacola-advert.png")}
            alt="slide"
          />
        </div>
        <div>
          <img
            src={require("../../assets/img/slides/billboard.png")}
            alt="slide"
          />
        </div>
        <div>
          <img
            src={require("../../assets/img/slides/billboard2.png")}
            alt="slide"
          />
        </div>

        <div>
          <img
            src={require("../../assets/img/slides/billboard33.png")}
            alt="slide"
          />
        </div>
      </Slider>
    );
  }
}

export default Billboard;
