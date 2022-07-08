import { combineReducers } from "redux";
import sampleReducer from "./sampleReducer";
import modalReducer from "./modalReducer";

export default combineReducers({
  sampleData: sampleReducer,
  modalReducer,
});
