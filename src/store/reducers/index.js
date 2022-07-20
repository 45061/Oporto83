import { combineReducers } from "redux";
import sampleReducer from "./sampleReducer";
import modalReducer from "./modalReducer";
import authReducer from "./authReducer";
import dateReducer from "./dateReducer";

export default combineReducers({
  sampleData: sampleReducer,
  modalReducer,
  authReducer,
  dateReducer,
});
