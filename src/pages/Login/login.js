import React, { useState, useEffect } from "react";
import styles from "../../assets/css/loginpages.module.css";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { Alert, Row, Col, FormText, Button, Spinner } from "reactstrap";
import ReCAPTCHA from "react-google-recaptcha";
// import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3';

import Logobakti from "../../assets/images/BAKTI.png";
import { Link, useHistory } from "react-router-dom";
import Eye from "../../assets/images/eye.svg";
import API from "../../services";

function LoginPages() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [captcha, setCaptcha] = useState("");
	const [errorUsername, setErrorUsername] = useState("");
	const [errorPassword, setErrorPassword] = useState("");
	// const [lupaPass, setLupaPass] = useState(false);
	const [alertFail, setAlertFail] = useState("");
	const [error, setError] = useState("");
	const [noMatch, setNoMatch] = useState("");
	const [loading, setLoading] = useState(false);
	const history = useHistory();
	// const recaptchaRef = useRef(null)
	// const { executeRecaptcha } = useGoogleReCaptcha();
	// const token = executeRecaptcha("/login");

	//alert
	const [alertLogin, setAlertLogin] = useState(false);
	const [alertLoginFail, setAlertLoginFail] = useState(false);
	const [alertLoginError, setAlertLoginError] = useState(false);
	//notif
	const [notifLogin, setNotifLogin] = useState(false);
	const [notifLoginFail, setNotifLoginFail] = useState(false);
	const [notifLoginError, setNotifLoginError] = useState(false);
	//captcha alert
	const [alertCaptcha, setAlertCaptcha] = useState(false);
	const [notifCaptcha, setNotifCaptcha] = useState(false);
	const [verifCaptcha, setVerifCaptcha] = useState(true);

	const [errMsg, seterrMsg] = useState("");

	//passToggle
	const [passwordShown, setPasswordShown] = useState(false);

	const changeUsername = (e) => setUsername(e.target.value);
	const changePassword = (e) => setPassword(e.target.value);
	const recaptcha = `${process.env.REACT_APP_RECAPTCHA_KEY}`;
	// console.log(recaptcha)

	const togglePasswordVisiblity = () => {
		setPasswordShown(passwordShown ? false : true);
	};

	const handleCaptcha = function (resonse) {
		// console.log("Captcha value:", resonse);
		setCaptcha(resonse);
		setVerifCaptcha(false);
		if (username === username && password === password) {
			setAlertCaptcha(false);
			setNotifCaptcha(true);
			setTimeout(() => {
				setNotifCaptcha(false);
			}, 1200);
		}
	};

	const onSubmit = () => {
		// alert(captcha)
		// if (username === "") {
		// 	return setErrorUsername("Username Tidak Boleh Kosong");
		// }

		// if (password === "") {
		// 	return setErrorPassword("Password Tidak Boleh Kosong");
		// }

		if (!username || !password) {
			setError("Kolom Isian Tidak Lengkap");
			setAlertLoginFail(false);
			setNotifLoginFail(true);
			// setAlertLoginFail(err);
			setTimeout(() => {
				setNotifLoginFail(false);
				// history.go(0);
			}, 3000);
		} 
		// else if (verifCaptcha) {
		// 	setAlertCaptcha(true);
		// 	setNotifCaptcha(true);
		// 	setTimeout(() => {
		// 		setNotifCaptcha(false);
		// 	}, 1200);
		// }

		if (username !== "" && password !== "") {
			setLoading(true);
			API.postLogin({
				username: username,
				password: password,
			})
				.then(function (response) {
					// return console.log(response)
					if (response.data.success === true) {
						setLoading(false);
						setAlertLogin(false);
						setNotifLogin(true);
						setTimeout(() => {
							setNotifLogin(false);
							history.push("/home");
						}, 800);

						// console.log("hasil", response);
						window.localStorage.setItem("userId", response.data.values.id);
						window.localStorage.setItem("nameUser", response.data.values.name);
						window.localStorage.setItem(
							"userName",
							response.data.values.username
						);
						window.localStorage.setItem("email", response.data.values.email);
						window.localStorage.setItem("phone", response.data.values.phone);
						window.localStorage.setItem(
							"imagePath",
							response.data.values.image.path
						);
						window.localStorage.setItem(
							"imageName",
							response.data.values.image.name
						);
						window.localStorage.setItem("status", response.data.values.status);
						window.localStorage.setItem(
							"comment",
							response.data.values.comment
						);

						//company
						window.localStorage.setItem(
							"companyId",
							response.data.values.company.id
						);
						window.localStorage.setItem(
							"companyName",
							response.data.values.company.name
						);
						window.localStorage.setItem(
							"companyTekno",
							response.data.values.company.teknologi
						);
						window.localStorage.setItem(
							"companyNilai",
							response.data.values.company.nilai
						);
						window.localStorage.setItem(
							"companyId",
							response.data.values.company.id
						);

						//role
						window.localStorage.setItem("roleId", response.data.values.role.id);
						window.localStorage.setItem(
							"roleName",
							response.data.values.role.name
						);
						window.localStorage.setItem(
							"roleCreate",
							response.data.values.role.create_date
						);
						window.localStorage.setItem(
							"roleUpdate",
							response.data.values.role.update_date
						);

						//doc
						window.localStorage.setItem(
							"docName",
							response.data.values.doc.name
						);
						window.localStorage.setItem(
							"docPath",
							response.data.values.doc.path
						);
						window.localStorage.setItem(
							"docCreate",
							response.data.values.doc.create_date
						);
						window.localStorage.setItem(
							"docUpdate",
							response.data.values.doc.update_date
						);
					}
					if (response.status !== 200) {
						setAlertLoginError(false);
						setNotifLoginError(true);
						// setAlertLoginFail(err);
						setTimeout(() => {
							setNotifLoginError(false);
							// history.go(0);
						}, 3000);
					}
					setErrorUsername("");
					setErrorPassword("");
					setNoMatch("");
				})
				.catch((err) => {
					setLoading(false);
					setAlertLoginFail(false);
					setNotifLoginFail(true);
					seterrMsg(err?.response?.data?.message);
					// setAlertLoginFail(err);
					setTimeout(() => {
						setNotifLoginFail(false);
						seterrMsg("");
						// history.go(0);
					}, 3000);
				});
		}
	};

	const hadleKeyPress = (e) => {
		if (e.key === "Enter") {
			onSubmit();
		}
		// console.log(response)
	};

	return (
		<>
			<Row className={styles.containerlogin}>
				<Col className={styles.ctnLoginpages}>
					<div className={styles.wrapps}>
						<div className="d-flex justify-content-center sign">
							<div className={styles.wrpPages}>
								<div className="justify-content-center">
									<FormText>{noMatch}</FormText>
									<Alert
										color={alertCaptcha ? "danger" : "success"}
										isOpen={notifCaptcha}
										className={styles.alertDetail}
									>
										{alertCaptcha
											? `Captcha Gagal Di Verifikasi`
											: `Captcha Berhasil Di Verifikasi`}
									</Alert>

									<Alert
										color={alertLogin ? "success" : "success"}
										isOpen={notifLogin}
										className={styles.alertDetail}
									>
										Berhasil Login
									</Alert>
									<Alert
										color={alertLoginFail ? "success" : "danger"}
										isOpen={notifLoginFail}
										className={styles.alertDetail}
									>
										{alertLoginFail
											? `Berhasil Login`
											: errMsg}
									</Alert>
									<Alert
										color={alertLoginError ? "success" : "danger"}
										isOpen={notifLoginError}
										className={styles.alertDetail}
									>
										{alertLoginError ? `Berhasil Login` : `Login Gagal`}
									</Alert>
								</div>
								<AvForm className={styles.formUs}>
									<span
										className={styles.secTit}
										style={{ justifyContent: "center", alignItems: "center" }}
									>
										Login
									</span>

									<AvField
										onChange={changeUsername}
										className={styles.fieldUs}
										type="text"
										name="username"
										id="Usernmae"
										onKeyPress={hadleKeyPress}
										placeholder="Nama Akun Anda"
										validate={{
											required: {
												value: false,
												errorMessage: "Masukan Username Anda Dengan Benar",
											},
										}}
									/>
									<FormText color="danger">{errorUsername}</FormText>
									<div style={{ display: "block" }}>
										<AvField
											onChange={changePassword}
											className={`${styles.fieldPass}`}
											type={passwordShown ? "text" : "password"}
											name="password"
											id="Password"
											onKeyPress={hadleKeyPress}
											placeholder="Kata Sandi Anda"
											validate={{
												required: {
													value: false,
													errorMessage: "Masukan Password Anda Dengan Benar",
												},
												// pattern: {value: '^[A-Za-z0-9]+$', errorMessage: 'Your name must be composed only with letter and numbers'},
												// minLength: {
												// 	value: 4,
												// 	errorMessage:
												// 		"Your name must be between 4 and 18 characters",
												// },
												// maxLength: {
												// 	value: 18,
												// 	errorMessage:
												// 		"Your name must be between 4 and 18 characters",
												// },
											}}
										/>

										<img
											src={Eye}
											alt=""
											className={`${styles.iconEye}`}
											onClick={togglePasswordVisiblity}
										/>
									</div>
									<FormText color="danger">{errorPassword}</FormText>
								</AvForm>
								

								<div className="d-flex">
									{loading ? (
										<center style={{ marginLeft: "34%" }}>
											{/* <button className={`${styles.btnSubmitSpin} btn-block`} style={{backgroundColor: "#E7883A", borderRadius: "10px", width: "100%", color: "#fff"}}> */}
											<Spinner></Spinner>
											{/* </button> */}
										</center>
									) : (
										<button
											className={`${styles.btnSubmit} btn btn-success btn-block`}
											style={{
												backgroundColor: "#E7883A",
												borderRadius: "10px",
												width: "100%",
											}}
											type="submit"
											onClick={onSubmit}
										>
											Sign In
										</button>
									)}
								</div>
								<div className="d-flex justify-content-left">
									<span className={styles.forgotPass}>
										<Link to="/forgot-password">Lupa Password ?</Link>
									</span>
								</div>
								<div className="d-flex justify-content-left">
									<span className={styles.Regist}>
										Pengguna Baru ? <Link to="/register">Buat Akun</Link>
									</span>
								</div>
							</div>
						</div>
					</div>
				</Col>
			</Row>
		</>
	);
}

export default LoginPages;
