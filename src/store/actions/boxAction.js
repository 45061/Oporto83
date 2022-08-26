/* eslint-disable import/prefer-default-export */

import Cookies from "universal-cookie";
import { toast } from "react-toastify";

import {
  showAddCashAction,
  showBoxCreatedAction,
  showBoxSelectAction,
  showWithdrawCashAction,
} from "./modalAction";
import { showChargeAction } from "./dateAction";
import { BOX_CHARGE_SUCCESS, BOX_CLOSED, BOX_BALANCE } from "../types";

export const postBox = (uploadData) => async (dispatch) => {
  try {
    const cookies = new Cookies();
    const token = cookies.get("token");

    const response = await fetch("/api/box", {
      method: "POST",
      body: JSON.stringify(uploadData),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (response.status === 201) {
      dispatch(showBoxCreatedAction());
      dispatch(showChargeAction());
    }
    toast.success("Caja creada con exito");
  } catch (error) {
    toast.error("Caja no Creada");
  }
};

export const openBox = (uploadData) => async (dispatch) => {
  try {
    const cookies = new Cookies();
    const token = cookies.get("token");

    const response = await fetch("/api/box", {
      method: "PUT",
      body: JSON.stringify(uploadData),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    const boxUpload = data.box._id;
    if (response.status === 201) {
      dispatch({ type: BOX_CHARGE_SUCCESS, payload: data.box });
      cookies.set("boxActivity", boxUpload, {
        path: "/",
        maxAge: 3600 * 1000 * 24,
      });
      dispatch(showBoxSelectAction());
      dispatch(showChargeAction());
    }
    toast.success("Caja Abierta con exito");
  } catch (error) {
    toast.error("Caja no Abierta");
  }
};

export const closedBox = (uploadData) => async (dispatch) => {
  try {
    const cookies = new Cookies();
    const token = cookies.get("token");

    const response = await fetch("/api/box", {
      method: "PUT",
      body: JSON.stringify(uploadData),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (response.status === 201) {
      dispatch({ type: BOX_CHARGE_SUCCESS, payload: data.box });
      cookies.remove("boxActivity");
      dispatch({ type: BOX_CLOSED });
      dispatch(showChargeAction());
      toast.success("Caja Cerrada con exito");
    }
  } catch (error) {
    toast.error("Caja no Abierta");
  }
};

export const getBoxData = (uploadData) => async (dispatch) => {
  try {
    const cookies = new Cookies();
    const boxActivity = cookies.get("boxActivity");

    const response = await fetch("/api/box/boxrefresh", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${boxActivity}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    if (response.status === 201) {
      dispatch({ type: BOX_CHARGE_SUCCESS, payload: data.box });
    }
  } catch (error) {
    console.log(error);
  }
};

export const paymentBox = (uploadData) => async (dispatch) => {
  try {
    const cookies = new Cookies();
    const token = cookies.get("token");

    const response = await fetch("/api/box/payment", {
      method: "POST",
      body: JSON.stringify(uploadData),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (response.status === 201) {
      dispatch(showAddCashAction());
      dispatch(showChargeAction());
      toast.success("Pago realizado con exito");
    }
  } catch (error) {
    toast.error("Pago no realizado");
  }
};

export const withdrawBox = (uploadData) => async (dispatch) => {
  try {
    const cookies = new Cookies();
    const token = cookies.get("token");

    const response = await fetch("/api/box/withdraw", {
      method: "POST",
      body: JSON.stringify(uploadData),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (response.status === 201) {
      dispatch(showWithdrawCashAction());
      dispatch(showChargeAction());
      toast.success("Retiro realizado con exito");
    }
  } catch (error) {
    toast.error("Retiro no realizado");
  }
};

export const existingBalanceBox = (uploadData) => async (dispatch) => {
  try {
    dispatch({ type: BOX_BALANCE, payload: uploadData });
  } catch (error) {
    toast.error("Error en saldo Global");
  }
};
