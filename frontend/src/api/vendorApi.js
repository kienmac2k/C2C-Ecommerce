import api from "./axiosClient";

const prefix = "/vendor";

const vendorApi = {
  getOrderOfShop: (shopId) => {
    return api.get(`${prefix}/order/${shopId}/list`);
  },
  // Product :
  createProduct: (data) => {
    return api.post(`${prefix}/product`, data);
  },
  updateProduct: (id, data) => {
    return api.put(`${prefix}/product/${id}`, data);
  },
  deleteProduct: (id) => {
    return api.delete(`${prefix}/product/${id}`);
  },
  //Order :
  updateOrder: (id, data) => {
    return api.put(`${prefix}/order/${id}`, data);
  },
};
export default vendorApi;
