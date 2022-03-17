import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import FadeIn from "react-fade-in";
import LivebidProductList from "../components/Livebid/ProductList";
import ProductPagination from "../components/Pagination";
import LivebidSlide from "../components/Slideshows/LivebidSlides";
import banner1 from "../assets/img/livebids/livebid1.png";
import banner2 from "../assets/img/livebids/livebid2.png";
import styled from "styled-components";

export const Banner = ({ banner1, banner2 }) => (
  <ProductBanner>
    <LivebidSlide banner1={banner1} banner2={banner2} />
  </ProductBanner>
);

const Livebids = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <FadeIn transitionDuration="600">
        <Helmet>
          <title>livebids</title>
        </Helmet>
        <Banner banner1={banner1} banner2={banner2} />
        <section>
          <LivebidProductList />
        </section>
        <ProductPagination />
      </FadeIn>
    </>
  );
};

export const ProductBanner = styled.section`
  width: 80vw;
  margin: 2rem auto 6rem auto;
`;

export default Livebids;
