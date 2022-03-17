import React from "react";
import { Helmet } from "react-helmet";
import FadeIn from "react-fade-in";
import {
  GRID,
  EQUALGRID,
  Select,
  TextInput,
} from "../../../components/Globals/FormControls";
import ChangePassword from "../Settings/ChangePassword";
import styled from "styled-components";
import icon from "../../../assets/img/99.png";
import ShopNav from "../Shops/ShopDetail/ShopDashboard";
import { useParams } from "react-router-dom";
const Settings = () => {
  const { shopId } = useParams();
  return (
    <>
      <FadeIn transitionDuration="600">
        <Helmet>
          <title>dashboard</title>
        </Helmet>

        <ShopNav shopId={shopId} />

        <FirstSection>
          <h4>Settings</h4>
        </FirstSection>
        <SettingsWrapper className="settingsFirstSection">
          <div>
            <h5>Edit Profile</h5>
            <form>
              <GRID>
                <TextInput placeholder="Shop name" />
              </GRID>

              <EQUALGRID>
                <TextInput type="text" placeholder="Email" />
                <TextInput type="text" placeholder="Mobile" />
              </EQUALGRID>

              <GRID className="address">
                <TextInput type="email" placeholder="Address" />
              </GRID>

              <article>
                <button type="submit">Update Details</button>
              </article>
            </form>
          </div>
        </SettingsWrapper>
      </FadeIn>
    </>
  );
};

const FirstSection = styled.section`
  border-bottom: 1px solid #ddd;
  width: 90vw;
  margin: 8rem auto 4rem auto;

  h4 {
    font-size: 2.5rem;
    font-weight: bold;
    margin-left: 4rem;
    margin-bottom: 2rem;
  }
`;

const SettingsWrapper = styled.section`
  width: 45vw;
  margin-left: 10rem;
  margin-top: 2rem;
  margin-bottom: 2rem;
  @media (max-width: 992px) {
    width: 70vw;
    margin: 2rem auto 2rem auto;
  }

  h5 {
    font-weight: bold;
    font-size: 1.6rem;
    color: #000;
  }

  p {
    font-size: 1.7rem;
    padding-bottom: 1rem;
    color: #0c74c4;
    font-family: "Open Sans", sans-serif;
  }

  a {
    font-size: 1.5rem;
    text-decoration: none;
    font-weight: 600;
    color: #0c74c4;
    display: inline-block;
    margin-bottom: 4rem;
    padding: 0.5rem 1.5rem;

    &:hover {
      font-size: 1.5rem;
      text-decoration: none;
      font-weight: 600;
      color: #0c74c4;
    }

    &:not(:last-child) {
      margin-right: 4rem;
    }
  }

  button {
    color: #fff;
    background-color: #094a6a;
    border: none;
    text-decoration: none;
    text-align: center;
    display: inline-block;
    font-size: 1.5rem;
    padding: 0.8rem 4rem;
    font-family: "Open Sans", sans-serif;
    border-radius: 4px;
  }

  select {
    background: url(${icon});
    background-repeat: no-repeat;
    background-position: 95% center;
  }

  .address {
    margin-bottom: 3rem;
  }
`;

export default Settings;
