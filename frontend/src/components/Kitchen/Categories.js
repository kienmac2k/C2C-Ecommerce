import React, { Component } from "react";
import homegoods from "../../data/goods";
import { ProductSectionWrapper } from "../../components/Globals/ProductSectionWrapper";
import { KitchenFilter } from "../../pages/kitchen";
import ProductList from "../../components/Kitchen/ProductList";
import FadeIn from "react-fade-in";
import { Helmet } from "react-helmet";

class Categories extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    const category = this.props.match.params.category;
    const categories = homegoods.items.filter(
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
            <KitchenFilter />
            <ProductList kitchenequipments={categories} />
          </ProductSectionWrapper>
        </FadeIn>
      </>
    );
  }
}

export default Categories;
