import React, { Component } from "react";
import lightingproducts from "../../data/lighting";
import { ProductSectionWrapper } from "../../components/Globals/ProductSectionWrapper";
import { LightingFilter } from "../../pages/lighting";
import ProductList from "../../components/Lighting/ProductList";
import FadeIn from "react-fade-in";
import { Helmet } from "react-helmet";

class Categories extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    const category = this.props.match.params.category;
    const categories = lightingproducts.filter(
      (product) =>
        product.category.replace(/\s+/g, "").toLowerCase() ===
        category.toLowerCase()
    );

    return (
      <>
        <FadeIn transitionDuration="600">
          <Helmet>
            <title>{category}</title>
          </Helmet>
          <ProductSectionWrapper>
            <LightingFilter />
            <ProductList lightingproducts={categories} />
          </ProductSectionWrapper>
        </FadeIn>
      </>
    );
  }
}

export default Categories;
