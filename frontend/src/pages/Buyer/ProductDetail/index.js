import React from "react";
import Spinner from "../../../components/Globals/Spinner/Spinner";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import FadeIn from "react-fade-in";
import styled from "styled-components";
import cart from "../../../assets/img/36.png";
import { GrStar } from "react-icons/gr";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import publicApi from "../../../api/publicApi";
const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = React.useState();

  React.useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await publicApi.getProductById(id);
        setProduct(response);
      } catch (e) {
        console.log("Error when calling api", e);
      }
    };
    fetchProductDetail();
  }, [id]);

  if (!product) {
    return <Spinner />;
  }
  return (
    <>
      <FadeIn transitionDuration="600">
        <Helmet>
          <title>Home goods</title>
        </Helmet>
        <SingleProductWrapper>
          <article className="product-section sections">
            <div className="product">
              <div className="product-box">
                <div className="save-product">
                  <img
                    src={require("../../../assets/img/singleproduct/27.png")}
                    alt="save product"
                  />
                  <p>Save</p>
                </div>
                <div className="product-picture">
                  <img src={product?.coverImg} alt="product" />
                </div>
              </div>
              <div className="share-product">
                <p>Share this product</p>
                <div className="socials">
                  <FaFacebook />
                  <FaInstagram />
                  <FaTwitter />
                </div>
              </div>
            </div>
            <div className="product-description">
              <div className="description">
                <h5>{product?.name}</h5>
                <p className="rating">
                  <GrStar />
                  <GrStar />
                  <GrStar />
                  <GrStar />
                  <GrStar />
                  <span>(8 rating)</span>
                </p>
                <p className="product-code">Product Code: HDE443E</p>
                <p className="product-brand">
                  Categories:{" "}
                  {product?.categories?.map((item) => item.name).join(" ,")}
                </p>
              </div>
              <div>
                <div className="product-unit-price">
                  <p>Unit Price</p>
                  <h4> &#8358;{product?.price}</h4>
                </div>
              </div>
              <div>
                <div className="product-delivery">
                  <div>
                    <img
                      src={require("../../../assets/img/singleproduct/32.png")}
                      alt="share product"
                    />
                    <p>Delivery</p>
                  </div>

                  <div>
                    <img
                      src={require("../../../assets/img/singleproduct/33.png")}
                      alt="share product"
                    />
                    <p>Express Delivery Available</p>
                  </div>
                </div>
                <div className="product-cart-section">
                  <Link to="/productcart">Add to Cart</Link>
                  <Link to="/productcart">Buy Now</Link>
                </div>
              </div>
            </div>
          </article>
          <article className="sections section-2">
            <div className="product-overview">
              <Link to="/">Product Overview</Link>

              <Link to="/">Delivery Information</Link>

              <Link to="/">Seller Info</Link>
            </div>
            <div className="text">
              <span>10 Sold</span>
              <p>
                If you are looking for comfort and durable product with perfect
                or excellent finish, 'Pawa furniture' is the solution. We make
                quality home and office furniture with high class material and
                at best price.
              </p>
              <p>
                Shop here and experience the difference between Pawa furniture
                and the rest.
              </p>

              <p>
                For comfort : we add extra fibre on the seats [or cushion] in
                other to give you the comfort you deserve.
              </p>
              <p>
                For durability: we treat the woods we use. we frame the skeleton
                with board for extra protection, we use high density foam and
                high- quality fabric.
              </p>

              <p>
                Shop here and enjoy all these benefits and above all we keep our
                word
              </p>

              <p>
                Please Note: patterned pillow can come in different designs.
              </p>
            </div>
          </article>

          <article className="sections similar-products">
            <div className="similar-products-section">
              <h5>Similar products you might like</h5>
            </div>
            {/* <div className="slides-section">
              {categories.map((product) => (
                <div key={product.id}>
                  <img className="img-fluid" src={product.img} alt="product" />
                  <h5>{product.type}</h5>
                  <h6>&#8358;{product.price}</h6>
                </div>
              ))}
            </div> */}
          </article>
        </SingleProductWrapper>
      </FadeIn>
    </>
  );
};

