import React, { useState } from "react";

// mui
import {
  Link,
  Stack,
  TextField,
  IconButton,
  InputAdornment,
} from "@mui/material";

// form
import { Formik } from "formik";
import * as Yup from "yup";
import { LoadingButton } from "@mui/lab";
import { Icon } from "@iconify/react";

import { Link as RouterLink, useHistory } from "react-router-dom";
import { Select } from "../Globals/FormControls";
import publicApi from "../../api/publicApi";
import { useSelector } from "react-redux";

const ShippingForm = ({ setSnackBar }) => {
  const history = useHistory();
  const productList = useSelector((state) => state.cart.cart);

  const fetchCreateOrder = async (values) => {
    try {
      await publicApi.createOrder({ values, cartItems: productList });
      setSnackBar({
        open: true,
        msg: "Order created successfully",
        variant: "success",
      });
      history.push("/");
    } catch (err) {
      setSnackBar({
        open: true,
        msg: err.message,
        variant: "error",
      });
    }
  };
  const CreateOrderSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    address: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
    paymentMethod: Yup.string().required("Payment Method is required"),
    zipCode: Yup.string().required("Zip Code is required"),
    mobile: Yup.string().required("Mobile is required"),
  });

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        mobile: "",
        address: "",
        city: "",
        zipCode: "",
        country: "",
        notes: "",
        paymentMethod: "",
      }}
      validationSchema={CreateOrderSchema}
      onSubmit={async (values, { setSubmitting }) => {
        fetchCreateOrder(values);
        setSubmitting(false);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        getFieldProps,
        /* and other goodies */
      }) => (
        <form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              fullWidth
              label="Mobile"
              type="number"
              name="mobile"
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(touched.mobile && errors.mobile)}
              helperText={touched.mobile && errors.mobile}
              value={values.mobile}
            />
            <Stack direction="row" spacing={2}>
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(touched.firstName && errors.firstName)}
                helperText={touched.firstName && errors.firstName}
                value={values.firstName}
              />

              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(touched.lastName && errors.lastName)}
                helperText={touched.lastName && errors.lastName}
                value={values.lastName}
              />
            </Stack>

            <TextField
              fullWidth
              label="City"
              name="city"
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(touched.city && errors.city)}
              helperText={touched.city && errors.city}
              value={values.city}
            />
            <TextField
              fullWidth
              label="Address"
              name="address"
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(touched.address && errors.address)}
              helperText={touched.address && errors.address}
              value={values.address}
            />
            <Stack direction="row" spacing={2}>
              <TextField
                fullWidth
                label="Zip Code"
                name="zipCode"
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(touched.zipCode && errors.zipCode)}
                helperText={touched.zipCode && errors.zipCode}
                value={values.zipCode}
              />
              <TextField
                fullWidth
                label="Country"
                name="country"
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(touched.country && errors.country)}
                helperText={touched.country && errors.country}
                value={values.country}
              />
            </Stack>
            <Select
              label="Payment Method"
              name="paymentMethod"
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(touched.paymentMethod && errors.paymentMethod)}
              helperText={touched.paymentMethod && errors.paymentMethod}
              value={values.paymentMethod}
            >
              <option value="">Choose the payment method</option>
              <option value="atm">atm</option>
              <option value="visa">visa</option>
              <option value="mastercard">mastercard</option>
            </Select>

            <TextField
              fullWidth
              label="Notes"
              name="notes"
              multiline
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(touched.notes && errors.notes)}
              helperText={touched.notes && errors.notes}
              value={values.notes}
            />

            <LoadingButton
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              Place the order
            </LoadingButton>
          </Stack>
        </form>
      )}
    </Formik>
  );
};
export default ShippingForm;
