import axios from 'axios';
import { SERVER } from 'Config.js';

export function fetchStoresMainPage() {
  return axios.get(`${SERVER}stores/list`);
}
