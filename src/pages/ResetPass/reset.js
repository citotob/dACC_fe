import React, { useState } from "react";
import styles from "../../assets/css/reset.module.css";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { Alert, Row, Col, FormText } from "reactstrap";

import Logobakti from "../../assets/images/BAKTI.png";
import { Link, useHistory } from "react-router-dom";
import API from "../../services";

function ResetPassPages(props) {
	// console.log(props)
	const [password, setPassword] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");

	//alert
	const [alertReset, setAlertReset] = useState(false);
	const [alertTokenReset, setAlertTokenReset] = useState(false);
	// notif
	const [notifReset, setNotifReset] = useState(false);
	const [notifTokenReset, setNotifTokenReset] = useState(false);

	const token = props.location.pathname.substr(props.location.pathname.lastIndexOf("/") + 1)
	// console.log('resetPassword',token)

	const onSubmit = () => {
		// console.log(password, passwordConfirm);
		// const requestOption = {
		// 	method: "POST",
		// 	body: JSON.stringify({
		// 		token: token,
		// 		newpassword: password,
		// 	})
		// };

		API.postReset({
			token: token,
			newpassword: password,
		})
			.then((res) => {
				return res.json();
			})
			.then((res) => {
				if (res.data.success === true){
					// console.log(res)
					setAlertReset(true);
					setNotifReset(true);
					setTimeout(() => {
						setNotifReset(false);
						// history.push('/login')
						props.history.push({
							pathname: '/login',
							state: { notifResetPwd: true, alertResetPwd: true, messageResetPwd: 'Sukses melakukan reset password. Silahkan login ke dalam sistem.' }
						})
					}, 10000);
					
				} else {
					setAlertReset(true);
					setNotifReset(true);
					setTimeout(() => {
						setNotifReset(false);
						props.history.push({
							pathname: '/login',
							state: { notifResetPwd: true, alertResetPwd: false, messageResetPwd: 'Terjadi kesalahan saat reset password. Silahkan masuk ke halaman Forgot Password untuk mengulangi tahapan.' }
						})
					}, 10000);
				}
			}).catch((err) => {
				setAlertReset(true);
				setNotifReset(true);
				setTimeout(() => {
					setNotifReset(false);
					props.history.push({
						pathname: '/login',
						state: { notifResetPwd: true, alertResetPwd: false, messageResetPwd: 'Terjadi kesalahan pada sistem. Silahkan masuk ke halaman Forgot Password untuk mengulangi tahapan.' }
					})
				}, 10000);
				
				console.log(err.message);
			})
	};

	const hadleKeyPress = (e) => {
		if (e.key === "Enter") {
			onSubmit();
		}
		// console.log(response)
	};

	return (
		<>
			<Alert
				color={alertReset ? "success" : "danger"}
				isOpen={notifReset}
				style={{
					width: "100%",
					borderRadius: "20px",
					textAlign: "center",
					padding: "5px",
					margin: "0px",
					paddingTop: "1%",
					paddingBottom: "1%",
				}}>
				{alertReset ? `Reset password Berhasil.` : `Reset password gagal. Silahkan coba kembali.`}
			</Alert>
			<Row className={styles.containerlogin}>
				<Col className={styles.txtLoginpages}>
					<span className={styles.txtlog} style={{ color: "black" }}>
						Manage Service Sistem Informasi Spasial dan Analisis Teknis
						Perencanaan Pembangunan Layanan Akses Internet
						<img src={Logobakti} alt="logoBakti" />
					</span>
					{/* <img src={Logobakti} alt="logoBakti"/> */}
				</Col>
				<Col className={styles.ctnLoginpages}>
					<div className={styles.wrapps}>
						<div className="d-flex justify-content-center mb-3 sign">
							{/* {!lupaPass ? ( */}
							<div className={styles.wrpPages}>
								<div className="d-flex justify-content-center mb-2">
									{/* <Alert
										isOpen={notifLogin}
										style={{
											width: "100%",
											borderRadius: "6px",
											textAlign: "center",
											padding: "5px",
											margin: "0px",
										}}
									>
										{alertLogin ? `` : `Username atau Password Salah`}
									</Alert> */}
								</div>
								<AvForm className={styles.formUs}>
									<span className={styles.secTit}> Reset Password </span>
									<span className={styles.txtTit}>
										Masukkan Password Baru Anda di sini.
									</span>
									<AvField
										onChange={(e) => {
											setPassword(e.target.value);
										}}
										className={styles.fieldUs}
										type="password"
										name="password"
										id="Password"
										onKeyPress={hadleKeyPress}
										placeholder="Kata Sandi Akun Anda"
										validate={{
											required: {
												password: true,
												errorMessage: "Masukan Password Anda Dengan Benar",
											},
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
									{/* <FormText color="danger">{errorUsername}</FormText> */}
									<AvField
										onChange={(e) => {
											setPasswordConfirm(e.target.value);
										}}
										className={styles.fieldUs}
										type="password"
										name="password"
										id="PasswordConfirm"
										onKeyPress={hadleKeyPress}
										placeholder="Ulang Kata Sandi Akun Anda"
										validate={{
											required: {
												password: true,
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
									{/* <FormText color="danger">{errorPassword}</FormText> */}
								</AvForm>
								<div className="d-flex justify-content-left">
									<button
										className={`${styles.btnSubmit} btn btn-success btn-block`}
										style={{
											backgroundColor: "#E7883A",
											borderRadius: "10px",
											width: "80%",
										}}
										type="submit"
										onClick={onSubmit}
									>
										Reset Sekarang
									</button>
								</div>
							</div>
							{/* ) : (
								<div>
									<AvForm className={styles.formUs}>
										<div className={styles.secTit}>
											{" "}
											<span style={{ justifyContent: "center" }}>
												Silakan Masuk Di Sini
											</span>
										</div>
										<div className={styles.inputUsername}>
											{" "}
											<label>Email</label>{" "}
										</div>
										<AvField
											className={styles.fieldUs}
											type="text"
											placeholder="Masukan Email"
										/>
									</AvForm>
									<div className="d-flex justify-content-center my-3">
										<button
											className="btn btn-success btn-block"
											style={{ backgroundColor: "#00438B" }}
											type="submit"
											onClick={onSubmit}
										>
											Submit
										</button>
									</div>
									<div className="d-flex justify-content-center my-3">
										<span
											className={styles.forgotPass}
											onClick={handleLupaPass}
										>
											{" "}
											Login{" "}
										</span>
									</div>
								</div>
							)} */}
						</div>
					</div>
				</Col>
			</Row>
		</>
	);
}

export default ResetPassPages;
