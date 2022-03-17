import React from "react";
import { Helmet } from "react-helmet";
import { Card, Stack, Link, Container, Typography, Grid } from "@mui/material";
import ShippingForm from "../../../components/shipping/ShippingForm";
import OrderInfo from "../../../components/OrderInfo";
import SnackBar from "../../../components/SnackBar";

const Shipping = () => {
  const [snackBar, setSnackBar] = React.useState({
    open: false,
    status: "success",
    msg: "",
  });
  const handleCloseSnackBar = () => {
    setSnackBar({ open: false, status: "", msg: "" });
  };
  return (
    <>
      <Helmet>
        <title>Shipping</title>
      </Helmet>
      <Container maxWidth="lg" sx={{ my: 3 }}>
        <Grid container spacing={3}>
          <Grid item md={8}>
            <ShippingForm setSnackBar={setSnackBar} />
          </Grid>
          <Grid item md={4}>
            <OrderInfo />
          </Grid>
        </Grid>
      </Container>
      <SnackBar
        open={snackBar.open}
        status={snackBar.status}
        msg={snackBar.msg}
        handleClose={handleCloseSnackBar}
      />
    </>
  );
};

export default Shipping;
