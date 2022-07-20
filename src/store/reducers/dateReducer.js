import { DATE_DETAIL_SUCCESS } from "../types";

const initialState = {
  dates: [],
};

function dateReducer(state = initialState, action = null) {
  if (action.type === DATE_DETAIL_SUCCESS) {
    return {
      ...state,
      dates: action.payload,
    };
  }
  return state;
}
export default dateReducer;
