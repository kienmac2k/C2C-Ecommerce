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

const PaymentForm = ({ setSnackBar }) => {
  const history = useHistory();
  const fetchLogin = async (values) => {};
  const LoginSchema = Yup.object().shape({
    username: Yup.string()
      .email("username must be a valid email address")
      .required("username is required"),
    password: Yup.string().required("Password is required"),
  });

  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
      }}
      validationSchema={LoginSchema}
      onSubmit={async (values, { setSubmitting }) => {
        await fetchLogin(values);
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
              autoComplete="username"
              type="username"
              label="Username"
              {...getFieldProps("username")}
              error={Boolean(touched.username && errors.username)}
              helperText={touched.username && errors.username}
              value={values.username}
            />
            <TextField
              fullWidth
              autoComplete="username"
              type="username"
              label="Username"
              {...getFieldProps("username")}
              error={Boolean(touched.username && errors.username)}
              helperText={touched.username && errors.username}
              value={values.username}
            />
            <Stack direction="row" spacing={2}>
              <TextField
                fullWidth
                autoComplete="username"
                type="username"
                label="Username"
                {...getFieldProps("username")}
                error={Boolean(touched.username && errors.username)}
                helperText={touched.username && errors.username}
                value={values.username}
              />
              <TextField
                fullWidth
                autoComplete="username"
                type="username"
                label="Username"
                {...getFieldProps("username")}
                error={Boolean(touched.username && errors.username)}
                helperText={touched.username && errors.username}
                value={values.username}
              />
              <TextField
                fullWidth
                autoComplete="username"
                type="username"
                label="Username"
                {...getFieldProps("username")}
                error={Boolean(touched.username && errors.username)}
                helperText={touched.username && errors.username}
                value={values.username}
              />
            </Stack>

            <LoadingButton
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              Submit
            </LoadingButton>
          </Stack>
        </form>
      )}
    </Formik>
  );
};
export default PaymentForm;
