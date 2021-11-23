import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";

import AsyncHome from "../asyncPages/AsyncHome";
import AsyncDashboardAdminSurveyor from "../asyncPages/AsyncDashboardAdminSurveyor";
import AsyncPenugasan from "../asyncPages/AsyncPenugasan";
import AsyncNotificationPage from "../asyncPages/AsyncNotificationPage";
import AsyncHasilSurvey from "../asyncPages/AsyncHasilSurvey";
import AsyncDetailSurvey from "../asyncPages/AsyncDetailSurvey";
import AsyncDetailIssue from "../asyncPages/AsyncDetailIssue";
import AsyncDetailSurveyBTS from "../asyncPages/AsyncDetailSurveyBTS";
import AsyncProfile from "../asyncPages/AsyncProfile";
// import Home from "../pages/Home/Executive";
// import profile from "../pages/Authentication/profileExe";
// import FaqExecutive from "../pages/FAQ/Executive";
// import ExploreDataExecutive from "../pages/ExploreData/Executive";
// import SiteMatchmakingExecutive from "../pages/SiteMatchmaking/Executive";

const AppSurveyor = (props) => {
  return (
    <Switch>
      <Route exact path={`${props.match.url}home`} component={AsyncHome} />
      <Route
        exact
        path={`${props.match.url}adminsurveyor/profile`}
        component={AsyncProfile}
      />
      <Route
        exact
        path={`${props.match.url}adminsurveyor/dashboard`}
        component={AsyncDashboardAdminSurveyor}
      />
      <Route
        exact
        path={`${props.match.url}adminsurveyor/penugasan`}
        component={AsyncPenugasan}
      />
      <Route
        exact
        path={`${props.match.url}adminsurveyor/notifikasi`}
        component={AsyncNotificationPage}
      />
      <Route
        exact
        path={`${props.match.url}adminsurveyor/hasil-survey`}
        component={AsyncHasilSurvey}
      />
      <Route
        exact
        path={`${props.match.url}adminsurveyor/hasil-survey/:id`}
        component={AsyncDetailSurvey}
      />
      <Route
        exact
        path={`${props.match.url}adminsurveyor/hasil-survey/issue/:id`}
        component={AsyncDetailIssue}
      />
      <Route
        exact
        path={`${props.match.url}adminsurveyor/hasil-survey/BTS/:id`}
        component={AsyncDetailSurveyBTS}
      />
      <Redirect to='/adminsurveyor/dashboard' />
    </Switch>
  );
};

export default AppSurveyor;