const SingleProductWrapper = styled.section`
  background: #f1f5f8;
  padding: 4rem 10rem;

  .sections {
    background: #fff;
  }

  & article {
    &:not(:last-child) {
      margin-bottom: 3rem;
    }
  }

  .section-2 {
    padding: 1rem 3rem;

    p {
      font-size: 1.3rem;

      &:not(:last-child) {
        font-size: 1.3rem;
        padding-bottom: 1rem;
      }
    }
  }

  .text {
    padding-right: 34rem;

    span {
      font-size: 1.4rem;
      display: inline-block;
      background: #f1f5f8;
      padding: 0.2rem 1.2rem;
      margin: 1rem 0 2.5rem 0;
      font-weight: bold;
    }
  }

  .product-overview {
    border-bottom: 1px solid #ddd;
    padding-bottom: 1rem;
    margin-bottom: 0rem;
    margin-top: 2rem;

    a {
      color: #000;
      font-size: 1.5rem;
      border: 1px solid #000;
      padding: 0.6rem 2rem;
      font-weight: 600;
      border-radius: 50px;
      margin-bottom: 1rem;
      &:hover {
        text-decoration: none;
      }

      &:not(:last-child) {
        margin-right: 4rem;
      }
    }
  }

  .product-section {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 6rem;
    padding: 3rem 13rem;
  }

  .product-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    border: 1px solid #ddd;
  }

  .save-product {
    position: absolute;
    top: 15px;
    right: 20px;
    text-align: center;
  }

  .product-picture {
    padding-top: 7rem;
    padding-bottom: 7rem;
  }

  .share-product {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;
    p {
      font-size: 1.5rem;
      font-weight: 600;
    }
  }

  .socials {
    display: flex;
    justify-content: space-between;
    img:not(:first-child) {
      margin-left: 1rem;
    }
  }

  .product-description {
    h5 {
      font-size: 3rem;
      font-weight: 600;
      padding-bottom: 0.5rem;
    }

    .description {
      border-bottom: 1px solid #ddd;
      margin-bottom: 1rem;
      padding-bottom: 1rem;
    }

    .rating {
      display: flex;
      justify-content: flex-start;
      align-items: center;

      img {
        margin-right: 1rem;
      }

      span {
        font-size: 1.3rem;
        font-weight: bold;
      }
    }

    .product-code,
    .product-brand {
      font-size: 1.3rem;
      font-weight: 600;
    }

    .product-code {
      margin-top: 1rem;
    }
    .product-unit-price {
      display: flex;
      align-items: center;

      p {
        font-size: 1.7rem;
        font-weight: bold;
        margin-right: 5rem;
      }

      h4 {
        font-size: 2.5rem;
        font-weight: bold;
        margin-bottom: 0;
      }
    }

    .product-subtotal {
      display: flex;
      border-bottom: 1px solid #ddd;
      margin-top: 2rem;
      padding-bottom: 1rem;
      margin-bottom: 1rem;
      align-items: center;

      p {
        font-size: 1.4rem;
      }

      h2 {
        background: #cad7e6;
        flex: 1;
        text-align: center;
        font-size: 2rem;
        border-radius: 5px;
        margin-left: 1rem;
        color: #000;
        font-weight: 600;
        padding: 0.5rem 0;
      }

      div:first-child {
        margin-right: 5rem;

        label {
          font-size: 1.7rem;
          display: inline-block;
          margin-right: 0.5rem;
        }
        select {
          padding: 1rem 2rem;
          border: 1px solid #ddd;
          border-radius: 4px;
        }
      }

      div:nth-child(2) {
        display: flex;
        align-items: center;
        flex: 1;
      }
    }

    .product-delivery {
      display: flex;
      align-items: center;
      margin-bottom: 1rem;
      padding-bottom: 1rem;

      p {
        font-size: 1.2rem;
      }

      div:first-child {
        margin-right: 4rem;
      }
    }

    .product-cart-section {
      display: flex;
      justify-content: space-between;

      a {
        flex: 1;
        text-decoration: none;
        color: #fff;
        background: #243137;
        text-align: center;
        padding: 1rem;
        font-size: 1.4rem;
        font-weight: bold;
        border-radius: 5px;
        display: inline-block;
      }
    }

    a:first-child {
      margin-right: 1rem;
      background-image: url(${cart});
      background-repeat: no-repeat;
      background-position: 10% center;
    }
  }

  .similar-products {
    padding: 2rem 4rem;
  }

  .similar-products-section {
    border-bottom: 1px solid #ddd;
    padding: 2rem 0 0.5rem 0;
    margin-bottom: 3rem;

    h5 {
      font-size: 1.5rem;
      font-weight: 600;
    }
  }

  .slides-section {
    padding: 0 4rem;
  }
`;

export default ProductDetails;
