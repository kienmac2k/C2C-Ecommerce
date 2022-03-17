import React from "react";
import styled from "styled-components";

export const ProductBanner = ({ banner1, children }) => (
  <article className="banner1">
    <img src={banner1} alt="banner" />
    {children}
  </article>
);

export const ProductBanner2 = ({ banner2, children }) => (
  <article className="banner2">
    <div>
      <img src={banner2} alt="banner" />
    </div>
    {children}
  </article>
);

export const ProductBannerWrapper = styled.section`
  width: 90vw;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 1rem;
  margin-top: 1.5rem;
  margin-bottom: 11rem;

  .banner1,
  .banner2 {
    position: relative;
  }

  .product-description {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding-left: 5rem;

    h6 {
      color: red;
      font-size: 1.4rem;
      font-weight: bold;
      margin-bottom: 5px;
    }

    h5 {
      font-weight: 400;
      font-size: 3rem;
      margin-bottom: 0rem;
    }

    p {
      font-weight: bold;
      color: red;
      font-size: 1.7rem;
    }
  }

  .product-description-2 {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    padding-right: 5rem;

    h5 {
      font-size: 2.5rem;
      margin-bottom: 0rem;
      margin-bottom: 5px;
      font-weight: 400;
    }

    h6 {
      font-weight: 400;
      font-size: 2.5rem;
      margin-bottom: 0rem;
      text-align: right;
      line-height: 1;
      margin-bottom: 10px;
    }

    p {
      font-weight: bold;
      color: #000;
      font-size: 1.7rem;
      margin-bottom: 0rem !important;
      line-height: 1;
      color: red;
    }
  }

  .home-product-description {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-end;
    padding-top: 3rem;
    padding-right: 5rem;

    h5 {
      font-weight: bold;
      font-size: 3rem;
      margin-bottom: 0rem;
      color: #a1a197;
    }
  }

  .text {
    background: #fff;
    position: absolute;
    z-index: 10000;
    bottom: -50px;
    width: 90%;
    padding: 2rem 4rem;
    left: 5%;
  }

  img {
    width: 100%;
  }
`;

export const ClearanceProductWrapper = styled(ProductBannerWrapper)`
  width: 90vw;
  margin: 0 auto;
  display: flex;
  margin-top: 1.5rem;
  margin-bottom: 3rem;
`;
