import { DATA_NOTIF, DATA_CLUSTER, DATA_RECOMMEND, DATA_TEKNOLOGI, DATA_LOG_HISTORY, GOOGLE_OAUTH2 } from "./actionTypes";

export const getDatasNotif = (data) => {
  return {
    type: DATA_NOTIF,
    payload: { data },
  };
};

export const googleOauth2 = (googleResponse) => {
  return async (dispatch) => {
    if (typeof googleResponse === "undefined") {
      googleResponse = [];
    }

    dispatch({ type: GOOGLE_OAUTH2, googleResponse });
  };
};

// LOG HISTORY BI
export const setDataLogHistory = (data) => {
  return {
    type: DATA_LOG_HISTORY,
    payload: { data },
  };
};
