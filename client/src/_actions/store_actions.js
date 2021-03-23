import axios from 'axios';
import { FETCH_STORE_MAIN } from './types';
import { SERVER } from 'Config.js';

export function fetchStoresMainPage() {
  const request = axios
    .get(`${SERVER}store/list`)
    .then(res => res.data)
    .catch(err => console.log(err));

  return {
    type: FETCH_STORE_MAIN,
    payload: request,
  };
}
