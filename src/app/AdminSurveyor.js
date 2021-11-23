import React from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import DashboardLayout from "../components/Layout/DashboardLayout.js";
import Sidebar from "../components/Sidebar/Sidebar";
import AdminSurveyorProvider from "../context/AdminSurveyorProvider";
import PenugasanSurveyor from "../pages/Penugasan/Surveyor";
import HasilSurveySurveyor from "../pages/HasilSurvey/Surveyor";
// import Faq from "../pages/Faq";
import Profile from "../pages/Profile";
import Dashboard from "../pages/Dashboard/DashboardSurveyor";
import NewHasilSurveyBTS from "../pages/HasilSurveyDetail/Surveyor/BTS/NewHasilSurveyBTS.js";
import BTSTabelHasilSurvey from "../pages/HasilSurvey/Surveyor/BTSTabelHasilSurvey.js";

const DashboardPage = () => {
  return <DashboardLayout sidebar={<Sidebar active={"DASHBOARD"} />} mainsection={<Dashboard />} />;
};

const PenugasanPage = () => (
  <DashboardLayout sidebar={<Sidebar active={"PENUGASAN"} />} mainsection={<PenugasanSurveyor />} />
);

const HasilSurveyPage = () => {
  return (
    <DashboardLayout
      sidebar={<Sidebar active={"HASIL SURVEY"} />}
      mainsection={<HasilSurveySurveyor />}
    />
  );
};

const detailHasilSurveyPage = () => {
  return (
    <DashboardLayout
      sidebar={<Sidebar active={"HASIL SURVEY"} />}
      mainsection={<NewHasilSurveyBTS />}
    />
  )
}

const btsTabelNew = () => {
  return (
    <DashboardLayout
      sidebar={<Sidebar active={"HASIL SURVEY"} />}
      mainsection={<BTSTabelHasilSurvey />}
    />
  )
}

const FaqPage = () => (
  <DashboardLayout sidebar={<Sidebar active={"FAQ"} />} mainsection={<h1>FAQ</h1>} />
);

const AdminSurveyor = (props) => {
  return (
    <AdminSurveyorProvider>
      <Switch>
        <Redirect exact from={`${props.match.url}`} to={`${props.match.url}/adminsurveyor/dashboard`} />
        <Route exeact path={`${props.match.url}/adminsurveyor/dashboard`} component={DashboardPage} />
        <Route exact path={`${props.match.url}/adminsurveyor/penugasan`} component={PenugasanPage} />
        <Route exact path={`${props.match.url}/adminsurveyor/hasilsurvey`} component={HasilSurveyPage} />
        <Route exact path={`${props.match.url}/adminsurveyor/hasilsurvey/bts`} component={btsTabelNew} />

        <Route path={`${props.match.url}/adminsurveyor/hasilsurvey/detail/:kode_survei`} component={detailHasilSurveyPage} />

        <Route exact path={`${props.match.url}/adminsurveyor/profile`} component={Profile} />
        {/* <Route exact path={`${props.match.url}/adminsurveyor/faq`} component={FaqPage} /> */}
        <Route exact path={`${props.match.url}/adminsurveyor/faq`} render={() => (window.location = "https://smaslab.devlabs.id/faq_admin_surveyor/")} />
        <Redirect to="/error" />
      </Switch>
    </AdminSurveyorProvider>
  );
};

export default AdminSurveyor;
