import React from "react";
import { Pagination } from "antd";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'

const ProductPagination = () => {
  return (
    <section className="d-flex justify-content-center my-5">
      <Pagination defaultCurrent={1} total={50} />
    </section>
  );
};

export default ProductPagination;
