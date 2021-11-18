import React, { useState, useEffect } from "react";

import { connect } from "react-redux";
// import { Row, Col } from "reactstrap";

import { Link, useLocation } from "react-router-dom";

import styles from "./styles.module.css";

import ModalTambahPengguna from "../Modal/TambahPengguna";

// Reactstrap
// import { Dropdown, DropdownToggle, DropdownMenu } from "reactstrap";

// Import menuDropdown
// import LanguageDropdown from "../CommonForBoth/TopbarDropdown/LanguageDropdown";
// import NotificationDropdown from "../CommonForBoth/TopbarDropdown/NotificationDropdown";
import Notifications from "../Notification/Admin/notifAdmin";
import NotificationsVendor from "../Notification/Vendor/notifVendor";
import NotificationsPenyedia from "../Notification/Pengedia/notifPenyedia";

import ProfileMenu from "../CommonForBoth/TopbarDropdown/ProfileMenu";

// import megamenuImg from "../../assets/images/megamenu-img.png";
import logo from "../../assets/images/Group.png";
// import logoLightPng from "../../assets/images/logo-light.png";
// import logoLightSvg from "../../assets/images/logo-light.svg";
// import logoDark from "../../assets/images/logo-dark.png";

// import images
// import github from "../../assets/images/brands/github.png";
// import bitbucket from "../../assets/images/brands/bitbucket.png";
// import dribbble from "../../assets/images/brands/dribbble.png";
// import dropbox from "../../assets/images/brands/dropbox.png";
// import mail_chimp from "../../assets/images/brands/mail_chimp.png";
// import slack from "../../assets/images/brands/slack.png";
import Get from "../../services/Get";
import _ from "lodash";

//i18n
import { withNamespaces } from "react-i18next";

// Redux Store
import {
	showRightSidebarAction,
	toggleLeftmenu,
	changeSidebarType,
} from "../../store/actions";
import API from "../../services";
// import Get from "../../services/Get";

