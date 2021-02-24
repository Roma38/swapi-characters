import {
  HEROES_LOADING,
  HEROES_LOAD_SUCCEED,
  HEROES_LOAD_FAILED,
  TOGGLE_FAVORITE
} from "../actions/heroes.js";

const initialState = {
  loadingState: '',
  error: null,
  items: [],
  favorite: JSON.parse(localStorage.getItem('favorite')) || []
};

export const heroesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case HEROES_LOADING:
      return { ...state, loadingState: 'loading' };
    case HEROES_LOAD_SUCCEED:
      return { ...state, loadingState: 'succeed', items: payload };
    case HEROES_LOAD_FAILED:
      return {
        ...state,
        loadingState: 'failed',
        error: payload,
        items: []
      };
    case TOGGLE_FAVORITE:
      const index = state.favorite.indexOf(payload);
      const favorite = [...state.favorite];
      index === -1 ?
        favorite.push(payload) :
        favorite.splice(index, 1);
      localStorage.setItem('favorite', JSON.stringify(favorite));
      return { ...state, favorite };

    default:
      return state;
  }
};
