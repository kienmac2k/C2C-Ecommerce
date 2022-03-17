import React, { useEffect, useState } from "react";
import Product from "./Product";
import styled from "styled-components";
import { connect } from "react-redux";
import { useSelector } from "react-redux";
import Spinner from "../Globals/Spinner/Spinner";

const SuperDealsProductList = () => {
  const productList = useSelector((state) => state.product.products);

  const clearanceproducts = productList.filter(
    (product) => product.category.replace(/\s+/g, "") === "superdeals"
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
          {clearanceproducts.map((product, index) => {
            return <Product product={product} key={index} />;
          })}
        </Wrapper>
      )}
    </>
  );
};

export const Wrapper = styled.section`
  width: 70%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-template-rows: 318px;
  grid-auto-rows: 318px;
  row-gap: 5rem;
  margin-top: 5rem;
  margin-bottom: 5rem;
  column-gap: 2rem;
`;
export default SuperDealsProductList;
