import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import LazyLoadedImage from "../Lazyload";
import styled from "styled-components";

const LivebidProduct = ({ product }) => {
  return (
    <ProductWrapper>
      <div>
        <Link to="/">
          <LazyLoadedImage image={product.img} />
        </Link>
      </div>
      <div>
        <h5>{product.name}</h5>
        <h6>RRR &#8358;{product.price}</h6>
      </div>

      <div className="add__remove__buy__section">
        <div>
          <p>&#8358;{product.price}</p>
          <Link to={`/bid/${product.category.replace(/\s+/g, "")}`}>
            Buy Now
          </Link>
          <Link to={`/bid/${product.category.replace(/\s+/g, "")}`}>
            Bid Now
          </Link>
        </div>

        <div>
          <p> &#8358;{product.price}</p>
          <p>Current Bid</p>
          <Link to="/livebids">Bid Closed</Link>
        </div>
      </div>
    </ProductWrapper>
  );
};
LivebidProduct.propTypes = {
  product: PropTypes.object.isRequired,
};

const ProductWrapper = styled.article`
  text-align: center;
  display: flex;
  flex-direction: column;

  & .product {
    width: 100%;
  }

  &:not(:nth-of-type(4n)) {
    border-right: 1px dashed #f1f1f1;
    margin-right: 1rem;
    padding-right: 1rem;

    @media (max-width: 992px) {
      border: none;
    }
  }
  h5 {
    font-size: 1.5rem;
    padding: 1rem 0;
  }

  h6 {
    font-size: 1.4rem;
    padding-bottom: 2rem;
  }

  .add__remove__buy__section {
    margin-top: auto;

    & > div {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      &:not(:last-child) {
        margin-bottom: 2px;
      }

      p:first-child {
        border: 1px dashed #999;
        padding: 0.5rem;
        font-size: 1.1rem;
        font-weight: bold;
      }

      a {
        color: #000;
        text-decoration: none;
        padding: 0.5rem;
        font-size: 1.1rem;
        font-weight: bold;
        border: none;
      }

      a:nth-child(2) {
        background-color: #91d8f7;
      }
      p:nth-child(2) {
        background-color: #91d8f7;
        font-size: 1.1rem;
        font-weight: bold;
        padding: 0.5rem;
      }

      a:nth-child(3) {
        background-color: #ffd220;
        color: #fff;
      }
    }
  }
`;

export default LivebidProduct;
