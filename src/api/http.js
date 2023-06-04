import axios from "axios";
import store from "@/store";
import { ElMessage } from "element-plus";
const baseURL = process.env.VUE_APP_API_URL;

const config = {
  timeout: 5000,
  baseURL: baseURL, // 开发环境
};

class Http {
  service;
  constructor(config) {
    this.service = axios.create(config);

    /* 请求拦截 */
    this.service.interceptors.request.use(
      (config) => {
        // JWT鉴权处理
        if (store.getters["user/token"]) {
          config.headers["token"] = store.state.user.token;
        }
        return config;
      },
      (error) => {
        console.log(error); // for debug
        return Promise.reject(error);
      }
    );

    /* 响应拦截 */
    this.service.interceptors.response.use(
      (response) => {
        const res = response.data;
        if (res.status === "success") {
          return res;
        } else {
          showError(res);
          return Promise.reject(res);
        }
      },
      (error) => {
        console.log("error >>> ", error); // for debug
        const badMessage = error.message || error;
        const code = parseInt(
          badMessage
            .toString()
            .replace("Error: Request failed with status code ", "")
        );
        showError({ code, message: badMessage });
        return Promise.reject(error);
      }
    );

    // 错误处理
    function showError(error) {
      // token过期，清除本地数据，并跳转至登录页面
      if (error.code === 403) {
        // to re-login
        store.dispatch("user/loginOut");
      } else {
        ElMessage({
          message: error.msg || error.message || "服务异常",
          type: "error",
          duration: 3 * 1000,
        });
      }
    }
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
