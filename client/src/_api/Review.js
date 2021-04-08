import axios from 'axios';
import { SERVER } from 'Config.js';

export function fetchStoreReview(store_id) {
  return axios.get(`${SERVER}reviews/review_list/${store_id}`);
}

export function fetchUserReview(user_id) {
  return axios.get(`${SERVER}reviews/reviewInfo/${user_id}`);
}

export function postUserReview(review) {
  return axios
    .post(
      `http://j4d107.p.ssafy.io:8000/fooding/reviews/review_write/`,
      review,
      {
        header: {
          'Content-Type': 'multipart/form-data',
        },
      },
    )
    .then(response => response.data);
}
