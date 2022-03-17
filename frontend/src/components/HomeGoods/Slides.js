import React, { Component } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import img1 from "../../assets/img/homegoods/7.png";
import img2 from "../../assets/img/homegoods/8.png";
import img3 from "../../assets/img/homegoods/9.png";
import img4 from "../../assets/img/homegoods/10.png";
import img5 from "../../assets/img/homegoods/11.png";
import img6 from "../../assets/img/homegoods/43.png";

import "../../styles/slides.scss";

export default class Responsive extends Component {
  render() {
    var settings = {
      dots: false,
      infinite: true,
      speed: 1000,
      slidesToShow: 5,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      cssEase: "linear",
      arrows: false,

      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };
    return (
      <Slider {...settings}>
        <div className="good">
          <Link to="/">
            <img src={img1} alt="product" />
          </Link>

          <div className="good__type__price">
            <h5 className="good__type">DOUBLE BED</h5>
            <p className="good__price"> &#x20a6;380,000</p>
          </div>
        </div>

        <div className="good">
          <Link to="/">
            <img src={img2} alt="product" />
          </Link>

          <div className="good__type__price">
            <h5 className="good__type">SINGLE DINNING CHAIR</h5>
            <p className="good__price"> &#x20a6;30,000</p>
          </div>
        </div>

        <div className="good">
          <Link to="/">
            <img src={img3} alt="product" />
          </Link>

          <div className="good__type__price">
            <h5 className="good__type">KITCHEN DINNING SET</h5>
            <p className="good__price"> &#x20a6;160,000</p>
          </div>
        </div>

        <div className="good">
          <Link to="/">
            <img src={img4} alt="product" />
          </Link>

          <div className="good__type__price">
            <h5 className="good__type">TOILET SEAT</h5>
            <p className="good__price"> &#x20a6;40,000</p>
          </div>
        </div>

        <div className="good">
          <Link to="/">
            <img src={img5} alt="product" />
          </Link>

          <div className="good__type__price">
            <h5 className="good__type">WALL SHELF</h5>
            <p className="good__price"> &#x20a6;73,000</p>
          </div>
        </div>

        <div className="good">
          <Link to="/">
            <img src={img6} alt="product" />
          </Link>

          <div className="good__type__price">
            <h5 className="good__type">TOILET SEAT</h5>
            <p className="good__price"> &#x20a6;55,000</p>
          </div>
        </div>
      </Slider>
    );
  }
}
