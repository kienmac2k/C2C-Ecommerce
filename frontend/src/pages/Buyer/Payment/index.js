import React from "react";
import { Helmet } from "react-helmet";
import { Card, Stack, Link, Container, Typography, Grid } from "@mui/material";
import PaymentForm from "../../../components/payment/PaymentForm";
import OrderInfo from "../../../components/OrderInfo";
const Payment = () => {
  return (
    <>
      <Helmet>
        <title>Payment</title>
      </Helmet>
      <Container maxWidth="lg" sx={{ my: 3 }}>
        <Grid container spacing={3}>
          <Grid item md={8}>
            <PaymentForm />
          </Grid>
          <Grid item md={4}>
            <OrderInfo />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Payment;
