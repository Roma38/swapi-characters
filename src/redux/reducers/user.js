import {
  STORE_USER_DATA
} from "../actions/user.js";


const userData = JSON.parse(localStorage.getItem('user'));

let initialState = userData ?
  { isLoggedIn: true, ...userData } :
  { isLoggedIn: false };

export const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case STORE_USER_DATA:
      localStorage.setItem('user', JSON.stringify(payload));
      return { isLoggedIn: true, ...payload };

    default:
      return state;
  }
};
