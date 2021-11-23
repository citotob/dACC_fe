import { combineReducers } from "redux";

// Front
import Layout from "./layout/reducer";

// Authentication
import Login from "./auth/login/reducer";
import Account from "./auth/register/reducer";
import ForgetPassword from "./auth/forgetpwd/reducer";
import Profile from "./auth/profile/reducer";
import BaseMap from "./map/reducers/basemap";
import ColorMarker from "./map/reducers/colormarker";
import BreadcrumbReducer from "./breadcrumb/reducer";
import FormSurveyStaff from "./formSurveyStaff/reducer";
import FormSurveyStaffAI from "./formSurveyStaffAI/reducer";
import CompareBTS from "./compareBTS/reducer";
import SimpanFormAlert from "./simpanFormAlert/reducer";
import BtsFormTypeReducer from "./btsFormTab/reducer";

import dataReducer from "./data/reducer";

const rootReducer = combineReducers({
  // public
  Layout,
  Login,
  Account,
  ForgetPassword,
  Profile,

  // MAP
  BaseMap,
  ColorMarker,

  //Notif Data
  dataReducer,

  // breadcrumb
  BreadcrumbReducer,

  // untuk select dropdown search compare
  CompareBTS,

  // untuk show/hide alert "form is saved" di form penugasan staff surveyor
  SimpanFormAlert,

  // form survey staff surveyor
  FormSurveyStaff,
  FormSurveyStaffAI,

  // untuk ubah isi form yang SSR atau yang Microwave (form staff BTS)
  BtsFormTypeReducer,
});

export default rootReducer;
