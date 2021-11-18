import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import Home from "../pages/Home/Executive";
import profile from "../pages/Authentication/profileExe";
import FaqExecutive from "../pages/FAQ/Executive";
import ExploreDataExecutive from "../pages/ExploreData/Executive";
// import SiteMatchmakingExecutive from "../pages/SiteMatchmaking/Executive";

const AppExecutive = (props) => {
	return (
		<Switch>
			<Redirect
				exact
				from={`${props.match.url}`}
				to={`${props.match.url}executive/home`}
			/>
			<Route
				exeact
				path={`${props.match.url}executive/home`}
				component={Home}
			/>
			<Route
				exeact
				path={`${props.match.url}executive/profile`}
				component={profile}
			/>
			<Route
				exeact
				path={`${props.match.url}executive/faq`}
				component={FaqExecutive}
			/>
			{/* <Route
				exeact
				path={`${props.match.url}executive/explore-data`}
				component={ExploreDataExecutive}
			/> */}
			{/* <Route
				exeact
				path={`${props.match.url}executive/site-matchmaking`}
				component={SiteMatchmakingExecutive}
			/> */}
			<Redirect to="/" />
		</Switch>
	);
};

export default AppExecutive;
