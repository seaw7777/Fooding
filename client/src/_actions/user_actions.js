import axios from 'axios';
import { REGISTER_USER } from './types';
import { SERVER } from 'Config.js';

export function registerUser(dataToSubmit) {
  const request = axios
    .post(`${SERVER}accounts/signup/`, dataToSubmit)
    .then(response => response.data);

  return {
    type: REGISTER_USER,
    payload: request,
  };
}
