import axios from "axios";
import store from "../storage";
import router from "@/app.routes";

const config = {
  timeout: 5000,
  baseURL: "/", // 开发环境
};

class Http {
  service;
  constructor(config) {
    this.service = axios.create(config);

    /* 请求拦截 */
    this.service.interceptors.request.use(
      (config) => {
        const token = store.getters.getToken;
        if (token) {
          config.headers.authorization = "Bearer " + token;
        } else if (router.currentRoute.value.path !== "/login") {
          router.push("/login");
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    /* 响应拦截 */
    this.service.interceptors.response.use(
      (response) => {
        return response.data;
      },
      (error) => {
        console.log(error.response.data.message);
        return Promise.reject(error);
      }
    );
  }

  get(url, params, _object = {}) {
    return this.service.get(url, { params, ..._object });
  }

  post(url, params, _object = {}) {
    return this.service.post(url, params, _object);
  }

  put(url, params, _object = {}) {
    return this.service.put(url, params, _object);
  }

  delete(url, params, _object = {}) {
    return this.service.delete(url, { params, ..._object });
  }
}

export default new Http(config);
