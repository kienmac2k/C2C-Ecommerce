import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Product from "./Product";
import { useSelector } from "react-redux";
import Spinner from "../Globals/Spinner/Spinner";

const ProductList = () => {
  const productList = useSelector((state) => state.product.products);

  const lightingproducts = productList.filter(
    (product) => product.category.replace(/\s+/g, "") === "lighting"
  );
  return (
    <>
      {productList.length === 0 ? (
        <Spinner />
      ) : (
        <Wrapper>
          {lightingproducts.map((product) => {
            return <Product product={product} key={product.id} />;
          })}
        </Wrapper>
      )}
    </>
  );
};

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
    border: 1px solid rgb(245, 134, 52);
    text-decoration: none;
    color: rgb(245, 134, 52);
    text-decoration: none;
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
      color: rgb(245, 134, 52);
    }

    .cart {
      fill: rgb(245, 134, 52);

      font-size: 20px;
    }
  }
  .add__remove__section {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin-bottom: 2px;

    p {
      border: 1px solid rgb(245, 134, 52);
      padding: 0.2rem 2rem;
    }

    p:first-child {
      border-right: none;
    }

    p:last-child {
      display: flex;
      justify-content: space-between;
      font-size: 1.5rem;
      font-weight: bold;
      border-left: 1px solid rgb(245, 134, 52);
    }
  }
`;
export default ProductList;
