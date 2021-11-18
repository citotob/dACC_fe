import React, { useState, useEffect } from "react";
import styles from "../../assets/css/registerpages.module.css";
import { AvForm, AvInput } from "availity-reactstrap-validation";
import {
	Row,
	Col,
	Spinner,
	Button,
	FormText,
	Alert,
	Label,
	Card,
	CardBody,
} from "reactstrap";
import ReCAPTCHA from "react-google-recaptcha";

import Eye from "../../assets/images/eye.svg";
import Logobakti from "../../assets/images/BAKTI.png";
import { Link, useHistory } from "react-router-dom";
import API from "../../services";
//validate
import { ValidateInput } from "../../components/Common/ValidateInput";
import DropdownArrow from "../../assets/images/DropdownArrow.svg";
import DropdownArrowDown from "../../assets/images/DropdownArrowDown.svg";
function RegisterPages() {
	const [name, setName] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");
	const [uploadFile, setUploadFile] = useState("");
	const [company, setCompany] = useState("");
	const [teknologi, setteknologi] = useState({
		fo: false,
		rl: false,
		vsat_gs_sewa_jasa: false,
		vsat_gs_belanja_modal: false,
		undefined: false,
	});
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [role, setRole] = useState("5f73fe4028751d590d835268");
	const [captcha, setCaptcha] = useState("");
	//error handle
	const [errorName, setErrorName] = useState("");
	const [errorUsername, setErrorUsername] = useState("");
	const [errorCompany, setErrorComapany] = useState("");
	const [errorTeknologi, setErrorTeknologi] = useState("");
	const [inputTeknologi, setInputTeknologi] = useState(false);
	const [errorEmail, setErrorEmail] = useState("");
	const [errorPassword, setErrorPassword] = useState("");
	const [errorConfirmPassword, setErrorConfirmPassword] = useState("");
	const [errorPhone, setErrorPhone] = useState("");
	const [errorDocFormat, setErrorDocFormat] = useState("");
	// const [errorUpload, setErrorUpload] = useState("")

	//alert
	const [alertRegis, setAlertRegis] = useState(false);
	const [alertRegisGagal, setAlertRegisGagal] = useState(false);
	//notif
	const [notifRegis, setNotifRegis] = useState(false);
	const [notifRegisGagal, setNotifRegisGagal] = useState(false);
	//captcha alert
	const [alertCaptcha, setAlertCaptcha] = useState(false);
	const [notifCaptcha, setNotifCaptcha] = useState(false);
	const [verifCaptcha, setVerifCaptcha] = useState(true);

	const [noMatch, setNoMatch] = useState("");
	const history = useHistory();

	const [loading, setLoading] = useState(false);
	//passToggle
	const [passwordShown, setPasswordShown] = useState({
		pass: false,
		repeatPass: false,
	});
	const [passwordRepeatShown, setPasswordRepeatShown] = useState({
		pass: false,
		repeatPass: false,
	});

	const recaptcha = `${process.env.REACT_APP_RECAPTCHA_KEY}`;
	//error validation
	const [error, setError] = useState({
		phone: "",
	});

	// TOGGLE SHOW TEKNOLOGI
	const [showTeknologi, setShowTeknologi] = useState(false);
	const toggleShowTek = () => {
		setShowTeknologi(!showTeknologi);
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

	const passwordToggleVisiblity = () => {
		setPasswordShown((prev) => ({ pass: !passwordShown.pass }));
		// setPasswordShown(passwordShown ? false : true);
	};
	const repeatPasswordToggleVisiblity = () => {
		setPasswordRepeatShown((prev) => ({
			repeatPass: !passwordRepeatShown.repeatPass,
		}));

		// setPasswordShown(passwordShown ? false : true);
	};

	let teknoToBeSent = "";
	for (const i in teknologi) {
		// console.log(`${i} : ${teknologi[i]}`);
		if (teknologi["undefined"] === true) {
			teknoToBeSent = "FO, RL, VSAT_GS_SEWA_JASA";
		} else if (teknologi[i] === true) {
			if (teknoToBeSent === "") {
				teknoToBeSent = i.toUpperCase();
			} else {
				teknoToBeSent = teknoToBeSent + `, ${i.toUpperCase()}`;
			}
		}
	}

	console.log(teknoToBeSent);

	const onSubmit = () => {
		// console.log(username,company,email,username,password)
		// console.log( username, company, email, password, passwordConfirm,uploadFile);
		let formData = new FormData();
		setNotifRegisGagal(false);

		formData.append("name", name);
		formData.append("username", username);
		formData.append("company", company);
		formData.append("teknologi_vendor", teknoToBeSent);
		formData.append("email", email);
		formData.append("phone", phone);
		formData.append("password", password);
		formData.append("role", role);
		formData.append("dokumen", uploadFile);
		setLoading(true);

		if (name === "") {
			return setErrorName("Username Tidak Boleh Kosong");
		}
		if (username === "") {
			return setErrorUsername("Username Tidak Boleh Kosong");
		}
		if (company === "") {
			return setErrorComapany("Company Tidak Boleh Kosong");
		}
		if (teknologi === "") {
			setErrorTeknologi("Teknologi Tidak Boleh Kosong");
		}
		if (email === "") {
			return setErrorEmail("Email Tidak Boleh Kosong");
		}
		if (password === "") {
			return setErrorPassword("Password Tidak Boleh Kosong");
		}
		if (phone === "") {
			return setErrorPhone("Username Tidak Boleh Kosong");
		}
		if (password !== passwordConfirm) {
			return setErrorConfirmPassword("Password anda tidak sesuai");
		}
		if (passwordConfirm !== password) {
			return setErrorConfirmPassword("Password anda tidak sesuai");
		}

		if (
			name !== "" &&
			username !== "" &&
			company !== "" &&
			phone !== "" &&
			email !== "" &&
			password !== "" &&
			verifCaptcha === false
		) {
			API.postRegist(formData, {
				"g-recaptcha-response": captcha,
			})
				.then((response) => {
					// console.log(response)
					// console.log(response.status);
					if (response.status === 200) {
						setAlertRegis(false);
						setNotifRegis(true);
						setTimeout(() => {
							setNotifRegis(false);
							history.push("/login");
						}, 2000);
					} else {
						setAlertRegisGagal(true);
						setNotifRegisGagal(true);
					}
					setLoading(false);
				})
				.catch((error) => {
					setAlertRegisGagal(true);
					setNotifRegisGagal(true);
					setLoading(false);
				});
		}
	};

	const onChangeFileUpload = (e) => {
		let fileUploaded = e.target.files[0];
		if (fileUploaded) {
			let fileName = fileUploaded.name;
			let fileExtension = fileName.split(".").pop();
			if (fileExtension !== "pdf") {
				setErrorDocFormat("Format Dokumen harus .pdf");
				setUploadFile("");
			} else {
				setErrorDocFormat("");
				setUploadFile(e.target.files[0]);
			}
		}
	};

	const fileData = () => {
		if (setUploadFile) {
			return (
				<div className={styles.fieldUpload}>
					<label className={styles.labLog}>File Detail</label>
					{/* <label className={styles.labLog}>File Name: {uploadFile.name}</label>
					<label className={styles.labLog}>File Type: {uploadFile.type}</label> */}
				</div>
			);
		}
	};

	async function handleChange(e) {
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
				// 		undefined: false,
				// 	}));
				// 	temp = {
				// 		...teknologi,
				// 		fo: false,
				// 		rl: false,
				// 		vsat_gs_sewa_jasa: false,
				// 		vsat_gs_belanja_modal: true,
				// 		undefined: false,
				// 	};
				// }
				let tempSave = Object.entries(temp)
					.filter(([key, value]) => value)
					.map((item) =>
						item[0].toUpperCase() == "VSAT" ? "VSAT-GS" : item[0].toUpperCase()
					);
				localStorage.setItem("teknologi", JSON.stringify(tempSave));
				// toggleRefreshSiteList();

				// updateBatchInfoField("tipe", e.target.value);
				break;
			default:
				break;
		}
	}

	const hadleKeyPress = (e) => {
		if (e.key === "Enter") {
			onSubmit();
		}
		// console.log(response)
	};

	return (
		<>
			<div className={styles.containerlogin}>
				<Row style={{ minHeight: "100vh" }}>
					<Col
						xs="7"
						style={{
							zIndex: "10",
							position: "relative",
							paddingLeft: "10vw",
							paddingRight: "10vw",
							marginTop: "30vh",
						}}
					>
						<div
							style={{
								color: "black",
								fontSize: "22px",
							}}
						>
							Manage Service Sistem Informasi Spasial dan Analisis Teknis
							Perencanaan Pembangunan Layanan Akses Internet
						</div>
						<div>
							<img src={Logobakti} alt="logoBakti" />
						</div>
					</Col>
					<Col xs="5" style={{ zIndex: "10", position: "relative" }}>
						<div className="d-flex justify-content-center mb-3 sign w-100">
							<div className="w-100">
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
									color={alertRegis ? "danger" : "success"}
									isOpen={notifRegis}
									className={styles.alertDetail}
								>
									{alertRegis ? `Registrasi Gagal` : `Registrasi berhasil`}
								</Alert>
								<Alert
									color={alertRegisGagal ? "danger" : "danger"}
									isOpen={notifRegisGagal}
									className={styles.alertDetail}
								>
									Registrasi Gagal
								</Alert>
								<div className="d-flex justify-content-center mb-2">
									{/* <FormText>{noMatch}</FormText> */}
									{/* {
												alertFail === "" ? "" : 
												<Alert color="danger" isOpen={visible} toggle={onDismiss}> Username dan Password salah ! </Alert>
											} */}
								</div>
								<h3
									className="text-center"
									style={{
										justifyContent: "center",
										alignItems: "center",
										marginTop: "8vh",
										width: "80%",
									}}
								>
									Buat Akun
								</h3>
								<AvForm className={styles.formUs}>
									<AvInput
										onChange={(e) => {
											setName(e.target.value);
										}}
										className={styles.fieldUs}
										type="text"
										name="name"
										id="Name"
										onKeyPress={hadleKeyPress}
										placeholder="Name"
										validate={{
											required: {
												value: true,
												errorMessage: "Masukan Name Anda Dengan Benar",
											},
										}}
									/>
									<p style={{ color: "red" }}>{errorUsername}</p>
									<AvInput
										onChange={(e) => {
											setUsername(e.target.value);
										}}
										className={styles.fieldUs}
										type="text"
										name="username"
										id="Usernmae"
										onKeyPress={hadleKeyPress}
										placeholder="Username"
										validate={{
											required: {
												value: true,
												errorMessage: "Masukan Username Anda Dengan Benar",
											},
										}}
									/>
									<p style={{ color: "red" }}>{errorUsername}</p>
									{/* <Alert color="danger">{errorUsername}</Alert> */}
									<AvInput
										onChange={(e) => {
											setCompany(e.target.value);
										}}
										className={styles.fieldUs}
										type="text"
										name="company"
										id="Company"
										onKeyPress={hadleKeyPress}
										placeholder="Company"
										validate={{
											required: {
												value: true,
												errorMessage: "Masukan Company Anda Dengan Benar",
											},
										}}
									/>
									<p style={{ color: "red" }}>{errorCompany}</p>
									{/* <Alert color="danger">{errorCompany}</Alert> */}
									{/* <div
											className={`${styles.fieldUs} ${styles.selectWrapper} ${styles.selectDropdown}`}
										>
											<select
												className={`form-control`}
												onChange={(e) => {
													setteknologi(e.target.value);
													if (teknologi === "") {
														setInputTeknologi(false);
													}
												}}
											>
												<option value="">Kategori Vendor</option>
												<option value="RL">RL</option>
												<option value="FO">FO</option>
												<option value="VSAT_GS_SEWA_JASA">
													VSAT-GS-Sewa-Jasa
												</option>
												<option value="VSAT_GS_BELANJA_MODAL">
													VSAT-GS-Belanja-Modal
												</option>
											</select>
										</div>
										 */}
									<Button
										className={`${styles.fieldUs} d-flex justify-content-between align-items-center`}
										style={{ backgroundColor: "#fff" }}
										onClick={toggleShowTek}
									>
										<div className="text-dark">Kategori Vendor</div>
										<img
											src={showTeknologi ? DropdownArrowDown : DropdownArrow}
										></img>
									</Button>
									{showTeknologi ? (
										<Card
											style={{
												minWidth: "77%",
												position: "absolute",
												zIndex: "10",
												overflow: "none",
											}}
										>
											<CardBody>
												{/* <Col lg="12">
														<Label for="basicpill-firstname-input14">
															Teknologi
														</Label>
													</Col> */}
												<div>
													<Label for="fo" className="mr-3">
														<input
															type="checkbox"
															id="fo"
															name="teknologi"
															value="fo"
															checked={teknologi["fo"]}
															className="mr-2"
															onChange={(e) => handleChange(e)}
															// disabled={
															// 	teknologi["undefined"] ||
															// 	teknologi["vsat_gs_belanja_modal"]
															// }
														/>
														FO
													</Label>
												</div>
												<div>
													<Label for="rl" className="mr-3">
														<input
															type="checkbox"
															id="rl"
															name="teknologi"
															value="rl"
															checked={teknologi["rl"]}
															className="mr-2"
															onChange={(e) => handleChange(e)}
															// disabled={
															// 	teknologi["undefined"] ||
															// 	teknologi["vsat_gs_belanja_modal"]
															// }
														/>
														RL
													</Label>
												</div>
												<div>
													<Label for="vsat-sewa" className="mr-3">
														<input
															type="checkbox"
															id="vsat-sewa"
															name="teknologi"
															value="vsat_gs_sewa_jasa"
															checked={teknologi["vsat_gs_sewa_jasa"]}
															className=" mr-2"
															onChange={(e) => handleChange(e)}
															// disabled={
															// 	teknologi["undefined"] ||
															// 	teknologi["vsat_gs_belanja_modal"]
															// }
														/>
														VSAT-GS-Sewa-Jasa
													</Label>
												</div>
												<div>
													<Label for="vsat-belanja" className="mr-3">
														<input
															type="checkbox"
															id="vsat-belanja"
															name="teknologi"
															value="vsat_gs_belanja_modal"
															checked={teknologi["vsat_gs_belanja_modal"]}
															className=" mr-2"
															onChange={(e) => handleChange(e)}
															// disabled={teknologi["undefined"]}
														/>
														VSAT-GS-Belanja-Modal
													</Label>
												</div>
												{/* <div>
													<Label for="undefined" className="mr-3">
														<input
															type="checkbox"
															id="undefined"
															name="teknologi"
															value="undefined"
															checked={teknologi["undefined"]}
															onChange={(e) => handleChange(e)}
															className=" mr-2"
															disabled={teknologi["vsat_gs_belanja_modal"]}
														/>
														Belum Terdefinisi
													</Label>
												</div> */}
											</CardBody>
										</Card>
									) : (
										""
									)}

									{inputTeknologi && (
										<p className={styles.styleError}>{errorTeknologi}</p>
									)}
									{/* </FormGroup> */}
									{/* <FormGroup> */}
									<AvInput
										onChange={(e) => {
											setEmail(e.target.value);
										}}
										className={styles.fieldUs}
										onKeyPress={hadleKeyPress}
										name="email"
										type="email"
										id="Email"
										placeholder="Email"
										validate={{
											required: {
												email: true,
												errorMessage: "Masukan Email Anda Dengan Benar",
											},
										}}
										// required
									/>
									<p style={{ color: "red" }}>{errorEmail}</p>
									{/* <Alert color="danger">{errorEmail}</Alert> */}
									<AvInput
										onChange={(e) => {
											let validPhone = ValidateInput("phone", e.target.value);
											if (validPhone) {
												setError((prev) => ({ ...prev, phone: "" }));
											} else {
												setError((prev) => ({
													...prev,
													phone: "Format Telpon(08xxxxxxxxx)",
												}));
											}
											setPhone(e.target.value);
										}}
										className={styles.fieldUs}
										onKeyPress={hadleKeyPress}
										name="phone"
										type="text"
										id="Phone"
										placeholder="Phone"
										validate={{
											required: {
												email: true,
												errorMessage: "Masukan Phone Anda Dengan Benar",
											},
										}}
										// required
									/>
									{error.phone !== "" && (
										<p style={{ color: "red" }}>
											{error.phone !== "" ? error.phone : ""}
										</p>
									)}
									<div>
										<AvInput
											onChange={(e) => {
												setPassword(e.target.value);
											}}
											className={`${styles.fieldUs}`}
											type={passwordShown.pass ? "text" : "password"}
											name="password"
											id="password"
											onKeyPress={hadleKeyPress}
											placeholder="Kata Sandi Anda"
											validate={{
												required: {
													value: true,
													errorMessage: "Masukan Password Anda Dengan Benar",
												},
												// pattern: {value: '^[A-Za-z0-9]+$', errorMessage: 'Your name must be composed only with letter and numbers'},
												minLength: {
													value: 4,
													errorMessage:
														"Your name must be between 4 and 18 characters",
												},
												maxLength: {
													value: 18,
													errorMessage:
														"Your name must be between 4 and 18 characters",
												},
											}}
										/>
										<img
											src={Eye}
											alt=""
											className={`${styles.iconEyePass}`}
											onClick={passwordToggleVisiblity}
										/>
									</div>
									<p style={{ color: "red" }}>{errorPassword}</p>
									{/* <Alert color="danger">{errorPassword}</Alert> */}
									<div className="repeatPasswordWrapper">
										<AvInput
											onChange={(e) => {
												setPasswordConfirm(e.target.value);
												if (e.target.value !== password) {
													setErrorConfirmPassword("Password anda tidak sesuai");
												} else {
													setErrorConfirmPassword("");
												}
											}}
											className={styles.fieldUs}
											type={
												passwordRepeatShown.repeatPass ? "text" : "password"
											}
											name="password"
											id="passwordConfirm"
											onKeyPress={hadleKeyPress}
											placeholder="Ulang Kata Sandi Anda"
											validate={{
												required: {
													value: true,
													errorMessage: "Masukan Password Anda Dengan Benar",
												},
												// pattern: {value: '^[A-Za-z0-9]+$', errorMessage: 'Your name must be composed only with letter and numbers'},
												minLength: {
													value: 4,
													errorMessage:
														"Your name must be between 4 and 18 characters",
												},
												maxLength: {
													value: 18,
													errorMessage:
														"Your name must be between 4 and 18 characters",
												},
											}}
										/>
										<img
											src={Eye}
											alt=""
											className={`${styles.iconEyeRepeat}`}
											onClick={repeatPasswordToggleVisiblity}
										/>
									</div>
									{/* <img
										src={Eye}
										alt=""
										className={styles.iconEye}
										onClick={togglePasswordVisiblity}
									/> */}
									{errorConfirmPassword !== "" && (
										<p style={{ color: "red" }}>
											{errorConfirmPassword !== "" ? errorConfirmPassword : ""}
										</p>
									)}

									{/* <Alert color="danger">{errorConfirmPassword}</Alert> */}

									<label
										className={
											errorDocFormat === "" ? styles.lblDok : styles.lblDokErr
										}
									>
										{errorDocFormat === "" ? `Unggah Dokumen` : errorDocFormat}
									</label>
									<input
										type="file"
										name={"doc"}
										// accept="application/pdf"
										accept="application/pdf"
										// accept="image/*"
										className={styles.fieldUpload}
										onChange={onChangeFileUpload}
										// onSubmit={setUploadFile}
										placeholder="File harus PDF"
									></input>
									{/* <AvInput
										type="file"
										name={"doc"}
										accept="application/pdf"
										className={styles.fieldUpload}
										onChange={(e) => {
											onChangeFileUpload(e.target.value);
										}}
										onSubmit={setUploadFile}
										placeholder="File harus JGP, PNG atau PDF"
									/> */}
									{/* fileData() */}
									{/* <Alert color="danger">{errorUsername}</Alert> */}
								</AvForm>
								<div className={styles.captcha}>
									<ReCAPTCHA
										sitekey={recaptcha}
										render="explicit"
										onChange={handleCaptcha}
									/>
								</div>
								<div
									className="d-flex justify-content-center"
									style={{ width: "80%" }}
								>
									<Button
										className={`${styles.btnSubmit} btn btn-success btn-block`}
										type="submit"
										onClick={onSubmit}
										disabled={
											uploadFile === "" ||
											name === "" ||
											company === "" ||
											// email === "" ||
											!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
												email
											) === email ||
											phone === "" ||
											!/^[A-Za-z0-9]+$/.test(username) ||
											password !== passwordConfirm
												? true
												: false
										}
									>
										{/* Sign Up */}
										{loading ? <Spinner /> : `Sign Up`}
									</Button>
								</div>

								<div
									className="d-flex justify-content-center"
									style={{ width: "80%" }}
								>
									<span className={styles.Regist}>
										Sudah Memiliki Akun ? <Link to="/login">Sign In</Link>
									</span>
								</div>
							</div>
						</div>
					</Col>
				</Row>
			</div>
		</>
	);
}

export default RegisterPages;
