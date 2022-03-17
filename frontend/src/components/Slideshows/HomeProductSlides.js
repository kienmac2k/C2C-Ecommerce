import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import good2 from "../../assets/img/home/pdt3.png";
import good3 from "../../assets/img/home/pdt1.png";
import good4 from "../../assets/img/home/pdt2.png";
import styled from "styled-components";

export const FIrstslide = () => (
  <Wrapper>
    <img className="img-fluid" src={good2} alt="product" />
    <div className="slide-promo-text">
      <div className="promo-text ">
        <h4 style={{ color: "#48555C" }}>
          Clearance <br /> 50% Off
        </h4>
        <h6 style={{ color: "#48555C" }}>Offer Lasts While Stock Lasts</h6>
      </div>
    </div>
  </Wrapper>
);

export const Secondslide = () => (
  <Wrapper>
    <img className="img-fluid" src={good3} alt="product" />
    <div className="slide-promo-text">
      <div className="promo-text">
        <h4 style={{ color: "#E67817" }}>
          Clearance <br /> 50% Off
        </h4>
        <h6 style={{ color: "#E67817" }}>Offer Lasts While Stock Lasts</h6>
      </div>
    </div>
  </Wrapper>
);

export const Thirdslide = () => (
  <Wrapper>
    <img className="img-fluid" src={good4} alt="product" />
    <div className="slide-promo-text">
      <div className="promo-text">
        <h4 style={{ color: "#fff" }}>
          Clearance <br /> 50% Off
        </h4>
        <h6 style={{ color: "#fff" }}>Offer Lasts While Stock Lasts</h6>
      </div>
    </div>
  </Wrapper>
);

class Showcase extends Component {
  render() {
    var settings = {
      dots: false,
      arrows: false,
      infinite: true,
      speed: 700,
      autoplaySpeed: 2000,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
    };
    return (
      <Slider {...settings}>
        <FIrstslide />
        <Secondslide />
        <Thirdslide />
      </Slider>
    );
  }
}

const Wrapper = styled.div`
  position: relative;

  .slide-promo-text {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    /* background-color: rgba(0, 0, 0, 0.3); */
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 4rem;
    padding-right: 4rem;

    .promo-text {
      position: relative;
      top: -4rem;
    }

    h4 {
      font-size: 3rem;
      font-weight: bold;
    }
    h6 {
      font-weight: bold;
      font-size: 1.2rem;
    }
  }
`;

export default Showcase;
