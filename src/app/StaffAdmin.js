import React from 'react';
import {
	BrowserRouter as Router,
	Redirect,
	Route,
	Switch,
} from "react-router-dom";
import DashboardLayout from "../components/Layout/DashboardLayout.js";
import Sidebar from "../components/Sidebar/Sidebar";
import StaffAdminProvider from "../context/StaffAdminProvider";
import Pengguna from "../pages/Pengguna/StaffAdmin";
import HasilSurvey from "../pages/HasilSurvey/Admin";
import SurveyCluster from "../pages/SurveyCluster/Admin";
import LokasiSurvey from "../pages/LokasiSurvey/StaffAdmin";
import Penugasan from '../pages/Penugasan/StaffAdmin';
import Dashboard from "../pages/Dashboard/DashboardMain";
import Profile from "../pages/Profile";

//pages
const DashboardPage = () => {
	return (
		<DashboardLayout
			sidebar={<Sidebar active={"DASHBOARD"} />}
			mainsection={<Dashboard />}
		/>
	)
}

const PenggunaPage = () => (
	<DashboardLayout
		sidebar={<Sidebar active={"PENGGUNA"} />}
		mainsection={<Pengguna />}
	/>
)

const LokasiSurveyPage = () => (
	<DashboardLayout
		sidebar={<Sidebar active={"LOKASI SURVEY"} />}
		mainsection={<LokasiSurvey />}
	/>
)

const PenugasanPage = () => (
	<DashboardLayout
		sidebar={<Sidebar active={"PENUGASAN"} />}
		mainsection={<Penugasan />}
	/>
)

const HasilSurveyPage = () => (
	<DashboardLayout
		sidebar={<Sidebar active={"HASIL SURVEY"} />}
		mainsection={<HasilSurvey />}
	/>
)

const SurveyClusterPage = () => (
	<DashboardLayout sidebar={<Sidebar active={"SURVEY CLUSTER"} />}
		mainsection={<SurveyCluster />}
	/>
);

const FaqPage = () => (
	// <DashboardLayout sidebar={<Sidebar active={"FAQ"} />} mainsection={<a href="https://pasti.baktikominfo.id/pasti-docs/" />} />
	<a href="https://smaslab.devlabs.id/faq_staffadmin_bakti/" />
);

const StaffAdmin = (props) => {

	return (
		<StaffAdminProvider>
			<Switch>
				<Redirect exact from={`${props.match.url}`} to={`${props.match.url}/staffadmin/dashboard`} />
				<Route exeact path={`${props.match.url}/staffadmin/dashboard`} component={DashboardPage} />
				<Route exact path={`${props.match.url}/staffadmin/pengguna`} component={PenggunaPage} />
				<Route exact path={`${props.match.url}/staffadmin/lokasisurvey`} component={LokasiSurveyPage} />
				<Route exact path={`${props.match.url}/staffadmin/penugasan`} component={PenugasanPage} />
				<Route exact path={`${props.match.url}/staffadmin/hasilsurvey`} component={HasilSurveyPage} />
				<Route exact path={`${props.match.url}/staffadmin/surveycluster`} component={SurveyClusterPage} />
				<Route exact path={`${props.match.url}/staffadmin/profile`} component={Profile} />
				<Route exact path={`${props.match.url}/staffadmin/faq`} render={() => (window.location = "https://smaslab.devlabs.id/faq_staffadmin_bakti/")} />
				<Redirect to="/error" />
			</Switch>
		</StaffAdminProvider>
	)
}

export default StaffAdmin