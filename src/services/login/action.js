import fetch from 'isomorphic-fetch';
import Config from '../../config/';

export const actionType = {
  LOGIN_START: "LOGIN_START",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAIL: "LOGIN_FAIL",
  LOGOUT: "LOGOUT",
  SIGNUP_START: "SIGNUP_START",
  SIGNUP_SUCCESS: "SIGNUP_SUCCESS",
  SIGNUP_FAIL: "SIGNUP_FAIL"
};

function loginStart() {
  return {type: actionType.LOGIN_START};
}

function loginSuccess(token) {
  return {
    type: actionType.LOGIN_SUCCESS,
    token
  };
}

function loginFail(error) {
  return {
    type: actionType.LOGIN_FAIL,
    error
  };
}

function signupStart() {
  return {type: actionType.SIGNUP_START};
}

function signupSuccess(user) {
  return {
    type: actionType.SIGNUP_SUCCESS,
    user
  };
}

function signupFail(error) {
  return {
    type: actionType.SIGNUP_FAIL,
    error
  };
}

function login(email, password) {
  return function (dispatch) {
    console.log('login in ...');
    dispatch(loginStart());
    const options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: email,
        password: password
      })
    };
    fetch(Config.serviceEndpoints.login, options)
      .then((response) => {
        if (response.status == 401) {
          return {
            errorMsg: "Email and password do not match"
          };
        }else if (response.status >= 400) {
          return {
            errorMsg: "Bad response from server"
          };
        }

        return response.json();
      })
      .then((data) => {
        if (data.errorMsg) {
          dispatch(loginFail(data.errorMsg));
        } else {
          console.log(data);
          dispatch(loginSuccess(data.accessToken));
        }

      })
      .catch(err => {
        dispatch(loginFail("Service unavailable"));
      });
  };
}

function logout() {
  return {
    type: actionType.LOGOUT
  };
}

function reset(email) {
  return function (dispatch) {
    console.log('reset password ...');
    const options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: email
      })
    };
    return fetch(Config.serviceEndpoints.reset, options);
  };
}

function changePassword(email, oldPassword, newPassword) {
  return function (dispatch) {
    console.log('changing password ...');
    const options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email,
        oldPassword,
        newPassword
      })
    };
    return fetch(Config.serviceEndpoints.changePassword, options);
  };
}

function signup(email, firstname, lastname, password) {
  return function (dispatch) {
    console.log('signing up ...');
    dispatch(signupStart());
    const options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: email,
        firstname: firstname,
        lastname: lastname,
        password: password
      })
    };
    fetch(Config.serviceEndpoints.signup, options)
      .then((response) => {
      console.log(response);
        if (response.status == 409) {
          return {
            errorMsg: "User with this email already exist"
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
          dispatch(signupFail(data.errorMsg));
        } else {
          console.log(data);
          dispatch(signupSuccess(data));

          console.log('login automatically after signup');
          dispatch(login(email, password));
        }

      })
      .catch(err => {
        dispatch(signupFail("Service unavailable"));
      });
  };
}

export const actions = {
  loginStart: loginStart,
  loginSuccess: loginSuccess,
  loginFail: loginFail,
  login: login,
  logout: logout,
  reset: reset,
  changePassword: changePassword,
  signupStart: signupStart,
  signupSuccess: signupSuccess,
  signupFail: signupFail,
  signup: signup
};