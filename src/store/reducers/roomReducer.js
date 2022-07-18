import {
  GET_ROOM_SUCCESS,
  GET_ROOM_ERROR,
  UPLOAD_ROOM_SUCCESS,
  IS_UPLOADING_ROOM,
  SET_UPLOADING_PERCENTAGE,
  ROOM_DETAIL_SUCCESS,
  RESET_INITIAL_STATE,
} from "../types";

const initialState = {
  room: [],
  loading: false,
  uploading: false,
  uploadingPercentage: 0,
  uploadedVideo: {},
  error: null,
  searchData: "",
  videoDetail: {},
};

function RoomReducer(state = initialState, action = null) {
  if (action.type === RESET_INITIAL_STATE)
    return {
      ...initialState,
    };
  if (action.type === GET_ROOM_SUCCESS)
    return {
      ...state,
      loading: false,
      rooms: action.payload.rooms,
      error: null,
    };
  if (action.type === UPLOAD_ROOM_SUCCESS)
    return {
      ...state,
      loading: false,
      uploadedVideo: action.payload,
      error: null,
    };
  if (action.type === GET_ROOM_ERROR)
    return {
      ...state,
      loading: false,
      videos: null,
      videoDetail: null,
      error: action.payload,
    };
  if (action.type === ROOM_DETAIL_SUCCESS) {
    const room = action.payload;
    return {
      ...state,
      loading: false,
      videoDetail: room,
      error: null,
    };
  }

  if (action.type === IS_UPLOADING_ROOM) {
    return {
      ...state,
      uploading: action.payload,
    };
  }
  if (action.type === SET_UPLOADING_PERCENTAGE) {
    return {
      ...state,
      uploadingPercentage: action.payload,
    };
  }

  return state;
}

export default RoomReducer;
