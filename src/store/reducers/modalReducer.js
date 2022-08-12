import {
  SHOW_PROMO,
  HIDDE_REGISTER_FORM,
  SHOW_REGISTER_FORM,
  SHOW_LOGIN_FORM,
  HIDDE_LOGIN_FORM,
  SHOW_FORM,
  SHOW_RECOVER_PASSWORD,
  HIDDE_RECOVER_PASSWORD,
  SHOW_BOOKINGADMIN,
  SHOW_BOOKING_DATA,
  SHOW_TEXTAREA_DATA,
} from "../types";

const initialState = {
  showingRegisterForm: false,
  showingLoginForm: false,
  showForm: false,
  showRecoverPassword: false,
  showPromo: false,
  showBookingAdmin: false,
  showBookingData: false,
  showTextArea: false,
};

function modalReducer(state = initialState, action = null) {
  switch (action.type) {
    case SHOW_REGISTER_FORM:
      return {
        ...state,
        showingRegisterForm: true,
        showingLoginForm: false,
        showRecoverPassword: false,
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
        showingRegisterForm: false,
        showRecoverPassword: false,
      };
    case SHOW_FORM:
      return {
        ...state,
        showForm: !state.showForm,
      };
    case SHOW_TEXTAREA_DATA:
      return {
        ...state,
        showTextArea: !state.showTextArea,
      };
    case SHOW_PROMO:
      return {
        ...state,
        showPromo: !state.showPromo,
      };
    case SHOW_BOOKINGADMIN:
      return {
        ...state,
        showBookingAdmin: !state.showBookingAdmin,
      };
    case SHOW_BOOKING_DATA:
      return {
        ...state,
        showBookingData: !state.showBookingData,
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
        showingLoginForm: false,
        showingRegisterForm: false,
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
