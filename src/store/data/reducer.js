import { DATA_NOTIF, GOOGLE_OAUTH2 } from "./actionTypes";

const initialState = {
  dataNotif: { data: "empty" },
  dataCluster: { data: "empty" },
  dataRecommend: { data: "empty" },
  dataTeknologi: { data: "empty" },
  dataAuth: { data: "empty" },
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case DATA_NOTIF:
      state = {
        ...state,
        dataNotif: { data: action.payload },
      };
      break;
    case GOOGLE_OAUTH2:
      state = {
        ...state,
        dataAuth: action.googleResponse,
      };
      break;

    default:
      state = { ...state };
      break;
  }
  return state;
};

export default dataReducer;
