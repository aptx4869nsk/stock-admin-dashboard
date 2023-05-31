import Http from "@/api/http";
import Api from "@/api.routes";

/** 登录api */
export function login(data) {
  return Http.post(Api.login, data);
}

// /** 获取用户信息Api */
// export function getInfoApi(data) {
//   return request({
//     url: "/user/info",
//     method: "post",
//     baseURL: "/mock",
//     data,
//   });
// }

// /** 退出登录Api */
// export function loginOutApi() {
//   return request({
//     url: "/user/out",
//     method: "post",
//     baseURL: "/mock",
//   });
// }

// /** 获取用户信息Api */
// export function passwordChange(data) {
//   return request({
//     url: "/user/passwordChange",
//     method: "post",
//     baseURL: "/mock",
//     data,
//   });
// }

// /** 获取登录后需要展示的菜单 */
// export function getMenuApi() {
//   return request({
//     url: "/menu/list",
//     method: "post",
//     baseURL: "/mock",
//   });
// }
