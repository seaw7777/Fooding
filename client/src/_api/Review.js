import axios from 'axios';
import { SERVER } from 'Config.js';

export function fetchStoreReview(store_id) {
  return axios.get(`${SERVER}reviews/review_list/${store_id}`);
}
