import {
  HIDDE_REGISTER_FORM,
  SHOW_REGISTER_FORM,
  SHOW_LOGIN_FORM,
  HIDDE_LOGIN_FORM,
  SHOW_FORM,
  SHOW_RECOVER_PASSWORD,
  HIDDE_RECOVER_PASSWORD,
} from "../types";

const initialState = {
  showingRegisterForm: false,
  showingLoginForm: false,
  showForm: false,
  showRecoverPassword: false,
};

function modalReducer(state = initialState, action = null) {
  switch (action.type) {
    case SHOW_REGISTER_FORM:
      return {
        ...state,
        showingRegisterForm: true,
      };
    case HIDDE_REGISTER_FORM:
      return {
        ...state,
        showingRegisterForm: false,
      };
    case SHOW_LOGIN_FORM:
      return {
        ...state,
        showingLoginForm: true,
      };
    case SHOW_FORM:
      return {
        ...state,
        showForm: !state.showForm,
      };
    case HIDDE_LOGIN_FORM:
      return {
        ...state,
        showingLoginForm: false,
      };
    case SHOW_RECOVER_PASSWORD:
      return {
        ...state,
        showRecoverPassword: true,
      };
    case HIDDE_RECOVER_PASSWORD:
      return {
        ...state,
        showRecoverPassword: false,
      };
    default:
      return state;
  }
}

export default modalReducer;
