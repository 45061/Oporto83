/* eslint-disable import/prefer-default-export */
import { toast } from "react-toastify";
import Cookies from "universal-cookie";
import {
  DATE_DETAIL_SUCCESS,
  DATE_CHARGE_SUCCESS,
  USER_SUCCESS,
} from "../types";

const actionBody = (type, payload = null) => ({ type, payload });

export const showChargeAction = () => actionBody(DATE_CHARGE_SUCCESS);

export const setDataDate = (value) => async (dispatch) => {
  try {
    dispatch({
      type: DATE_DETAIL_SUCCESS,
      payload: value,
    });
  } catch (error) {
    console.log("error en el dispatch");
  }
};

export const postBooking = (uploadData) => async (dispatch) => {
  try {
    const cookies = new Cookies();
    const token = cookies.get("token");

    const response = await fetch("/api/booking", {
      method: "POST",
      body: JSON.stringify(uploadData),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (response.status === 201) {
      dispatch({ type: USER_SUCCESS, payload: data.user });
      dispatch(showChargeAction());
    }
    toast.success("Reserva realizada con exito");
  } catch (error) {
    toast.error("Reserva no realizada, diligenciar datos");
  }
};

export const deleteBooking = (deleteData) => async (dispatch) => {
  try {
    const cookies = new Cookies();
    const token = cookies.get("token");

    const response = await fetch("/api/booking", {
      method: "DELETE",
      body: JSON.stringify(deleteData),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (response.status === 201) {
      dispatch({ type: USER_SUCCESS, payload: data.user });
      dispatch(showChargeAction());
    }
    toast.success("Reserva eliminada con exito");
  } catch (error) {
    toast.error("error al eliminar la reserva");
  }
};
