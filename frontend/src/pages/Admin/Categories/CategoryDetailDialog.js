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

const CategoryDetailDialog = ({
  isOpen,
  categoryId,
  handleClose,
  reloadCategoryList,
}) => {
  const [categoryDetail, setCategoryDetail] = React.useState();
  const [mainCategories, setMainCategories] = React.useState([]);

  const handleUpdateShop = async (values) => {
    try {
      await adminApi.updateCategory(categoryId, values);
      reloadCategoryList();
      alert("Updated category successfully");
    } catch (e) {
      alert("Updated category failed");
      console.log("Error on calling api", e);
    }
    handleClose();
  };

  const UpdateCategorySchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    parentId: Yup.number(),
    description: Yup.string(),
  });

  React.useEffect(() => {
    const fetchCategoryDetail = async () => {
      try {
        const response = await publicApi.getCategoryById(categoryId);
        setCategoryDetail(response);
      } catch (err) {
        console.log("Error on calling api", err);
      }
    };
    fetchCategoryDetail();
  }, [categoryId]);

  React.useEffect(() => {
    const fetchMainCategory = async () => {
      try {
        const response = await publicApi.getCategoriesByOrder(1);
        setMainCategories(response.categories);
      } catch (err) {
        console.log("Error on calling api", err);
      }
    };
    fetchMainCategory();
  }, []);
  return (
    <Dialog open={isOpen} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Update Category</DialogTitle>
      <DialogContent sx={{ mt: 2 }}>
        <Formik
          initialValues={{
            name: categoryDetail?.name || "",
            parentId: categoryDetail?.parentId || null,
            description: categoryDetail?.description || "",
          }}
          validationSchema={UpdateCategorySchema}
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
                  <h6>Name</h6>

                  <TextInput
                    type="text"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Name"
                  />
                </GRID>
                {categoryDetail?.parentId && (
                  <GRID>
                    <SelectWrapper>
                      <h6>Select parent category</h6>

                      <Select
                        name="parentId"
                        value={values.parentId}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        {mainCategories.map((item, index) => (
                          <option key={index} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                      </Select>
                    </SelectWrapper>
                  </GRID>
                )}
                <GRID>
                  <h6>Description</h6>

                  <TextArea
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Description"
                  />
                </GRID>
              </div>

              <article>
                <button type="submit">Update Category</button>
              </article>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryDetailDialog;
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
