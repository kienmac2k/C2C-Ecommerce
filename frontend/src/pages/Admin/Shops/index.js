import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import FadeIn from "react-fade-in";
import styled from "styled-components";
import DashboardNav from "../Dashboard/DashboardNav";
import publicApi from "../../../api/publicApi";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, Stack } from "@mui/material";
import ShopDetailDialog from "./ShopDetailDialog";
import adminApi from "../../../api/adminApi";
const Shops = () => {
  const [shops, setShops] = React.useState([]);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [shopIdSelected, setShopIdSelected] = React.useState(null);

  const handleOpenEditDialog = (id) => {
    setShopIdSelected(id);
    setIsDialogOpen(true);
  };
  const fetchShopList = async () => {
    try {
      const response = await publicApi.getVendors();
      setShops(response.shops);
    } catch (e) {
      console.log("Error on calling api", e);
    }
  };
  const handleDeleteShop = async (id) => {
    try {
      await adminApi.deleteShop(id);
      fetchShopList();
      alert("Delete shop successfully");
    } catch (e) {
      alert("Delete shop failed");

      console.log("error in calling api", e);
    }
  };
  useEffect(() => {
    fetchShopList();
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <FadeIn transitionDuration="600">
        <Helmet>
          <title>Shops</title>
        </Helmet>

        <DashboardWrapepr className="dashboard">
          <DashboardNav />

          <article className="dashboard__uploadsection">
            <h5>Shop List</h5>
          </article>

          <article className="dashboard__tablesection">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Address</th>
                  <th>Mobile</th>
                  <th>Email</th>
                  <th>Active</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {shops?.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td>{item.address}</td>
                    <td>{item.mobile}</td>
                    <td>{item.email}</td>
                    <td>{item.isActive ? "active" : "disabled"}</td>
                    <td>
                      <Stack direction={"row"} spacing="2">
                        <IconButton
                          onClick={() => handleOpenEditDialog(item.id)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleDeleteShop(item.id)}>
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

        <ShopDetailDialog
          isOpen={isDialogOpen}
          shopId={shopIdSelected}
          handleClose={() => setIsDialogOpen(false)}
          reloadShopList={fetchShopList}
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

export default Shops;
