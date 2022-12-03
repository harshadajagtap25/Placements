import * as types from "./actionTypes";
import axios from "axios";

const signup = (payload) => (dispatch) => {
  dispatch({ type: types.SIGNIN_REQUEST });

  return axios
    .post(`http://localhost:8080/user/signup`, payload)
    .then((r) => {
      dispatch({ type: types.SIGNIN_SUCCESS, payload: r.data });
      return types.SIGNIN_SUCCESS;
    })
    .catch((e) => {
      dispatch({ type: types.SIGNIN_FAILURE, payload: e.msg });
      return types.SIGNIN_FAILURE;
    });
};

const login = (payload) => (dispatch) => {
  dispatch({ type: types.LOGIN_REQUEST });

  return axios
    .post("http://localhost:8080/user/login", payload)
    .then((r) => {
      if (!r.data.error) {
        dispatch({ type: types.LOGIN_SUCCESS, payload: r.data.token });
        return types.LOGIN_SUCCESS;
      } else {
        dispatch({ type: types.LOGIN_FAILURE, payload: r.data.msg });
        return types.LOGIN_FAILURE;
      }
    })
    .catch((err) => {
      dispatch({ type: types.LOGIN_FAILURE, payload: err.data.msg });
      return types.LOGIN_FAILURE;
    });
};

const logout = (payload) => (dispatch) => {
  dispatch({ type: types.LOGOUT_REQUEST });

  dispatch({ type: types.LOGOUT_SUCCESS, payload: undefined });
  return types.LOGOUT_SUCCESS;
};

export { signup, login, logout };
