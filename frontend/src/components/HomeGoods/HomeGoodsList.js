import React from "react";
import { NavLink, Link } from "react-router-dom";
import good2 from "../../assets/img/homegoods/goods2/68.png";
import good6 from "../../assets/img/homegoods/6.png";
import LazyLoadedImage from "../Lazyload";
import homegoods from "../../data/goods";
import styled from "styled-components";
import { ProductLink } from "../../components/Home/HomeNinthSection";
import { homegoodslinks } from "../../constants/homegoodsnavlinks";
import Slides from "../HomeGoods/Slides";

export const HomeGoodsNav = () => {
  return (
    <NavWrapper>
      <ul>
        {homegoodslinks.map((link, index) => (
          <li key={index}>
            <NavLink activeClassName="active" to={link.path}>
              {link.text}
            </NavLink>
          </li>
        ))}
      </ul>
    </NavWrapper>
  );
};

export const HomeGoodsSlides = () => {
  return (
    <SlidesWrapper className="homegoodlist__sldies_container">
      {homegoods.pricedgoods.map((homegood, index) => (
        <div className="good" key={index}>
          <Link to={homegood.path}>
            <LazyLoadedImage image={homegood.img} />
          </Link>

          <div className="good__type__price">
            <h5 className="good__type ">{homegood.type}</h5>
            <p className="good__price"> &#x20a6;{homegood.price}</p>
          </div>
        </div>
      ))}
    </SlidesWrapper>
  );
};

const HomeGoodsList = ({ goods }) => {
  return (
    <SectionWrapper>
      <HomeGoodsNav />
      <article className="homegoodlist__firstrow">
        <div className="items__container">
          {homegoods.items.map((item, index) => (
            <div
              key={index}
              className="item d-flex flex-column justify-content-center align-items-center"
            >
              <div className="d-flex align-items-center justify-content-around">
                <h5 className="mr-4">{item.type}</h5>
                <Link
                  to={`/kitchenequipments/${item.category.replace(/\s+/g, "")}`}
                >
                  <LazyLoadedImage image={item.img} alt={item.type} />
                </Link>
              </div>
              <KitchenLink className="shop-link">Shop Now</KitchenLink>
            </div>
          ))}
        </div>

        <div className="verticalslide">
          <div
            className="d-flex align-items-center justify-content-center"
            style={{ height: "260px" }}
          >
            <h4>
              Up To 50% Off <br />
              single sofa
            </h4>
            <Link to="/homegoods">
              <LazyLoadedImage image={good2} />
            </Link>
          </div>

          <div className="slide-text d-flex flex-column justify-content-between">
            <p>
              Because we care about our customer, we give you exclusive deals{" "}
              <br /> you cannot find anywhere, Look through our variety of
              options
            </p>
            <ShopNowLink to="/livingroom-equipments" className="align-self-end">
              Shop Now
            </ShopNowLink>
          </div>
        </div>
      </article>

      <article className="homegoodlist__secondrow">
        {homegoods.items2.map((item, index) => (
          <div key={index}>
            <Link to={item.path}>
              <LazyLoadedImage image={item.img} />
            </Link>
            <h5>{item.type}</h5>
          </div>
        ))}
      </article>

      <article className="homegoodlist__thirdrow">
        <Link to="/livingroom-equipments">
          <LazyLoadedImage image={good6} />
        </Link>
        <h5>Living room</h5>
      </article>

      <SlidesWrapper>
        <Slides />
      </SlidesWrapper>
    </SectionWrapper>
  );
};

const NavWrapper = styled.article`
  width: 34vw;
  margin: 2rem auto 4rem auto;

  ul {
    display: flex;
    justify-content: space-around;

    li a {
      font-size: 1.5rem;
      color: #000;
      text-decoration: none;
      padding: 0.1rem 2rem;
    }
  }

  .active {
    text-decoration: underline;
  }
`;

export const ShopNowLink = styled(ProductLink)`
  border: 2px solid #000;
  color: #000 !important;
  font-size: 1.3rem;
  padding: 4px 3rem;
`;

const KitchenLink = styled(ShopNowLink)`
  padding: 2px 20px;
`;

const SectionWrapper = styled.section`
  width: 88vw;
  margin: 0 auto 4rem auto;

  & .homegoodlist__firstrow {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    margin-bottom: 4rem;

    & .items__container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr;
      gap: 1rem;

      .item {
        background-color: #f7f7f7;
        text-decoration: none;
        color: #333;
        position: relative;

        .shop-link {
          position: absolute;
          bottom: 15px;
          left: 25px;
        }
      }
    }

    h5 {
      font-size: 1.5rem;
      font-family: pioneer10;
      margin-bottom: 0;
    }

    .verticalslide {
      background-color: #d6dfd2;

      h4 {
        color: #fff;
        font-size: 3rem;
        font-weight: 800;
      }

      .slide-text {
        background: #fff;
        font-size: 1.45rem;
        line-height: 1.3;
        padding: 2rem 3rem 0 3rem;
        width: 90%;
        margin: 0 auto;
        height: 105px;
        position: relative;
        top: 1rem;

        p {
          font-size: 1.3rem;
          font-family: "Open Sans", sans-serif;
        }
      }
    }
  }

  & .homegoodlist__secondrow {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    column-gap: 2rem;
    margin-bottom: 2rem;

    > div {
      text-align: center;
      background: #f1f5f8;
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;

      img {
        width: 100%;
      }

      h5 {
        font-size: 1.4rem;
        padding-top: 1rem;
        padding-bottom: 1rem;
        font-family: "Open Sans" sans-serif;
        text-transform: uppercase;
      }
    }
  }

  & .homegoodlist__thirdrow {
    position: relative;
    margin-bottom: 2rem;

    img {
      width: 100%;
    }

    h5 {
      position: absolute;
      top: 2rem;
      font-size: 3rem;
      font-family: pioneer10;
      left: 48%;
      color: #fff;
    }
  }
`;

const SlidesWrapper = styled.article`
  background-color: #f7f7f7;
  border-radius: 10px;
  padding: 1rem;
`;

export default HomeGoodsList;
