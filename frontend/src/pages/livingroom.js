import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import FadeIn from "react-fade-in";
import ProductList from "../components/Livingroom/ProductList";
import firstbanner from "../assets/img/livingroom/14.png";
import secondbanner from "../assets/img/livingroom/15.png";
import { HomeGoodsNav } from "../components/HomeGoods/HomeGoodsList";
import { rating } from "../data/productscategoty";
import productcategory from "../data/productscategoty";
import { ProductSectionWrapper } from "../components/Globals/ProductSectionWrapper";
import ProductPagination from "../components/Pagination";
import { ShopNowLink } from "../components/Globals/Styled";

import {
  ProductBanner,
  ProductBanner2,
  ProductBannerWrapper,
} from "../components/Globals/ProductBanner";

const LivingRoomFilter = () => {
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
            {productcategory.homegoods.livingroom.map((item, index) => (
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

const DinningEquipments = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <FadeIn transitionDuration="600">
        <Helmet>
          <title>dinningroom equipments</title>
        </Helmet>
        <HomeGoodsNav />

        <ProductBannerWrapper>
          <ProductBanner banner1={firstbanner}>
            <div className="home-product-description">
              <h5
                style={{
                  fontSize: "3rem",
                  position: "relative",
                  top: "6rem",
                  right: "3rem",
                  color: "#fff",
                }}
              >
                37% Off <br /> Single Sofas
              </h5>
            </div>
            <div className="text d-flex flex-column">
              <p>
                Because we care about our customer, we give you exclusive deals
                you cannot find anywhere, Look through our variety of options
              </p>
              <ShopNowLink className="align-self-end" to="/medical-equipments">
                Shop Now
              </ShopNowLink>
            </div>
          </ProductBanner>
          <ProductBanner2 banner2={secondbanner}>
            <div className="home-product-description">
              <h5
                style={{
                  fontSize: "3rem",
                  position: "relative",
                  top: "-2rem",
                  right: "19rem",
                  color: "#fff",
                }}
              >
                39% Off Sofas
              </h5>
            </div>
            <div className="text d-flex flex-column">
              <p>
                Because we care about our customer, we give you exclusive deals
                you cannot find anywhere, Look through our variety of options
              </p>
              <ShopNowLink className="align-self-end" to="/medical-equipments">
                Shop Now
              </ShopNowLink>
            </div>
          </ProductBanner2>
        </ProductBannerWrapper>

        <ProductSectionWrapper>
          <LivingRoomFilter />
          <ProductList />
        </ProductSectionWrapper>
        <ProductPagination />
      </FadeIn>
    </>
  );
};

export default DinningEquipments;
