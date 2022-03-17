import React from "react";
import billboardlogo from "../../assets/img/33.svg";
import BillboardSlide from "../../components/Slideshows/BillboardSlide";
import GroceriesSlide from "../../components/Slideshows/GroceriesSlides";

import { Link } from "react-router-dom";
import styled from "styled-components";

const HomepageSixthSection = () => (
  <div id="homepageSixthSection">
    <section>
      <div className="billboard_image">
        <Link to="/">
          <img src={billboardlogo} alt="billboard" />
        </Link>
        <p>Billboard</p>
      </div>
      <div className="line"></div>
      <article>
        <BillboardSlide />
      </article>
    </section>

    <article className="d-flex flex-column align-items-center">
      <GroceriesSlide />

      <Description className="d-flex flex-column justify-content-center">
        <div>
          <h5>We can deliver right to you in 2 hours</h5>
          <p>
            Our groceries shopping experience is <br /> designed just to suit
            your comfort
          </p>
        </div>
        <ProductLink
          href="https://groceries.ecscorppoc.com"
          className="align-self-end"
        >
          Groceries
        </ProductLink>
      </Description>
    </article>
  </div>
);

export const ProductLink = styled.a`
  font-size: 1.4rem;
  border: 2px solid #2f669a;
  padding: 3px 1.5rem;
  font-family: "Open Sans", sans-serif;
  border-radius: 50px;
  min-width: 110px;
  text-align: center;
  color: #2f669a !important;

  &:hover {
    text-decoration: none;
    color: #2f669a;
  }
`;

const Description = styled.div`
  padding: 0 2rem;
  background: #f7f7f7;
  flex: 1;
  width: 98.9%;
  position: relative;
  top: -2px;

  h5 {
    font-size: 1.35rem;
    font-weight: 600;
    margin-bottom: 0;
  }

  p {
    font-size: 1.3rem;
  }
`;

export default HomepageSixthSection;
