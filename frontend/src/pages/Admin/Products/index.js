import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import FadeIn from "react-fade-in";
import styled from "styled-components";
import DashboardNav from "../Dashboard/DashboardNav";
import { useParams } from "react-router-dom";
import publicApi from "../../../api/publicApi";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, Stack } from "@mui/material";
import ProductDetailDialog from "./ProductDetailDialog";
import adminApi from "../../../api/adminApi";
const Products = () => {
  const [products, setProducts] = React.useState([]);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [productIdSelected, setProductIdSelected] = React.useState(null);

  const handleOpenEditDialog = (id) => {
    setProductIdSelected(id);
    setIsDialogOpen(true);
  };
  const fetchProductList = async () => {
    try {
      const response = await publicApi.getProducts();
      setProducts(response.products);
    } catch (e) {
      console.log("Error on calling api", e);
    }
  };
  const handleDeleteProduct = async (id) => {
    try {
      await adminApi.deleteProduct(id);
      fetchProductList();
      alert("Delete product successfully");
    } catch (e) {
      alert("Delete product failed");

      console.log("error in calling api", e);
    }
  };
  useEffect(() => {
    fetchProductList();
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

          <article className="dashboard__uploadsection">
            <h5>My Products</h5>
            <div>
              <h3 className="dashboard__uploadsection__text"></h3>
              <Link
                className="dashboard__uploadsection__link"
                to={`/admin/upload`}
              >
                Upload Product
              </Link>
            </div>
          </article>

          <article className="dashboard__tablesection">
            <table>
              <thead>
                <tr>
                  <th style={{ width: "20%" }}>Product Image</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Description</th>
                  <th>Upload Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((item, index) => (
                  <tr key={index}>
                    <td className="item__unitprice">
                      <img
                        src={item.coverImg}
                        alt="product"
                        style={{ width: "25%" }}
                      />
                    </td>
                    <td>{item.name}</td>
                    <td>
                      {item.categories.map((item) => item.name).join(" ,")}
                    </td>
                    <td>{item.price}</td>
                    <td>{item.description}</td>
                    <td>{item.created_at}</td>
                    <td>
                      <Stack direction={"row"} spacing="2">
                        <IconButton
                          onClick={() => handleOpenEditDialog(item.id)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => handleDeleteProduct(item.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Stack>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </article>
        </DashboardWrapepr>

        <ProductDetailDialog
          isOpen={isDialogOpen}
          productId={productIdSelected}
          handleClose={() => setIsDialogOpen(false)}
          reloadProductList={fetchProductList}
        />
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

export default Products;
