/**
 * Created by ypeng on 2017-04-19.
 */
/**
 * Created by yangtuopeng on 2017-03-29.
 */
import {actionType} from './action';

const init = {
  loading: 0,
  data: [],
  error: null
};

export default function storeReducer(state = init, action) {
  switch (action.type) {
    case actionType.SEARCH_STORE_START:
      return Object.assign({}, state, {
        loading: 1
      });

    case actionType.SEARCH_STORE_SUCCESS:
      return Object.assign({}, state, {
        loading: 0,
        error: null,
        data: action.stores
      });

    case actionType.SEARCH_STORE_FAIL:
      return Object.assign({}, state, {
        loading: 0,
        error: action.error
      });

    default:
      return state;
  }
}
