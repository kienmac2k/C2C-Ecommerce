import React from "react";

const Benefits = ({ benefit }) => (
  <article className="benefits">
    <img src={benefit.img} alt={benefit.title} />
    <h5>{benefit.title}</h5>
    <p>{benefit.content}</p>
  </article>
);

export default Benefits;
