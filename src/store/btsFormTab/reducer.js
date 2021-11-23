import { SET_BTSFORMTAB } from "./actionTypes";

const initialState = {
  formType: "ssr",
};

const btsFormTypeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BTSFORMTAB:
      state = {
        ...state,
        formType: action.payload,
      };
      break;

    default:
      state = { ...state };
      break;
  }
  return state;
};

export default btsFormTypeReducer;
