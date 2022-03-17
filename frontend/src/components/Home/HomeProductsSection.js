import React from "react";
import { ShopNowLink } from "../../components/HomeGoods/HomeGoodsList";
import homepageproducts from "../../data/homepageproducts";
import styled from "styled-components";
import ProductSlide from "../../components/Slideshows/HomeProductSlides";

const HomeProductsSection = () => {
  return (
    <SectionWrapper>
      <article className="items__container">
        {homepageproducts.map((item, index) => (
          <div key={index} className="item">
            <div
              style={{ width: "100%" }}
              className="d-flex align-items-center justify-content-around"
            >
              <div>
                <h5>{item.type}</h5>
                <ShopLink to={item.path}>Shop Now</ShopLink>
              </div>
              <img src={item.img} alt="item" />
            </div>
          </div>
        ))}
      </article>

      <div className="verticalslide">
        <ProductSlide />
        <div className="slide-description-text d-flex flex-column justify-content-between">
          <p>
            Because we care about our customer, we give you exclusive deals{" "}
            <br /> you cannot find anywhere, Look through our variety of options
          </p>
          <ShopNowLink
            to="/homegoods/livingroom-equipments"
            className="align-self-end"
          >
            Shop Now
          </ShopNowLink>
        </div>
      </div>
    </SectionWrapper>
  );
};

export const SectionWrapper = styled.section`
  width: 85vw;
  margin: 0 auto 7rem auto;
  display: grid;
  grid-template-columns: 46% 53%;
  gap: 1.5rem;

  .items__container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 1rem;

    .item {
      background-color: #f7f7f7;
      color: #333;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      align-items: flex-start;
      padding-left: 1rem;
    }
  }

  h5 {
    font-size: 1.3rem;
    font-family: pioneer10;
    margin-bottom: 0;
  }

  .verticalslide {
    position: relative;

    .slide-description-text {
      background: #fff;
      font-size: 1.45rem;
      width: 87%;
      line-height: 1.3;
      padding: 2rem 3rem 1rem 3rem;
      height: 105px;
      position: absolute;
      bottom: -2rem;
      left: 4rem;

      p {
        font-size: 1.3rem;
        font-family: "Open Sans", sans-serif;
      }
    }
  }
`;

const ShopLink = styled(ShopNowLink)`
  font-size: 1.25rem;
  color: #2f669a !important;
  border: 2px solid #2f669a;
  padding: 2px 22px;
  position: relative;
  top: 4rem;
  min-width: 85px;
`;

export default HomeProductsSection;
