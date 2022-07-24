import { DATE_DETAIL_SUCCESS, DATE_CHARGE_SUCCESS } from "../types";

const initialState = {
  dates: [],
  charge: false,
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

    default:
      return state;
  }
}
export default dateReducer;
