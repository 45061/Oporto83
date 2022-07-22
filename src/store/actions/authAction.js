/* eslint-disable import/prefer-default-export */
import Cookies from "universal-cookie";
import Router from "next/router";
import { hiddeLoginForm, hiddeRegisterForm } from "./modalAction";

import { AUTH_SUCCESS, AUTH_ERROR, LOGOUT, USER_SUCCESS } from "../types";

export const register = (body) => async (dispatch) => {
  try {
    const cookies = new Cookies();
    const response = await fetch(`http://localhost:3000/api/user/signup`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    const { token, message, ...user } = data;
    cookies.set("token", token, { path: "/", maxAge: 3600 * 1000 * 24 });

    // alertify.notify('Usuario registrado con exito', 'success', 5);
    dispatch(hiddeRegisterForm());
    dispatch({ type: AUTH_SUCCESS, payload: user });
  } catch (error) {
    dispatch({ type: AUTH_ERROR, payload: error });
  }
};

export const logout = () => async (dispatch) => {
  Router.push("/");
  const cookies = new Cookies();
  cookies.remove("token");

  dispatch({ type: LOGOUT });
};

export const login =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      const cookies = new Cookies();
      const response = await fetch(`http://localhost:3000/api/user/login`, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      const { token, message, ...user } = data;
      cookies.set("token", token, { path: "/", maxAge: 3600 * 1000 * 24 });

      dispatch(hiddeLoginForm());
      dispatch({ type: AUTH_SUCCESS, payload: data.user });
    } catch (error) {
      dispatch({ type: AUTH_ERROR, payload: error });
    }
  };

export const getUerData = (token) => async (dispatch) => {
  try {
    const response = await fetch(`http://localhost:3000/api/user/signup`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    dispatch({ type: USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: AUTH_ERROR, payload: error.response });
  }
};
