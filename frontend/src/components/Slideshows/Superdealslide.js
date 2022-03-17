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
      speed: 1000,
      autoplaySpeed: 5000,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
    };
    return (
      <Slider {...settings}>
        <div className="superdealbanner">
          <img className="img-fluid" src={this.props.banner1} alt="slide" />
          <div className="rightbanner-text">
            <h5>Super Deals</h5>
            <h6>
              50% Off on Ping Pong <br /> Table
            </h6>
            <ShopNow>SHOP NOW</ShopNow>
          </div>
        </div>
        <div className="superdealbanner">
          <img className="img-fluid" src={this.props.banner2} alt="slide" />
          <div className="rightbanner-text">
            <h5>Super Deals</h5>
            <h6>50% Off on American Fridge</h6>
            <ShopNow>SHOP NOW</ShopNow>
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

export default Showcase;
