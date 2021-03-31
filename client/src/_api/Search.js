import axios from 'axios';
import { SERVER } from 'Config.js';

export function fetchSearchStore(store_name) {
  return axios.get(`${SERVER}search/searchstore/${store_name}/`);
}
