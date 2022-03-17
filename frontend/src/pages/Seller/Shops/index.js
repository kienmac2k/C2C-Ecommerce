import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import FadeIn from "react-fade-in";
import styled from "styled-components";
import DashboardNav from "../Dashboard/DashboardNav";
import userApi from "../../../api/userApi";
import { useFormik } from "formik";
import * as Yup from "yup";

import {
  Grid,
  Button,
  Typography,
  Dialog,
  DialogContent,
  TextField,
  Stack,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
const Shops = () => {
  const [shopList, setShopList] = React.useState([]);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const CreateShopSchema = Yup.object().shape({
    mobile: Yup.string().required("phoneNumber is required"),
    name: Yup.string().required("Name is required"),
    address: Yup.string().required("Address is required"),
    email: Yup.string().required("Email is required"),
    description: Yup.string(),
  });
  const handleCreateShop = async (values) => {
    try {
      await userApi.createShop(values);
      const response = await userApi.getShopList();
      setShopList(response?.shops);
    } catch (err) {
      alert("Error in creating shop");
      console.log("err", err);
    }
    setDialogOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      email: "foobar@example.com",
      mobile: "",
      name: "",
      address: "",
      description: "",
    },
    validationSchema: CreateShopSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      handleCreateShop(values);
      setSubmitting(false);
      resetForm();
    },
  });

  useEffect(() => {
    const fetchShops = async () => {
      const response = await userApi.getShopList();
      setShopList(response?.shops);
    };
    fetchShops();
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <FadeIn transitionDuration="600">
        <Helmet>
          <title>Dashboard</title>
        </Helmet>

        <DashboardWrapepr className="dashboard">
          <DashboardNav />

          <article className="dashboard__uploadsection"></article>
          <Grid container sx={{ width: "80vw", margin: "auto", my: 1 }}>
            <Grid item md={10}>
              <Typography variant="h3">Shop List</Typography>
            </Grid>
            <Grid item md={2}>
              <Button
                variant="contained"
                fullWidth
                onClick={() => setDialogOpen(true)}
              >
                Create Shop
              </Button>
            </Grid>
          </Grid>

          <article className="dashboard__tablesection">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>IsActive</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {shopList.map((item, index) => (
                  <tr key={index}>
                    <td>{item.id}</td>
                    <td className="item__unitprice">
                      <Link to={`/seller/shops/${item.id}`}>{item.name}</Link>
                    </td>
                    <td>{item.isActive.toString()}</td>
                    <td>{item.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </article>
          <Dialog
            open={dialogOpen}
            onClose={() => setDialogOpen(false)}
            maxWidth="md"
            fullWidth
          >
            <DialogContent>
              <form onSubmit={formik.handleSubmit}>
                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    id="email"
                    name="email"
                    label="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                  <TextField
                    fullWidth
                    id="name"
                    name="name"
                    label="Name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                  />
                  <TextField
                    fullWidth
                    id="mobile"
                    name="mobile"
                    label="Mobile"
                    value={formik.values.mobile}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.mobile && Boolean(formik.errors.mobile)
                    }
                    helperText={formik.touched.mobile && formik.errors.mobile}
                  />

                  <TextField
                    fullWidth
                    id="address"
                    name="address"
                    label="Address"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.address && Boolean(formik.errors.address)
                    }
                    helperText={formik.touched.address && formik.errors.address}
                  />
                  <TextField
                    fullWidth
                    id="description"
                    name="description"
                    label="Description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.description &&
                      Boolean(formik.errors.description)
                    }
                    helperText={
                      formik.touched.description && formik.errors.description
                    }
                  />
                </Stack>
                <LoadingButton
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  loading={formik.isSubmitting}
                >
                  Login
                </LoadingButton>
              </form>
            </DialogContent>
          </Dialog>
        </DashboardWrapepr>
      </FadeIn>
    </>
  );
};

const DashboardWrapepr = styled.section`
  background-color: #f1f5f8;
  padding-bottom: 4rem;

  .dashboard__uploadsection {
    width: 80vw;
    margin: 0 auto;
    margin-top: 9rem;

    h5 {
      font-size: 2.5rem;
      padding-bottom: 3rem;
      font-weight: bold;
    }

    > div {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      padding-bottom: 1rem;

      h3 {
        font-size: 2rem;
        font-weight: bold;
        align-self: flex-end;
      }

      a {
        color: #fff;
        background: #243137;
        display: inline-block;
        text-decoration: none;
        padding: 0.6rem 2.5rem;
        font-size: 1.5rem;
        border-radius: 10px;
      }
    }
  }

  .dashboard__tablesection {
    background-color: #fff;
    width: 80vw;
    margin: 0 auto;
  }

  .table-title {
    display: flex;
    justify-content: space-between;

    a {
      color: #606c86;
      text-decoration: underline;
      font-size: 1.2rem;
    }

    h3 {
      color: #000;
      font-weight: 600;
    }
  }

  table {
    width: 100%;
    font-size: 1.3rem;
  }

  table thead tr {
    background-color: #cad7e6;
    color: #fff;
  }

  table th {
    padding: 1rem 1rem;
    font-weight: 100;
    color: #000;
    font-weight: bold;
    font-size: 1.4rem;
  }

  table tr,
  table td {
    padding: 1rem 1rem;
  }

  table tbody tr {
    border-bottom: 2px solid #ddd;
  }

  table tbody tr {
    border-bottom: 2px solid #ddd;
  }

  table tbody tr:last-child {
    border-bottom: none;
  }
`;

export default Shops;
// {/* <Formik
// initialValues={{}}
// // validation={CreateShopSchema}
// validate={(values) => {
//   const errors = {};
//   if (!values.email) {
//     errors.email = "Required";
//   } else if (
//     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
//       values.email
//     )
//   ) {
//     errors.email = "Invalid email address";
//   }
//   return errors;
// }}
// onSubmit={(values, { setSubmitting }) => {
//   setTimeout(() => {
//     alert(JSON.stringify(values, null, 2));
//     setSubmitting(false);
//   }, 400);
// }}
// >
// {({
//   values,
//   errors,
//   touched,
//   handleChange,
//   handleBlur,
//   handleSubmit,
//   isSubmitting,
//   /* and other goodies */
// }) => (
//   <form onSubmit={handleSubmit}>
//     <Stack spacing={3}>
//       <TextField
//         fullWidth
//         label="Name"
//         name="name"
//         onChange={handleChange}
//         onBlur={handleBlur}
//         value={values.password}
//         error={Boolean(touched.name && errors.name)}
//         helperText={touched.name && errors.name}
//       />
//       <TextField
//         fullWidth
//         label="Email"
//         name="email"
//         type="email"
//         onChange={handleChange}
//         onBlur={handleBlur}
//         value={values.email}
//       />
//       {errors.email && touched.email ? (
//         <div>{errors.email}</div>
//       ) : null}
//     </Stack>
//     <LoadingButton
//       fullWidth
//       size="large"
//       type="submit"
//       variant="contained"
//       loading={isSubmitting}
//     >
//       Login
//     </LoadingButton>
//   </form>
// )}
// </Formik> */}
