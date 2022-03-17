import React from "react";
import spinner from "../../../assets/img/spinner.gif";
import "./Spinner.css";

const Spinner = () => {
  return (
    <>
      <div className="spinner">
        <img src={spinner} alt="" />
      </div>
    </>
  );
};

export default Spinner;
