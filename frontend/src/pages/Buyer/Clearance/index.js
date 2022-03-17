import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import FadeIn from "react-fade-in";
import ClearanceProductList from "../../../components/Clearance/ProductList";
import firstbanner from "../../../assets/img/clearance/banner1.png";
import secondbanner from "../../../assets/img/clearance/banner2.png";
import { rating } from "../../../data/productscategoty";
import productcategory from "../../../data/productscategoty";
import { ProductSectionWrapper } from "../../../components/Globals/ProductSectionWrapper";
import ProductPagination from "../../../components/Pagination";
import { ShopNowLink } from "../../../components/Globals/Styled";
import styled from "styled-components";

import {
  ProductBanner,
  ProductBanner2,
  ClearanceProductWrapper,
} from "../../../components/Globals/ProductBanner";

const ClearanceFilter = () => {
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

const Clearance = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <FadeIn transitionDuration="600">
        <Helmet>
          <title>clearance</title>
        </Helmet>

        <ClearanceProductWrapper>
          <ProductBanner className="clearancebanner" banner1={firstbanner}>
            <div className="clearancebanner-text">
              <h5>Rush Hour</h5>
              <h6>39% Off</h6>
              <p>Front Loader Washing Machine</p>
              <BuyNow to="#!">BUY NOW</BuyNow>
            </div>
          </ProductBanner>
          <ProductBanner2
            style={{ position: "relative" }}
            className="banner2"
            banner2={secondbanner}
          >
            <div
              style={{
                position: "absolute",
                top: "0",
                left: "0",
                bottom: "0",
                right: "0",
                paddingLeft: "4rem",
                paddingBottom: "2rem",
              }}
              className="buynowlink d-flex align-items-end"
            >
              <BuyNow>BUY NOW</BuyNow>
            </div>
          </ProductBanner2>
        </ClearanceProductWrapper>

        <ProductSectionWrapper>
          <ClearanceFilter />
          <ClearanceProductList />
        </ProductSectionWrapper>
        <ProductPagination />
      </FadeIn>
    </>
  );
};

const BuyNow = styled(ShopNowLink)`
  padding: 7px 29px;
  margin-top: 1rem;
`;

export default Clearance;
