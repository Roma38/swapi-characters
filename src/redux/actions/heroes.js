import axios from "axios";
import { API_HOST } from "../../constants";

export const HEROES_LOADING = "HEROES_LOADING";
export const HEROES_LOAD_SUCCEED = "HEROES_LOAD_SUCCEED";
export const HEROES_LOAD_FAILED = "HEROES_LOAD_FAILED";
export const TOGGLE_FAVORITE = "TOGGLE_FAVORITE";

export const heroesLoadStart = () => ({ type: HEROES_LOADING });

export const heroesLoadSucceed = payload => ({
  type: HEROES_LOAD_SUCCEED,
  payload
});

export const heroesLoadFailed = error => ({
  type: HEROES_LOAD_FAILED,
  payload: error
});

export const getHeroes = (page = 1) => dispatch => {
  dispatch(heroesLoadStart());
  axios
    .get(`${API_HOST}/people/?page=${page}`)
    .then(({ data }) => dispatch(heroesLoadSucceed(data)))
    .catch(error => dispatch(heroesLoadFailed(error)));
};

export const toggleFavorite = url => ({
  type: TOGGLE_FAVORITE,
  payload: url
});

