import {
  DATE_DETAIL_SUCCESS,
  DATE_CHARGE_SUCCESS,
  UPLOAD_BOOKING_DATA,
} from "../types";

const initialState = {
  dates: [],
  charge: false,
  dataBooking: {},
};

function dateReducer(state = initialState, action = null) {
  switch (action.type) {
    case DATE_DETAIL_SUCCESS:
      return {
        ...state,
        dates: action.payload,
      };

    case DATE_CHARGE_SUCCESS:
      return {
        ...state,
        charge: !state.charge,
      };

    case UPLOAD_BOOKING_DATA:
      return {
        ...state,
        dataBooking: action.payload,
      };

    default:
      return state;
  }
}
export default dateReducer;
