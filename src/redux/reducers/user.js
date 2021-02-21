import {
  STORE_USER_DATA
} from "../actions/user.js";

const initialState = {
  isLoggedIn: false,
};

export const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case STORE_USER_DATA:
      return { isLoggedIn: true, ...payload };

    default:
      return state;
  }
};
