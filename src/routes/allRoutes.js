import React from "react";
import { Redirect } from "react-router-dom";

// Authentication related pages
// import Login from "../pages/Authentication/Login";
// import Register from "../pages/Authentication/Register";
// import ForgetPwd from "../pages/Authentication/ForgetPassword";

import Login from "../pages/Login/login";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Register/register";
import ForgetPwd from "../pages/ForgotPassword/forgotPass";
import Pages404 from "../pages/Utility/pages-404";

// Dashboard
import AdminHome from "../pages/Home/Admin";
import VendorHome from "../pages/Home/Vendor";
import ExecutiveHome from "../pages/Home/Executive";

// Profile
import profileAdmin from "../pages/Authentication/profileAdmin";
import profileVendor from "../pages/Authentication/profileVendor";
import profileExe from "../pages/Authentication/profileExe";

// Admin
import FaqAdmin from "../pages/FAQ/Admin";
import ExploreDataAdmin from "../pages/ExploreData/Admin";
import SiteMatchmakingAdmin from "../pages/SiteMatchmaking/Admin";
import SiteMatchmakingAdminDetail from "../pages/SiteMatchmaking/Admin/BatchDetail";
import CreateBatch from "../pages/SiteMatchmaking/Admin/CreateBatch";
import UserManagementAdmin from "../pages/UserManagement/Admin";
import VendorPerformancePages from "../pages/VendorPerformance/Admin";

// Vendor
import FaqVendor from "../pages/FAQ/Vendor";
import ExploreDataVendor from "../pages/ExploreData/Vendor";
import SiteMatchmakingVendor from "../pages/SiteMatchmaking/Vendor";
import SiteMatchmakingVendorPenawaran from "../pages/SiteMatchmaking/Vendor/penawaran";
import SiteMatchmakingVendorSummary from "../pages/SiteMatchmaking/Vendor/summary";

// Executive
import FaqExecutive from "../pages/FAQ/Executive";
import ExploreDataExecutive from "../pages/ExploreData/Executive";
import SiteMatchmakingExecutive from "../pages/SiteMatchmaking/Executive";
import ResetPassPages from "../pages/ResetPass/reset";

// Exxplore Data

const userRoutes = [
	//login
	{ path: "/login", component: Login },

	//Admin
	{ path: "/admin/home", component: AdminHome },
	{ path: "/admin/profile", component: profileAdmin },
	{ path: "/admin/vendor-performance", component: VendorPerformancePages },
	{ path: "/admin/faq", component: FaqAdmin },
	{ path: "/admin/explore-data", component: ExploreDataAdmin },
	{ path: "/admin/site-matchmaking", component: SiteMatchmakingAdmin },
	{ path: "/admin/batch", component: CreateBatch },
	{ path: "/admin/user-management", component: UserManagementAdmin },
	{
		path: "admin/batch-detail/:id/:judul",
		component: SiteMatchmakingAdminDetail,
	},

	//Vendor
	{ path: "/vendor/home", component: VendorHome },
	{ path: "/vendor/profile", component: profileVendor },
	{ path: "/vendor/faq", component: FaqVendor },
	{ path: "/vendor/explore-data", component: ExploreDataVendor },
	{ path: "/vendor/site-matchmaking", component: SiteMatchmakingVendor },
	{
		path: "/vendor/sm/penawaran/:id/:judul",
		component: SiteMatchmakingVendorPenawaran,
	},
	{
		path: "/vendor/sm/summary/:id/:judul",
		component: SiteMatchmakingVendorSummary,
	},

	// Executive
	{ path: "/executive/home", component: ExecutiveHome },
	{ path: "/executive/profile", component: profileExe },
	{ path: "/executive/faq", component: FaqExecutive },
	{ path: "/executive/explore-data", component: ExploreDataExecutive },
	{ path: "/executive/site-matchmaking", component: SiteMatchmakingExecutive },

	// { path: "/admin/exploredata", component: ExploreData },

	// this route should be at the end of all other routes
	{ path: "/", exact: true, component: () => <Redirect to="/login" /> },
];

const authRoutes = [
	{ path: "/logout", component: Logout },
	{ path: "/login", component: Login },
	{ path: "/forgot-password", component: ForgetPwd },
	{ path: "/register", component: Register },
	{ path: "/resetpassword/:token", component: ResetPassPages },
	{ path: "/pages-404", component: Pages404 },
	{ path: "/vendor-performance", component: VendorPerformancePages },
];

export { userRoutes, authRoutes };
