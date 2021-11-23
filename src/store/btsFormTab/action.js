import { SET_BTSFORMTAB } from "./actionTypes";

export const setBtsFormTab = (formType) => {
  return {
    type: SET_BTSFORMTAB,
    payload: formType,
  };
};
