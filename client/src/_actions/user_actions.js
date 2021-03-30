import axios from 'axios';
import {
  LOGIN_USER,
  REGISTER_USER,
  LOGOUT_USER,
  CHANGE_USER_ADDRESS,
} from './types';
import { SERVER } from 'Config.js';

export function loginUser(dataToSubmit) {
  const request = axios
    .post(`${SERVER}accounts/login/`, dataToSubmit)
    .then(res => res.data)
    .catch(err => console.log(err));
  return {
    type: LOGIN_USER,
    payload: request,
  };
}
export function registerUser(dataToSubmit) {
  const request = axios
    .post(`${SERVER}accounts/signup/`, dataToSubmit)
    .then(response => response.data);

  return {
    type: REGISTER_USER,
    payload: request,
  };
}

export const logoutUser = () => ({
  type: LOGOUT_USER,
});

export function changeUserInfo(address) {
  console.log(address);
  return {
    type: CHANGE_USER_ADDRESS,
    payload: address,
  };
}
