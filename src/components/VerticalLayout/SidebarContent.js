import React, { useEffect } from "react";

// MetisMenu
import MetisMenu from "metismenujs";
import { withRouter } from "react-router-dom";
import { Link, useHistory } from "react-router-dom";

//i18n
import { withNamespaces } from "react-i18next";

const SidebarContent = (props) => {
	const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
	const history = useHistory();

	const currentURL = window.location.pathname;

	const toggleSidebar = () => {
		// console.log("asdasdadasds");
		props.toggleLeftmenu(!props.leftMenu);
		if (props.leftSideBarType === "default") {
			props.changeSidebarType("condensed", isMobile);
		} else if (props.leftSideBarType === "condensed") {
			props.changeSidebarType("default", isMobile);
		}
	};
	// Use ComponentDidMount and ComponentDidUpdate method symultaniously
	useEffect(() => {
		var pathName = props.location.pathname;

		const initMenu = () => {
			new MetisMenu("#side-menu");
			var matchingMenuItem = null;
			var ul = document.getElementById("side-menu");
			var items = ul.getElementsByTagName("a");
			for (var i = 0; i < items.length; ++i) {
				if (pathName === items[i].pathname) {
					matchingMenuItem = items[i];
					break;
				}
			}
			if (matchingMenuItem) {
				activateParentDropdown(matchingMenuItem);
			}
		};
		initMenu();
	}, [props.location.pathname]);

	const role = window.localStorage.getItem("roleName");

	function activateParentDropdown(item) {
		item.classList.add("active");
		const parent = item.parentElement;

		if (parent) {
			parent.classList.add("mm-active");
			const parent2 = parent.parentElement;

			if (parent2) {
				parent2.classList.add("mm-show");

				const parent3 = parent2.parentElement;

				if (parent3) {
					parent3.classList.add("mm-active"); // li
					parent3.childNodes[0].classList.add("mm-active"); //a
					const parent4 = parent3.parentElement;
					if (parent4) {
						parent4.classList.add("mm-active");
					}
				}
			}
			return false;
		}
		return false;
	}

	return (
		<React.Fragment>
			<div style={{ position: "fixed" }}>
				{role === "Admin" ? (
					<div id="sidebar-menu">
						<ul className="metismenu list-unstyled" id="side-menu">
							<li>
								<Link to="/admin/home" className="waves-effect">
									<i className="bx bx-home-circle"></i>
									<span>{props.t("Home")}</span>
								</Link>
							</li>
							<li>
								<Link to="/admin/user-management" className="waves-effect">
									<i className="bx bxs-group"></i>
									<span>{props.t("User Management")}</span>
								</Link>
							</li>
							<li>
								{/* <Link to="/admin/explore-data" className="waves-effect">
									<i className="bx bx-folder-open"></i>
									<span>{props.t("Explore Data")}</span>
								</Link> */}
								<Link
									to="/#"
									onClick={(e) => {
										alert("Sedang dalam maintenance");
										e.preventDefault();
									}}
									className="waves-effect"
								>
									<i className="bx bx-folder-open"></i>
									<span>{props.t("Explore Data")}</span>
								</Link>
							</li>
							<li>
								<Link
									to="/admin/site-matchmaking"
									className="waves-effect"
									style={
										currentURL === "/admin/batch"
											? {
													color: "white",
											  }
											: { color: "" }
									}
								>
									<i className="bx bx-filter-alt"></i>
									<span>{props.t("Site Matchmaking")}</span>
								</Link>
							</li>
							<li>
								<Link to="/admin/vendor-performance" className="waves-effect">
									<i className="bx bx-bullseye"></i>
									<span>Vendor Performance</span>
								</Link>
							</li>
							<li>
								<a href={`http://sisbakti.id/faq/`} className="waves-effect">
									<i className="bx bx-info-circle"></i>
									<span>FAQ</span>
								</a>
							</li>
						</ul>
					</div>
				) : role === "Penyedia" ? (
					<div id="sidebar-menu">
						<ul className="metismenu list-unstyled" id="side-menu">
							<li>
								{/* <Link to="/vendor/home" className="waves-effect">
									<i className="bx bx-home-circle"></i>
									<span>Home</span>
								</Link> */}
								<Link
									to="/#"
									onClick={(e) => {
										alert("Sedang dalam maintenance");
										e.preventDefault();
									}}
									className="waves-effect"
								>
									<i className="bx bx-home-circle"></i>
									<span>Home</span>
								</Link>
							</li>
							<li>
								{/* <Link to="/vendor/explore-data" className="waves-effect">
									<i className="bx bx-folder-open"></i>
									<span>Explore Data</span>
								</Link> */}
								<Link
									to="/#"
									onClick={(e) => {
										alert("Sedang dalam maintenance");
										e.preventDefault();
									}}
									className="waves-effect"
								>
									<i className="bx bx-home-circle"></i>
									<span>Explore Data</span>
								</Link>
							</li>
							<li>
								<Link to="/vendor/site-matchmaking" className="waves-effect">
									<i className="bx bx-filter-alt"></i>
									<span>Site Matchmaking</span>
								</Link>
							</li>
							<li>
								{/* <a
									href={`http://sisbakti.id/faq-vendor/`}
									className="waves-effect"
								>
									<i className="bx bx-info-circle"></i>
									<span>FAQ</span>
								</a> */}
								<Link
									to="/#"
									onClick={(e) => {
										alert("Sedang dalam maintenance");
										e.preventDefault();
									}}
									className="waves-effect"
								>
									<i className="bx bx-home-circle"></i>
									<span>FAQ</span>
								</Link>
							</li>
						</ul>
					</div>
				) : (
					<div id="sidebar-menu">
						<ul className="metismenu list-unstyled" id="side-menu">
							<li>
								<Link to="/executive/home" className="waves-effect">
									<i className="bx bx-home-circle"></i>
									<span>Home</span>
								</Link>
							</li>
							<li>
								{/* <Link to="/executive/explore-data" className="waves-effect">
									<i className="bx bx-folder-open"></i>
									<span>Explore Data</span>
								</Link> */}
								<Link
									onClick={() => alert("Sedang dalam maintenance")}
									className="waves-effect"
								>
									<i className="bx bx-folder-open"></i>
									<span>{props.t("Explore Data")}</span>
								</Link>
							</li>
							{/* <li>
								<Link to="/executive/site-matchmaking" className="waves-effect">
									<i className="bx bx-filter-alt"></i>
									<span>Site Matchmaking</span>
								</Link>
							</li> */}
							<li>
								<a
									href={`http://sisbakti.id/faq-executive/`}
									className="waves-effect"
								>
									<i className="bx bx-info-circle"></i>
									<span>FAQ</span>
								</a>
							</li>
						</ul>
					</div>
				)}
				{isMobile ? (
					<li>
						<Link
							to=""
							onClick={() => history.goBack()}
							className=" waves-effect"
						>
							<i className="bx bx-arrow-back"></i>
							<span>{props.leftSideBarType === "default" ? `` : ` Back`}</span>
						</Link>
					</li>
				) : (
					""
				)}
			</div>
		</React.Fragment>
	);
};

export default withRouter(withNamespaces()(SidebarContent));
