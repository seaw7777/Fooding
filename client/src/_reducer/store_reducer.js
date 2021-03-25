import { FETCH_STORE_MAIN, FETCH_STORE_DETAIL } from '../_actions/types';

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_STORE_MAIN:
      return { ...state, Stores: action.payload };

    default:
      return state;
  }
}
