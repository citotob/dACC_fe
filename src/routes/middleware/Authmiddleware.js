import React from "react";
import { Route, withRouter, Redirect } from "react-router-dom";
import AppAdmin from "../../App/Admin";
import AppVendor from "../../App/Vendor";
import AppExecutive from "../../App/Executive";
import ExploreDataPage from "../../pages/ExploreData/Admin";
import ExploreDataPageExe from "../../pages/ExploreData/Executive";
import ExploreDataPageVendor from "../../pages/ExploreData/Vendor";

const Authmiddleware = ({ component: Component, layout: Layout }) => (
	<Route
		render={(props) => {
			// here you can apply condition
			let role = window.localStorage.getItem("roleName");
			if (!role) {
				if (props.location.pathname !== "/login") {
					return (
						<Redirect
							to={{ pathname: "/login", state: { from: props.location } }}
						/>
					);
				} else {
					return <Component {...props} />;
				}
			} else {
				if (role) {
					// ADMIN
					const isExploreData =
						props.location.pathname === "/admin/explore-data";

					// VENDOR
					const isExploreDataVendor =
						props.location.pathname === "/vendor/explore-data";

					// EXECUTIVE
					const isExploreDataExe =
						props.location.pathname === "/executive/explore-data";

					role = role.replace(/\s+/g, "").toString();

					// console.log(role)
					switch (role) {
						case "Admin":
							// if (isExploreData) {
							// 	return <ExploreDataPage />;
							// } else {
							return (
								<Layout>
									<AppAdmin {...props} />
								</Layout>
							);
						// }
						case "Penyedia":
							// if (isExploreDataVendor) {
							// 	return <ExploreDataPageVendor />;
							// } else {
							return (
								<Layout>
									<AppVendor {...props} />
								</Layout>
							);
						// }
						case "Executive":
							// if (isExploreDataExe) {
							// 	return <ExploreDataPageExe />;
							// } else {
							return (
								<Layout>
									<AppExecutive {...props} />
								</Layout>
							);
						// }
						default:
							break;
					}
				}
			}
		}}
	/>
);

export default withRouter(Authmiddleware);
