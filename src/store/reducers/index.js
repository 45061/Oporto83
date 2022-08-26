import { combineReducers } from "redux";
import modalReducer from "./modalReducer";
import authReducer from "./authReducer";
import dateReducer from "./dateReducer";
import boxReducer from "./boxReducer";

export default combineReducers({
  modalReducer,
  authReducer,
  dateReducer,
  boxReducer,
});
