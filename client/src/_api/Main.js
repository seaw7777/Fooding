import axios from 'axios';
import { SERVER } from 'Config.js';

export function fetchInfluencer(user_id) {
  return axios.get(`${SERVER}main/influencerList/${user_id}`);
}

export function fetchUserInfo(user_id) {
  return axios.get(`${SERVER}accounts/userInfo/${user_id}`);
}
