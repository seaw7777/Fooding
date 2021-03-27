import axios from 'axios';
import { SERVER } from 'Config.js';

export function fetchUserInfo(user_id) {
  return axios.get(`${SERVER}accounts/userInfo/${user_id}`);
}

export function fetchUserFollow(user_id) {
  return axios.get(`${SERVER}accounts/followerInfo/${user_id}`);
}

export function fetchUserFollowing(user_id) {
  return axios.get(`${SERVER}accounts/followingInfo/${user_id}`);
}
