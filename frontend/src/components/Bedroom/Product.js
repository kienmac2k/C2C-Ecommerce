import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import LazyLoadedImage from "../Lazyload";
import styled from "styled-components";
import { TiShoppingCart } from "react-icons/ti";

const Product = ({ product }) => {
  return (
    <ProductWrapper>
      <div>
        <Link
          style={{ width: "180px", marginBottom: "3rem" }}
          to={`/homegoods/bedroom-equipments/product/${product.id}`}
        >
          <LazyLoadedImage className="product-img" image={product.img} />
        </Link>
      </div>
      <div>
        <h5>{product.type}</h5>
        <h6>
          <span>RRR</span> <strong>&#8358;{product.price}</strong>
        </h6>
        <img
          src={require("../../assets/img/wholesale/74.png")}
          alt="wholesale"
        />
      </div>

      <div className="add__remove__buy__section">
        <div className="add__remove__section">
          <p></p>
          <p>
            <span>-</span>
            <span>+</span>
          </p>
        </div>

        <Link to="/wholesale" className="buy__now__link">
          <TiShoppingCart className="cart" />
          <span>Buy Now</span>
        </Link>
      </div>
    </ProductWrapper>
  );
};
Product.propTypes = {
  product: PropTypes.object.isRequired,
};

const ProductWrapper = styled.article`
  display: flex;
  flex-direction: column;
  min-height: 324px;

  &:not(:nth-of-type(4n)) {
    border-right: 1px dashed #f1f1f1;

    margin-right: 0.5rem;
    padding-right: 0.5rem;

    @media (max-width: 992px) {
      border: none;
    }
  }

  h5 {
    font-size: 1.5rem;
  }

  h6 {
    font-size: 1.4rem;
    margin-bottom: 0.5rem;
    margin-top: 1rem;
  }

  .add__remove__buy__section {
    margin-top: auto;

    span {
      cursor: pointer;
    }
  }
`;

export default Product;
