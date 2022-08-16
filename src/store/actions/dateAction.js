/* eslint-disable import/prefer-default-export */
import { toast } from "react-toastify";
import Cookies from "universal-cookie";
import {
  DATE_DETAIL_SUCCESS,
  DATE_CHARGE_SUCCESS,
  USER_SUCCESS,
  UPLOAD_BOOKING_DATA,
} from "../types";

import {
  showBookingAdminAction,
  showBookingDataAction,
  showTextAreaAction,
} from "./modalAction";

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

export const setDataBooking = (value) => async (dispatch) => {
  try {
    dispatch({
      type: UPLOAD_BOOKING_DATA,
      payload: value,
    });
  } catch (error) {
    console.log("error en el dispatch");
  }
};

export const postBookingAdmin = (uploadData) => async (dispatch) => {
  try {
    const cookies = new Cookies();
    const token = cookies.get("token");

    const response = await fetch("/api/booking/bookingadmin", {
      method: "POST",
      body: JSON.stringify(uploadData),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (response.status === 201) {
      // dispatch({ type: USER_SUCCESS, payload: data.user });
      dispatch(showBookingAdminAction());
      dispatch(showChargeAction());
    }
    toast.success("Reserva realizada con exito");
  } catch (error) {
    toast.error("Reserva no realizada, diligenciar datos");
  }
};

export const putBookingAdmin = (uploadData) => async (dispatch) => {
  try {
    const cookies = new Cookies();
    const token = cookies.get("token");

    const response = await fetch("/api/booking", {
      method: "PUT",
      body: JSON.stringify(uploadData),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      // dispatch({ type: USER_SUCCESS, payload: data.user });
      dispatch(showBookingDataAction());
      dispatch(showChargeAction());
      toast.success("Actualización realizada con exito");
    }
    if (response.status === 201) {
      // dispatch({ type: USER_SUCCESS, payload: data.user });
      dispatch(showBookingDataAction());
      dispatch(showChargeAction());
      toast.success("Nota Agregada con exito con exito");
    }
  } catch (error) {
    toast.error("Actualización no realizada, diligenciar datos");
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

export const changeBookingRoom = (uploadData) => async (dispatch) => {
  try {
    const cookies = new Cookies();
    const token = cookies.get("token");

    const response = await fetch("/api/booking", {
      method: "PUT",
      body: JSON.stringify(uploadData),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (response.status === 201) {
      dispatch(showBookingDataAction());
      dispatch(showChargeAction());
    }
    toast.success("Reserva cambiada con exito");
  } catch (error) {
    toast.error("error al eliminar la reserva");
  }
};

export const changeBookingDates = (uploadData) => async (dispatch) => {
  try {
    const cookies = new Cookies();
    const token = cookies.get("token");

    const response = await fetch("/api/booking", {
      method: "PUT",
      body: JSON.stringify(uploadData),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (response.status === 201) {
      dispatch(showBookingDataAction());
      dispatch(showChargeAction());
    }
    toast.success("Reserva cambiada con exito");
  } catch (error) {
    toast.error("error al eliminar la reserva");
  }
};

export const deleteBooking = (deleteData) => async (dispatch) => {
  try {
    const cookies = new Cookies();
    const token = cookies.get("token");

    const response = await fetch("/api/booking/bookingadmin", {
      method: "DELETE",
      body: JSON.stringify(deleteData),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (response.status === 201) {
      dispatch(showChargeAction());
    }
    toast.success("Reserva eliminada con exito");
  } catch (error) {
    toast.error("error al eliminar la reserva");
  }
};

export const deleteBookingAdmin = (deleteData) => async (dispatch) => {
  try {
    const cookies = new Cookies();
    const token = cookies.get("token");

    const response = await fetch("/api/booking/bookingadmin", {
      method: "DELETE",
      body: JSON.stringify(deleteData),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (response.status === 201) {
      dispatch(showChargeAction());
    }
    toast.success("Reserva eliminada con exito");
  } catch (error) {
    toast.error("error al eliminar la reserva");
  }
};
