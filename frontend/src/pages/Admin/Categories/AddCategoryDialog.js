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

const AddCategoryDialog = ({ isOpen, handleClose, reloadCategoryList }) => {
  const [isSubcategory, setIsSubCategory] = React.useState();
  const [mainCategories, setMainCategories] = React.useState([]);
  const handleCreateCategory = async (values) => {
    if (isSubcategory === "true") {
      try {
        await adminApi.createSubCategory(values);
        reloadCategoryList();
        alert("Create category successfully");
      } catch (e) {
        alert("Create category failed");
        console.log("Error on calling api", e);
      }
    } else {
      try {
        await adminApi.createCategory(values);
        reloadCategoryList();
        alert("Create category successfully");
      } catch (e) {
        alert("Create category failed");
        console.log("Error on calling api", e);
      }
    }
    handleClose();
  };

  const UpdateCategorySchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    parentId: Yup.number(),
    description: Yup.string(),
  });

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
        <GRID>
          <SelectWrapper>
            <h6>Select Order Of Category</h6>
            <Select
              name="order selection"
              onChange={(e) => setIsSubCategory(e.target.value)}
              placeholder={"Select order of category"}
            >
              <option value={"true"}>Sub Category</option>
              <option value={"false"}>Main Category</option>
            </Select>
          </SelectWrapper>
        </GRID>
        <Formik
          initialValues={{
            name: "",
            parentId: null,
            description: "",
          }}
          validationSchema={UpdateCategorySchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            handleCreateCategory(values);
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
                {isSubcategory === "true" && (
                  <GRID>
                    <SelectWrapper>
                      <h6>Select Main Category</h6>
                      <Select
                        name="parentId"
                        value={values.parentId}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        {mainCategories.map((item) => (
                          <option value={item.id}>{item.name}</option>
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
                <button type="submit">Create Category</button>
              </article>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default AddCategoryDialog;
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
