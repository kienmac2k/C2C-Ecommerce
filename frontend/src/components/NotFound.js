import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NotFound = () => {
  return (
    <Container
      className="d-flex flex-column justify-content-center align-items-center text-center"
      style={{ height: "100vh", backgroundColor: "#1d9ed8" }}
    >
      <h1 className="mb-4" style={{ fontSize: "4rem" }}>
        OOPS!!! WHAT YOU ARE <br /> LOOKINGFOR DOES NOT EXIST
      </h1>
      <Link to="/">BACK TO HOME</Link>
    </Container>
  );
};

const Container = styled.section`
  h1 {
    color: #fff;
  }
  a {
    text-decoration: none;
    color: #000;
    font-size: 2rem;

    &:hover {
      text-decoration: none;
      color: #000;
    }
  }
`;

export default NotFound;
