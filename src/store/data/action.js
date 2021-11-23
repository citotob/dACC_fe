import { DATA_NOTIF, DATA_CLUSTER, DATA_RECOMMEND, DATA_TEKNOLOGI, GOOGLE_OAUTH2 } from "./actionTypes";

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
