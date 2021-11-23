import {
  SET_COMPARE_SELECT1,
  SET_COMPARE_SELECT2,
  SET_SHOW_DETAILS,
  SET_BTSDATA1,
  SET_BTSDATA2,
} from "./actionTypes";

export const setSelect1 = (selectedCode) => {
  return {
    type: SET_COMPARE_SELECT1,
    payload: selectedCode,
  };
};

export const setSelect2 = (selectedCode) => {
  return {
    type: SET_COMPARE_SELECT2,
    payload: selectedCode,
  };
};

export const setShowDetails = (something) => {
  return {
    type: SET_SHOW_DETAILS,
    payload: something,
  };
};

export const setBTSData1 = (selectedCode) => {
  return {
    type: SET_BTSDATA1,
    payload: selectedCode,
  };
};

export const setBTSData2 = (selectedCode) => {
  return {
    type: SET_BTSDATA2,
    payload: selectedCode,
  };
};
