import {combineReducers, createStore, applyMiddleware} from 'redux';
import {storeReducer} from './services/store';
import {loginReducer} from './services/login';
import thunk from 'redux-thunk';

// combine reducer
export const rootReducer = combineReducers({
  store: storeReducer,
  login: loginReducer
});

export default function configStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk)
  );
}

export const initialState = {
  store: {
    loading: 0,
    data: [],
    error: null
  },
  login: {
    loading: 0,
    loggedIn: false,
    error: null,
    token: null,
    profile: null
  }
};
