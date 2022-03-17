import axios from "axios";
import queryString from "query-string";
import { tokenHelper } from "../utils/helper";
import { REACT_APP_BACKEND_URL } from "../utils/constants";
// create an axios object with custom config
const axiosClient = axios.create({
  baseURL: REACT_APP_BACKEND_URL + "/api/",
  headers: {
    "content-type": "application/json",
  },

  // convert params from object into a string
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = tokenHelper.get();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    // handle error here
    return Promise.reject(error);
  }
);

export default axiosClient;
