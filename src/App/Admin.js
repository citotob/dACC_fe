import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import Home from "../pages/Home/Admin";
import profile from "../pages/Authentication/profileAdmin";
import VendorPerformancePage from "../pages/VendorPerformance/Admin";
import FaqAdmin from "../pages/FAQ/Admin";
import ExploreDataAdmin from "../pages/ExploreData/Admin";
import SiteMatchmakingAdmin from "../pages/SiteMatchmaking/Admin";
import CreateBatch from "../pages/SiteMatchmaking/Admin/CreateBatch";
import BatchDetail from "../pages/SiteMatchmaking/Admin/BatchDetail";
import UserManagementAdmin from "../pages/UserManagement/Admin";

const AppAdmin = (props) => {
	return (
		<Switch>
			<Redirect
				exact
				from={`${props.match.url}`}
				to={`${props.match.url}admin/home`}
			/>
			<Route exeact path={`${props.match.url}admin/home`} component={Home} />
			<Route
				exeact
				path={`${props.match.url}admin/profile`}
				component={profile}
			/>
			<Route
				exeact
				path={`${props.match.url}admin/vendor-performance`}
				component={VendorPerformancePage}
			/>
			<Route exeact path={`${props.match.url}admin/faq`} component={FaqAdmin} />
			{/* <Route
				exeact
				path={`${props.match.url}admin/explore-data`}
				component={ExploreDataAdmin}
			/> */}
			<Route
				exeact
				path={`${props.match.url}admin/site-matchmaking`}
				component={SiteMatchmakingAdmin}
			/>
			<Route
				exeact
				path={`${props.match.url}admin/batch-detail/:id/:judul`}
				component={BatchDetail}
			/>
			<Route
				exeact
				path={`${props.match.url}admin/batch`}
				component={CreateBatch}
			/>
			<Route
				exeact
				path={`${props.match.url}admin/user-management`}
				component={UserManagementAdmin}
			/>
			<Redirect to="/" />
		</Switch>
	);
};

export default AppAdmin;
