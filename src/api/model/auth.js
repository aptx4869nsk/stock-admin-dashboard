import Http from "../http";
import Api from "@/api.routes";

export const login = function (loginForm) {
  return Http.post(Api.login, loginForm);
};
