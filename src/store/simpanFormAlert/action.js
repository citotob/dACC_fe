import { SET_FORM_SAVED_ALERT } from './actionTypes';
import { SET_FORM_SENT_ALERT } from './actionTypes';

export const setShowAlert = (alertState) => {
  return {
    type: SET_FORM_SAVED_ALERT,
    payload: alertState,
  };
};
export const setShowAlertSent = (alertState) => {
  return {
    type: SET_FORM_SENT_ALERT,
    payload: alertState,
  };
};
