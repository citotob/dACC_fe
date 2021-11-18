import React, { useState, useEffect } from "react";
import {
	Button,
	Dropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
} from "reactstrap";

//i18n
import { withNamespaces } from "react-i18next";
// Redux
import { connect } from "react-redux";
import { withRouter, Link, useHistory } from "react-router-dom";

// users
import user1 from "../../../assets/images/users/avatar-1.jpg";
import ModalLogout from "../../Modal/ModalLogout";

const ProfileMenu = (props) => {
	// Declare a new state variable, which we'll call "menu"
	const [menu, setMenu] = useState(false);

	const [username, setusername] = useState(
		window.localStorage.getItem("nameUser")
	);
	const history = useHistory();
	const role = window.localStorage.getItem("roleName");
	const imgPath = window.localStorage.getItem("imagePath");
	// console.log(imgPath)

	const [modalLogout, setModalLogout] = useState(false);
	const [modalVerify, setModalVerify] = useState(false);

	useEffect(() => {
		if (localStorage.getItem("authUser")) {
			if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
				const obj = JSON.parse(localStorage.getItem("authUser"));
				setusername(obj.displayName);
			} else if (
				process.env.REACT_APP_DEFAULTAUTH === "fake" ||
				process.env.REACT_APP_DEFAULTAUTH === "jwt"
			) {
				const obj = JSON.parse(localStorage.getItem("authUser"));
				setusername(obj.username);
			}
		}
	}, [props.success]);

	const toggleLogout = () => {
		setModalLogout(!modalLogout);
	};

	let handleLogout = () => {
		toggleLogout();
	};

	const logout = () => {
		// history.push('/homepage');
		// window.localStorage.removeItem("authUser");
		// window.localStorage.removeItem("nameUser");
		window.localStorage.clear();
		// window.location.href = "/login";
		history.push("/login");
	};

	return (
		<React.Fragment>
			<ModalLogout
				modalLogout={modalLogout}
				toggleLogout={() => toggleLogout()}
				logout={logout}
			/>
			{role === "Admin" ? (
				<Dropdown
					isOpen={menu}
					toggle={() => setMenu(!menu)}
					className="d-inline-block"
				>
					<DropdownToggle
						className="btn header-item waves-effect"
						id="page-header-user-dropdown"
						tag="button"
					>
						<img
							className="rounded-circle header-profile-user"
							src={`https://teksas-api.devlabs.id` + imgPath}
							alt="Header Avatar"
						/>
						<span className="d-none d-xl-inline-block ml-2 mr-1">
							{username}
						</span>
						<i className="mdi mdi-chevron-down d-none d-xl-inline-block"></i>
					</DropdownToggle>
					<DropdownMenu right>
						<DropdownItem>
							<Link to="/admin/profile">
								<i
									className="bx bx-user font-size-16 align-middle"
									style={{ marginRight: "6px" }}
								></i>
								{props.t("Profile")}
							</Link>
						</DropdownItem>
						<div className="dropdown-divider"></div>
						<span
							className="dropdown-item"
							style={{ cursor: "pointer" }}
							onClick={handleLogout}
						>
							<i className="bx bx-power-off font-size-16 align-middle mr-1 text-danger"></i>
							<span>{props.t("Logout")}</span>
						</span>
					</DropdownMenu>
				</Dropdown>
			) : role === "Penyedia" ? (
				<Dropdown
					isOpen={menu}
					toggle={() => setMenu(!menu)}
					className="d-inline-block"
				>
					<DropdownToggle
						className="btn header-item waves-effect"
						id="page-header-user-dropdown"
						tag="button"
					>
						<img
							className="rounded-circle header-profile-user"
							src={`https://teksas-api.devlabs.id` + imgPath}
							alt="Header Avatar"
						/>
						<span className="d-none d-xl-inline-block ml-2 mr-1">
							{username}
						</span>
						<i className="mdi mdi-chevron-down d-none d-xl-inline-block"></i>
					</DropdownToggle>
					<DropdownMenu right>
						<DropdownItem>
							<Link to="/vendor/profile">
								<i
									className="bx bx-user font-size-16 align-middle"
									style={{ marginRight: "6px" }}
								></i>
								{props.t("Profile")}
							</Link>
						</DropdownItem>
						<div className="dropdown-divider"></div>
						<span
							style={{ cursor: "pointer" }}
							className="dropdown-item"
							onClick={handleLogout}
						>
							<i className="bx bx-power-off font-size-16 align-middle mr-1 text-danger"></i>
							<span>{props.t("Logout")}</span>
						</span>
					</DropdownMenu>
				</Dropdown>
			) : (
				<Dropdown
					isOpen={menu}
					toggle={() => setMenu(!menu)}
					className="d-inline-block"
				>
					<DropdownToggle
						className="btn header-item waves-effect"
						id="page-header-user-dropdown"
						tag="button"
					>
						<img
							className="rounded-circle header-profile-user"
							src={`https://teksas-api.devlabs.id` + imgPath}
							alt="Header Avatar"
						/>
						<span className="d-none d-xl-inline-block ml-2 mr-1">
							{username}
						</span>
						<i className="mdi mdi-chevron-down d-none d-xl-inline-block"></i>
					</DropdownToggle>
					<DropdownMenu right>
						<DropdownItem>
							<Link to="/executive/profile">
								<i
									className="bx bx-user font-size-16 align-middle"
									style={{ marginRight: "6px" }}
								></i>
								{props.t("Profile")}
							</Link>
						</DropdownItem>
						<div className="dropdown-divider"></div>
						<span
							style={{ cursor: "pointer" }}
							className="dropdown-item"
							onClick={handleLogout}
						>
							<i className="bx bx-power-off font-size-16 align-middle mr-1 text-danger"></i>
							<span>{props.t("Logout")}</span>
						</span>
					</DropdownMenu>
				</Dropdown>
			)}
		</React.Fragment>
	);
};

const mapStatetoProps = (state) => {
	const { error, success } = state.Profile;
	return { error, success };
};

export default withRouter(
	connect(mapStatetoProps, {})(withNamespaces()(ProfileMenu))
);
