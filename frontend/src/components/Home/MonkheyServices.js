import React from "react";
import { ServiceLink } from "../Globals/Styled";

const MonkheyServices = ({ service }) => {
  const { banner, text, linktext, path } = service;
  return (
    <article className="service ">
      <div className="service__banner">
        <img
          className="service__banner-image"
          src={banner}
          alt="monkhey service"
        />
      </div>
      <div className="service__description">
        <p className="service__description-text">{text}</p>
        <ServiceLink
          target="_blank"
          href={path}
          className="service__description-link"
        >
          {linktext}
        </ServiceLink>
      </div>
    </article>
  );
};

export default MonkheyServices;
