import { SET_FORM_SAVED_ALERT } from './actionTypes';
import { SET_FORM_SENT_ALERT } from './actionTypes';

const initialState = {
  showSavedAlert: false,
  showSentAlert: false,
};

const formSavedAlert = (state = initialState, action) => {
  switch (action.type) {
    case SET_FORM_SAVED_ALERT:
      state = {
        ...state,
        showSavedAlert: action.payload,
      };
      break;
    case SET_FORM_SENT_ALERT:
      state = {
        ...state,
        showSentAlert: action.payload,
      };
      break;

    default:
      state = { ...state };
      break;
  }
  return state;
};

export default formSavedAlert;
