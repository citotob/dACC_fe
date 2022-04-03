import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";

import AsyncHome from "../asyncPages/AsyncHome";
import AsyncDashboardCS from "../asyncPages/AsyncDashboardCS";
import AsyncPenugasan from "../asyncPages/AsyncPenugasan";
import AsyncNotificationPage from "../asyncPages/AsyncNotificationPage";
// import AsyncHasilSurvey from "../asyncPages/AsyncHasilSurvey";
// import AsyncFormPenugasanCS from "../asyncPages/AsyncFormPenugasanCS";
// import AsyncFormPenugasanCS from "../asyncPages/AsyncFormPenugasanCS";
import AsyncProfile from "../asyncPages/AsyncProfile";
import AsyncFAQ from "../asyncPages/AsyncFAQ";

// tambahan gw
import AsyncRole from '../asyncPages/AsyncRole';
import AsyncBank from '../asyncPages/AsyncBank';
import AsyncAccBank from '../asyncPages/AsyncAccBank';
import AsyncWL from '../asyncPages/AsyncWL';
import AsyncDeposit from '../asyncPages/AsyncDeposit';
import AsyncWD from '../asyncPages/AsyncWD';
import AsyncBonus from '../asyncPages/AsyncBonus';
import AsyncReportTransaksi from '../asyncPages/AsyncReportTransaksi';
//

const AppCS = (props) => {
  return (
    <Switch>
      <Route exact path={`${props.match.url}home`} component={AsyncHome} />
      <Route
        exact
        path={`${props.match.url}cs/profile`}
        component={AsyncProfile}
      />
      <Route
        exact
        path={`${props.match.url}cs/dashboard`}
        component={AsyncDashboardCS}
      />
      {/* tambahan gw */}
      <Route
        exact
        path={`${props.match.url}cs/role`}
        component={AsyncRole}
      />
      <Route
        exact
        path={`${props.match.url}cs/bank`}
        component={AsyncBank}
      />
      <Route
        exact
        path={`${props.match.url}cs/accbank`}
        component={AsyncAccBank}
      />
      <Route
        exact
        path={`${props.match.url}cs/whitelabel`}
        component={AsyncWL}
      />
      <Route
        exact
        path={`${props.match.url}cs/deposit`}
        component={AsyncDeposit}
      />
      <Route
        exact
        path={`${props.match.url}cs/withdrawal`}
        component={AsyncWD}
      />
      <Route
        exact
        path={`${props.match.url}cs/bonus`}
        component={AsyncBonus}
      />
      <Route
        exact
        path={`${props.match.url}cs/report_transaksi`}
        component={AsyncReportTransaksi}
      />
      {/*  */}
      <Route
        exact
        path={`${props.match.url}cs/penugasan`}
        component={AsyncPenugasan}
      />
      <Route
        exact
        path={`${props.match.url}cs/notifikasi`}
        component={AsyncNotificationPage}
      />
      {/* <Route
        exact
        path={`${props.match.url}cs/hasil-survey`}
        component={AsyncHasilSurvey}
      /> */}
      {/* <Route
        exact
        path={`${props.match.url}cs/penugasan/bts/:id`}
        component={AsyncFormPenugasanCS}
      />
      <Route
        exact
        path={`${props.match.url}cs/penugasan/ai/:id`}
        component={AsyncFormPenugasanCS}
      /> */}
      <Route
        exact
        path={`${props.match.url}cs/faq`}
        component={AsyncFAQ}
      />
      <Redirect to='/cs/dashboard' />
    </Switch>
  );
};

export default AppCS;
