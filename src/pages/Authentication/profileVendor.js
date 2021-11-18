import React, { useState, useEffect, useRef } from "react";
import {
	Container,
	Row,
	Col,
	Card,
	Alert,
	CardBody,
	Media,
	Button,
	Collapse,
	FormGroup,
	FormText,
	Label,
} from "reactstrap";
import Header from "../../components/VerticalLayout/Header";

import style from "../../assets/css/userprofile.module.css";

// import axios from '../../Homepages/config/axios/index'
// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation";

// Redux
import { connect } from "react-redux";
import { withRouter, useHistory } from "react-router-dom";

//Import Breadcrumb
// import Breadcrumb from '../../components/Common/Breadcrumb';

import avatar from "../../assets/images/users/avatar-1.jpg";
// actions
import { editProfile } from "../../store/actions";
import API from "../../services";

import "./ProfileVendor.css";

const UserProfile = (props) => {
	const users = window.localStorage.getItem("userName");
	const name = window.localStorage.getItem("nameUser");
	const userID = window.localStorage.getItem("userId");
	const namapt = window.localStorage.getItem("companyName");
	const emailuser = window.localStorage.getItem("email");
	const imgPath = window.localStorage.getItem("imagePath");

	const [password, setPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");
	const [errorUsername, setErrorUsername] = useState("");
	const [errorPassword, setErrorPassword] = useState("");
	const [errorNewPassword, setErrorNewPassword] = useState("");
	const [errorPassConfirm, setErrorPassConfirm] = useState("");
	const [noMatch, setNoMatch] = useState("");
	// const [errPass, setErrPass] = useState("");
	// const [success, setSuccess] = useState("");
	// const [visible, setVisible] = useState(true);
	const [images, setImages] = useState(imgPath);
	const [dataTeknologi, setDataTeknologi] = useState({
		fo: "",
		rl: "",
		sewa: "",
		bm: "",
	});
	const [SaveDataTemp, setSaveDataTemp] = useState([]);
	const history = useHistory();

	const avatarRef = useRef();

	const [isOpen, setIsOpen] = useState(false);
	const toggle = () => setIsOpen(!isOpen);

	const [teknologi, setteknologi] = useState({
		fo: false,
		rl: false,
		vsat_gs_sewa_jasa: false,
		vsat_gs_belanja_modal: false,
	});
	const [isOpenSolKateg, setIsOpenSolKateg] = useState(false);
	const toggleSolKateg = () => setIsOpenSolKateg(!isOpenSolKateg);

	//alert
	const [alertChangePass, setAlertChangePass] = useState(false);
	// notif
	const [notifChangePass, setNotifChangePass] = useState(false);

	// GET USER PROFILE
	const fetchUserData = () => {
		API.getUserProfile(userID)
			.then((res) => {
				// console.log("res profile", res?.data?.values);
				const valuesTeknologi = res?.data?.values?.teknologi_vendor;
				const statusFO = valuesTeknologi?.find((e) => e?.name === "FO")?.status;
				const statusRL = valuesTeknologi?.find((e) => e?.name === "RL")?.status;
				const statusSewa = valuesTeknologi?.find(
					(e) => e?.name === "VSAT_GS_SEWA_JASA"
				)?.status;
				const statusBM = valuesTeknologi?.find(
					(e) => e?.name === "VSAT_GS_BELANJA_MODAL"
				)?.status;

				setDataTeknologi({
					fo: statusFO,
					rl: statusRL,
					sewa: statusSewa,
					bm: statusBM,
				});
			})
			.catch((err) => {
				console.log(err);
				setDataTeknologi(null);
			});
	};

	useEffect(() => {
		fetchUserData();
		return () => {};
	}, []);

	async function handleChangeSolKateg(e) {
		const { checked, value } = e.target;
		switch (e.target.name) {
			case "teknologi":
				if (e.target !== null) {
					setteknologi((prev) => ({
						...prev,
						[value]: checked,
					}));
				}
				let temp = { ...teknologi, [value]: checked };
				// if (temp["undefined"]) {
				// 	setteknologi((prev) => ({
				// 		...prev,
				// 		fo: false,
				// 		rl: false,
				// 		vsat_gs_sewa_jasa: false,
				// 		vsat_gs_belanja_modal: false,
				// 		undefined: true,
				// 	}));
				// 	temp = {
				// 		...teknologi,
				// 		fo: false,
				// 		rl: false,
				// 		vsat_gs_sewa_jasa: false,
				// 		vsat_gs_belanja_modal: false,
				// 		undefined: true,
				// 	};
				// }
				// if (temp["vsat_gs_belanja_modal"]) {
				// 	setteknologi((prev) => ({
				// 		...prev,
				// 		fo: false,
				// 		rl: false,
				// 		vsat_gs_sewa_jasa: false,
				// 		vsat_gs_belanja_modal: true,
				// 	}));
				// 	temp = {
				// 		...teknologi,
				// 		fo: false,
				// 		rl: false,
				// 		vsat_gs_sewa_jasa: false,
				// 		vsat_gs_belanja_modal: true,
				// 	};
				// }
				let tempSave = Object.entries(temp)
					.filter(([key, value]) => value)
					.map((item) =>
						item[0].toUpperCase() == "VSAT" ? "VSAT-GS" : item[0].toUpperCase()
					);
				console.log(tempSave);
				setSaveDataTemp(tempSave);
				// localStorage.setItem("teknologi", JSON.stringify(tempSave));
				// toggleRefreshSiteList();

				// updateBatchInfoField("tipe", e.target.value);
				break;
			default:
				break;
		}
	}

	// console.log(API)
	const handlePassword = () => {
		if (password === "") {
			setErrorPassword("Password tidak boleh kosong");
		}
		if (newPassword === "") {
			setErrorNewPassword("New Password tidak boleh kosong");
		}
		if (passwordConfirm === "") {
			setErrorPassConfirm("Confirm Password tidak boleh kosong");
		}
		if (password !== "" && newPassword !== "" && passwordConfirm !== "") {
			API.postChangePassword({
				id: userID,
				password: password,
				newpassword: newPassword,
			})
				.then(function (response) {
					// console.log(response)
					if (response.data.success === true) {
						setAlertChangePass(true);
						setNotifChangePass(true);
						setTimeout(() => {
							setNotifChangePass(false);
						}, 5000);
						setPassword("");
						setNewPassword("");
						setPasswordConfirm("");
						toggle(!isOpen);
						setErrorPassword("");
						setErrorNewPassword("");
						setNoMatch("");
					} else {
						setAlertChangePass(false);
						setNotifChangePass(true);
						setTimeout(() => {
							setNotifChangePass(false);
						}, 5000);
					}

					// alert(response);
				})
				.catch((err) => {
					setAlertChangePass(false);
					setNotifChangePass(true);
					setTimeout(() => {
						setNotifChangePass(false);
					}, 10000);
					console.log(err.message);
				});
		}
	};

	const changeAvatar = (e) => {
		// setImages({images : URL.createObjectURL(e.target.files[0])})

		let avatarFormData = new FormData();
		const avatar_profile = avatarRef.current.files[0];
		avatarFormData.append("userid", userID);
		avatarFormData.append("image", avatar_profile);

		// console.log(avatar_profile)

		if (avatar_profile) {
			API.postChangeAvatar(avatarFormData)
				.then((res) => {
					const url = res.data.values.image.path;
					setImages(url);
					window.localStorage.setItem("imagePath", url);
					history.go(0);
				})
				.catch((err) => {
					console.log("error ganti avatar", err);
				});
		}
	};

	const saveVendorTech = () => {
		const param = {
			user_id: userID,
			teknologi: SaveDataTemp,
		};
		API.postTeknologiVendorBaru(param)
			.then((res) => {
				fetchUserData();
				setSaveDataTemp([]);
			})
			.catch((err) => alert(err));
	};

	return (
		<React.Fragment>
			<div className="page-content">
				<Header title="User Profile" />
				<Alert
					color={alertChangePass ? "success" : "danger"}
					isOpen={notifChangePass}
					style={{
						width: "100%",
						borderRadius: "20px",
						textAlign: "center",
						padding: "5px",
						margin: "0px",
						paddingTop: "1%",
						paddingBottom: "1%",
					}}
				>
					{alertChangePass
						? `Ubah Password Berhasil`
						: `Ubah password gagal. Silahkan coba kembali.`}
				</Alert>
				<Container>
					<Row>
						<Col lg="12">
							{props.error && props.error ? (
								<Alert color="danger">{props.error}</Alert>
							) : null}
							{props.success && props.success ? (
								<Alert color="success">{props.success}</Alert>
							) : null}

							<Card
								style={{
									width: "54%",
									marginLeft: "20%",
									textAlign: "left",
									borderRadius: "15px",
									boxShadow: "2px 6px 10px #9999",
								}}
							>
								<CardBody>
									<Media style={{ padding: "10px" }}>
										<div className={style.imageProfile}>
											<input
												type="file"
												accept="image/*"
												onChange={changeAvatar}
												ref={avatarRef}
												style={{
													display: "none",
												}}
											/>
											<div className={style.circleAvatar}>
												<img
													src={`https://teksas-api.devlabs.id` + images}
													alt=""
													className="avatar-md rounded-circle img-thumbnail"
													onClick={(e) => changeAvatar(e)}
												/>
											</div>
											<span
												className={style.editProfile}
												onClick={() => avatarRef.current.click()}
											>
												Edit Foto Profile
											</span>
										</div>
										<Media body className="align-self-center">
											<div className="text-muted">
												<h5 className="mb-1 ml-2">{name}</h5>
												<p className="mb-1 ml-2">Username: {users}</p>
												<p className="mb-2 ml-2">Email : {emailuser}</p>
											</div>
										</Media>
									</Media>
								</CardBody>
							</Card>
						</Col>
					</Row>

					<div className="d-flex justify-content-center">
						<div className={`${style.card_costume} card`}>
							<Container className="mt-4 mb-3">
								<Row className="mb-3">
									<div className={style.wrap_user}>
										<div className={`${style.username} pt-2 pb-1 pl-2`}>
											{users}
										</div>
										<div className={`${style.namaPT} pt-2 pb-1 pl-2`}>
											{namapt}
										</div>
									</div>
								</Row>
								<Col>
									<div className="d-flex justify-content-between">
										<div>Email</div>
										<div>{emailuser}</div>
									</div>
								</Col>
								<hr />
								<Col>
									<div className="d-flex justify-content-between">
										<div>Password</div>
										<div>
											<Row>
												<div className="ml-2">
													<button
														className={style.btn_icon_collapse}
														onClick={toggle}
													>
														<div>Ganti password</div>
													</button>
												</div>
											</Row>
										</div>
									</div>
								</Col>
								{/* <hr /> */}
								<Collapse isOpen={isOpen} className="mt-2">
									<Card>
										<CardBody>
											<div className="d-flex justify-content-center mb-2">
												<FormText>{noMatch}</FormText>
											</div>
											<AvForm>
												<FormGroup>
													<AvField
														type="password"
														name="password"
														id="password"
														placeholder="Password"
														onChange={(e) => {
															setPassword(e.target.value);
														}}
														required
													/>
													<FormText>{errorPassword}</FormText>
												</FormGroup>
												<FormGroup>
													<AvField
														type="password"
														name="newPassword"
														id="newPassword"
														placeholder="New Password"
														onChange={(e) => {
															setNewPassword(e.target.value);
														}}
														required
													/>
													<FormText>{errorNewPassword}</FormText>
												</FormGroup>
												<FormGroup>
													<AvField
														type="password"
														name="confirmPassword"
														id="confirmPassword"
														placeholder="Confirm Password"
														onChange={(e) => {
															setPasswordConfirm(e.target.value);
														}}
														required
													/>
													<FormText>{errorPassConfirm}</FormText>
												</FormGroup>
											</AvForm>
											<Button color="primary" onClick={() => handlePassword()}>
												Submit
											</Button>
										</CardBody>
									</Card>
								</Collapse>
								{/* UBAH SOLUSI KATEGORI */}
								{/* <Col>
									<div className="d-flex justify-content-between">
										<div>Kategori</div>
										<div>
											<Row>
												<div className="ml-2">
													<button
														className={style.btn_icon_collapse}
														onClick={toggleSolKateg}
													>
														<div>Ubah Solusi Kategori</div>
													</button>
												</div>
											</Row>
										</div>
									</div>
								</Col>
								<hr /> */}
								{/* <Collapse isOpen={isOpenSolKateg}>
									<div className="d-flex">
										<div className="w-50">
											<div className="wraperCheckboxLabel">
												<Label for="fo" className="LabelSolKateg">
													<input
														type="checkbox"
														id="fo"
														name="teknologi"
														value="fo"
														checked={
															dataTeknologi?.fo === "active" ||
															dataTeknologi?.fo === "pending"
																? true
																: teknologi["fo"]
														}
														className="mr-2"
														onChange={(e) => handleChangeSolKateg(e)}
														disabled={
															dataTeknologi?.fo === "active" ||
															dataTeknologi?.fo === "pending"
														}
													/>
													FO
												</Label>
												<span
													className={
														dataTeknologi?.fo === "active"
															? "btnApprovedVendor"
															: dataTeknologi?.fo === "pending"
															? "btnPendingVendor"
															: ""
													}
												>
													{dataTeknologi?.fo === "active"
														? "Approved"
														: dataTeknologi?.fo === "pending"
														? "Pending"
														: ""}
												</span>
											</div>
											<div className="wraperCheckboxLabel">
												<Label for="rl" className="LabelSolKateg">
													<input
														type="checkbox"
														id="rl"
														name="teknologi"
														value="rl"
														// checked={teknologi["rl"]}
														checked={
															dataTeknologi?.rl === "active" ||
															dataTeknologi?.rl === "pending"
																? true
																: teknologi["rl"]
														}
														className="mr-2"
														onChange={(e) => handleChangeSolKateg(e)}
														disabled={
															dataTeknologi?.rl === "active" ||
															dataTeknologi?.rl === "pending"
														}
													/>
													<span>RL</span>
												</Label>
												<span
													className={
														dataTeknologi?.rl === "active"
															? "btnApprovedVendor"
															: dataTeknologi?.rl === "pending"
															? "btnPendingVendor"
															: ""
													}
												>
													{dataTeknologi?.rl === "active"
														? "Approved"
														: dataTeknologi?.rl === "pending"
														? "Pending"
														: ""}
												</span>
											</div>
											<div className="wraperCheckboxLabel">
												<Label for="vsat-sewa" className="LabelSolKateg">
													<input
														type="checkbox"
														id="vsat-sewa"
														name="teknologi"
														value="vsat_gs_sewa_jasa"
														// checked={teknologi["vsat_gs_sewa_jasa"]}
														checked={
															dataTeknologi?.sewa === "active" ||
															dataTeknologi?.sewa === "pending"
																? true
																: teknologi["vsat_gs_sewa_jasa"]
														}
														className=" mr-2"
														onChange={(e) => handleChangeSolKateg(e)}
														disabled={
															dataTeknologi?.sewa === "active" ||
															dataTeknologi?.sewa === "pending"
														}
													/>
													GS SEWA
												</Label>
												<span
													className={
														dataTeknologi?.sewa === "active"
															? "btnApprovedVendor"
															: dataTeknologi?.sewa === "pending"
															? "btnPendingVendor"
															: ""
													}
												>
													{dataTeknologi?.sewa === "active"
														? "Approved"
														: dataTeknologi?.sewa === "pending"
														? "Pending"
														: ""}
												</span>
											</div>
											<div className="wraperCheckboxLabel">
												<Label for="vsat-belanja" className="LabelSolKateg">
													<input
														type="checkbox"
														id="vsat-belanja"
														name="teknologi"
														value="vsat_gs_belanja_modal"
														// checked={teknologi["vsat_gs_belanja_modal"]}
														checked={
															dataTeknologi?.bm === "active" ||
															dataTeknologi?.bm === "pending"
																? true
																: teknologi["vsat_gs_belanja_modal"]
														}
														className=" mr-2"
														onChange={(e) => handleChangeSolKateg(e)}
														disabled={
															dataTeknologi?.bm === "active" ||
															dataTeknologi?.bm === "pending"
														}
													/>
													GS BM
												</Label>
												<span
													className={
														dataTeknologi?.bm === "active"
															? "btnApprovedVendor"
															: dataTeknologi?.bm === "pending"
															? "btnPendingVendor"
															: ""
													}
												>
													{dataTeknologi?.bm === "active"
														? "Approved"
														: dataTeknologi?.bm === "pending"
														? "Pending"
														: ""}
												</span>
											</div>
										</div>
										<div className="w-50">
											<Button
												className="float-right btnSaveTeknologi"
												disabled={SaveDataTemp?.length === 0}
												onClick={saveVendorTech}
											>
												Save
											</Button>
										</div>
									</div>
								</Collapse> */}
							</Container>
						</div>
					</div>
				</Container>
			</div>
		</React.Fragment>
	);
};

const mapStatetoProps = (state) => {
	const { error, success } = state.Profile;
	return { error, success };
};

export default withRouter(
	connect(mapStatetoProps, { editProfile })(UserProfile)
);
