import React from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import FadeIn from "react-fade-in";
import { HALFGRID, TextInput } from "../../../components/Globals/FormControls";

const ChangePassword = () => {
  return (
    <>
      <FadeIn transitionDuration="600">
        <Helmet>
          <title>dashboard</title>
        </Helmet>
        <SettingsWrapper className="settingsFirstSection">
          <div>
            <h5>Change Password</h5>
            <form>
              <HALFGRID>
                <TextInput type="text" placeholder="Current Password" />
              </HALFGRID>

              <HALFGRID>
                <TextInput type="text" placeholder="New Password" />
              </HALFGRID>

              <HALFGRID>
                <TextInput type="text" placeholder="Re-type New Password" />
              </HALFGRID>
            </form>
          </div>
        </SettingsWrapper>
      </FadeIn>
    </>
  );
};

const SettingsWrapper = styled.section`
  width: 45vw;
  @media (max-width: 992px) {
    width: 70vw;
    margin: 0 auto;
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
`;

export default ChangePassword;
