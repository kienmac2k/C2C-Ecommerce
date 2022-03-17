import React from "react";
import { Helmet } from "react-helmet";
import FadeIn from "react-fade-in";
import {
  EQUALGRID,
  Select,
  TextInput,
} from "../../../components/Globals/FormControls";
import styled from "styled-components";
import icon from "../../../assets/img/99.png";
import DashboardNav from "../Dashboard/DashboardNav";

const Withdrawals = () => {
  return (
    <>
      <FadeIn transitionDuration="600">
        <Helmet>
          <title>dashboard</title>
        </Helmet>

        <DashboardNav />

        <FirstSection>
          <h4>WithDraw Funds</h4>
        </FirstSection>
        <SettingsWrapper className="settingsFirstSection">
          <div>
            <h5>Make a Request</h5>
            <form>
              <EQUALGRID>
                <Select>
                  <option value="Country">Select Bank</option>
                </Select>
                <TextInput placeholder="Account Name" />
              </EQUALGRID>

              <EQUALGRID>
                <TextInput type="text" placeholder="Account Number" />
                <TextInput type="text" placeholder="Business Name" />
              </EQUALGRID>

              <article>
                <button type="submit">Submit Request</button>
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
    font-size: 1.8rem;
    color: #000;
    margin-bottom: 1rem;
  }

  button {
    color: #fff;
    background-color: #094a6a;
    border: none;
    text-decoration: none;
    text-align: center;
    display: inline-block;
    font-size: 1.7rem;
    padding: 0.8rem 3rem;
    font-family: "Open Sans", sans-serif;
    border-radius: 4px;
    margin-top: 1.5rem;
  }

  select {
    background: url(${icon});
    background-repeat: no-repeat;
    background-position: 95% center;
  }
`;

export default Withdrawals;
