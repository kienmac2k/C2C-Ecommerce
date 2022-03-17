import api from "./axiosClient";

const prefix = "/user";

const userApi = {
  //Profile
  getProfile: () => {
    return api.get(`${prefix}/profile`);
  },
  //Shop
  getShopList: () => {
    return api.get(`${prefix}/shop`);
  },
  createShop: (data) => {
    return api.post(`${prefix}/shop`, data);
  },
  updateShop: (data, shopId) => {
    return api.put(`${prefix}/shop/${shopId}`, data);
  },
  deleteShop: (shopId) => {
    return api.delete(`${prefix}/shop/${shopId}`);
  },
  //Order
  getOrders: () => {
    return api.get(`${prefix}/order/list`);
  },
  cancelOrder: (data, orderId) => {
    return api.put(`${prefix}/order/${orderId}`, data);
  },
  //Comments
  postComment: (data) => {
    return api.post(`${prefix}/comment`, data);
  },
  deleteComment: (commentId) => {
    return api.delete(`${prefix}/comment/${commentId}`);
  },

  // Product
};

export default userApi;
