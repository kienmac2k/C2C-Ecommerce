import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import FadeIn from "react-fade-in";
import { IconButton, Typography } from "@mui/material";
import styled from "styled-components";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useSelector, useDispatch } from "react-redux";
import {
  increaseItem,
  decreaseItem,
  removeItem,
  setTotal,
} from "../../../app/cart/slice";
const QuantityWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
const ProductCart = () => {
  const productList = useSelector((state) => state.cart.cart);
  const total = useSelector((state) => state.cart.total);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(setTotal());
  }, [dispatch]);
  return (
    <>
      <FadeIn transitionDuration="600">
        <Helmet>
          <title>cart</title>
        </Helmet>

        <ProductcartWrapper className="productcartsection">
          <h3>{productList.length} Items in Shopping Cart</h3>

          <article>
            <table>
              <thead>
                <tr>
                  <th style={{ width: "15%" }}>Item</th>
                  <th style={{ width: "20%" }}>Name</th>
                  <th style={{ width: "15%" }}>Categories</th>
                  <th style={{ width: "15%" }}>Shop</th>

                  <th style={{ width: "15%" }}>Price</th>
                  <th style={{ width: "10%" }}>Quantity</th>
                  <th style={{ width: "10%" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {productList.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <div className="item">
                        <img
                          src={item.coverImg}
                          alt="item__picture"
                          style={{ width: "50%" }}
                        />
                      </div>
                    </td>
                    <td>
                      <h5 className="">{item.name}</h5>
                    </td>
                    <td>
                      <p className="item__seller">{item.shop.name}</p>
                    </td>
                    <td>
                      {item.categories.map((item) => item.name).join(" ,")}
                    </td>
                    <td className="item__price">&#8358;{item.price}</td>
                    <td>
                      <QuantityWrapper>
                        <IconButton
                          onClick={() => dispatch(increaseItem(item.id))}
                        >
                          <AddIcon />
                        </IconButton>
                        <Typography variant="body">{item.quantity}</Typography>
                        <IconButton
                          onClick={() => dispatch(decreaseItem(item.id))}
                        >
                          <RemoveIcon />
                        </IconButton>
                      </QuantityWrapper>
                    </td>
                    <td>
                      <IconButton onClick={() => dispatch(removeItem(item.id))}>
                        <DeleteIcon />
                      </IconButton>
                    </td>
                  </tr>
                ))}
                <tr className="last-row">
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>Sub-Total: </td>
                  <td>{total}</td>
                </tr>
              </tbody>
            </table>
          </article>
          <article>
            <div className="checkout-section">
              <Link to="/">Continue Shopping</Link>
              <Link to="/shipping">Proceed to Checkout</Link>
            </div>
          </article>
        </ProductcartWrapper>
      </FadeIn>
    </>
  );
};

const ProductcartWrapper = styled.section`
  background-color: #f1f5f8;
  margin: 20px;
  h3 {
    font-size: 2rem;
    font-weight: bold;
    width: 80vw;
    margin: auto;
    padding: 2rem 0;
  }

  & article:nth-child(2) {
    background-color: #fff;
  }

  & article:nth-child(3) {
    width: 80vw;
    margin: 0 auto;
    display: flex;
    justify-content: flex-end;

    .checkout-section {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      width: 50%;
      a {
        color: #fff;

        text-decoration: none;
        text-align: center;
        display: inline-block;
        font-size: 1.6rem;
        padding: 0.7rem 0;
        text-decoration: none;
        font-family: "Open Sans", sans-serif;
        border-radius: 10px;
        border: 2px solid #094a6a;
        flex: 1;

        &:first-child {
          background-color: transparent;
          color: #333;
          margin-right: 1rem;
        }

        &:nth-child(2) {
          background-color: #094a6a;
        }
      }
    }
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
    text-align: center;
    width: 100%;
    font-size: 1.3rem;
    margin-bottom: 4rem;
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
    font-size: 1.6rem;
  }

  table tr,
  table td {
    padding: 1rem 1rem;
  }

  table tbody tr {
    border-bottom: 2px solid #ddd;
  }

  table tbody tr.last-row {
    border-bottom: none;
    font-size: 2rem;
    font-weight: bold;
  }

  table tr article {
    display: flex;

    h5 {
      font-size: 1.7rem;
      font-weight: 600;
      margin-bottom: 2px;
    }

    p {
      font-size: 1.2rem;
      font-weight: 600;
    }
  }

  .item {
    margin-right: 5rem;

    &__unitprice,
    &__price {
      font-size: 1.5rem;
      font-weight: bold;
    }
  }
`;

export default ProductCart;
