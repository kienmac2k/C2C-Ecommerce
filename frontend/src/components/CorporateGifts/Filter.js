import React from "react";
import productcategory, { rating } from "../../data/productscategoty";
import symbol from "../../assets/img/wholesale/78.png";
import styled from "styled-components";

const Filter = () => {
  return (
    <Wrapper>
      <form>
        <div
          style={{
            padding: "3rem",
          }}
        >
          <h5>Product Category</h5>
          <div>
            {productcategory.corporategifts.map((item, index) => (
              <div key={index} className="d-flex align-items-center mb-3">
                <input type="checkbox" name={item.text} id={item.text} />
                <label htmlFor={item.text}>{item.text}</label>
              </div>
            ))}
          </div>
        </div>

        <article
          style={{
            padding: "3rem",
          }}
        >
          <div className="minmax-filter">
            <h5>Sort by Price</h5>
            <div className="d-flex">
              <input
                type="text"
                name="minimum"
                id="minimum"
                placeholder="Minimum"
              />
              <input
                type="text"
                name="maximum"
                id="maximum"
                placeholder="Maximum"
              />
            </div>
          </div>

          <div className="filter">
            <h5>Average Rating</h5>
            <div>
              {rating.map((item, index) => (
                <div key={index} className="d-flex align-items-center mb-3">
                  <input type="checkbox" name={item.text} id={item.text} />
                  <label htmlFor={item.text}>
                    <img src={item.rating} alt="rating" /> <span>& above</span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </article>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.article`
  width: 25%;

  form {
    background: #fcfcfc;

    label {
      font-size: 1.25rem;
      margin-left: 10px;
      margin-bottom: 0;
      display: flex;
      text-transform: capitalize;
      align-items: center;
      /* font-family: avertademo; */
      color: #848688;

      span {
        margin-left: 1rem;
      }
    }

    h5 {
      font-size: 1.3rem;
      margin-bottom: 1rem;
      font-weight: 700;
    }

    .filter {
      margin-bottom: 2rem;
    }

    .minmax-filter {
      border-top: 1px solid #ddd;
      border-bottom: 1px solid #ddd;
      padding: 2rem 0;
      margin-bottom: 3rem;

      input {
        padding: 3px 0 3px 18px;
        border-radius: 5px;
        border: 1px solid #bdbfc1;
        width: 45%;
        font-size: 1.4rem;
        background-image: url(${symbol});
        background-position: 5%, center;
        background-repeat: no-repeat;

        &::placeholder {
          color: #d2d3d5;
        }
      }

      input:nth-child(2) {
        margin-left: 5px;
      }
    }
  }
`;

export default Filter;
