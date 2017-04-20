/**
 * Created by ypeng on 2017-04-19.
 */
/**
 * Created by yangtuopeng on 2017-03-29.
 */
import {actionType} from './action';

const init = {
  loading: 0,
  loggedIn: false,
  error: null,
  token: null,
  profile: null
};

export default function loginReducer(state = init, action) {
  switch (action.type) {
    case actionType.LOGIN_START:
      return Object.assign({}, state, {
        loading: 1
      });

    case actionType.LOGIN_SUCCESS:
      return Object.assign({}, state, {
        loading: 0,
        error: null,
        loggedIn: true,
        token: action.token
      });

    case actionType.LOGIN_FAIL:
      return Object.assign({}, state, {
        loading: 0,
        loggedIn: false,
        error: action.error
      });

    case actionType.LOGOUT:
      return Object.assign({}, state, {
        error: null,
        profile: null,
        loggedIn: false,
        token: null,
      });

    case actionType.SIGNUP_START:
      return Object.assign({}, state, {
        loading: 1
      });

    case actionType.SIGNUP_SUCCESS:
      return Object.assign({}, state, {
        loading: 0
      });

    case actionType.SIGNUP_FAIL:
      return Object.assign({}, state, {
        loading: 0,
        error: action.error
      });

    default:
      return state;
  }
}
