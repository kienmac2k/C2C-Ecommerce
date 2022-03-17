import api from "./axiosClient";

const prefix = "/admin";

const adminApi = {
  // Users
  getUserList: () => {
    return api.get(`${prefix}/user/list`);
  },
  updateUser: (id, data) => {
    return api.put(`${prefix}/user/${id}`, data);
  },
  deleteUser: (id) => {
    return api.delete(`${prefix}/user/${id}`);
  },
  // Categories
  createCategory: (data) => {
    return api.post(`${prefix}/category`, data);
  },
  updateCategory: (id, data) => {
    return api.put(`${prefix}/category/${id}`, data);
  },
  deleteCategory: (id) => {
    return api.delete(`${prefix}/category/${id}`);
  },
  createSubCategory: (data) => {
    return api.post(`${prefix}/category/subCategory`, data);
  },

  // Products
  createProduct: (data) => {
    return api.post(`${prefix}/product`, data);
  },
  updateProduct: (id, data) => {
    return api.put(`${prefix}/product/${id}`, data);
  },
  deleteProduct: (id) => {
    return api.delete(`${prefix}/product/${id}`);
  },

  //Orders
  getOrderList: () => {
    return api.get(`${prefix}/order/list`);
  },
  updateOrder: (id, data) => {
    return api.put(`${prefix}/order/${id}`, data);
  },
  deleteOrder: (id) => {
    return api.delete(`${prefix}/order/${id}`);
  },
  //Shops
  deleteShop: (id) => {
    return api.delete(`${prefix}/shop/${id}`);
  },
  updateShop: (id, data) => {
    return api.put(`${prefix}/shop/${id}`, data);
  },
};
export default adminApi;
