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
    // console.log("en el action", value);
    dispatch({
      type: DATE_DETAIL_SUCCESS,
      payload: value,
    });
  } catch (error) {
    console.log("error en el dispatch");
  }
};

export const postBooking = (uploadData) => async (dispatch) => {
  const url = process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URI;
  try {
    // dispatch(actionBody(IS_UPLOADING_ROOM, true));
    const cookies = new Cookies();
    const token = cookies.get("token");
    // console.log("data recibida", uploadData.images[0].data_url);

    const response = await fetch(`${url}/booking`, {
      method: "POST",
      body: JSON.stringify(uploadData),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (response.status === 201) {
      console.log("booking enviado con exito");
      dispatch({ type: USER_SUCCESS, payload: data.user });
      dispatch(showChargeAction());
    }
    console.log("esto es el response", response);
    // dispatch(actionBody(UPLOAD_ROOM_SUCCESS, response.data.video));
    toast.success("Reserva realizada con exito");
  } catch (error) {
    console.log("hay un error en el post Room");
    toast.error("Reserva no realizada, diligenciar datos");
  }
};

export const deleteBooking = (deleteData) => async (dispatch) => {
  const url = process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URI;
  try {
    // dispatch(actionBody(IS_UPLOADING_ROOM, true));
    const cookies = new Cookies();
    const token = cookies.get("token");

    const response = await fetch(`${url}/booking`, {
      method: "DELETE",
      body: JSON.stringify(deleteData),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (response.status === 201) {
      console.log("booking borrado con exito");
      dispatch({ type: USER_SUCCESS, payload: data.user });
      dispatch(showChargeAction());
    }
    console.log("esto es el response", response);
    // dispatch(actionBody(UPLOAD_ROOM_SUCCESS, response.data.video));
    toast.success("Reserva eliminada con exito");
  } catch (error) {
    console.log("hay un error en el post Room");
    toast.error("error al eliminar la reserva");
  }
};
