import React, { useEffect, useState } from "react";
import Product from "./Product";
import styled from "styled-components";
import { useSelector } from "react-redux";
import Spinner from "../Globals/Spinner/Spinner";

const ProductList = () => {
  const productList = useSelector((state) => state.product.products);

  const livebidproducts = productList?.filter(
    (product) => product.category.replace(/\s+/g, "") === "livebid"
  );
  return (
    <>
      {productList?.length === 0 ? (
        <Spinner />
      ) : (
        <Wrapper>
          {livebidproducts?.map((product, index) => {
            return <Product product={product} key={index} />;
          })}
        </Wrapper>
      )}
    </>
  );
};

export const Wrapper = styled.section`
  width: 77vw;
  margin: 5rem auto 5rem auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
  grid-template-rows: 318px;
  grid-auto-rows: 318px;
  row-gap: 5rem;

  @media (max-width: 576px) {
    width: 65vw;
  }
`;
export default ProductList;
