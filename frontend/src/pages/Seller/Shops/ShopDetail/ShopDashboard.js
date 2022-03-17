import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const ShopNav = ({ shopId }) => {
  return (
    <NavWrapper className="dashboard__navigation">
      <NavLink activeClassName="activeClass" to={`/seller/shops/${shopId}`}>
        Dashboard
      </NavLink>
      <NavLink
        activeClassName="activeClass"
        to={`/seller/shops/${shopId}/products`}
      >
        Products
      </NavLink>
      <NavLink
        activeClassName="activeClass"
        to={`/seller/shops/${shopId}/orders`}
      >
        Orders
      </NavLink>

      <NavLink
        activeClassName="activeClass"
        to={`/seller/shops/${shopId}/settings`}
      >
        Settings
      </NavLink>
    </NavWrapper>
  );
};

const NavWrapper = styled.nav`
  display: flex;
  justify-content: center;
  background: #f1f5f8;
  position: relative;
  padding: 2rem 0;
  top: 5rem;

  a {
    color: #000;
    display: inline-block;
    padding: 0.6rem 4rem;
    font-size: 1.5rem;
    border-radius: 50px;
    border: 1px solid #000;
    text-decoration: none;
    font-family: "Open Sans" sans-serif;
    font-weight: 600;

    &:not(:last-child) {
      margin-right: 2rem;
    }
  }
`;

export default ShopNav;
