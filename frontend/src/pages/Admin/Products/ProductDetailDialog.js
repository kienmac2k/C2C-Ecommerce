import React from "react";

import {
  GRID,
  TextInput,
  TextArea,
} from "../../../components/Globals/FormControls";
import { CustomSelect } from "../../../components/Globals/MultiSelect/";
import styled from "styled-components";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import publicApi from "../../../api/publicApi";
import adminApi from "../../../api/adminApi";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";

const ProductDetailDialog = ({
  isOpen,
  productId,
  handleClose,
  reloadProductList,
}) => {
  const [categories, setCategories] = React.useState([]);
  const [productDetail, setProductDetail] = React.useState();
  const handleUpdateProduct = async (values) => {
    try {
      await adminApi.updateProduct(productId, values);
      reloadProductList();
      alert("Updated product successfully");
    } catch (e) {
      alert("Updated product failed");
      console.log("Error on calling api", e);
    }
    handleClose();
  };

  const CreateProductSchema = Yup.object().shape({
    categories: Yup.array(Yup.number()),
    name: Yup.string().required("Name is required"),
    stock: Yup.number().required("Address is required"),
    price: Yup.number().required("Email is required"),
    description: Yup.string(),
    coverImg: Yup.string(),
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
    fetchAllCategories();
  }, []);

  React.useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await publicApi.getProductById(productId);
        setProductDetail(response);
      } catch (err) {
        console.log("Error on calling api", err);
      }
    };
    fetchProductDetail();
  }, [productId]);
  return (
    <Dialog open={isOpen} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Update Product</DialogTitle>
      <DialogContent sx={{ mt: 2 }}>
        <Formik
          initialValues={{
            categories: productDetail?.categories?.map((item) => item.id) || [],
            name: productDetail?.name || "",
            stock: productDetail?.stock || 0,
            price: productDetail?.price || 0,
            description: productDetail?.description || "",
            coverImg: productDetail?.coverImg || "",
          }}
          validationSchema={CreateProductSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            handleUpdateProduct(values);
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
                  />
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
                      type="text"
                      name="price"
                      value={values.price}
                      onChange={handleChange}
                      placeholder="Price"
                    />
                  </GRID>
                  <h5>Set Stock</h5>
                  <GRID>
                    <TextInput
                      type="text"
                      name="stock"
                      value={values.stock}
                      onChange={handleChange}
                      placeholder="Stock"
                    />
                  </GRID>
                </div>
              </div>
              <article>
                <button type="submit">Upload Product</button>
              </article>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailDialog;
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
