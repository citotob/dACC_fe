import React from 'react';

import { Switch, Redirect, Route } from 'react-router-dom';
// import Home from "../pages/Utility/pages-404";
import AsyncHome from '../asyncPages/AsyncHome';
// import AsyncMapTitik from "../asyncPages/AsyncMapTitik";
// import AsyncMapPolygon from "../asyncPages/AsyncMapPolygon";
// import AsyncBarChart from "../asyncPages/AsyncBarChart";
// import AsyncGraphicPieChart from "../asyncPages/AsyncGraphicPieChart";
// import AsyncGraphicLineChart from "../asyncPages/AsyncGraphicLineChart";

// import AsyncNotif from "../asyncPages/AsyncNotif";
// import AsyncForm from "../asyncPages/AsyncForm";
// import AsyncFilter from "../asyncPages/AsyncFilter";
// import AsyncTable from "../asyncPages/AsyncTable";
// import AsyncUsers from "../asyncPages/AsyncUsers";

import AsyncDashboardAdmin from '../asyncPages/AsyncDashboardAdmin';
import AsyncPengguna from '../asyncPages/AsyncPengguna';
import AsyncProfile from '../asyncPages/AsyncProfile';
import AsyncLokasiSurvey from '../asyncPages/AsyncLokasiSurvey';
import AsyncHasilSurvey from '../asyncPages/AsyncHasilSurvey';
import AsyncPenugasan from '../asyncPages/AsyncPenugasan';
import AsyncSurveyCluster from '../asyncPages/AsyncSurveyCluster';
import AsyncFAQ from '../asyncPages/AsyncFAQ';
import AsyncDetailSurvey from '../asyncPages/AsyncDetailSurvey';
import AsyncNotificationPage from '../asyncPages/AsyncNotificationPage';
import AsyncDetailIssue from '../asyncPages/AsyncDetailIssue';
import AsyncDetailSurveyBTS from '../asyncPages/AsyncDetailSurveyBTS';
import AsyncGnettrack from '../asyncPages/AsyncGnettrack';
import AsyncDetailGNet from '../asyncPages/AsyncDetailGNet';
import AsyncDetailGNetForm from '../asyncPages/AsyncDetailGNetForm';
import AsyncPlannet from '../asyncPages/AsyncPlannet';
import AsyncDetailPlannet from '../asyncPages/AsyncDetailPlannet';
import AsyncDetailCompare from '../asyncPages/AsyncDetailCompare';
import DetailSurveyBTSDownloadPDF from '../components/DetailSurveyBTS/DownloadPDF';
import DetailSurveyDownloadPDF from '../components/DetailSurvey/DownloadPDF';
import DetailIssueDownloadPDF from '../components/DetailIssue/DownloadPDF';
import PrivacyPolicy from '../pages/PrivacyPolicy';

import Pages404 from '../pages/Utility/pages-404';

// import ModuleGraphicBarToast from "../pages/ModuleGraphic/ToastUI/BarChart";
import ModuleFilter from '../pages/ModuleFilter';
// import ModuleGraphicPieToast from "../pages/ModuleGraphic/ToastUI/PieChart";
// import ModuleGraphicLineChart from "../asyncPages/AsyncGraphicLineChart";

const AppAdmin = (props) => {
  return (
    <Switch>
      <Route exact path={`${props.match.url}home`} component={AsyncHome} />
      <Route
        exact
        path={`${props.match.url}admin/dashboard`}
        component={AsyncDashboardAdmin}
      />
      <Route
        exact
        path={`${props.match.url}admin/data-pengguna`}
        component={AsyncPengguna}
      />
      <Route
        exact
        path={`${props.match.url}admin/profile`}
        component={AsyncProfile}
      />
      <Route
        exact
        path={`${props.match.url}admin/lokasi-survey`}
        component={AsyncLokasiSurvey}
      />
      <Route
        exact
        path={`${props.match.url}admin/hasil-survey`}
        component={AsyncHasilSurvey}
      />
      <Route
        exact
        path={`${props.match.url}admin/penugasan`}
        component={AsyncPenugasan}
      />
      <Route
        exact
        path={`${props.match.url}admin/survey-cluster`}
        component={AsyncSurveyCluster}
      />
      <Route exact path={`${props.match.url}admin/faq`} component={AsyncFAQ} />
      <Route
        exact
        path={`${props.match.url}page-not-found`}
        component={Pages404}
      />
      <Route
        exact
        path={`${props.match.url}admin/hasil-survey/:id`}
        component={AsyncDetailSurvey}
      />
      <Route
        exact
        path={`${props.match.url}admin/notifikasi`}
        component={AsyncNotificationPage}
      />
      <Route exact path={`${props.match.url}date`} component={ModuleFilter} />
      <Route
        exact
        path={`${props.match.url}admin/hasil-survey/issue/:id`}
        component={AsyncDetailIssue}
      />
      <Route
        exact
        path={`${props.match.url}admin/hasil-survey/BTS/:id`}
        component={AsyncDetailSurveyBTS}
      />
      <Route
        exact
        path={`${props.match.url}admin/gnettrack`}
        component={AsyncGnettrack}
      />
      <Route
        exact
        path={`${props.match.url}admin/gnettrack/:id`}
        component={AsyncDetailGNet}
      />
      <Route
        exact
        path={`${props.match.url}admin/gnettrack/form/:id`}
        component={AsyncDetailGNetForm}
      />
      <Route
        exact
        path={`${props.match.url}admin/plannet`}
        component={AsyncPlannet}
      />
      <Route
        exact
        path={`${props.match.url}admin/plannet/:id`}
        component={AsyncDetailPlannet}
      />
      <Route
        exact
        path={`${props.match.url}admin/compare`}
        component={AsyncDetailCompare}
      />
      <Route
        exact
        path={`${props.match.url}admin/hasil-survey/BTS/PDF/:id`}
        component={DetailSurveyBTSDownloadPDF}
      />
      <Route
        exact
        path={`${props.match.url}admin/hasil-survey/PDF/:id`}
        component={DetailSurveyDownloadPDF}
      />
      <Route
        exact
        path={`${props.match.url}admin/hasil-survey/issue/PDF/:id`}
        component={DetailIssueDownloadPDF}
      />
      <Route
        exact
        path={`${props.match.url}admin/privacy-policy`}
        component={PrivacyPolicy}
      />
      <Redirect to="/admin/dashboard" />
    </Switch>
  );
};

export default AppAdmin;
