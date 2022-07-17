// import { toast } from "react-toastify";
// import { showFormAction } from "./Modals.actionCreator";
import Cookies from "universal-cookie";

import {
  GET_ROOM_SUCCESS,
  GET_ROOM_ERROR,
  UPLOAD_ROOM_SUCCESS,
  IS_UPLOADING_ROOM,
  SET_UPLOADING_PERCENTAGE,
  ROOM_DETAIL_SUCCESS,
  RESET_INITIAL_STATE,
} from "../types";

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

export const postVideo = (uploadData) => {
  return async (dispatch) => {
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
            dispatch(actionBody(IS_UPLOADING_VIDEO, false));
            dispatch(actionBody(SET_UPLOADING_PERCENTAGE, 0));
          }
        },
      });
      // if (response.status === 201) dispatch(showFormAction());
      console.log("esto es el response", response);
      // dispatch(actionBody(UPLOAD_ROOM_SUCCESS, response.data.video));
      // toast.success("Video subido con exito");
    } catch (error) {
      console.log("hay un error en el post Video");
    }
  };
};

export const fetchAllVideos = (page = 1, limit = 12) => {
  const paramsObject = {
    page,
    limit,
  };
  return async (dispatch) => {
    try {
      dispatch({ type: GET_VIDEO_LOADING, payload: true });
      const { data } = await axios.get(`${url}/videos`, {
        params: paramsObject,
      });
      dispatch({ type: GET_VIDEO_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: GET_VIDEO_ERROR, payload: error });
    }
  };
};

export const fetchFilterVideos = (searchData) => {
  const paramsObject = {
    search: searchData,
    page: 1,
    limit: 10,
  };
  return async (dispatch) => {
    try {
      dispatch({ type: GET_VIDEO_LOADING, payload: true });
      const { data } = await axios.get(`${url}/videos/results`, {
        params: paramsObject,
      });
      dispatch({ type: VIDEO_FILTER_SUCCESS, payload: data.results });
    } catch (error) {
      dispatch({ type: GET_VIDEO_ERROR, payload: error });
    }
  };
};

export const getVideoComments = (videoId) => {
  const commentUrl = `${url}/videos/${videoId}/comments`;
  return async (dispatch) => {
    try {
      dispatch(actionBody(VIDEO_COMMENTS_LOADING, true));

      const res = await axios.get(commentUrl);
      const { comments } = res.data;
      dispatch(actionBody(VIDEO_COMMENTS_SUCCESS, comments));
    } catch (error) {
      toast.error("No se pudo recuperar los comentarios.");
    } finally {
      dispatch(actionBody(VIDEO_COMMENTS_LOADING, false));
    }
  };
};

export const fetchVideoDetail = (videoId) => {
  return async (dispatch) => {
    try {
      dispatch(actionBody(GET_VIDEO_LOADING, true));
      const { data } = await axios.get(`${url}/videos/${videoId}`);
      dispatch(actionBody(VIDEO_DETAIL_SUCCESS, data.video));
    } catch (error) {
      dispatch({ type: GET_VIDEO_ERROR, payload: error });
    }
  };
};
export function actionSearchData(payload) {
  return { type: SEARCH_DATA, payload };
}

export function resetState(payload) {
  return { type: RESET_INITIAL_STATE, payload };
}

export function actionHasFilterVideo(payload) {
  return { type: HAS_FILTER_VIDEO, payload };
}
