import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import FadeIn from "react-fade-in";
import goods from "../data/goods";
import HomeGoodsList from "../components/HomeGoods/HomeGoodsList";

const HomeGoods = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <FadeIn transitionDuration="600">
        <Helmet>
          <title>Home goods</title>
        </Helmet>
        <section>
          <HomeGoodsList goods={goods} />
        </section>
      </FadeIn>
    </>
  );
};

export default HomeGoods;
