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
      `http://59.23.41.85:8088/fooding/reviews/review_write/`,
      review,
      // 이건 로컬용이다.
      {
        header: {
          'Content-Type': 'multipart/form-data',
        },
      },
    )
    .then(response => response.data);
}
