import fetch from 'isomorphic-fetch';
import Config from '../../config/';

export const actionType = {
  SEARCH_STORE_START: "SEARCH_STORE_START",
  SEARCH_STORE_SUCCESS: "SEARCH_STORE_SUCCESS",
  SEARCH_STORE_FAIL: "SEARCH_STORE_FAIL"
};

function searchStoreStart() {
  return {type: actionType.SEARCH_STORE_START};
}

function searchStoreSuccess(stores) {
  return {
    type: actionType.SEARCH_STORE_SUCCESS,
    stores
  };
}

function searchStoreFail(error) {
  return {
    type: actionType.SEARCH_STORE_FAIL,
    error
  };
}

function searchStore(query, token) {
  return function (dispatch) {
    console.log("searching store with query: "+query);
    dispatch(searchStoreStart());
    const options = {
      headers: {'Authorization': `Bearer ${token}`}
    };

    fetch(`${Config.serviceEndpoints.stores}?q=${query}`, options)
      .then((response) => {
        if (response.status == 401) {
          return {
            errorMsg: "Unauthorized request"
          };
        } else if (response.status >= 400) {
          return {
            errorMsg: "Bad response from server"
          };
        }

        return response.json();
      })
      .then((data) => {
        if (data.errorMsg) {
          dispatch(searchStoreFail(data.errorMsg));
        } else {
          console.log(data);
          dispatch(searchStoreSuccess(data.result));
        }

      })
      .catch(err => {
        dispatch(searchStoreFail("Service unavailable"));
      });
  };
}


export const actions = {
  searchStoreStart: searchStoreStart,
  searchStoreSuccess: searchStoreSuccess,
  searchStoreFail: searchStoreFail,
  searchStore: searchStore
};