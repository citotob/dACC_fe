import { CHANGE_BREADCRUMBITEM } from "./actionTypes";

export const changeBreadcrumbItem = (breadcrumbItem) => {
  return {
    type: CHANGE_BREADCRUMBITEM,
    payload: breadcrumbItem,
  };
};
