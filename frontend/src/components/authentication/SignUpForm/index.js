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
import eyeFill from "@iconify/icons-eva/eye-fill";
import eyeOffFill from "@iconify/icons-eva/eye-off-fill";
import { Link as RouterLink, useHistory } from "react-router-dom";
import publicApi from "../../../api/publicApi";

const LoginForm = ({ setSnackBar }) => {
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);
  const fetchLogin = async (values) => {
    try {
      await publicApi.signUp(values);
      history.push("/login");
      setSnackBar({
        open: true,
        status: "success",
        msg: "Sign up successfully",
      });
    } catch (err) {
      setSnackBar({ open: true, status: "error", msg: "Sign up failed" });
    }
  };
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("email must be a valid email address")
      .required("email is required"),
    password: Yup.string().required("Password is required"),
    name: Yup.string().required("Name is required"),
  });
  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        name: "",
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
              type="email"
              label="email"
              {...getFieldProps("email")}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
              value={values.email}
            />
            <TextField
              fullWidth
              label="name"
              {...getFieldProps("name")}
              error={Boolean(touched.name && errors.name)}
              helperText={touched.name && errors.name}
              value={values.name}
            />

            <TextField
              fullWidth
              type={showPassword ? "text" : "password"}
              label="Password"
              {...getFieldProps("password")}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword} edge="end">
                      <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
              value={values.password}
            />
          </Stack>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ my: 2 }}
          ></Stack>

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Sign Up
          </LoadingButton>
        </form>
      )}
    </Formik>
  );
};
export default LoginForm;
