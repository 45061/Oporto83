/* eslint-disable import/prefer-default-export */
import Cookies from "universal-cookie";
import { DATE_DETAIL_SUCCESS } from "../types";

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
  try {
    // dispatch(actionBody(IS_UPLOADING_ROOM, true));
    const cookies = new Cookies();
    const token = cookies.get("token");
    // console.log("data recibida", uploadData.images[0].data_url);

    const response = await fetch(`http://localhost:3000/api/booking`, {
      method: "POST",
      body: JSON.stringify(uploadData),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (response.status === 201) {
      console.log("booking enviado con exito");
    }
    console.log("esto es el response", response);
    // dispatch(actionBody(UPLOAD_ROOM_SUCCESS, response.data.video));
    // toast.success("Video subido con exito");
  } catch (error) {
    console.log("hay un error en el post Room");
  }
};
