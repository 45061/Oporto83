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

const actionBody = (type, payload = null) => ({ type, payload });

export const showRegisterForm = () => actionBody(SHOW_REGISTER_FORM);
export const hiddeRegisterForm = () => actionBody(HIDDE_REGISTER_FORM);
export const showLoginForm = () => actionBody(SHOW_LOGIN_FORM);
export const hiddeLoginForm = () => actionBody(HIDDE_LOGIN_FORM);
export const showFormAction = () => actionBody(SHOW_FORM);
export const showPromoAction = () => actionBody(SHOW_PROMO);
export const showRecoverPassword = () => actionBody(SHOW_RECOVER_PASSWORD);
export const hiddeRecoverPassword = () => actionBody(HIDDE_RECOVER_PASSWORD);
export const showBookingAdminAction = () => actionBody(SHOW_BOOKINGADMIN);
export const showBookingDataAction = () => actionBody(SHOW_BOOKING_DATA);
export const showTextAreaAction = () => actionBody(SHOW_TEXTAREA_DATA);


// export const showFormAction = () => async (dispatch) => {
//   dispatch({
//     type: SHOW_FORM,
//     payload: null,
//   });
// };
