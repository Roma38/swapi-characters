import {
  HEROES_LOADING,
  HEROES_LOAD_SUCCEED,
  HEROES_LOAD_FAILED
} from "../actions/heroes.js";

const initialState = {
  loadingState: "",
  error: null,
  items: []
};

export const heroesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case HEROES_LOADING:
      return { ...state, loadingState: "loading" };
    case HEROES_LOAD_SUCCEED:
      return { ...state, loadingState: "succeed", items: payload };
    case HEROES_LOAD_FAILED:
      return {
        ...state,
        loadingState: "failed",
        error: payload,
        items: []
      };

    default:
      return state;
  }
};
