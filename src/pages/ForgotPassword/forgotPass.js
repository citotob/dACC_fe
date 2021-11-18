import React, { useState } from "react";
import styles from "../../assets/css/forgotpass.module.css";
import { AvForm, AvField, AvInput } from "availity-reactstrap-validation";
import { Row, Col, Alert } from "reactstrap";
import ReCAPTCHA from "react-google-recaptcha";

import Logobakti from "../../assets/images/BAKTI.png";
import { Link, useHistory } from "react-router-dom";
import API from "../../services";

function ForgotPassPages(props) {
	// console.log(props)
	const [email, setEmail] = useState("");
	const [captcha , setCaptcha] = useState("");
	// alert
	const [alertForgot, setAlertForgot] = useState(false);
	const [alertTokenReset, setAlertTokenReset] = useState(false);
	
	// notif
	const [notifForgot, setNotifForgot] = useState(false);
	const [notifTokenReset, setNotifTokenReset] = useState(false);

	//captcha alert
	const [alertCaptcha, setAlertCaptcha] = useState(false);
	const [notifCaptcha, setNotifCaptcha] = useState(false);

	const history = useHistory();

	// const handleCaptcha = function(resonse) {
	// 	console.log("Captcha value:", resonse);
	// 	setCaptcha(resonse);
	// 	if (email === email){
	// 		setAlertCaptcha(false);
	// 		setNotifCaptcha(true);
	// 		setTimeout(() => {
	// 			setNotifCaptcha(false);
	// 		}, 5000);
	// 	}
	// }

	const onSubmit = () => {
		// const data = {
		// 	method: "POST",
		// 	body: JSON.stringify({
		// 		email: email,
		// 	}),
		// };
		if (email !== "") {
			API.postForgotPass({
				email: email
			})
			.then((res) => {
				if(res.data.success === true){
					console.log(res)
					setAlertForgot(true);
					setNotifForgot(true);
					setTimeout(() => {
						setNotifForgot(false);
						history.push('/login')
					}, 10000);
				} else {
					setAlertForgot(false);
					setNotifForgot(true);
					setTimeout(() => {
						setNotifForgot(false);
					}, 10000);
				}
			})
			.catch((err) => {
				setAlertForgot(false);
				setNotifForgot(true);
				setTimeout(() => {
				setNotifForgot(false);
				}, 10000);
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
			<Alert
				color={alertForgot ? "success" : "danger"}
				isOpen={notifForgot}
				style={{
					width: "100%",
					borderRadius: "20px",
					textAlign: "center",
					padding: "5px",
					margin: "0px",
					paddingTop: "1%",
					paddingBottom: "1%",
				}}>
				{alertForgot ? `Kami telah mengirimkan panduan reset password ke email anda. Silahkan cek email anda.` : `Email yang anda masukan gagal/tidak terdaftar. Silahkan coba kembali.`}
			</Alert>
			<Row className={styles.containerlogin}>
				<Col className={styles.txtLoginpages}>
					<span className={styles.txtlog} style={{ color: "black" }}>
						Manage Service Sistem Informasi Spasial dan Analisis Teknis
						Perencanaan Pembangunan Layanan Akses Internet
						<img src={Logobakti} alt="logoBakti" />
					</span>
				</Col>
				<Col className={styles.ctnLoginpages}>
					<div className={styles.wrapps}>
						<div className="d-flex justify-content-center mb-3 sign">
							<div className={styles.wrpPages}>
								<AvForm className={styles.formUs}>
									<span className={styles.secTit}>Lupa Password</span>
									<div className={styles.txtTit}>
										{" "}
										Masukkan Email yang terdaftar untuk Reset Password anda
									</div>
									<AvField
										className={styles.fieldUs}
										type="email"
										name="email"
										id="Email"
										onKeyPress={hadleKeyPress}
										onChange={(e) => setEmail(e.target.value)}
										placeholder="Email Anda"
										validate={{
											required: {
												value: true,
												errorMessage: "Masukan Username Anda Dengan Benar",
											},
										}}
									/>
								</AvForm>
								{/* <div className={styles.captcha}>
										<ReCAPTCHA
											sitekey="6Lc52OgZAAAAAD4eiC1zLkB24iQeMXwVRMg5C1KR"
											render="explicit"
											onChange={handleCaptcha}
										/>
									</div> */}
								<div className="d-flex justify-content-left ">
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
										Submit
									</button>
								</div>
								<div className="d-flex justify-content-center ">
									<span className={styles.Regist}>
										<Link to="/login">Login </Link>
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

export default ForgotPassPages;
