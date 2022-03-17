import styled from "styled-components";
import symbol from "../../assets/img/wholesale/78.png";

export const ProductSectionWrapper = styled.section`
  display: flex;
  width: 90vw;
  margin: 0 auto;
  justify-content: space-between;

  .filter-section {
    margin-top: 5rem;
    width: 25%;
  }

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

export const LivebidProductSection = styled.section`
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  column-gap: 5rem;
  margin-bottom: 8rem;
  margin-top: 8rem;
`;
