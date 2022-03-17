import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import icon from "../../assets/img/01.png";

const SearchNav = ({ title, dashboard }) => {
  return (
    <>
      <SearchWrapper>
        <article>
          <h1>{title}</h1>
          {dashboard && (
            <>
              <NavLink activeClassName="active-link" to="/settings">
                Setting
              </NavLink>
              <NavLink activeClassName="active-link" to="/messages">
                Messages
              </NavLink>
            </>
          )}
        </article>
        <article>
          <form>
            <input type="text" placeholder="Search here" />
          </form>
        </article>
      </SearchWrapper>
    </>
  );
};

export default SearchNav;

const SearchWrapper = styled.section`
  background-color: #cfddf1;
  display: flex;
  justify-content: space-between;
  @media (max-width: 576px) {
    flex-direction: column;
  }

  & h1 {
    color: #0c74c4;
    margin-right: 5rem;
    font-size: 2rem !important;
  }

  padding: 2rem 4rem;

  & article:first-child {
    display: flex;

    a {
      border: none;
      -webkit-text-decoration: none;
      text-decoration: none;
      text-align: center;
      display: inline-block;
      margin-bottom: 1rem;
      font-size: 1.5rem;
      padding: 0.8rem 3rem;
      font-family: "Open Sans", sans-serif;
      border-radius: 4px;
      background-color: #fff;
      color: #000;

      &:not(:last-child) {
        margin-right: 2rem;
      }
    }
  }

  & article:nth-child(2) {
    flex-basis: 30%;

    @media (max-width: 992px) {
      flex-basis: 20%;
    }

    & form {
      padding: 0;
      input {
        border: 2px solid #1d9ed8;
        padding: 1rem 20rem 1rem 2rem;
        border-radius: 5rem;
        background-image: url(${icon});
        background-repeat: no-repeat;
        background-position: calc(100% - 10px) center;
        &::placeholder {
          font-size: 1.4rem;
        }
      }
    }
  }
`;
