import { combineReducers } from "redux";
import { pokemonReducer } from "./pokemonReducer";

const reducers = combineReducers({
  allPokemons: pokemonReducer,
});

export default reducers;
