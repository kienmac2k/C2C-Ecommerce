import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import FadeIn from "react-fade-in";
import { rating } from "../../../data/productscategoty";
import firstbanner from "../../../assets/img/wholesale/wholesale2.png";
import secondbanner from "../../../assets/img/wholesale/wholesale1.png";
import productcategory from "../../../data/productscategoty";
import WholesaleProductList from "../../../components/Wholesale/ProductList";
import { ProductSectionWrapper } from "../../../components/Globals/ProductSectionWrapper";
import ProductPagination from "../../../components/Pagination";
import { ShopNowLink } from "../../../components/Globals/Styled";
import styled from "styled-components";

import {
  ProductBanner,
  ProductBanner2,
  ClearanceProductWrapper,
} from "../../../components/Globals/ProductBanner";

const WholeSaleFilter = () => {
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

const WholeSale = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <FadeIn transitionDuration="600">
        <Helmet>
          <title>WholeSale products</title>
        </Helmet>

        <ClearanceProductWrapper>
          <ProductBanner style={{ position: "relative" }} banner1={firstbanner}>
            <div
              style={{
                position: "absolute",
                top: "0",
                left: "0",
                bottom: "0",
                right: "0",
                paddingRight: "2rem",
                paddingBottom: "2rem",
              }}
              className="buynowlink d-flex align-items-end justify-content-end"
            >
              <BuyNow to="#!"> SHOP NOW</BuyNow>
            </div>
          </ProductBanner>
          <ProductBanner2
            className="wholesalebanner banner2"
            banner2={secondbanner}
          >
            <div className="wholesalebanner-text">
              <div className="d-flex flex-column align-items-start">
                <h5>
                  Wholesale Deals <br /> for Grabs{" "}
                </h5>
                <h6>50% OFF on Sewing Machine</h6>
                <BuyNow2 to="#!" className="align-self-start">
                  SHOP NOW
                </BuyNow2>
              </div>
            </div>
          </ProductBanner2>
        </ClearanceProductWrapper>
        <ProductSectionWrapper className="wholesale">
          <WholeSaleFilter />
          <WholesaleProductList />
        </ProductSectionWrapper>
        <ProductPagination />
      </FadeIn>
    </>
  );
};

const BuyNow = styled(ShopNowLink)`
  padding: 5px 22px;
  margin-top: 1rem;
  color: #224873 !important;
  border: 1px solid #224873 !important;
`;

const BuyNow2 = styled(ShopNowLink)`
  padding: 5px 22px;
  margin-top: 1rem;
  color: #fff !important;
  border: 1px solid #fff !important;
`;

export default WholeSale;
