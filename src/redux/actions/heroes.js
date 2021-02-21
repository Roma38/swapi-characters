import axios from "axios";
import { API_HOST } from "../../constants";

export const HEROES_LOADING = "HEROES_LOADING";
export const HEROES_LOAD_SUCCEED = "HEROES_LOAD_SUCCEED";
export const HEROES_LOAD_FAILED = "HEROES_LOAD_FAILED";
export const ADD_HERO = "ADD_HERO";
export const EDIT_HERO = "EDIT_HERO";
export const DELETE_HERO = "DELETE_HERO";

export const heroesLoadStart = () => ({ type: HEROES_LOADING });

export const heroesLoadSucceed = payload => ({
  type: HEROES_LOAD_SUCCEED,
  payload
});

export const heroesLoadFailed = error => ({
  type: HEROES_LOAD_FAILED,
  payload: error
});

export const getHeroes = (page = 1, search) => dispatch => {
  dispatch(heroesLoadStart());
  axios
    .get(`${API_HOST}/people/?${search ? 'search=' + search + '&' : ''}page=${page}`)
    .then(({ data }) => dispatch(heroesLoadSucceed(data)))
    .catch(error => dispatch(heroesLoadFailed(error)));
};
