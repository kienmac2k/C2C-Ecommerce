import React from "react";

const MonkheyServices = ({ service }) => {
  return (
    <div className="service__container">
      <div>
        <div>
          <img src={service.img} alt={service.title} />
        </div>
      </div>
      <div>
        <div></div>
        <div className="service__content">
          <p>{service.content}</p>
          <a target="_blank" rel="noopener noreferrer" href={service.path}>
            <img src={service.url} alt={`Goto ${service.title}`} />
          </a>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default MonkheyServices;
