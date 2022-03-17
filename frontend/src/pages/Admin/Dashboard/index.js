import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import FadeIn from "react-fade-in";
import { dashboardproductsdetails } from "../../../data/dashboardproductdetails";
import { productorders } from "../../../data/productorders";

import styled from "styled-components";
import DashboardNav from "./DashboardNav";

const Dashboard = () => {
  useEffect(() => {
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
          <section className="my-product">
            <h2>My Product Dashboard</h2>
          </section>

          <DashboardFirstSection className="dashboardFirstSection">
            <article>
              {dashboardproductsdetails.map((detail, index) => (
                <div className="product-analytices">
                  <div className="details-icon">
                    <img src={detail.Img} alt="product details" />
                  </div>
                  <div>
                    <h4>
                      {detail.price ? (
                        <>&#8358;{detail.price}</>
                      ) : (
                        detail.number
                      )}
                    </h4>
                    <p>{detail.description}</p>
                  </div>
                </div>
              ))}
            </article>
            <Link className="dashboard__uploadsection__link" to="/upload">
              Upload New Product
            </Link>
          </DashboardFirstSection>

          <article className="dashboard__uploadsection">
            <div>
              <h3 className="dashboard__uploadsection__text">
                Completed Orders
              </h3>
            </div>
          </article>

          <article className="dashboard__tablesection">
            <table>
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Order No.</th>
                  <th>Price</th>
                  <th>Qnty Sold</th>
                  <th>Shipped to</th>
                  <th>Fulfilment Date</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {productorders.map((item, index) => (
                  <tr>
                    <td className="d-flex align-items-center">
                      <img src={item.Img} alt="product" />{" "}
                      <span>{item.name}</span>
                    </td>
                    <td>{item.ordernumber}</td>
                    <td>&#8358;{item.price}</td>
                    <td>{item.quantitysold}</td>
                    <td>{item.shippedto}</td>
                    <td>{item.fulfilmentdate}</td>
                    <td>&#8358;{item.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </article>
        </DashboardWrapepr>
      </FadeIn>
    </>
  );
};

const DashboardFirstSection = styled.section`
  width: 65vw;
  margin: 6rem auto 0 auto;

  .dashboard__uploadsection__link {
    color: #000;
    display: inline-block;
    padding: 0.7rem 2rem;
    font-size: 1.7rem;
    border-radius: 4px;
    border: none;
    text-decoration: none;
    font-family: "Open Sans" sans-serif;
    background: #243137;
    color: #fff;
  }

  & article {
    display: flex;
    justify-content: center;
    margin-bottom: 3rem;

    @media screen and(max-width:992px) {
      flex-direction: column;
    }

    .product-analytices {
      background-color: #e6e7e8;
      padding: 1rem 0 1rem 2rem;
      flex: 1;
      border-radius: 5px;
      display: flex;
      flex-direction: column;

      .details-icon {
        align-self: flex-end;
      }

      &:not(:last-child) {
        margin-right: 4rem;

        @media screen and(max-width:992px) {
          margin-bottom: 3rem;
          margin-right: 0;
        }
      }

      & h4 {
        color: #000;
        font-weight: bolder;
        font-size: 3rem;
        padding-top: 1rem;
      }

      & p {
        color: #000;
        font-weight: 600;
        font-size: 1.4rem;
      }
    }
  }
`;

const DashboardWrapepr = styled.section`
  background-color: #fff;
  padding-bottom: 4rem;

  .my-product {
    width: 80vw;
    margin: 9rem auto 0 auto;

    h2 {
      font-size: 3rem;
      font-weight: bold;
    }
  }

  .dashboard__uploadsection {
    width: 80vw;
    margin: 0 auto;
    margin-top: 3rem;

    > div {
      display: flex;
      flex-direction: column;
      align-items: baseline;
      padding-bottom: 1rem;

      h3 {
        font-size: 1.5rem;
        margin-left: 6rem;
        margin-bottom: 0;
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

export default Dashboard;
