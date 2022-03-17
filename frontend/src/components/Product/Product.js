import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import LazyLoadedImage from "../Lazyload";
import styled from "styled-components";
import { TiShoppingCart } from "react-icons/ti";
import { IconButton, Typography } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { addItem } from "../../app/cart/slice";
import { useDispatch } from "react-redux";
const Product = ({ product }) => {
  const dispatch = useDispatch();
  const [productQuantity, setProductQuantity] = React.useState(1);
  const handlePushItem = () => {
    dispatch(addItem({ ...product, quantity: productQuantity }));
  };
  return (
    <ProductWrapper>
      <div>
        <Link
          style={{ width: "180px", marginBottom: "3rem" }}
          to={`/product/${product.id}`}
        >
          <LazyLoadedImage className="product-img" image={product?.coverImg} />
        </Link>
      </div>
      <div>
        <h5>{product.name}</h5>
        <h6>
          <span>RRR</span> <strong>&#8358;{product.price}</strong>
        </h6>
        <img
          src={require("../../assets/img/wholesale/74.png")}
          alt="wholesale"
        />
      </div>

      <div className="add__remove__buy__section">
        <div className="button__wrapper">
          <IconButton onClick={() => setProductQuantity((prev) => (prev += 1))}>
            <AddIcon />
          </IconButton>
          <Typography variant="body1" sx={{ flex: 2, textAlign: "center" }}>
            {productQuantity}
          </Typography>
          <IconButton
            onClick={() => {
              productQuantity > 1 && setProductQuantity((prev) => (prev -= 1));
            }}
          >
            <RemoveIcon />
          </IconButton>
        </div>

        <div className="buy__now__link" onClick={handlePushItem}>
          <TiShoppingCart className="cart" />
          <p>Add to cart</p>
        </div>
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
  .buy__now__link {
    cursor: pointer;
  }
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
  .button__wrapper {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #333;
    padding: 0 60px;
  }
  .add__remove__buy__section {
    margin-top: auto;

    span {
      cursor: pointer;
    }
  }
`;

export default Product;
