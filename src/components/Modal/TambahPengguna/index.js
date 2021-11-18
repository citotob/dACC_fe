import { AvForm, AvInput } from "availity-reactstrap-validation";
import { MDBModalHeader } from "mdbreact";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
	Alert,
	Col,
	Button,
	Label,
	Modal,
	ModalBody,
	Row,
	Spinner,
	Card,
	CardBody,
} from "reactstrap";

import API from "../../../services";
import styles from "./styles.module.css";

import { ValidateInput } from "../../Common/ValidateInput";

import DropdownArrow from "../../../assets/images/DropdownArrow.svg";
import DropdownArrowDown from "../../../assets/images/DropdownArrowDown.svg";

function PopupConfirmation({
	toggleTambahPengguna,
	modalTambahPengguna,
	// data,
}) {
	const [name, setName] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");
	const [uploadFile, setUploadFile] = useState("");
	const [company, setCompany] = useState("");
	const [teknologi, setteknologi] = useState({});
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [role, setRole] = useState("5f73fe4028751d590d835268");
	// Error
	const [errorName, setErrorName] = useState("");
	const [errorUsername, setErrorUsername] = useState("");
	const [errorCompany, setErrorComapany] = useState("");
	const [errorTeknologi, setErrorTeknologi] = useState("");
	const [errorEmail, setErrorEmail] = useState("");
	const [errorPassword, setErrorPassword] = useState("");
	const [errorConfirmPassword, setErrorConfirmPassword] = useState("");
	const [errorPhone, setErrorPhone] = useState("");
	const [errorDocFormat, setErrorDocFormat] = useState("");

	//alert
	const [alertRegis, setAlertRegis] = useState(false);
	const [alertRegisGagal, setAlertRegisGagal] = useState(false);
	//notif
	const [notifRegis, setNotifRegis] = useState(false);
	const [notifRegisGagal, setNotifRegisGagal] = useState(false);

	const [inputName, setInputName] = useState(false);
	const [inputUsername, setInputUsername] = useState(false);
	const [inputPassword, setInputPassword] = useState(false);
	const [inputCompany, setInputCompany] = useState(false);
	const [inputTeknologi, setInputTeknologi] = useState(false);
	const [inputEmail, setInputEmail] = useState(false);
	const [inputPhone, setInputPhone] = useState(false);

	const history = useHistory();
	const [loading, setLoading] = useState(false);

	// TOGGLE SHOW TEKNOLOGI
	const [showTeknologi, setShowTeknologi] = useState(false);
	const toggleShowTek = () => {
		setShowTeknologi(!showTeknologi);
	};

	const onSubmit = () => {
		// console.log(username,company,email,username,password)
		let formData = new FormData();

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

		if (
			name !== "" &&
			username !== "" &&
			company !== "" &&
			phone !== "" &&
			email !== "" &&
			password !== "" &&
			passwordConfirm !== ""
		) {
			API.postRegist(formData)
				.then((response) => {
					// console.log(response);
					if (response.data.success === true) {
						setAlertRegis(false);
						setNotifRegis(true);
						setTimeout(() => {
							setNotifRegis(false);
							history.go(0);
						}, 3000);
						// history.push("/");
					}
				})
				.catch((error) => {
					// console.log("error: ", error);‚
					if (
						name === name &&
						username === username &&
						phone === phone &&
						email === email
					) {
						setAlertRegisGagal(false);
						setNotifRegisGagal(true);
						setTimeout(() => {
							setNotifRegisGagal(false);
							history.go(0);
						}, 3000);
					}
				});
		}
	};

	useEffect(() => {
		if (name === "") {
			setErrorName("Nama Tidak Boleh Kosong");
		} else if (username === "") {
			setErrorUsername("Username Tidak Boleh Kosong");
		} else if (company === "") {
			setErrorComapany("Company Tidak Boleh Kosong");
		} else if (teknologi === {}) {
			setErrorTeknologi("Teknologi Tidak Boleh Kosong");
		} else if (email === "") {
			setErrorEmail("Email Tidak Boleh Kosong");
		} else if (phone === "") {
			setErrorPhone("Username Tidak Boleh Kosong");
		} else if (password === "") {
			setErrorPassword("Password Tidak Boleh Kosong");
		} else if (passwordConfirm === "") {
			setErrorConfirmPassword("Password Tidak Boleh Kosong");
		} else if (password !== passwordConfirm) {
			setErrorConfirmPassword("Password anda tidak sesuai");
		} else if (passwordConfirm !== password) {
			setErrorConfirmPassword("Password anda tidak sesuai");
		} else {
			return null;
		}
	}, [
		name,
		username,
		company,
		teknologi,
		email,
		phone,
		password,
		passwordConfirm,
	]);

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
	// console.log(`console log nya teknologi`, teknologi);

	async function handleChange(e) {
		// console.log(`console log nya e.target.value`, e.target.value);
		// console.log(`console log nya e.target.checked`, e.target.checked);
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
			<Modal
				size="md"
				isOpen={modalTambahPengguna}
				toggle={toggleTambahPengguna}
				centered={true}
			>
				<Alert
					color={setAlertRegis ? "success" : "danger"}
					isOpen={notifRegis}
					style={{
						width: "100%",
						borderRadius: "2px",
						textAlign: "center",
						padding: "5px",
						margin: "0px",
						paddingTop: "1%",
						paddingBottom: "1%",
					}}
				>
					{setAlertRegis
						? `Tambah Pengguna Berhasil`
						: `Tambah Pengguna Gagal. Silahkan coba kembali.`}
				</Alert>
				<Alert
					color={setAlertRegisGagal ? "danger" : "danger"}
					isOpen={notifRegisGagal}
					style={{
						width: "100%",
						borderRadius: "2px",
						textAlign: "center",
						padding: "5px",
						margin: "0px",
						paddingTop: "1%",
						paddingBottom: "1%",
					}}
				>
					{setAlertRegisGagal
						? `Ada Kesalahan Dalam Pengisian Mohon Di Periksa Kembali`
						: `Mohon Periksa Kembali Kelengkapan Dalam Pengisian Data`}
				</Alert>
				<MDBModalHeader toggle={toggleTambahPengguna}>
					<span className={styles.headText}> TAMBAH PENGGUNA </span>
				</MDBModalHeader>
				<ModalBody>
					<center className="container-popup">
						<Row className={`justify-content-center ${styles.wrapper}`}>
							{/* <h4 className={styles.title}>{data.name}</h4>
                            <h5 className={styles.sub_title}>{data.type}</h5> */}
						</Row>

						{/* <div className={styles.text}></div> */}
						<AvForm>
							{/* <FormGroup> */}
							<AvInput
								className={styles.input}
								type="text"
								name="nama"
								onChange={(e) => {
									setName(e.target.value);
									if (name === "") {
										setInputName(false);
									}
								}}
								placeholder="Nama"
								onKeyPress={hadleKeyPress}
								validate={{
									required: {
										value: true,
										errorMessage: "masukan isi form nama",
									},
									// pattern: {value: '^[A-Za-z0-9]+$', errorMessage: 'Your name must be composed only with letter and numbers'},
								}}
							/>
							{inputName && <p className={styles.styleError}>{errorName}</p>}
							{/* </FormGroup> */}
							{/* <FormGroup> */}
							<AvInput
								className={styles.input}
								type="text"
								name="username"
								onChange={(e) => {
									setUsername(e.target.value);
									if (username === "") {
										setInputUsername(false);
									}
								}}
								placeholder="Username"
								onKeyPress={hadleKeyPress}
								validate={{
									required: {
										value: true,
										errorMessage: "masukan isi form username",
									},
									// pattern: {value: '^[A-Za-z0-9]+$', errorMessage: 'Your name must be composed only with letter and numbers'},
								}}
							/>
							{inputUsername && (
								<p className={styles.styleError}>{errorUsername}</p>
							)}
							{/* </FormGroup> */}
							{/* <FormGroup> */}
							<AvInput
								className={styles.input}
								type="text"
								name="company"
								onChange={(e) => {
									setCompany(e.target.value);
									if (company === "") {
										setInputCompany(false);
									}
								}}
								placeholder="Company"
								onKeyPress={hadleKeyPress}
								validate={{
									required: {
										value: true,
										errorMessage: "masukan isi form company",
									},
									// pattern: {value: '^[A-Za-z0-9]+$', errorMessage: 'Your name must be composed only with letter and numbers'},
								}}
							/>
							{inputCompany && (
								<p className={styles.styleError}>{errorCompany}</p>
							)}
							{/* <FormGroup> */}
							<Button
								className={`${styles.input} d-flex justify-content-between align-items-center`}
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
										position: "absolute",
										zIndex: "10",
										minWidth: "83%",
										textAlign: "start",
									}}
									className="ml-4"
								>
									<CardBody
										style={{
											padding: "0 1.25rem",
										}}
									>
										<div>
											<Label for="fo" className="mr-3">
												<input
													type="checkbox"
													id="fo"
													name="teknologi"
													value="fo"
													checked={teknologi["fo"]}
													className="mx-3"
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
													className="mx-3"
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
													className=" mx-3"
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
													className=" mx-3"
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
													className=" mx-3"
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
							{/* <Row className="mb-2 w-100 ml-5">
								<Col lg="12  d-flex text-left">
									<Label for="basicpill-firstname-input14">Teknologi</Label>
								</Col>
								<Col lg="12">
									<div className="d-flex flex-row flex-wrap">
										<Label for="fo" className="mr-3">
											<input
												type="checkbox"
												id="fo"
												name="teknologi"
												value="fo"
												checked={teknologi["fo"]}
												className="mr-1"
												onChange={(e) => handleChange(e)}
												disabled={
													teknologi["undefined"] ||
													teknologi["vsat_gs_belanja_modal"]
												}
											/>
											FO
										</Label>
										<Label for="rl" className="mr-3">
											<input
												type="checkbox"
												id="rl"
												name="teknologi"
												value="rl"
												checked={teknologi["rl"]}
												className=" mr-1"
												onChange={(e) => handleChange(e)}
												disabled={
													teknologi["undefined"] ||
													teknologi["vsat_gs_belanja_modal"]
												}
											/>
											RL
										</Label>
										<Label for="vsat-sewa" className="mr-3">
											<input
												type="checkbox"
												id="vsat-sewa"
												name="teknologi"
												value="vsat_gs_sewa_jasa"
												checked={teknologi["vsat_gs_sewa_jasa"]}
												className=" mr-1"
												onChange={(e) => handleChange(e)}
												disabled={
													teknologi["undefined"] ||
													teknologi["vsat_gs_belanja_modal"]
												}
											/>
											VSAT-GS-Sewa-Jasa
										</Label>
										<Label for="vsat-belanja" className="mr-3">
											<input
												type="checkbox"
												id="vsat-belanja"
												name="teknologi"
												value="vsat_gs_belanja_modal"
												checked={teknologi["vsat_gs_belanja_modal"]}
												className=" mr-1"
												onChange={(e) => handleChange(e)}
												disabled={teknologi["undefined"]}
											/>
											VSAT-GS-Belanja-Modal
										</Label>
										<Label for="undefined" className="mr-3">
											<input
												type="checkbox"
												id="undefined"
												name="teknologi"
												value="undefined"
												checked={teknologi["undefined"]}
												onChange={(e) => handleChange(e)}
												className=" mr-1"
												disabled={teknologi["vsat_gs_belanja_modal"]}
											/>
											Belum Terdefinisi
										</Label>
									</div>
								</Col>
							</Row> */}
							{/* <div
								className={`${styles.input} ${styles.selectWrapper} ${styles.selectDropdown}`}
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
									<option value="VSAT_GS_SEWA_JASA">VSAT-GS-Sewa-Jasa</option>
									<option value="VSAT_GS_BELANJA_MODAL">
										VSAT-GS-Belanja-Modal
									</option>
								</select>
							</div> */}
							{inputTeknologi && (
								<p className={styles.styleError}>{errorTeknologi}</p>
							)}
							{/* </FormGroup> */}
							{/* <FormGroup> */}
							<AvInput
								className={styles.input}
								type="text"
								name="email"
								onChange={(e) => {
									let validEmail = ValidateInput("email", e.target.value);
									if (validEmail) {
										setInputEmail(false);
										setErrorEmail("");
									} else {
										setInputEmail(true);
										setErrorEmail("Format email tidak valid");
									}
									setEmail(e.target.value);
								}}
								placeholder="Email"
								onKeyPress={hadleKeyPress}
								validate={{
									required: {
										value: true,
										email: true,
										errorMessage: "masukan isi form email",
									},
									// pattern: {value: '^[A-Za-z0-9]+$', errorMessage: 'Your name must be composed only with letter and numbers'},
								}}
							/>
							{inputEmail && <p className={styles.styleError}>{errorEmail}</p>}
							{/* </FormGroup> */}
							{/* <FormGroup> */}
							<AvInput
								className={styles.input}
								type="number"
								name="phone"
								onChange={(e) => {
									let validPhone = ValidateInput("phone", e.target.value);
									if (validPhone) {
										setInputPhone(false);
										setErrorPhone("");
									} else {
										setInputPhone(true);
										setErrorPhone("Format Telpon(08xxxxxxxxx)");
									}
									setPhone(e.target.value);
								}}
								placeholder="phone"
								minLength={9}
								maxLength={13}
								onKeyPress={hadleKeyPress}
								validate={{
									required: {
										value: true,
										errorMessage: "masukan isi form phone",
									},
									// pattern: {value: '^[A-Za-z0-9]+$', errorMessage: 'Your name must be composed only with letter and numbers'},
								}}
							/>
							{inputPhone && <p className={styles.styleError}>{errorPhone}</p>}
							{/* </FormGroup> */}
							{/* <FormGroup> */}
							<AvInput
								className={styles.input}
								type="password"
								name="password"
								onChange={(e) => {
									setPassword(e.target.value);
									if (password === "") {
										setInputPassword(false);
									}
								}}
								placeholder="Password"
								onKeyPress={hadleKeyPress}
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
							{inputPassword && (
								<p className={styles.styleError}>{errorPassword}</p>
							)}
							{/* </FormGroup> */}
							{/* <FormGroup> */}
							<AvInput
								className={styles.input}
								type="password"
								name="passwordconfirm"
								onChange={(e) => {
									setPasswordConfirm(e.target.value);
									if (e.target.value !== password) {
										setErrorConfirmPassword("Password anda tidak sesuai");
									} else {
										setErrorConfirmPassword("");
									}
								}}
								placeholder="Ulangi Password"
								onKeyPress={hadleKeyPress}
								validate={{
									required: {
										value: true,
										errorMessage: "Masukan Password Anda Dengan Benar",
									},
									pattern: {
										value: "^[A-Za-z0-9]+$",
										errorMessage:
											"Your name must be composed only with letter and numbers",
									},
								}}
							/>
							{errorConfirmPassword !== "" && (
								<p className={styles.styleError}>{errorConfirmPassword}</p>
							)}
							{/* </FormGroup> */}
							{/* <FormGroup> */}
							<Label className={errorDocFormat !== "" ? styles.lblDokErr : ""}>
								{errorDocFormat === "" ? `Unggah Dokumen` : errorDocFormat}
							</Label>
							<AvInput
								className={styles.uploadData}
								type="file"
								name={"doc"}
								onChange={onChangeFileUpload}
								accept="application/pdf"
							/>
							{/* </FormGroup> */}
						</AvForm>
						{/* <Button color="" className={styles.btn_cancel} onClick={toggleVerify}>Tidak</Button> */}
						<Button
							color=""
							type="submit"
							className={styles.btn_confirm}
							onClick={onSubmit}
							disabled={
								name === "" ||
								company === "" ||
								// email === "" ||
								!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
									email
								) ||
								phone === "" ||
								// username === "" ||
								!/^[A-Za-z0-9]+$/.test(username) ||
								password === "" ||
								passwordConfirm === "" ||
								uploadFile === ""
									? true
									: false
							}
						>
							{/* Daftarkan */}
							{loading ? <Spinner /> : `Daftarkan`}
						</Button>

						{/* <Row className={`justify-content-center ${styles.wrapper}`}>
                            <h3 className={styles.title}>Verifikasi Pengguna</h3>
                        </Row> */}
					</center>
				</ModalBody>
			</Modal>
		</>
	);
}

export default PopupConfirmation;
