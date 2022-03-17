import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const BidingProduct = ({ product }) => {
  return (
    <Wrapper className="d-flex">
      <div className="mr-5">
        <img src={product.biddingimg} alt="product" />
      </div>
      <div className="d-flex justify-content-between flex-grow-1 py-4">
        <div className="d-flex flex-column justify-content-between">
          <div>
            <h1>{product.name}</h1>
            <span
              style={{
                backgroundColor:
                  product.type === "new"
                    ? "#ED3237"
                    : product.type === "used"
                    ? "#53BBDE"
                    : "#F58534",

                borderRadius: "4px",
                padding: "1px 8px",
                color: "#fff",
                fontSize: "11px",
                marginBottom: "1rem",
              }}
            >
              {product.type} Item
            </span>
            <p>
              This is where product description is <br /> placed. It has all the
              features the owner <br />
              needs to place here
            </p>
          </div>
          <div>
            <h3>12 Bidders on this Item</h3>
            <span className="current-bidder">
              Alex234 from Lagos just bidded &#8358;97,000{" "}
            </span>
          </div>
        </div>
        <div
          style={{ width: "23%" }}
          className="d-flex flex-column justify-content-between pr-5"
        >
          <div className="d-flex flex-column align-items-end">
            <h4> &#8358;{product.price}</h4>
            <Link className="buy-now" to="/">
              Buy Now
            </Link>
            <h5>02m 58s</h5>
          </div>

          <div className="d-flex flex-column align-items-end">
            <form>
              <label htmlFor="bid">Enter Your Bid</label>
              <input style={{ width: "100%" }} type="text" />
            </form>
            <Link className="place-bid" to="/">
              Place Bid
            </Link>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  background: #f7f7f7;
  /* flex-wrap: wrap; */

  &:not(:last-child) {
    margin-bottom: 2rem;
  }

  h1 {
    font-weight: bold;
    font-size: 2.1rem;
    margin-bottom: 1rem;
  }

  h2 {
    font-size: 1.2rem;
  }

  p {
    font-size: 1.4rem;
  }

  h3 {
    font-size: 1.4rem;
    font-weight: bold;
  }

  .current-bidder {
    font-size: 1.3rem;
    font-style: italic;
    color: gray;
  }

  h4,
  .buy-now,
  .place-bid {
    font-weight: bold;
    padding: 3px 10px;
    border-radius: 5px;
    font-size: 12px;
    width: 100%;
  }

  h4 {
    background: #cfd1d1;
    text-align: center;
  }

  .buy-now {
    background: #91d8f7;
    text-decoration: none;
    color: #000;
    font-size: 12px;
    display: block;
    text-align: center;

    &:hover {
      color: #000;
      text-decoration: none;
    }
  }

  .place-bid {
    background: #ffd220;
    text-decoration: none;
    color: #000;
    font-size: 12px;
    display: block;
    text-align: center;
    margin-top: 0.5rem;

    &:hover {
      color: #000;
      text-decoration: none;
    }
  }

  input[type="text"] {
    border: 1px solid #000;
    padding: 5px 0;
    border-radius: 4px;
  }
  label {
    font-size: 1.1rem;
  }
`;

export default BidingProduct;
