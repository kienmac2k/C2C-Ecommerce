import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { product } from "../../data/home";
import SectionSlide from "../../components/Slideshows/HomeNinthSectionSlide";

const HomepageNinthSection = () => (
  <>
    <SectionWrapper>
      {product.map((item, index) => (
        <article key={index}>
          <div>
            <SectionSlide banner1={item.img1} banner2={item.img2} />
          </div>
          <Description className="d-flex justify-content-between align-items-center">
            <div>
              <h5>{item.statement1}</h5>
              <p>
                {item.statement2 && item.statement2}
                <strong>{item.percentageoff && item.percentageoff}</strong>
              </p>
              <h5>{item.enddate} </h5>
            </div>
            <ProductLink className="align-self-end" to="/clearance">
              {item.linktext}
            </ProductLink>
          </Description>
        </article>
      ))}
    </SectionWrapper>
  </>
);

const SectionWrapper = styled.section`
  width: 85vw;
  margin: 7rem auto;
  display: grid;
  grid-template-columns: 48% 48%;
  grid-gap: 1.5rem;
`;

export const ProductLink = styled(Link)`
  font-size: 1.4rem;
  border: 2px solid #2f669a;
  padding: 3px 0;
  text-align: center;
  font-family: "Open Sans", sans-serif;
  border-radius: 50px;
  min-width: 110px;
  color: #2f669a !important;
  &:hover {
    text-decoration: none;
    color: #2f669a;
  }
`;

const Description = styled.div`
  background: #f7f7f7;
  padding: 3rem 12rem 3rem 2rem;

  h5 {
    font-size: 1.35rem;
    font-weight: bold;
    font-family: "Open Sans", sans-serif;
    line-height: 1.5;
    margin-bottom: 0;
  }

  p {
    font-size: 1.4rem;
    font-family: "Open Sans", sans-serif;

    & strong {
      color: red;
    }
  }
`;

export default HomepageNinthSection;
