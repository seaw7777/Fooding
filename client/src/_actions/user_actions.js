import axios from 'axios';
import { LOGIN_USER } from './types';
import { SERVER } from 'Config.js';

export function loginUser(dataToSubmit) {
  const request = axios
    .post(`http://localhost:8000/accounts/login/`, dataToSubmit)
    .then(res => res.data)
    .catch(err => console.log(err));
  return {
    type: LOGIN_USER,
    payload: request,
  };
}
