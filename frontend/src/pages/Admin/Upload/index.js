import React from "react";
import { Helmet } from "react-helmet";
import FadeIn from "react-fade-in";

import {
  GRID,
  TextInput,
  TextArea,
  Select,
} from "../../../components/Globals/FormControls";
import { CustomSelect } from "../../../components/Globals/MultiSelect/";
import styled from "styled-components";
import icon from "../../../assets/img/99.png";
import DashboardNav from "../Dashboard/DashboardNav";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import publicApi from "../../../api/publicApi";
import adminApi from "../../../api/adminApi";
import { LoadingButton } from "@mui/lab";

const ProductUpload = () => {
  const [categories, setCategories] = React.useState([]);
  const [shops, setShops] = React.useState([]);
  const handleCreateProduct = async (values) => {
    try {
      await adminApi.createProduct(values);
      alert("Product created successfully");
    } catch (e) {
      console.log("Error on calling api", e);
    }
  };

  const CreateProductSchema = Yup.object().shape({
    categories: Yup.array(Yup.number()),
    name: Yup.string().required("Name is required"),
    stock: Yup.number().required("Address is required"),
    price: Yup.number().required("Email is required"),
    description: Yup.string(),
    coverImg: Yup.string(),
    shopId: Yup.number(),
  });

  React.useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        const response = await publicApi.getCategories();
        setCategories(
          response?.categories?.map((item) => {
            return { value: item.id, label: item.name };
          })
        );
      } catch (err) {
        console.log("Error on calling api", err);
      }
    };
    const fetchAllShops = async () => {
      try {
        const response = await publicApi.getVendors();
        setShops(response?.shops);
      } catch (err) {
        console.log("Error on calling api", err);
      }
    };
    fetchAllShops();
    fetchAllCategories();
  }, []);
  return (
    <>
      <FadeIn transitionDuration="600">
        <Helmet>
          <title>dashboard</title>
        </Helmet>

        <DashboardNav />

        <FirstSection>
          <h4>Upload Product</h4>
        </FirstSection>
        <SettingsWrapper className="settingsFirstSection">
          <Formik
            initialValues={{
              categories: [],
              name: "",
              stock: 0,
              price: 0,
              description: "",
              shopId: shops[0]?.id || -100,
            }}
            validationSchema={CreateProductSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              handleCreateProduct(values);
              setSubmitting(false);
              resetForm();
            }}
            enableReinitialize
          >
            {({
              isSubmitting,
              getFieldProps,
              handleChange,
              handleBlur,
              values,
            }) => (
              <Form>
                <div className="formleft__section">
                  <h5>Upload Product</h5>
                  <SelectWrapper>
                    <Field
                      className="custom-select"
                      name="categories"
                      options={categories}
                      component={CustomSelect}
                      placeholder="Select multi categories..."
                      isMulti={true}
                    />
                  </SelectWrapper>

                  <GRID>
                    <Select
                      name="shopId"
                      value={values.shopId}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      {shops.map((item, index) => (
                        <option value={item.id} key={index}>
                          {item.name}
                        </option>
                      ))}
                    </Select>
                  </GRID>

                  <GRID>
                    <TextInput
                      type="text"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      placeholder="Product Title"
                    />
                  </GRID>

                  <GRID>
                    <TextArea
                      name="description"
                      value={values.description}
                      onChange={handleChange}
                      placeholder="Product Description"
                    ></TextArea>
                  </GRID>

                  <h6>Choose Thumbnail Image</h6>

                  <FileWrapper className="file">
                    <GRID>
                      <TextInput
                        name="coverImg"
                        type="text"
                        value={values.coverImg}
                        onChange={handleChange}
                        placeholder="Thumbnail Image"
                      />
                    </GRID>
                    {/* <article>
                  <div>
                    <input type="file" name="computer" id="computer" />
                    <label htmlFor="computer">
                      <MdComputer className="file-icon" /> From Computer
                    </label>
                  </div>
                  <div>
                    <input type="file" name="dropbox" id="dropbox" />
                    <label htmlFor="dropbox">
                      <FaDropbox className="file-icon" /> From Dropbox
                    </label>
                  </div>
                </article> */}
                  </FileWrapper>
                </div>

                <div className="formright__section">
                  <div>
                    <h5>Set Price</h5>
                    <GRID>
                      <TextInput
                        type="number"
                        name="price"
                        value={values.price}
                        onChange={handleChange}
                        placeholder="Price"
                      />
                    </GRID>
                    <h5>Set Stock</h5>
                    <GRID>
                      <TextInput
                        type="number"
                        name="stock"
                        value={values.stock}
                        onChange={handleChange}
                        placeholder="Stock"
                      />
                    </GRID>
                  </div>
                </div>
                <article>
                  <LoadingButton type="submit" loading={isSubmitting}>
                    Upload Product
                  </LoadingButton>
                </article>
              </Form>
            )}
          </Formik>
        </SettingsWrapper>
      </FadeIn>
    </>
  );
};
const SelectWrapper = styled.div`
  margin-bottom: 30px;
  & .custom-select {
    transform: translateY(-11px);
    background: #fff !important;
    border: none;
  }
`;

