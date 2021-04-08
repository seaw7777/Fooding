import axios from 'axios';
import { SERVER } from 'Config.js';

export function fetchInfluencer(user_id) {
  return axios.get(`${SERVER}recommend/recommenduser/${user_id}/`);
}
export function fetchAccompany(body) {
  return axios.post(`${SERVER}recommend/recommendcompanion/`, body);
}
export function fetchRecommendStore(user_id) {
  return axios.get(`${SERVER}recommend/recommendstore/${user_id}`);
}
