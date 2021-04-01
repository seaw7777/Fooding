import axios from 'axios';
import { SERVER } from 'Config.js';

export function fetchInfluencer(user_id) {
  return axios.get(`${SERVER}recommend/recommenduser/${user_id}/`);
}
