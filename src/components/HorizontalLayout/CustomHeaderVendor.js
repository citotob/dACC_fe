import React, { useState } from "react";

import { connect } from "react-redux";

import { Link } from "react-router-dom";
import style from "./style.module.css";

// Redux Store
import { showRightSidebarAction, toggleLeftmenu } from "../../store/actions";
// reactstrap
import {
	Row,
	Col,
	Dropdown,
	DropdownToggle,
	DropdownMenu,
	Collapse,
} from "reactstrap";

// Import menuDropdown
// import LanguageDropdown from "../CommonForBoth/TopbarDropdown/LanguageDropdown";
import NotificationDropdown from "../CommonForBoth/TopbarDropdown/NotificationDropdown";
import ProfileMenu from "../CommonForBoth/TopbarDropdown/ProfileMenu";

// import megamenuImg from "../../assets/images/megamenu-img.png";
// import logo from "../../assets/images/logo-sm-light.png";
import logo from "../../assets/images/Group.png";
import logoBakti from "../../assets/images/BAKTI.png";
import logoLight from "../../assets/images/logo-light.png";
import logoLightSvg from "../../assets/images/logo-light.svg";
import logoDark from "../../assets/images/logo-dark.png";

// import images
import github from "../../assets/images/brands/github.png";
import bitbucket from "../../assets/images/brands/bitbucket.png";
import dribbble from "../../assets/images/brands/dribbble.png";
import dropbox from "../../assets/images/brands/dropbox.png";
import mail_chimp from "../../assets/images/brands/mail_chimp.png";
import slack from "../../assets/images/brands/slack.png";

//i18n
import { withNamespaces } from "react-i18next";

const Header = (props) => {
	// const [menu, setMenu] = useState(false);
	const [isSearch, setSearch] = useState(false);
	const [socialDrp, setsocialDrp] = useState(false);

	function toggleFullscreen() {
		if (
			!document.fullscreenElement &&
			/* alternative standard method */ !document.mozFullScreenElement &&
			!document.webkitFullscreenElement
		) {
			// current working methods
			if (document.documentElement.requestFullscreen) {
				document.documentElement.requestFullscreen();
			} else if (document.documentElement.mozRequestFullScreen) {
				document.documentElement.mozRequestFullScreen();
			} else if (document.documentElement.webkitRequestFullscreen) {
				document.documentElement.webkitRequestFullscreen(
					Element.ALLOW_KEYBOARD_INPUT
				);
			}
		} else {
			if (document.cancelFullScreen) {
				document.cancelFullScreen();
			} else if (document.mozCancelFullScreen) {
				document.mozCancelFullScreen();
			} else if (document.webkitCancelFullScreen) {
				document.webkitCancelFullScreen();
			}
		}
	}
	return (
		<React.Fragment>
			<header id="page-topbar">
				<div className="navbar-header">
					<div className={"ml-3"}>
						<Link to="/">
							<span className="logo-lg">
								<img src={logoBakti} alt="" height="19" />
							</span>
						</Link>
					</div>
					<div className="d-flex">
						<Dropdown
							className="mr-2"
							isOpen={socialDrp}
							toggle={() => {
								setsocialDrp(!socialDrp);
							}}
						>
							<DropdownToggle
								className="btn header-item noti-icon waves-effect"
								caret
								tag="button"
							>
								<i className="fa fa-fw fa-bars"></i>
							</DropdownToggle>
							<DropdownMenu
								className={`bg-dark ${style.dropDownMenu}`}
								right={true}
							>
								<div className="px-lg-2">
									<div id="sidebar-menu">
										<ul className="list-unstyled" id="side-menu">
											<li>
												<Link to="/vendor/home" className="waves-effect">
													<i className="bx bx-home-circle"></i>
													<span>Home</span>
												</Link>
											</li>
											{/* <li>
												<Link
													to="/admin/user-management"
													className="waves-effect"
												>
													<i className="bx bxs-group"></i>
													<span>User Management</span>
												</Link>
											</li> */}
											<li>
												<Link to="/vendor/explore-data" className="waves-effect">
													<i className="bx bx-folder-open"></i>
													<span>Explore Data</span>
												</Link>
											</li>
											<li>
												<Link
													to="/vendor/site-matchmaking"
													className="waves-effect"
												>
													<i className="bx bx-filter-alt"></i>
													<span>Site Matchmaking</span>
												</Link>
											</li>
											{/* <li>
												<Link
													to="/admin/vendor-performance"
													className="waves-effect"
												>
													<i className="bx bx-bullseye"></i>
													<span>Vendor Performance</span>
												</Link>
											</li> */}
											<li>
												<Link to="/vendor/faq" className="waves-effect">
													<i className="bx bx-info-circle"></i>
													<span>FAQ</span>
												</Link>
											</li>
										</ul>
									</div>
								</div>
							</DropdownMenu>
						</Dropdown>
						<NotificationDropdown />

						<ProfileMenu />
					</div>
				</div>
			</header>
		</React.Fragment>
	);
};

const mapStatetoProps = (state) => {
	const { layoutType, showRightSidebar, leftMenu } = state.Layout;
	return { layoutType, showRightSidebar, leftMenu };
};

export default connect(mapStatetoProps, {
	showRightSidebarAction,
	toggleLeftmenu,
})(withNamespaces()(Header));
