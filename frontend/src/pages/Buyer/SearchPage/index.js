import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import FadeIn from "react-fade-in";
import ProductList from "../../../components/Product/ProductList";
import styled from "styled-components";
import { ProductSectionWrapper } from "../../../components/Globals/ProductSectionWrapper";
import ProductPagination from "../../../components/Pagination";
import firstbanner from "../../../assets/img/officeequipments/banner.png";
import secondbanner from "../../../assets/img/officeequipments/banner2.png";
import { ShopNowLink } from "../../../components/Globals/Styled";
import { useLocation } from "react-router-dom";
import {
  ProductBanner,
  ProductBanner2,
  ProductBannerWrapper,
} from "../../../components/Globals/ProductBanner";
import publicApi from "../../../api/publicApi";
import slugify from "slugify";

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const SearchPage = () => {
  const [productList, setProductList] = React.useState([]);

  const query = useQuery();
  const search = query.get("name");
  React.useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await publicApi.searchProduct(slugify(search));
        setProductList(response.products);
      } catch (e) {
        console.log("Error when calling api", e);
      }
    };
    getProducts();
    window.scrollTo(0, 0);
  }, [search]);

  return (
    <>
      <FadeIn transitionDuration="600">
        <Helmet>
          <title>Result</title>
        </Helmet>

        <ProductBannerWrapper>
          <ProductBanner banner1={firstbanner}>
            <div className="product-description">
              <h6>Limited Offer</h6>
              <h5>HP Laptop</h5>
              <p>25% Off</p>
            </div>
            <div className="text d-flex flex-column">
              <p>
                Because we care about our customer, we give you exclusive deals
                you cannot find anywhere, Look through our variety of options
              </p>
              <ShopNowLink className="align-self-end" to="/office-equipments">
                Shop Now
              </ShopNowLink>
            </div>
          </ProductBanner>

          <ProductBanner2 banner2={secondbanner}>
            <div className="product-description-2">
              <h5>3 in 1</h5>
              <h6>
                Scanner Printer <br /> Photocopier
              </h6>
              <p>25% Off</p>
            </div>
            <div className="text d-flex flex-column">
              <p>
                Because we care about our customer, we give you exclusive deals
                you cannot find anywhere, Look through our variety of options
              </p>
              <ShopNowLink className="align-self-end" to="/office-equipments">
                Buy Now
              </ShopNowLink>
            </div>
          </ProductBanner2>
        </ProductBannerWrapper>

        <ProductSectionWrapper style={{ marginTop: "5rem" }}>
          <ProductList productList={productList} />
        </ProductSectionWrapper>
        <ProductPagination />
      </FadeIn>
    </>
  );
};

export const ProductListWrapper = styled.section`
  width: 74vw;
  margin: 2rem auto 0 auto;
  display: grid;
  grid-template-columns: 2fr 4fr;

  .sidebanner {
    position: relative;

    .sidebanner-text {
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      padding: 5rem 0 4rem 0;

      h5 {
        font-weight: bold;
        font-size: 3.5rem;
        right: 7rem;
        top: 5rem;
      }
    }
  }

  .officeicons {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
    grid-template-rows: 126px;
    grid-auto-rows: 126px;
    column-gap: 10px;
    row-gap: 4rem;

    @media (max-width: 576px) {
      width: 50vw;
    }

    .icon {
      background: #f7f7f7;
      height: 100%;
    }

    .productlist-icons {
      p {
        font-size: 1.3rem;
        font-weight: 600;
        padding-top: 1rem;
      }
    }
  }
`;
export default SearchPage;
