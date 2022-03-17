import React from "react";
import { Container, Grid } from "@mui/material";
//Component
import SellerItem from "./SellerItem";
import { ProductSectionWrapper } from "../../../../components/Globals/ProductSectionWrapper";
import SellerFilter from "../../../../components/Seller/SellerFiler";
import publicApi from "../../../../api/publicApi";

const SellerList = () => {
  const [shopList, setShopList] = React.useState([]);
  React.useEffect(() => {
    const fetchShopList = async () => {
      try {
        const res = await publicApi.getVendors();
        setShopList(res.shops);
      } catch (e) {
        console.log("Error on calling api");
      }
    };

    fetchShopList();
  }, []);
  return (
    <Container maxWidth="lg" sx={{ my: 2 }}>
      <ProductSectionWrapper>
        <SellerFilter />
        <Grid container>
          {shopList?.map((item, index) => (
            <Grid item md={6}>
              <SellerItem data={item} key={index} />
            </Grid>
          ))}
        </Grid>
      </ProductSectionWrapper>
    </Container>
  );
};

export default SellerList;
