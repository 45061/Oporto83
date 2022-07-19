// import { toast } from "react-toastify";
// import { showFormAction } from "./Modals.actionCreator";
import Cookies from "universal-cookie";

import {
  UPLOAD_ROOM_SUCCESS,
  IS_UPLOADING_ROOM,
  SET_UPLOADING_PERCENTAGE,
  ROOM_DETAIL_SUCCESS,
  RESET_INITIAL_STATE,
} from "../types";
import { showFormAction, showPromoAction } from "./modalAction";

const url = process.env.REACT_APP_BACKEND_URI;
const actionBody = (type, payload) => ({ type, payload });

// export const postView = ({ viwer, videoId }) => {
//   return async () => {
//     try {
//       await axios.post(`${url}/videos/${videoId}/view`, viwer);
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };
// };

export const postRoom = (uploadData) => async (dispatch) => {
  try {
    // dispatch(actionBody(IS_UPLOADING_ROOM, true));
    const cookies = new Cookies();
    const token = cookies.get("token");
    // console.log("data recibida", uploadData.images[0].data_url);
    const response = await fetch(`http://localhost:3000/api/rooms/room`, {
      method: "POST",
      body: JSON.stringify(uploadData),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        const completed = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        dispatch(actionBody(SET_UPLOADING_PERCENTAGE, completed));
        // console.log(completed);
        if (completed === 100) {
          dispatch(actionBody(IS_UPLOADING_ROOM, false));
          dispatch(actionBody(SET_UPLOADING_PERCENTAGE, 0));
        }
      },
    });
    if (response.status === 201) {
      dispatch(showFormAction());
    }
    console.log("esto es el response", response);
    // dispatch(actionBody(UPLOAD_ROOM_SUCCESS, response.data.video));
    // toast.success("Video subido con exito");
  } catch (error) {
    console.log("hay un error en el post Video");
  }
};

export const deleteRoom = (room) => async (dispatch) => {
  try {
    // dispatch(actionBody(IS_UPLOADING_ROOM, true));
    const cookies = new Cookies();
    const token = cookies.get("token");
    const response = await fetch(`http://localhost:3000/api/rooms/room`, {
      method: "DELETE",
      body: JSON.stringify(room),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        const completed = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        dispatch(actionBody(SET_UPLOADING_PERCENTAGE, completed));
        // console.log(completed);
        if (completed === 100) {
          dispatch(actionBody(IS_UPLOADING_ROOM, false));
          dispatch(actionBody(SET_UPLOADING_PERCENTAGE, 0));
        }
      },
    });
    // if (response.status === 201)
  } catch (error) {
    console.log("hay un error en el post Video");
  }
};

export const postPromo = (uploadData) => async (dispatch) => {
  try {
    // dispatch(actionBody(IS_UPLOADING_ROOM, true));
    const cookies = new Cookies();
    const token = cookies.get("token");
    // console.log("data recibida", uploadData.images[0].data_url);
    const response = await fetch(`http://localhost:3000/api/promo`, {
      method: "POST",
      body: JSON.stringify(uploadData),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        const completed = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        dispatch(actionBody(SET_UPLOADING_PERCENTAGE, completed));
        // console.log(completed);
        if (completed === 100) {
          dispatch(actionBody(IS_UPLOADING_ROOM, false));
          dispatch(actionBody(SET_UPLOADING_PERCENTAGE, 0));
        }
      },
    });
    if (response.status === 201) dispatch(showPromoAction());
    console.log("esto es el response", response);
    // dispatch(actionBody(UPLOAD_ROOM_SUCCESS, response.data.video));
    // toast.success("Video subido con exito");
  } catch (error) {
    console.log("hay un error en el post Video");
  }
};

export function resetState(payload) {
  return { type: RESET_INITIAL_STATE, payload };
}

export const deletePromo = (promo) => async (dispatch) => {
  try {
    // dispatch(actionBody(IS_UPLOADING_ROOM, true));
    const cookies = new Cookies();
    const token = cookies.get("token");
    const response = await fetch(`http://localhost:3000/api/promo`, {
      method: "DELETE",
      body: JSON.stringify(promo),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        const completed = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        dispatch(actionBody(SET_UPLOADING_PERCENTAGE, completed));
        // console.log(completed);
        if (completed === 100) {
          dispatch(actionBody(IS_UPLOADING_ROOM, false));
          dispatch(actionBody(SET_UPLOADING_PERCENTAGE, 0));
        }
      },
    });
    // if (response.status === 201)
  } catch (error) {
    console.log("hay un error en el post Video");
  }
};
