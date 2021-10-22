import { combineReducers } from 'redux';
import { userReducer } from './userReducer.ts';
import { searchReducer } from './searchReducer.ts';
import { cartReducer } from './cartReducer.js';
import { drawerReducer } from './drawerReducer';
export const rootReducer = combineReducers({
  user: userReducer,
  search: searchReducer,
  cart: cartReducer,
  drawer: drawerReducer,
});
