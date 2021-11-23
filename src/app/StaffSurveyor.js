import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";

import AsyncHome from "../asyncPages/AsyncHome";
import AsyncDashboardStaffSurveyor from "../asyncPages/AsyncDashboardStaffSurveyor";
import AsyncPenugasan from "../asyncPages/AsyncPenugasan";
import AsyncNotificationPage from "../asyncPages/AsyncNotificationPage";
import AsyncHasilSurvey from "../asyncPages/AsyncHasilSurvey";
import AsyncFormPenugasanStaff from "../asyncPages/AsyncFormPenugasanStaff";
import AsyncFormPenugasanStaffAI from "../asyncPages/AsyncFormPenugasanStaffAI";
// import AsyncDetailIssue from "../asyncPages/AsyncDetailIssue";
// import AsyncDetailSurveyBTS from "../asyncPages/AsyncDetailSurveyBTS";
import AsyncProfile from "../asyncPages/AsyncProfile";
import AsyncFAQ from "../asyncPages/AsyncFAQ";
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
        path={`${props.match.url}staffsurveyor/profile`}
        component={AsyncProfile}
      />
      <Route
        exact
        path={`${props.match.url}staffsurveyor/dashboard`}
        component={AsyncDashboardStaffSurveyor}
      />
      <Route
        exact
        path={`${props.match.url}staffsurveyor/penugasan`}
        component={AsyncPenugasan}
      />
      <Route
        exact
        path={`${props.match.url}staffsurveyor/notifikasi`}
        component={AsyncNotificationPage}
      />
      <Route
        exact
        path={`${props.match.url}staffsurveyor/hasil-survey`}
        component={AsyncHasilSurvey}
      />
      <Route
        exact
        path={`${props.match.url}staffsurveyor/penugasan/bts/:id`}
        component={AsyncFormPenugasanStaff}
      />
      <Route
        exact
        path={`${props.match.url}staffsurveyor/penugasan/ai/:id`}
        component={AsyncFormPenugasanStaffAI}
      />
      <Route
        exact
        path={`${props.match.url}staffsurveyor/faq`}
        component={AsyncFAQ}
      />
      <Redirect to='/staffsurveyor/dashboard' />
    </Switch>
  );
};

export default AppSurveyor;
