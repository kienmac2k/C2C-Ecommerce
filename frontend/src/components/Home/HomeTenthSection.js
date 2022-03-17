import React from "react";
import styled from "styled-components";

const HomepageTenthSection = () => (
  <div id="homepageTenthSection">
    <div className="flex_container">
      <div className="item_1">
        <div>
          <img
            src={require("../../assets/img/moreagile.png")}
            alt="More Agile"
          />
        </div>
        <div>
          <h5>... your virtual assistance</h5>
          <p>
            Every Great Business <br /> thrives with the support <br /> of an
            international <br /> matched Agile office
          </p>

          <ServiceLink
            href="https://taskbar.ecscorppoc.com/"
            className="button"
            target="_blank"
          >
            Start Now
          </ServiceLink>
        </div>
      </div>
      <div className="item_2">
        <div>
          <img
            src={require("../../assets/img/learningcentre.png")}
            alt="Learning center"
          />
        </div>

        <div>
          <h6>
            Explore the world of learning <br /> and improve your skills
          </h6>
          <ServiceLink
            href="https://cobraine.ecscorppoc.com/"
            className="button"
            target="_blank"
          >
            Start Now
          </ServiceLink>
        </div>
      </div>
    </div>
  </div>
);

export const ServiceLink = styled.a`
  font-size: 1.4rem;
  border: 2px solid #000;
  text-align: center;
  padding: 0.8rem 2.5rem;
  color: #333;
  text-decoration: none;

  &:hover {
    text-decoration: none;
    color: #333;
  }
`;

export default HomepageTenthSection;
