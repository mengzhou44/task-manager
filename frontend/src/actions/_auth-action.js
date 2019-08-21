import httpService from "../_utils/http-service";
import * as types from "./types";
import { getAuthHttpConfig } from "../_utils/auth-utils";

const dispatchAfterSignInSuccess = ({ user, token }, dispatch) => {
  dispatch({
    type: types.SIGN_IN_SUCCESS,
    payload: user
  });

  dispatch({
    type: types.SET_ITEM,
    payload: {
      key: "authToken",
      value: token
    }
  });
};

export const setSignUpData = data => {
  return { type: types.SET_SIGNUP_DATA, payload: data };
};

export const checkEmailExists = (email, callback) => {
  return function() {
    httpService
      .post("/email", {
        email
      })
      .then(res => {
        if (res.status === 200) {
          callback({ success: true, existed: res.data.existed });
        } else {
          callback({ success: false });
        }
      })
      .catch(err => {
        callback({ success: false });
      });
  };
};

export const sendEmailVerificationRequest = (email, callback) => {
  return function(dispatch) {
    httpService
      .post("/email/request-verify", {
        email
      })
      .then(res => {
        callback({ success: res.status === 200 });
      })
      .catch(err => {
        callback({ success: false });
      });
  };
};

export const forgotPassword = (email, callback) => {
  return function(dispatch) {
    httpService
      .post("/password/request-reset", {
        email
      })
      .then(res => {
        if (res.status === 200) {
          callback({ success: true });
        } else {
          callback({ success: false });
        }
      })
      .catch(err => {
        callback({ success: false });
      });
  };
};

export const resetPassword = ({ newPassword, token }, callback) => {
  return function(dispatch) {
    httpService
      .post("/password/reset", {
        newPassword,
        token
      })
      .then(res => {
        debugger;
        callback({ success: res.status === 200 });
      })
      .catch(err => {
        debugger;
        callback({ success: false });
      });
  };
};

export const verifyEmail = ({ email, token }, callback) => {
  return function(dispatch) {
    httpService
      .post("/email/verify", {
        email,
        token
      })
      .then(res => {
        if (res.status === 200) {
          callback({ success: true, verified: res.data.verified });
        } else {
          callback({ success: false });
        }
      })
      .catch(err => {
        callback({ success: false });
      });
  };
};

export const signUp = (signUpMethod, signUpData, callback) => {
  let path = "/signup";
  if (signUpMethod === "social") {
    path = "/signup/social";
  }
  return function(dispatch) {
    httpService
      .post(path, signUpData)
      .then(res => {
        if (res.status === 200) {
          dispatchAfterSignInSuccess(res.data, dispatch);
          callback({ success: true });
        } else {
          callback({ success: false, message: res.data.message });
        }
      })
      .catch(err => {
        callback({ success: false, message: "Sorry, can not sign up" });
      });
  };
};

export const signIn = (signInMethod, signInData, callback) => {
  let path = "/signin";
  if (signInMethod === "social") {
    path = "/signin/social";
  }

  return function(dispatch) {
    httpService
      .post(path, signInData)
      .then(res => {
        if (res.status === 200) {
          dispatchAfterSignInSuccess(res.data, dispatch);
          callback({ success: true });
        } else {
          callback({ success: false, message: res.data.message });
        }
      })
      .catch(err => {
        callback({ success: false, message: "Sorry, can not sign in" });
      });
  };
};

export const signOut = callback => {
  return function(dispatch) {
    httpService
      .post("/signout", null, getAuthHttpConfig())
      .then(res => {
        if (res.status === 200) {
          dispatch({
            type: types.SIGN_OUT_SUCCESS
          });
          dispatch({
            type: types.REMOVE_ITEM,
            payload: "authToken"
          });
          callback({ success: true });
        } else {
          callback({ success: false, message: res.data.message });
        }
      })
      .catch(err => {
        callback({ success: false, message: "Sorry, can not sign out" });
      });
  };
};
