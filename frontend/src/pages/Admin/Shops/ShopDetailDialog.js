import React from "react";

import {
  GRID,
  TextInput,
  TextArea,
  Select,
} from "../../../components/Globals/FormControls";
import styled from "styled-components";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import publicApi from "../../../api/publicApi";
import adminApi from "../../../api/adminApi";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
const ShopDetailDialog = ({ isOpen, shopId, handleClose, reloadShopList }) => {
  const [shopDetail, setShopDetail] = React.useState();
  console.log(
    "🚀 ~ file: ShopDetailDialog.js ~ line 17 ~ ShopDetailDialog ~ shopDetail",
    shopDetail
  );
  const handleUpdateShop = async (values) => {
    try {
      await adminApi.updateShop(shopId, values);
      reloadShopList();
      alert("Updated shop successfully");
    } catch (e) {
      alert("Updated shop failed");
      console.log("Error on calling api", e);
    }
    handleClose();
  };

  const UpdateShopSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    address: Yup.number().required("Address is required"),
    email: Yup.number().required("Email is required"),
    description: Yup.string(),
    isActive: Yup.boolean(),
    mobile: Yup.number().required("Mobile is required"),
  });

  React.useEffect(() => {
    const fetchShopDetail = async () => {
      try {
        const response = await publicApi.getVendorById(shopId);
        setShopDetail(response.data);
      } catch (err) {
        console.log("Error on calling api", err);
      }
    };
    fetchShopDetail();
  }, [shopId]);
  return (
    <Dialog open={isOpen} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Update Shop</DialogTitle>
      <DialogContent sx={{ mt: 2 }}>
        <Formik
          initialValues={{
            name: shopDetail?.name || "",
            isActive: shopDetail?.isActive || false,
            address: shopDetail?.address || 0,
            mobile: shopDetail?.mobile || "",
            email: shopDetail?.email || "",
            description: shopDetail?.description || "",
          }}
          validationSchema={UpdateShopSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            handleUpdateShop(values);
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
                <GRID>
                  <TextInput
                    type="text"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Name"
                  />
                </GRID>
                <SelectWrapper>
                  <Select
                    name="isActive"
                    value={values.isActive}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option value={true}>Active</option>
                    <option value={false}>Disabled</option>
                  </Select>
                </SelectWrapper>

                <GRID>
                  <TextArea
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Description"
                  ></TextArea>
                </GRID>
                <GRID>
                  <TextInput
                    type="text"
                    name="address"
                    value={values.address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Address"
                  />
                </GRID>
              </div>

              <div className="formright__section">
                <div>
                  <h5>Mobile</h5>
                  <GRID>
                    <TextInput
                      type="text"
                      name="mobile"
                      value={values.mobile}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Mobile"
                    />
                  </GRID>
                  <h5>Email</h5>
                  <GRID>
                    <TextInput
                      type="email"
                      name="email"
                      value={values.email}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Email"
                    />
                  </GRID>
                </div>
              </div>
              <article>
                <button type="submit">Update Shop</button>
              </article>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default ShopDetailDialog;
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
