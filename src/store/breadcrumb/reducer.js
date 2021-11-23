import { CHANGE_BREADCRUMBITEM } from "./actionTypes";

const initialState = {
  breadcrumbItem: "",
};

const breadcrumbReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_BREADCRUMBITEM:
      state = {
        ...state,
        breadcrumbItem: action.payload,
      };
      break;

    default:
      state = { ...state };
      break;
  }
  return state;
};

export default breadcrumbReducer;
