import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import LazyLoadedImage from "../../components/Lazyload";

const IndexProducts = ({ product }) => {
  return (
    <figure>
      <article>
        <LazyLoadedImage image={product.img1} alt="premium product" />
        <ShopLink to="/homegoods">Shop Now</ShopLink>
      </article>

      <article>
        <div>
          <div>
            <h5>Premium Products</h5>
            <p>
              With over 80,000 discounted premium products <br /> you can find
              what is right for you. <br />
              Come enjoy the experience
            </p>
          </div>
          <div>
            <LazyLoadedImage image={product.img6} />
          </div>
        </div>

        <div>
          <div>
            <LazyLoadedImage image={product.img2} />
          </div>

          <div>
            <LazyLoadedImage image={product.img3} />
          </div>
          <div>
            <LazyLoadedImage image={product.img4} />
          </div>
          <div>
            <LazyLoadedImage image={product.img5} />
          </div>
        </div>
      </article>
    </figure>
  );
};

export const ShopLink = styled(Link)`
  font-size: 1.4rem;
  border: 2px solid #000;
  border-radius: 50px;
  text-align: center;
  padding: 4px 0;
  color: #000;
  text-decoration: none;
  display: inline-block;
  min-width: 130px;
  font-family: "Open Sans", sans-serif;

  &:hover {
    text-decoration: none;
    color: #2f669a;
  }

  &:hover {
    text-decoration: none;
    color: #333;
  }
`;

export default IndexProducts;
