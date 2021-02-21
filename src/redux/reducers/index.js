import { combineReducers } from "redux";
import { userReducer as user } from "./user";
import { heroesReducer as heroes } from "./heroes";

const rootReducer = combineReducers({
  user,
  heroes
});

export default rootReducer;
