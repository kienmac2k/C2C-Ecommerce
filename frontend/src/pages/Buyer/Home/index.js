import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import FadeIn from "react-fade-in";
import styled from "styled-components";
import { Link } from "react-router-dom";

import HomeTwelthSectionSlide from "../../../components/Slideshows/HomeTwelthSectionSlide";

import premiumproducts from "../../../data/premiumproducts";
import { services1, services2 } from "../../../data/services";
import { services } from "../../../data/services2";
import { services3 } from "../../../data/services3";
import { benefits } from "../../../data/benefits";

import MonkheyServices from "../../../components/Home/MonkheyServices";
import MonkheyServices2 from "../../../components/Home/MonkheyServices-2";
import MonkheyBenefits from "../../../components/Home/MonkheyBenefits";

import HomeProduct from "../../../components/Home/HomeProducts";
import HomeFirstSection from "../../../components/Home/HomeFirstSection";
import HomeSecondSection from "../../../components/Home/HomeSecondSection";
import HomeSixthSection from "../../../components/Home/HomeSixthSection";
import HomeNinthSection from "../../../components/Home/HomeNinthSection";
import HomeFourteenthSection from "../../../components/Home/HomeFourteenthSection";
import HomeProductsSection from "../../../components/Home/HomeProductsSection";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <FadeIn transitionDuration="600">
        <Helmet>
          <title>Monkhey :: Home</title>
        </Helmet>

        <HomeFirstSection />
        <HomeSecondSection />

        <section className="indexThirdSection">
          {premiumproducts.map((product, index) => (
            <HomeProduct key={index} product={product} />
          ))}
        </section>

        <HomeProductsSection />

        <ServicesWrapper className="indexFourthSection">
          {services1.map((service, index) => (
            <MonkheyServices key={index} service={service} />
          ))}
        </ServicesWrapper>

        <HomeSixthSection />

        <ServicesWrapper className="indexSixthSection">
          {services2.map((service, index) => (
            <MonkheyServices key={index} service={service} />
          ))}
        </ServicesWrapper>

        <section className="indexEightSection">
          <div>
            <h5>
              Easy and Convenient way to recharge your <br /> phone with Great
              Discount
            </h5>
            <p>Enjoy Your Discount</p>
          </div>
          <div className="align-self-end">
            <h6>powered by</h6>
            <img
              src={require("../../../assets/img/home/monkheypay_logo.png")}
              alt="monkheypay logo"
            />
          </div>

          <div>
            <img
              src={require("../../../assets/img/home/15.png")}
              alt="telecom providers"
            />
          </div>

          <div>
            <Link to="/">Recharge Now</Link>
          </div>
        </section>

        <HomeNinthSection />

        <div id="homepageEleventhSection">
          <article>
            {services3.map((service, index) => (
              <MonkheyServices2 service={service} key={index} />
            ))}
          </article>
          <article>
            {services.map((service, index) => (
              <MonkheyServices2 service={service} key={index} />
            ))}
          </article>
        </div>

        <section className="stripsection">
          <img src={require("../../../assets/img/48.png")} alt="strip" />
        </section>

        <div id="homepageTwelvethSection">
          <HomeTwelthSectionSlide />
        </div>
        <div id="homepagethirteenthSection">
          {benefits.map((benefit, index) => (
            <MonkheyBenefits benefit={benefit} key={index} />
          ))}
        </div>
        <HomeFourteenthSection />
      </FadeIn>
    </>
  );
};

export const ServicesWrapper = styled.section`
  width: 85vw;
  margin: 0 auto 7rem auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 340px;
  column-gap: 2rem;

  row-gap: 4rem;

  @media (max-width: 992px) {
    width: 70vw;
    grid-template-columns: 1fr;
    justify-items: center;
  }

  @media (max-width: 768px) {
    width: 50vw;
    grid-template-columns: 1fr;
    justify-items: center;
  }
  & .service {
    &__banner {
      img {
        width: 100%;
      }
    }
    &__description {
      height: 150px;
      display: flex;
      flex-direction: column;
      justify-content: space-between !important;
      align-items: flex-start;
      padding-left: 3rem;
      background: #f7f7f7;
      padding-bottom: 2rem;
      p {
        font-size: 1.3rem;
        padding-top: 1rem;
        font-family: "Open Sans", sans-serif;
      }

      a {
      }
    }
  }
`;

export default Home;
