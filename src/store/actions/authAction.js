/* eslint-disable consistent-return */
/* eslint-disable import/prefer-default-export */
import Cookies from "universal-cookie";
import Router from "next/router";
import { toast } from "react-toastify";
import { hiddeLoginForm, hiddeRegisterForm } from "./modalAction";
import { AUTH_SUCCESS, AUTH_ERROR, LOGOUT, USER_SUCCESS } from "../types";

const url = process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URI;

export const register = (body) => async (dispatch) => {
  try {
    const cookies = new Cookies();
    const response = await fetch(`${url}/api/user/signup`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    const { token, message, ...user } = data;
    cookies.set("token", token, { path: "/", maxAge: 3600 * 1000 * 24 });

    toast.success("Usuario registrado con exito");
    dispatch(hiddeRegisterForm());
    dispatch({ type: AUTH_SUCCESS, payload: user });
  } catch (error) {
    dispatch({ type: AUTH_ERROR, payload: error });
    toast.error("Error en el registro");
  }
};

export const logout = () => async (dispatch) => {
  Router.push("/");
  const cookies = new Cookies();
  cookies.remove("token");
  toast.success("Logout con exito");
  dispatch({ type: LOGOUT });
};

export const login =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      const cookies = new Cookies();
      const response = await fetch(`${url}/api/user/login`, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log("esto es data", response.status);

      const { token } = data;

      if (response.status === 403) {
        return toast.error(response.data.message);
      }
      console.log("error");
      cookies.set("token", token, { path: "/", maxAge: 3600 * 1000 * 24 });
      dispatch(hiddeLoginForm());
      toast.success("Usuario ha realizado login con exito");
      dispatch({ type: AUTH_SUCCESS, payload: data.user });
    } catch (error) {
      dispatch({ type: AUTH_ERROR, payload: error });
      toast.error("Usuario o contraseña errada");
    }
  };

export const getUerData = (token) => async (dispatch) => {
  try {
    const response = await fetch(`${url}/api/user/signup`, {
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
