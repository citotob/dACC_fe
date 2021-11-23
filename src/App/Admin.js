import React from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import DashboardLayout from "../components/Layout/DashboardLayout.js";
import Sidebar from "../components/Sidebar/Sidebar";
import Pengguna from "../pages/Pengguna/Admin";
import HasilSurvey from "../pages/HasilSurvey/Admin";
import SurveyCluster from "../pages/SurveyCluster/Admin";
import LokasiSurvey from "../pages/LokasiSurvey/Admin";
import AdminProvider from "../context/AdminProvider";
import Dashboard from "../pages/Dashboard/DashboardMain";
import Profile from "../pages/Profile";
import PenugasanAdmin from "../pages/Penugasan/Admin";
import NewHasilSurveyDetailBTS from "../pages/HasilSurveyDetail/Admin/BTS/NewHasilSurveyDetailBTS.js";
import HasilSurveyBtsDetail from "../pages/HasilSurveyDetail/Admin/BTS/HasilSurveyBtsDetail.js";

//pages
const DashboardPage = () => {
  return <DashboardLayout sidebar={<Sidebar active={"DASHBOARD"} />} mainsection={<Dashboard />} />;
};

const PenggunaPage = () => (
  <DashboardLayout sidebar={<Sidebar active={"PENGGUNA"} />} mainsection={<Pengguna />} />
);

const LokasiSurveyPage = () => (
  <DashboardLayout sidebar={<Sidebar active={"LOKASI SURVEY"} />} mainsection={<LokasiSurvey />} />
);

const PenugasanPage = () => (
  <DashboardLayout sidebar={<Sidebar active={"PENUGASAN"} />} mainsection={<PenugasanAdmin />} />
);

const HasilSurveyPage = () => (
  <DashboardLayout sidebar={<Sidebar active={"HASIL SURVEY"} />} mainsection={<HasilSurvey />} />
);

const SurveyClusterPage = () => (
  <DashboardLayout sidebar={<Sidebar active={"SURVEY CLUSTER"} />} mainsection={<SurveyCluster />} />
);

const FaqPage = () => (
  // <DashboardLayout sidebar={<Sidebar active={"FAQ"} />} mainsection={<a href="https://pasti.baktikominfo.id/pasti-docs/" />} />
  <a href="https://smaslab.devlabs.id/faq_admin_bakti/" />
);

const detailHasilSurveyPage = () => {
  return (
    <DashboardLayout
      sidebar={<Sidebar active={"HASIL SURVEY"} />}
      mainsection={<HasilSurveyBtsDetail />}
    />
  )
}

const Admin = (props) => {
  return (
    <AdminProvider>
      <Switch>
        <Redirect exact from={`${props.match.url}`} to={`${props.match.url}/admin/dashboard`} />
        <Route exeact path={`${props.match.url}/admin/dashboard`} component={DashboardPage} />
        <Route exact path={`${props.match.url}/admin/pengguna`} component={PenggunaPage} />
        <Route exact path={`${props.match.url}/admin/lokasisurvey`} component={LokasiSurveyPage} />
        <Route exact path={`${props.match.url}/admin/penugasan`} component={PenugasanPage} />
        <Route exact path={`${props.match.url}/admin/hasilsurvey`} component={HasilSurveyPage} />
        <Route exact path={`${props.match.url}/admin/surveycluster`} component={SurveyClusterPage} />
        <Route exact path={`${props.match.url}/admin/profile`} component={Profile} />
        <Route path={`${props.match.url}/admin/hasilsurvey/detail/:kode_survei`} component={detailHasilSurveyPage} />
        {/* <Route exact path={`${props.match.url}/admin/faq`} component={FaqPage} /> */}
        <Route exact path={`${props.match.url}/admin/faq`} render={() => (window.location = "https://smaslab.devlabs.id/faq_admin_bakti/")} />
        <Redirect to="/" />
      </Switch>
    </AdminProvider>
  );
};

export default Admin;
