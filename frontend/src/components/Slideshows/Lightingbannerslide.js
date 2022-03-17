import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import { ShopNowLink } from "../../components/Globals/Styled";

class Showcase extends Component {
  render() {
    var settings = {
      dots: false,
      arrows: false,
      infinite: true,
      speed: 1000,
      autoplaySpeed: 3000,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
    };
    return (
      <Slider {...settings}>
        <Wrapper>
          <img src={this.props.banner1} alt="banner" />
          <div className="text">
            <h5>
              50% Off <br /> Ceiling lights
            </h5>
            <LightingshopLink to="/lighting">Shop Now</LightingshopLink>
          </div>
        </Wrapper>

        <Wrapper>
          <img src={this.props.banner2} alt="banner" />
          <div className="text">
            <h4>
              35% Off <br /> Chandeliers
            </h4>
            <LightingshopLink to="/lighting">Shop Now</LightingshopLink>
          </div>
        </Wrapper>
      </Slider>
    );
  }
}

export const LightingshopLink = styled(ShopNowLink)`
  padding: 5px 22px;
`;

const Wrapper = styled.div`
  position: relative;

  .text {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    padding-right: 5rem;

    h5 {
      font-size: 3.5rem;
      font-weight: bold;
      text-transform: uppercase;
      color: #333;
    }

    h4 {
      font-size: 3.5rem;
      font-weight: bold;
      text-transform: uppercase;
      color: #333;
    }
  }
`;

export default Showcase;
