import api from "./axiosClient";

const prefix = "/public";
const publicApi = {
  // Authentication
  signIn: (data) => {
    return api.post(`${prefix}/auth/signin`, data);
  },
  signUp: (data) => {
    return api.post(`${prefix}/auth/signup`, data);
  },

  // Category
  getCategories: () => {
    return api.get(`${prefix}/category/list`);
  },
  getCategoryById: (id) => {
    return api.get(`${prefix}/category/${id}/detail`);
  },
  getCategoriesByOrder: (order) => {
    return api.get(`${prefix}/category/listByOrder`, { params: { order } });
  },
  getSubCategory: (id) => {
    return api.get(`${prefix}/category/${id}/list`);
  },
  //Product
  getProducts: (page = 1, pageSize = 100) => {
    return api.get(`${prefix}/product/list`, { params: { page, pageSize } });
  },
  getProductById: (id) => {
    return api.get(`${prefix}/product/${id}/detail`);
  },
  getProductsByCategory: (id, page = 1, pageSize = 100) => {
    return api.get(`${prefix}/product/category/${id}/list`, {
      params: { page, pageSize },
    });
  },
  getProductsByVendor: (id, page = 1, pageSize = 100) => {
    return api.get(`${prefix}/product/vendor/${id}/list`, {
      params: { page, pageSize },
    });
  },
  searchProduct: (slug, page = 1, pageSize = 100) => {
    return api.get(`${prefix}/product/search`, {
      params: { slug, page, pageSize },
    });
  },
  //Vendor
  getVendors: (page, pageSize) => {
    return api.get(`${prefix}/vendor/list`, { params: { page, pageSize } });
  },
  getVendorById: (id) => {
    return api.get(`${prefix}/vendor/${id}/detail`);
  },
  //Order
  createOrder: (data) => {
    return api.post(`${prefix}/order`, data);
  },
  trackOrder: (id, mobile) => {
    return api.get(`${prefix}/order/trackOrder`, { params: { id, mobile } });
  },
  //Comments
  getCommentsOfProduct: (id) => {
    return api.get(`${prefix}/comment/${id}`);
  },
};
export default publicApi;
