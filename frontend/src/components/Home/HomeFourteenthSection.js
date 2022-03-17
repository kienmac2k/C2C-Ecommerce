import React from "react";
import { Link } from "react-router-dom";

const HomepageFourteenthSection = () => (
  <div id="homepageFourteenthSection">
    <div>
      <h1>The Monkhey Effect</h1>
      <p>
        Monkhey is a multivendor marketplace that provides specially selected
        services and products at exclusively cost saving deals. Our scalable
        business model deploys innovative strategies, agile business processes
        and technology, good culture and skilled professionals who deliver
        efficiency for the realization of the goals of the market place. Our
        exquisite customer centric operation is driven by our goal to deliver
        convenience and satisfaction to our customer while continuously
        improving our process to offer a truly breathtaking shopping experience.
      </p>
      <Link to="/">Come experience the new world of shopping</Link>
    </div>
    <div>
      <h5>Subscribe here and get the latest Monkhey update</h5>
      <div>
        <form className="d-flex">
          <input type="text" placeholder="Enter Email Address" />
          <button type="submit">Subscribe</button>
        </form>
      </div>
    </div>
  </div>
);

export default HomepageFourteenthSection;
