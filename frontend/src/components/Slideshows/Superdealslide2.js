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
      speed: 500,
      autoplaySpeed: 7000,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
    };
    return (
      <Slider {...settings}>
        <div className="superdealbanner">
          <img className="img-fluid" src={this.props.banner1} alt="slide" />
          <div className="leftbanner-text">
            <ShopNow to="#!">SHOP NOW</ShopNow>
          </div>
        </div>
        <div className="superdealbanner">
          <img className="img-fluid" src={this.props.banner2} alt="slide" />
          <div className="leftbanner-text">
            <ShopNow2 to="#!">SHOP NOW</ShopNow2>
          </div>
        </div>
      </Slider>
    );
  }
}

const ShopNow = styled(ShopNowLink)`
  padding: 5px 22px;
  margin-top: 1rem;
  color: #224873 !important;
  border: 1px solid #224873 !important;
`;

const ShopNow2 = styled(ShopNowLink)`
  padding: 5px 22px;
  margin-top: 1rem;
  color: #fff !important;
  border: 1px solid #fff !important;
`;

export default Showcase;
