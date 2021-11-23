import React from 'react';
import DashboardLayout from "../components/Layout/DashboardLayout.js";
import ExecutiveDashboard from "../pages/Dashboard/Executive"
import Sidebar from "../components/Sidebar/Sidebar";
import Profile from '../pages/Profile/index.js';
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";


import ExecutiveProvider from "../context/ExecutiveProvider"

// const ExecutivePage = () => <DashboardLayout mainsection={ <MainSectionViewer item={menu} /> } />

const DashboardPage = () => {
	return <DashboardLayout sidebar={<Sidebar active={"DASHBOARD"} />} mainsection={<ExecutiveDashboard />} />;
  };

const Executive = (props) => {
	return(
		<ExecutiveProvider>
		<Switch>

			<Redirect exact from={`${props.match.url}`} to={`${props.match.url}/executive/dashboard`} />
			<Route exact path={`${props.match.url}/executive/dashboard`} component={DashboardPage} />
			<Route exact path={`${props.match.url}/executive/profile`} component={Profile} />
			<Redirect to="" />
        </Switch>
		</ExecutiveProvider>

	)
}

export default Executive