import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import Home from "../pages/Home/Vendor";
import profile from "../pages/Authentication/profileVendor";
import FaqVendor from "../pages/FAQ/Vendor";
import ExploreDataVendor from "../pages/ExploreData/Vendor";
import SiteMatchmakingVendor from "../pages/SiteMatchmaking/Vendor";
import SiteMatchmakingVendorPenawaran from "../pages/SiteMatchmaking/Vendor/penawaran";
import SiteMatchmakingVendorSummary from "../pages/SiteMatchmaking/Vendor/summary";

const AppVendor = (props) => {
	return (
		<Switch>
			{/* <Redirect
				exact
				from={`${props.match.url}`}
				to={`${props.match.url}vendor/home`}
			/> */}
			<Redirect
				exact
				from={`${props.match.url}`}
				to={`${props.match.url}vendor/site-matchmaking`}
			/>
			<Route
				exeact
				path={`${props.match.url}vendor/profile`}
				component={profile}
			/>
			{/* <Route exeact path={`${props.match.url}vendor/home`} component={Home} /> */}
			{/* <Route
				exeact
				path={`${props.match.url}vendor/faq`}
				component={FaqVendor}
			/>
			<Route
				exeact
				path={`${props.match.url}vendor/explore-data`}
				component={ExploreDataVendor}
			/> */}
			<Route
				exeact
				path={`${props.match.url}vendor/sm/penawaran/:id/:judul`}
				component={SiteMatchmakingVendorPenawaran}
			/>
			<Route
				exeact
				path={`${props.match.url}vendor/sm/summary/:id/:judul`}
				component={SiteMatchmakingVendorSummary}
			/>
			<Route
				exeact
				path={`${props.match.url}vendor/site-matchmaking`}
				component={SiteMatchmakingVendor}
			/>
			<Redirect to="/" />
		</Switch>
	);
};

export default AppVendor;
