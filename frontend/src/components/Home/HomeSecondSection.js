import React from "react";
import { Link } from "react-router-dom";

const IndexSecondSection = () => (
  <section className="indexSecondSection">
    <article>
      <Link to="/">
        <img src={require("../../assets/img/30.png")} alt="advertisement" />
      </Link>
    </article>
    <article>
      <Link to="/">
        <img
          src={require("../../assets/img/create-account.png")}
          alt="create account"
        />
      </Link>
      <Link to="/">
        <img
          src={require("../../assets/img/best-price.png")}
          alt="best price"
        />
      </Link>
    </article>
  </section>
);

export default IndexSecondSection;
