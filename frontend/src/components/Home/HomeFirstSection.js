import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import HeroImagesSlide from "../../components/Slideshows/HeroImagesSlide";
import productbanner from "../../assets/img/table.png";

const IndexFirstSection = () => (
  <section className="indexFirstSection">
    <article className="product-banner">
      <img src={productbanner} alt="product banner" />
      <div className="banner-text">
        <h5>40% Off</h5>
        <ShopLink to="/homegoods">Shop Now</ShopLink>
      </div>
    </article>
    <article>
      <HeroImagesSlide />
    </article>
  </section>
);

export const ShopLink = styled(Link)`
  font-size: 1.4rem;
  border: 2px solid #fff;
  text-align: center;
  padding: 0.5rem 2.5rem;
  color: #fff !important;
  font-weight: 600;
  border-radius: 50px;
  text-decoration: none;

  &:hover {
    text-decoration: none;
    color: #fff;
  }
`;

export default IndexFirstSection;
