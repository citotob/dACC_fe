import {
  SET_COMPARE_SELECT1,
  SET_COMPARE_SELECT2,
  SET_SHOW_DETAILS,
  SET_BTSDATA1,
  SET_BTSDATA2,
} from "./actionTypes";

const initialState = {
  select1: "",
  select2: "",
  showDetails: false,
  btsData1: "",
  btsData2: "",
};

const compareSelect = (state = initialState, action) => {
  switch (action.type) {
    case SET_COMPARE_SELECT1:
      state = {
        ...state,
        select1: action.payload,
      };
      break;
    case SET_COMPARE_SELECT2:
      state = {
        ...state,
        select2: action.payload,
      };
      break;
    case SET_SHOW_DETAILS:
      state = {
        ...state,
        showDetails: action.payload,
      };
      break;

    case SET_BTSDATA1:
      state = {
        ...state,
        btsData1: action.payload,
      };
      break;

    case SET_BTSDATA2:
      state = {
        ...state,
        btsData2: action.payload,
      };
      break;

    default:
      state = { ...state };
      break;
  }
  return state;
};

export default compareSelect;
