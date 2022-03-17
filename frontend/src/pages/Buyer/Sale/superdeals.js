import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import FadeIn from "react-fade-in";
import ProductList from "../../../components/SuperDeals/ProductList";
import { rating } from "../../../data/productscategoty";
import productcategory from "../../../data/productscategoty";
import { ProductSectionWrapper } from "../../../components/Globals/ProductSectionWrapper";
import ProductPagination from "../../../components/Pagination";
import SectionSlide1 from "../../../components/Slideshows/Superdealslide2";
import SectionSlide2 from "../../../components/Slideshows/Superdealslide";
import firstbanner from "../../../assets/img/superdeals/new/superdeal1.png";
import secondbanner from "../../../assets/img/superdeals/new/superdeal2.png";
import thirdbanner from "../../../assets/img/superdeals/new/superdeal3.png";
import fourthbanner from "../../../assets/img/superdeals/new/superdeal4.png";
import styled from "styled-components";

const DealsFilter = () => {
  return (
    <article className="filter-section">
      <form>
        <div
          style={{
            padding: "3rem",
          }}
        >
          <h5>Product Category</h5>
          <div>
            {productcategory.wholesalelivesuperdeals.map((item, index) => (
              <div key={index} className="d-flex align-items-center mb-3">
                <input type="checkbox" name={item.text} id={item.text} />
                <label htmlFor={item.text}>{item.text}</label>
              </div>
            ))}
          </div>
        </div>

        <article
          style={{
            padding: "3rem",
          }}
        >
          <div className="minmax-filter">
            <h5>Sort by Price</h5>
            <div className="d-flex">
              <input
                type="text"
                name="minimum"
                id="minimum"
                placeholder="Minimum"
              />
              <input
                type="text"
                name="maximum"
                id="maximum"
                placeholder="Maximum"
              />
            </div>
          </div>

          <div className="filter">
            <h5>Average Rating</h5>
            <div>
              {rating.map((item, index) => (
                <div key={index} className="d-flex align-items-center mb-3">
                  <input type="checkbox" name={item.text} id={item.text} />
                  <label htmlFor={item.text}>
                    <img src={item.rating} alt="rating" /> <span>& above</span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </article>
      </form>
    </article>
  );
};

const SuperDeals = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <FadeIn transitionDuration="600">
        <Helmet>
          <title>superdeals</title>
        </Helmet>

        <SlideWrapper>
          <SectionSlide1 banner1={thirdbanner} banner2={fourthbanner} />
          <SectionSlide2 banner1={firstbanner} banner2={secondbanner} />
        </SlideWrapper>

        <ProductSectionWrapper>
          <DealsFilter />
          <ProductList />
        </ProductSectionWrapper>
        <ProductPagination />
      </FadeIn>
    </>
  );
};

const SlideWrapper = styled.section`
  width: 100%;
  margin: 2rem auto;
  display: grid;
  column-gap: 1rem;
  grid-template-columns: 30% 56.2%;
  justify-content: center;
`;

export default SuperDeals;
