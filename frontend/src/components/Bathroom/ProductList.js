import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Product from "./Product";
import Spinner from "../Globals/Spinner/Spinner";
import { useSelector } from "react-redux";

const Wrapper = styled.section`
  width: 70%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(21rem, 1fr));
  grid-template-rows: 318px;
  grid-auto-rows: 318px;
  row-gap: 5rem;
  margin-top: 5rem;

  @media (max-width: 576px) {
    width: 65vw;
  }

  .buy__now__link {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    border: 1px solid #91d8f7;
    text-decoration: none;
    color: #333;
    text-decoration: none;
    color: #333;
    padding: 0.8rem 0;
    font-size: 1.2rem;
    font-weight: 600;

    &:hover {
      text-decoration: none;
      color: #333;
    }

    span {
      display: inline-block;
      margin-left: 5px;
      font-weight: bold;
      color: #000;
    }

    .cart {
      fill: #000;

      font-size: 20px;
    }
  }
  .add__remove__section {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin-bottom: 2px;

    p {
      border: 1px solid #ddd;

      padding: 0.2rem 2rem;
    }

    p:last-child {
      display: flex;
      justify-content: space-between;
      font-size: 1.5rem;
      font-weight: bold;
    }
  }
`;

const ProductList = () => {
  const productList = useSelector((state) => state.product.products);
  const bathroomproducts = productList.filter(
    (product) => product.category.replace(/\s+/g, "") === "bathroom"
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      {productList.length === 0 ? (
        <Spinner />
      ) : (
        <Wrapper>
          {bathroomproducts.map((product) => {
            return <Product product={product} key={product.id} />;
          })}
        </Wrapper>
      )}
    </>
  );
};
export default ProductList;
