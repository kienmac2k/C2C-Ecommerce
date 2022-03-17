import React, { useEffect, useState } from "react";
import { ProductSectionWrapper } from "../../components/Globals/ProductSectionWrapper";
import Filter from "../../components/Livebid/Filter";
import ProductList from "../../components/CorporateGifts/ProductList";
import FadeIn from "react-fade-in";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Categories = () => {
  const { category, subcategory } = useParams();
  const productList = useSelector((state) => state.product.products);
  const theproducts = productList.filter(
    (product) =>
      product.category.replace(/\s+/g, "").toLowerCase() ===
      category.toLowerCase()
  );

  const categories = theproducts.filter(
    (product) =>
      product.subcategory.replace(/\s+/g, "").toLowerCase() ===
      subcategory.toLowerCase()
  );
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <FadeIn transitionDuration="600">
        <Helmet>
          <title>{`${category}/${subcategory.toLowerCase()}`}</title>
        </Helmet>

        <ProductSectionWrapper>
          <Filter />
          <ProductList products={categories} />
        </ProductSectionWrapper>
      </FadeIn>
    </>
  );
};

export default Categories;
