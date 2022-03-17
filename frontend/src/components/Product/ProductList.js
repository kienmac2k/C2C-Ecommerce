import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Product from "./Product";
import Spinner from "../Globals/Spinner/Spinner";
import { Grid } from "@mui/material";
const ProductList = ({ productList }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {productList?.length === 0 ? (
        <Spinner />
      ) : (
        <Wrapper>
          <Grid container>
            {productList?.map((product, index) => {
              return (
                <Grid item md={3} sm={4} xs={6} key={index}>
                  <Product product={product} />
                </Grid>
              );
            })}
          </Grid>
        </Wrapper>
      )}
    </>
  );
};

export default ProductList;

const Wrapper = styled.section`
  width: 70%;

  margin-top: 5rem;

  @media (max-width: 576px) {
    width: 65vw;
  }

  .buy__now__link {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    border: 1px solid rgb(119, 150, 108);
    text-decoration: none;
    color: rgb(119, 150, 108);
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
      color: rgb(119, 150, 108);
    }

    .cart {
      fill: rgb(119, 150, 108);

      font-size: 20px;
    }
  }
  .add__remove__section {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin-bottom: 2px;

    p {
      border: 1px solid rgb(119, 150, 108);
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
      border-left: 1px solid rgb(119, 150, 108);
    }
  }
`;
