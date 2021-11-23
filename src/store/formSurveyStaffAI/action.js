import {
  SET_STATE_AISECTION1,
  SET_STATE_AISECTION2,
  SET_STATE_AISECTION3,
} from "./actionTypes";

export const setAISection1 = (sectionObject) => {
  return {
    type: SET_STATE_AISECTION1,
    payload: sectionObject,
  };
};

export const setAISection2 = (sectionObject) => {
  return {
    type: SET_STATE_AISECTION2,
    payload: sectionObject,
  };
};
export const setAISection3 = (sectionObject) => {
  return {
    type: SET_STATE_AISECTION3,
    payload: sectionObject,
  };
};
