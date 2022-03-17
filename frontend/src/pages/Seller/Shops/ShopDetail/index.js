import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import FadeIn from "react-fade-in";
import styled from "styled-components";
import ShopNav from "./ShopDashboard";
import userApi from "../../../../api/userApi";
import publicApi from "../../../../api/publicApi";
import { useParams } from "react-router-dom";
import { dashboardproductsdetails } from "../../../../data/dashboardproductdetails";

const ShopDetail = () => {
  const { shopId } = useParams();
  const [shopInfo, setShopInfo] = React.useState();

  useEffect(() => {
    const fetchShopInfo = async () => {
      const response = await publicApi.getVendorById(shopId);

      setShopInfo(response?.data);
    };
    fetchShopInfo();
    window.scrollTo(0, 0);
  }, [shopId]);
  return (
    <>
      <FadeIn transitionDuration="600">
        <Helmet>
          <title>Dashboard</title>
        </Helmet>

        <DashboardWrapepr className="dashboard">
          <ShopNav shopId={shopId} />

          <article className="dashboard__uploadsection">
            <h5>{shopInfo?.name}</h5>
          </article>
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
          </DashboardFirstSection>
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

export default ShopDetail;
