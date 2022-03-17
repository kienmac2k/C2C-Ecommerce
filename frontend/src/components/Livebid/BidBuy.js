import React, { Component } from "react";
import livebidproducts from "../../data/livebids";
import { LivebidProductSection } from "../../components/Globals/ProductSectionWrapper";
import Filter from "../../components/Livebid/Filter";
import FadeIn from "react-fade-in";
import { Helmet } from "react-helmet";
import BidingProduct from "./BidingProduct";

class BidBuy extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    const category = this.props.match.params.category;
    const categories = livebidproducts.filter(
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

          <LivebidProductSection>
            <Filter />
            <section>
              {categories.map((product) => (
                <BidingProduct key={product.id} product={product} />
              ))}
            </section>
            <article style={{ backgroundColor: "#ddd" }}></article>
          </LivebidProductSection>
        </FadeIn>
      </>
    );
  }
}

export default BidBuy;
