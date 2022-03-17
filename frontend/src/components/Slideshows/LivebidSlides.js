import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ShopNowLink } from "../../components/Globals/Styled";
import styled from "styled-components";

class Showcase extends Component {
  render() {
    var settings = {
      dots: false,
      arrows: false,
      infinite: true,
      fade: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      cssEase: "linear",
    };
    return (
      <Slider {...settings}>
        <div className="livebidbanner">
          <img src={this.props.banner1} alt="banner" />
          <div className="banner-text">
            <h5>Up for Bid in 48 hrs</h5>
            <h6>Durable PlayStation Console</h6>
            <ShopNow>SHOP NOW</ShopNow>
          </div>
        </div>
        <div className="livebidbanner">
          <img src={this.props.banner2} alt="banner" />
          <div className="banner-text">
            <h5>Up for Bid in 48 hrs</h5>
            <h6>Durable Generator</h6>
            <ShopNow>SHOP NOW</ShopNow>
          </div>
        </div>
      </Slider>
    );
  }
}

const ShopNow = styled(ShopNowLink)`
  padding: 6px 30px;
  color: #000 !important;
  border: 1px solid #000 !important;
`;

export default Showcase;
