import { Link } from "react-router-dom";
import styled from "styled-components";

export const ShopNow = styled(Link)`
  font-size: 1.4rem;
  border: 1px solid #000;
  text-align: center;
  padding: 0.5rem 2.5rem;
  color: #000 !important;
  font-weight: 600;
  border-radius: 50px;
  text-decoration: none;
  display: inline-block;
  position: relative;
  top: 5rem;

  &:hover {
    text-decoration: none;
    color: #fff;
  }
`;

export const BuyNow = styled(ShopNow)`
  top: 2.5rem;
`;

export const ShopNowLink = styled(ShopNow)`
  position: static;
  border: 1px solid #000;
  padding: 1px 22px;
  font-size: 1.3rem;
  font-weight: 400;
`;

export const ServiceLink = styled.a`
  font-size: 1.4rem;
  border: 2px solid #2f669a;
  text-align: center;
  border-radius: 50px;
  padding: 4px 0;
  color: #2f669a;
  text-decoration: none;
  display: inline-block;
  min-width: 130px;
  font-family: "Open Sans", sans-serif;

  &:hover {
    text-decoration: none;
    color: #2f669a;
  }
`;
