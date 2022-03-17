import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const LazyLoadedImage = ({ image }) => (
  <div>
    <LazyLoadImage
      style={{ width: "100%" }}
      alt="home goods"
      src={image}
      effect="blur"
    />
  </div>
);

export default LazyLoadedImage;
