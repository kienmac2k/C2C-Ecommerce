import React from "react";
import { ProductSectionWrapper } from "../../../../components/Globals/ProductSectionWrapper";
import ProductFilter from "../../../../components/Product/ProductFilter";
import ProductList from "../../../../components/Product/ProductList";
import FadeIn from "react-fade-in";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import publicApi from "../../../../api/publicApi";
const SubCategories = () => {
  const { subCategoryId } = useParams();
  const [productList, setProductList] = React.useState([]);
  const [categoryInfo, setCategoryInfo] = React.useState();

  React.useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await publicApi.getProductsByCategory(subCategoryId);
        setProductList(response.products);
      } catch (e) {
        console.log("Error when calling api", e);
      }
    };
    const getCategoryInfo = async () => {
      try {
        const response = await publicApi.getCategoryById(subCategoryId);
        setCategoryInfo(response);
      } catch (e) {
        console.log("Error when calling api", e);
      }
    };
    getProducts();
    getCategoryInfo();
  }, [subCategoryId]);

  return (
    <>
      <FadeIn transitionDuration="600">
        <Helmet>
          <title>{categoryInfo?.name}</title>
        </Helmet>

        <ProductSectionWrapper>
          <ProductFilter />
          <ProductList productList={productList} />
        </ProductSectionWrapper>
      </FadeIn>
    </>
  );
};

export default SubCategories;
