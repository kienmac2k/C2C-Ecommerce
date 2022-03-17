import React, { useState } from "react";
import { FaArrowCircleUp } from "react-icons/fa";

const ScrollArrow = () => {
  const [showScroll, setShowScroll] = useState(false);

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 3000) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 3000) {
      setShowScroll(false);
    }
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  window.addEventListener("scroll", checkScrollTop);

  return (
    <div className="backtoTopContainer">
      <FaArrowCircleUp
        className="scrollTop"
        onClick={scrollTop}
        style={{ height: 40, display: showScroll ? "flex" : "none" }}
      />
    </div>
  );
};

export default ScrollArrow;

// import React, { useState } from "react";
// // import { FaArrowCircleUp } from "react-icons/fa";
// import backtomonkheyimg from "../assets/img/home/bact2monkhey.png";
// import { Tooltip } from "@chakra-ui/core";

// const ScrollArrow = () => {
//   const [showScroll, setShowScroll] = useState(false);

//   const checkScrollTop = () => {
//     if (!showScroll && window.pageYOffset > 3000) {
//       setShowScroll(true);
//     } else if (showScroll && window.pageYOffset <= 3000) {
//       setShowScroll(false);
//     }
//   };

//   const scrollTop = () => {
//     // window.scrollTo({ top: 0, behavior: "smooth" });
//     window.location.href = "http://www.w3schools.com";
//   };

//   window.addEventListener("scroll", checkScrollTop);

//   return (
//     <div className="backtoTopContainer">
//       <Tooltip label="back to monkhey">
//         <span
//           className="scrollTop"
//           onClick={scrollTop}
//           style={{ display: showScroll ? "flex" : "none" }}
//         >
//           <img src={backtomonkheyimg} alt="back to monkhey" />
//         </span>
//       </Tooltip>
//     </div>
//   );
// };

// export default ScrollArrow;
