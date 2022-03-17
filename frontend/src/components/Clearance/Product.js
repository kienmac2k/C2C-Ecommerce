import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import price_tag_img from "../../assets/img/price-tag.png";
import LazyLoadedImage from "../Lazyload";

const ClearanceProduct = ({ product }) => {
  return (
    <ProductWrapper>
      <div className="price-box">
        <h5>{product.type}</h5>
        <div className="price_tag">
          UPTO <br /> 70% <br /> off
        </div>
      </div>
      <div>
        <Link style={{ width: "180px", marginBottom: "3rem" }} to="/">
          <LazyLoadedImage className="product-img" image={product.img} />
        </Link>
      </div>
      <div>
        <h6>RRR &#8358;{product.price}</h6>
      </div>

      <div className="add__remove__buy__section">
        <Link to="/clearance">SHOP NOW</Link>
      </div>
    </ProductWrapper>
  );
};

ClearanceProduct.propTypes = {
  product: PropTypes.object.isRequired,
};

export const ProductWrapper = styled.article`
  .price-box {
    border: 1px solid #d6d6d6;
    padding-top: 1rem;
    padding-bottom: 1rem;
    padding-left: 1rem;
    padding-right: 1rem;
    text-align: center;
    text-transform: uppercase;
    color: #a1a1a1;
    min-height: 5rem;
    margin-bottom: 5rem;
    position: relative;

    .price_tag {
      position: absolute;
      background-image: url(${price_tag_img});
      background-repeat: no-repeat;
      background-size: 100% 60%;
      height: 106px;
      font-size: 10px;
      color: #fff;
      text-align: center;
      position: absolute;
      bottom: -106px;
      right: 10px;
      padding: 5px 5px 5px 5px;
      z-index: 4;
    }

    h5 {
      font-size: 1.2rem;
    }
  }

  text-align: center;
  display: flex;
  flex-direction: column;

  & .product {
    width: 100%;
  }

  h6 {
    font-size: 1.4rem;
    padding-bottom: 2rem;
  }

  .add__remove__buy__section {
    margin-top: auto;

    a {
      color: #d03900;
      border: 1px dashed #c7c7c7;
      font-weight: 600;
      display: inline-block;
      padding: 4px 12px;
      font-size: 14px;
      line-height: 20px;
      text-transform: uppercase;
      text-align: center;
      text-shadow: 0 1px 1px rgba(255, 255, 255, 0.75);
      vertical-align: middle;
      background-image: linear-gradient(to bottom, #fff, #e6e6e6);
      background-repeat: repeat-x;
      text-decoration: none;
    }
  }
`;

export default ClearanceProduct;
