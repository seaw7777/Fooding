import axios from 'axios';
import { SERVER } from 'Config.js';

export function fetchStoresMainPage() {
  return axios.get(`${SERVER}stores/list`);
}
export function StoreDetailInfo(store_id) {
  return axios.get(`${SERVER}stores/detail/${store_id}/`);
}
