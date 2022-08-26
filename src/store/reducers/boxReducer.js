import { BOX_CHARGE_SUCCESS, BOX_CLOSED, BOX_BALANCE } from "../types";

const initialState = {
  isActivedBox: false,
  boxActive: {},
  balance: 0,
};

function boxReducer(state = initialState, action = null) {
  switch (action.type) {
    case BOX_CHARGE_SUCCESS:
      return {
        ...state,
        boxActive: action.payload,
        isActivedBox: true,
      };
    case BOX_CLOSED:
      return {
        ...state,
        boxActive: null,
        isActivedBox: false,
      };
    case BOX_BALANCE:
      return {
        ...state,
        balance: action.payload,
      };

    default:
      return state;
  }
}
export default boxReducer;
