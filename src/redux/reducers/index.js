import { combineReducers } from 'redux';
import { userReducer } from './userReducer.ts';
import { searchReducer } from './searchReducer.ts';
export const rootReducer = combineReducers({
  user: userReducer,
  search: searchReducer,
});
