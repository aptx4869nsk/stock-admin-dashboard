import Http from "@/api/http";
import Api from "@/api.routes";

export function getCnStocks(params) {
  return Http.get(Api.stocks, params);
}
