import React from "react";
import LazyLoadedImage from "../components/Lazyload";

const HomeGood = ({ homegood }) => {
  return (
    <div className="good">
      <div className="d-flex align-items-center flex-grow-1">
        <LazyLoadedImage image={homegood.img} />
      </div>
      <div className="good__type__price">
        <h5 className="good__type">{homegood.type}</h5>
        <p className="good__price">{homegood.price}</p>
      </div>
    </div>
  );
};

export default HomeGood;