const Header = (props) => {
	const [search, setsearch] = useState(false);
	// const [megaMenu, setmegaMenu] = useState(false);
	// const [socialDrp, setsocialDrp] = useState(false);

	const [modalTambahPengguna, setModalTambahPengguna] = useState(false);
	const [dataTambahPengguna, setDataTambahPengguna] = useState({});

	let userId = window.localStorage.getItem("userId");
	const role = window.localStorage.getItem("roleName");
	//Notification
	const [dataNotif, setDataNotif] = useState({
		clicked: [],
		notClicked: [],
		data: [],
	});
	const [dataCount, setDataCount] = useState();

	const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
	const location = useLocation();
	const PageTitle = () => {
		return location.pathname
			.substr(location.pathname.lastIndexOf("/") + 1)
			.replace("-", " ")
			.replaceAll("%20", " ")
			.replaceAll("%24", "/")
			.toUpperCase();
	};

	// console.log(`console log nya location`, location.pathname.split("/"));

	let toggleTambahPengguna = (pop) => {
		setDataTambahPengguna(pop);
		setModalTambahPengguna(!modalTambahPengguna);
	};

	const onNotif = (message) => {
		const notification = (message) => {
			new Notification("Teksas", {
				body: message,
				icon:
					"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRUcUCuXMald5MexzWYz8GwZAu-vqSr0JZOFw&usqp=CAU",
			});
		};
		if (!("Notification" in window)) {
			// console.log("This browser does not support desktop notification");
		} else if (Notification.permission === "granted") {
			notification(message);
		} else if (Notification.permission !== "denied") {
			Notification.requestPermission().then((requestPermission) => {
				if (requestPermission === "granted") {
					notification(message);
				}
			});
		}
	};
	const getNotif = () => {
		API.getNotification(userId)
			.then((res) => {
				let notifStatus = _.partition(res.data.values, { status: "new" });
				setDataNotif((prev) => ({
					...prev,
					notClicked: notifStatus[0],
					clicked: notifStatus[1],
				}));
				setDataNotif((prev) => ({ ...prev, data: res.data.values }));
				setDataCount(res.data);
			})
			.catch((err) => {
				setDataNotif([]);
				setDataCount("");
			});

		// API.getNotifStatus(userId)
		// 	.then((res) => {
		// 		let notifStatus = _.partition(res.data.values, { status: "new" });

		// 		setDataNotif((prev)=>({...prev,notClicked: notifStatus[0], clicked: notifStatus[1]}));
		// 		setDataNotif((prev)=>({...prev,data:res.data.values}));

		// 		setDataCount(res.data);
		// 	})
		// 	.catch((err) => {
		// 		setDataNotif([]);
		// 		setDataCount("");
		// 	});
	};
	// useEffect(() => {
	// 		// console.log("notif1");
	// 		// getNotif();
	// 		console.
	// 	},
	// 	[dataNotif.length],
	// 	[dataCount.length]
	// );
	useEffect(() => {
		// if (dataNotif.clicked.length !== 0) {
		getNotif();
		// }
		// console.log(getNotif());
	}, []);

	function tToggle() {
		props.toggleLeftmenu(!props.leftMenu);
		if (props.leftSideBarType === "default") {
			props.changeSidebarType("condensed", isMobile);
		} else if (props.leftSideBarType === "condensed") {
			props.changeSidebarType("default", isMobile);
		}
	}

	useEffect(() => {
		if (
			location.pathname === "/admin/explore-data" ||
			location.pathname === "/executive/explore-data" ||
			location.pathname === "/vendor/explore-data"
		) {
			props.toggleLeftmenu(!props.leftMenu);
			props.changeSidebarType("condensed", isMobile);
		} else {
			props.changeSidebarType("default", isMobile);
		}
	}, []);

	const tambahAction = () => {
		alert("hahaha");
	};

	return (
		<React.Fragment>
			<ModalTambahPengguna
				modalTambahPengguna={modalTambahPengguna}
				toggleTambahPengguna={() => toggleTambahPengguna(dataTambahPengguna)}
				data={dataTambahPengguna}
				tambahAction={tambahAction}
			/>

			<header id="page-topbar">
				<div className="navbar-header">
					<div className="d-flex align-items-center">
						<div
							className="navbar-brand-box"
							style={{ backgroundColor: "#073030" }}
						>
							<Link to="/" className="logo">
								<span className="logo-sm">
									<img src={logo} alt="" height="10" />
								</span>
								<span className="logo-lg">
									<img src={logo} alt="" height="25" />
								</span>
							</Link>
						</div>

						<button
							type="button"
							onClick={() => {
								tToggle();
							}}
							className="btn btn-sm px-3 font-size-16 header-item waves-effect"
							id="vertical-menu-btn"
							style={{
								display:
									location.pathname === "/admin/explore-data" ||
									location.pathname === "/executive/explore-data" ||
									location.pathname === "/vendor/explore-data"
										? "none"
										: "",
							}}
						>
							<i className="fa fa-fw fa-bars"></i>
						</button>
						<span className="ml-2">
							{location.pathname.includes("/admin/batch-detail/") &&
							localStorage.getItem("judul_batch_admin")
								? localStorage.getItem("judul_batch_admin").toUpperCase()
								: location.pathname.includes("/vendor/sm/penawaran/") &&
								  localStorage.getItem("judul_batch_vendor")
								? localStorage.getItem("judul_batch_vendor").toUpperCase()
								: PageTitle()}
						</span>
						{location.pathname === "/admin/user-management" ? (
							<button
								className={styles.buttonTambahPeng}
								onClick={() => toggleTambahPengguna()}
							>
								{/* <i className={`${styles.iconTambah} bx bx-plus`} />  */}
								<span className={styles.txtbtn}> + Tambah Pengguna</span>
							</button>
						) : (
							""
						)}
						{location.pathname === "/admin/site-matchmaking" ? (
							<Link to="/admin/batch">
								<button
									className={styles.buttonTambahBatch}
									onClick={() => {
										// localStorage.removeItem("dataInvitation");
										// localStorage.removeItem("judulBatch");
										// localStorage.removeItem("mulaiUndangan");
										// localStorage.removeItem("selesaiUndangan");
										// localStorage.removeItem("mulaiKerja");
										// localStorage.removeItem("selesaiKerja");
										// localStorage.removeItem("tipe");
										// localStorage.removeItem("noSurat");
										// localStorage.removeItem("sitesData");
										// localStorage.removeItem("priceExp");
										// localStorage.removeItem("sewaBelanja");
										// localStorage.setItem("teknologi", "");
										// localStorage.removeItem("idKabupaten");
										// localStorage.removeItem("idKecamatan");
										// localStorage.removeItem("rfi-score");
									}}
								>
									<span className={styles.txtbtn}> + Tambah Batch</span>
								</button>
							</Link>
						) : (
							""
						)}
						{/* <button className={styles.buttonTambahPeng}><i className={`${styles.iconTambah} bx bx-plus`} />Tambah Pengguna</button> */}
					</div>
					<div className="d-flex">
						{/* <Notifications data={dataNotif} dataCount={dataCount} /> */}
						{role === "Admin" ? (
							dataNotif && dataNotif.data ? (
								<Notifications
									data={dataNotif.data.length !== 0 ? dataNotif.data : []}
									dataClicked={
										dataNotif.clicked.length !== 0 ? dataNotif.clicked : []
									}
									dataNotClicked={
										dataNotif.notClicked.length !== 0
											? dataNotif.notClicked
											: []
									}
									dataCount={dataCount}
								/>
							) : (
								<Notifications
									data={[]}
									dataClicked={[]}
									dataNotClicked={[]}
									dataCount={0}
								/>
							)
						) : role === "Penyedia" ? (
							dataNotif && dataNotif.data ? (
								<NotificationsVendor
									data={dataNotif.data.length !== 0 ? dataNotif.data : []}
									dataClicked={
										dataNotif.clicked.length !== 0 ? dataNotif.clicked : []
									}
									dataNotClicked={
										dataNotif.notClicked.length !== 0
											? dataNotif.notClicked
											: []
									}
									dataCount={dataCount}
								/>
							) : (
								<NotificationsVendor
									data={[]}
									dataClicked={[]}
									dataNotClicked={[]}
									dataCount={0}
								/>
							)
						) : (
							""
						)}
						{/* {role==="5f73fe3428751d590d835267" ? (
							<NotificationsPenyedia
								data={dataNotif.data}
								dataClicked={dataNotif.clicked}
								dataNotClicked={dataNotif.notClicked}
								dataCount={dataCount}
							/>
						) : (
							""
						)} */}
						<ProfileMenu />
					</div>
				</div>
			</header>
		</React.Fragment>
	);
};
const mapStatetoProps = (state) => {
	const {
		layoutType,
		showRightSidebar,
		leftMenu,
		leftSideBarType,
	} = state.Layout;
	return { layoutType, showRightSidebar, leftMenu, leftSideBarType };
};

export default connect(mapStatetoProps, {
	showRightSidebarAction,
	toggleLeftmenu,
	changeSidebarType,
})(withNamespaces()(Header));
