// import { toast } from "react-toastify";
// import { showFormAction } from "./Modals.actionCreator";
import Cookies from "universal-cookie";
import { toast } from "react-toastify";

import {
  IS_UPLOADING_ROOM,
  SET_UPLOADING_PERCENTAGE,
  RESET_INITIAL_STATE,
} from "../types";
import { showChargeAction } from "./dateAction";
import { showFormAction, showPromoAction } from "./modalAction";

/* eslint-disable import/prefer-default-export */
export const config = {
  api: {
    bodyParser: {
      sizeLimit: "4mb", // Set desired value here
    },
  },
};

// const actionBody = (type, payload) => ({ type, payload });

export const postRoom = (uploadData) => async (dispatch) => {
  try {
    const cookies = new Cookies();
    const token = cookies.get("token");
    const response = await fetch("/api/rooms/room", {
      method: "POST",
      body: JSON.stringify(uploadData),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    if (response.status === 201) {
      dispatch(showFormAction());
      dispatch(showChargeAction());
      toast.success("Habitación subida con exito");
    }
  } catch (error) {
    toast.error("Error al subir la habitación");
  }
};

export const deleteRoom = (room) => async (dispatch) => {
  try {
    const cookies = new Cookies();
    const token = cookies.get("token");
    const response = await fetch("/api/rooms/room", {
      method: "DELETE",
      body: JSON.stringify(room),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    if (response.status === 201) {
      dispatch(showChargeAction());
      toast.success("Habitación eliminada con exito");
    }
  } catch (error) {
    toast.success("Error al eliminar la habitacón");
  }
};

export const postPromo = (uploadData) => async (dispatch) => {
  try {
    const cookies = new Cookies();
    const token = cookies.get("token");
    const response = await fetch("/api/promo/promos", {
      method: "POST",
      body: JSON.stringify(uploadData),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    if (response.status === 201) {
      dispatch(showPromoAction());
      dispatch(showChargeAction());
      toast.success("Promoción subida con exito");
    }
  } catch (error) {
    toast.error("Error al subir la Promoción ");
  }
};

export function resetState(payload) {
  return { type: RESET_INITIAL_STATE, payload };
}

export const deletePromo = (promo) => async (dispatch) => {
  try {
    const cookies = new Cookies();
    const token = cookies.get("token");
    const response = await fetch("/api/promo/promos", {
      method: "DELETE",
      body: JSON.stringify(promo),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    if (response.status === 201) {
      dispatch(showChargeAction());
      toast.success("Promoción eliminada con exito");
    }
  } catch (error) {
    toast.success("Error al eliminar la Promo");
  }
};
