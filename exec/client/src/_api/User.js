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

export function fetchUserFollowCheck(my_id, follow_id) {
  return axios.get(`${SERVER}accounts/check_follow/${my_id}&&${follow_id}`);
}

export function fetchDeleteUserFollow(my_id, follow_id) {
  return axios.get(`${SERVER}accounts/delete_follower/${my_id}&&${follow_id}`);
}

export function fetchMakeUserFollow(my_id, follow_id) {
  return axios.get(`${SERVER}accounts/make_follower/${my_id}&&${follow_id}`);
}

export function fetchLikeStore(user_id, store_id) {
  return axios.get(`${SERVER}accounts/make_wish/${user_id}&&${store_id}/`);
}

export function fetchDeleteStore(user_id, store_id) {
  return axios.get(`${SERVER}accounts/delete_wish/${user_id}&&${store_id}/`);
}

export function fetchMyLikePlace(user_id) {
  return axios.get(`${SERVER}accounts/select_wish/${user_id}/`);
}
export function updateUserPassword(body) {
  return axios.post(`${SERVER}accounts/change_pw/`, body);
}