const FileWrapper = styled.section`
  border: 2px dashed #cfddf1;
  background-color: #f1f5f8;
  margin-bottom: 1.5rem;
  border-radius: 10px;

  & h6 {
    padding-top: 1rem;
    padding-left: 1rem;
    font-weight: 600;
    font-size: 1.2rem;
  }

  & article {
    padding: 2rem;
    display: flex;
    justify-content: center;

    & div:first-child {
      border-right: 1px solid #ddd;
      padding-right: 2rem;
    }

    & div:nth-child(2) {
      margin-left: 2rem;
    }

    & input[type="file"] {
      width: 0.1px;
      height: 0.1px;
      opacity: 0;
      position: absolute;
      z-index: -1;
    }

    & label {
      font-size: 1.3rem;
      text-align: center;
      line-height: 1.3;
      cursor: pointer;
      font-weight: 600;
      color: grey;
    }

    .file-icon {
      font-size: 3rem;
      margin-right: 0.5rem;
    }
  }
`;

const FirstSection = styled.section`
  border-bottom: 1px solid #ddd;
  width: 90vw;
  margin: 8rem auto 4rem auto;

  h4 {
    font-size: 2.5rem;
    font-weight: bold;
    margin-left: 4rem;
    margin-bottom: 2rem;
  }
`;

const SettingsWrapper = styled.section`
  margin: 4rem 0;

  h5 {
    font-weight: bold;
    font-size: 1.6rem;
    color: #000;
    margin-bottom: 1.5rem;
  }

  p {
    font-size: 1.7rem;
    padding-bottom: 1rem;
    color: #0c74c4;
    font-family: "Open Sans", sans-serif;
  }

  a {
    font-size: 1.5rem;
    text-decoration: none;
    font-weight: 600;
    color: #0c74c4;
    display: inline-block;
    margin-bottom: 4rem;
    padding: 0.5rem 1.5rem;

    &:hover {
      font-size: 1.5rem;
      text-decoration: none;
      font-weight: 600;
      color: #0c74c4;
    }

    &:not(:last-child) {
      margin-right: 4rem;
    }
  }

  form {
    display: grid;
    width: 85vw;
    margin: 0 auto;
    grid-template-columns: 2fr 1fr;

    @media (max-width: 992px) {
      width: 60vw;
      grid-template-columns: 1fr;
    }

    @media (max-width: 768px) {
      width: 50vw;
      grid-template-columns: 1fr;
    }

    @media (max-width: 576px) {
      width: 70vw;
      grid-template-columns: 1fr;
    }
  }

  .formleft__section {
    padding-right: 8rem;
    border-right: 2px solid #ddd;
    align-self: start;

    @media (max-width: 992px) {
      padding-right: 0;
      border-right: none;
    }
  }

  .formright__section {
    padding-left: 8rem;
    @media (max-width: 992px) {
      padding-left: 0;
    }
  }

  button {
    color: #fff;
    background-color: #094a6a;
    border: none;
    text-decoration: none;
    text-align: center;
    display: inline-block;
    font-size: 1.5rem;
    padding: 0.8rem 4rem;
    font-family: "Open Sans", sans-serif;
    border-radius: 4px;
  }

  select {
    background: url(${icon});
    background-repeat: no-repeat;
    background-position: 95% center;
  }

  .address {
    margin-bottom: 3rem;
  }
`;

export default ProductUpload;
