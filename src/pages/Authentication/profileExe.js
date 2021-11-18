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
	Form,
	FormGroup,
	FormText,
	Input,
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

const UserProfile = (props) => {
	const users = window.localStorage.getItem("nameUser");
	const userID = window.localStorage.getItem("userId");
	const namapt = window.localStorage.getItem("companyName");
	const emailuser = window.localStorage.getItem("email");
	const imgPath = window.localStorage.getItem("imagePath");

	const [username, setUsername] = useState("");
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
	const history = useHistory()

	const avatarRef = useRef()

	const [isOpen, setIsOpen] = useState(false);
	const toggle = () => setIsOpen(!isOpen);

	//alert
	const [alertChangePass, setAlertChangePass] = useState(false);
	// notif
	const [notifChangePass, setNotifChangePass] = useState(false);

	// const onDismiss = () => setVisible(false);

	// function handleValidSubmit(event,values)
	// {
	//     props.editProfile(values);
	// }

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
		if ( password !== "" && newPassword !== "" && passwordConfirm !== ""){
			API.postChangePassword({
				id: userID,
				password: password,
				newpassword: newPassword,
			})
			.then(function(response){
				// console.log(response)
				if (response.data.success === true){
					setAlertChangePass(true);
					setNotifChangePass(true);
					setTimeout(() => {
						setNotifChangePass(false);
					}, 5000);
					setPassword("")
					setNewPassword("")
					setPasswordConfirm("")
					toggle(!isOpen)
					setErrorPassword("")
					setErrorNewPassword("")
					setNoMatch("")
				} else {
					setAlertChangePass(false);
					setNotifChangePass(true);
					setTimeout(() => {
						setNotifChangePass(false);
					}, 5000);
				}
				
				// alert(response);
			}).catch((err) => {
				setAlertChangePass(false);
				setNotifChangePass(true);
				setTimeout(() => {
					setNotifChangePass(false);
				}, 10000);
				console.log(err.message);
			})
		}
	};

	const changeAvatar = (e) => {
		// setImages({images : URL.createObjectURL(e.target.files[0])})
		
		let avatarFormData = new FormData();
		const avatar_profile = avatarRef.current.files[0];
		avatarFormData.append("userid", userID);
		avatarFormData.append("image", avatar_profile);

		// console.log(avatar_profile)

		if(avatar_profile) {
			API.postChangeAvatar(avatarFormData)
				.then((res) => {
					const url= res.data.values.image.path
					setImages(url)
					window.localStorage.setItem("imagePath", url)
					history.go(0)
				})
				.catch((err) => {
					console.log('error ganti avatar',err)
				})
		}
	}

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
					}}>
					{alertChangePass ? `Ubah Password Berhasil` : `Ubah password gagal. Silahkan coba kembali.`}
				</Alert>
				<Container>
					{/* Render Breadcrumb */}
					{/* <Breadcrumb title="Profile" breadcrumbItem="User Profile" /> */}

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
										{/* <div className={style.imageProfile}>
											<img
												src={`https://teksas-api.devlabs.id` + imgPath}
												alt=""
												className="avatar-md rounded-circle img-thumbnail"
											/>
										</div> */}
										<div className={style.imageProfile}>
											<input
												type="file"
												accept="image/*"
												onChange={changeAvatar}
												ref={avatarRef}
												style={{
													display: "none"
												}}
											/>
											<div className={style.circleAvatar} >
												<img
													src={`https://teksas-api.devlabs.id` + images}
													alt=""
													className="avatar-md rounded-circle img-thumbnail"
													onClick={(e) => changeAvatar(e)}
												/>
											</div>
											<span className={style.editProfile} onClick={() => avatarRef.current.click()}>Edit Foto Profile</span>
										</div>
										<Media body className="align-self-center">
											<div className="text-muted">
												<h5 className="mb-1 ml-2">{users}</h5>
												<p className="mb-1 ml-2">Username: {users}</p>
												<p className="mb-2 ml-2">Email : {emailuser}</p>
												{/* <p className="mb-0 ml-2">Organisasi: {namapt}</p> */}
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
									{/* <div className={style.avatar}>{subStr}</div> */}
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
												{/* <div>Ganti password</div> */}
												<div className="ml-2">
													<button
														className={style.btn_icon_collapse}
														onClick={toggle}
													>
														{/* <FontAwesomeIcon icon={faChevronRight} /> */}
														<div>Ganti password</div>
													</button>
												</div>
											</Row>
										</div>
									</div>
								</Col>
								<hr />
								<Collapse isOpen={isOpen} className="mt-2">
									<Card>
										<CardBody>
											<div className="d-flex justify-content-center mb-2">
												<FormText>{noMatch}</FormText>
												{/* <FormText>{errPass}</FormText> */}
											</div>
											<AvForm>
												{/* <FormGroup>
                                            <AvField
                                                type="text"
                                                name="username"
                                                id="Usernmae"
                                                placeholder="Username"
                                                value={username}
                                                onChange={(e) => {
                                                    setUsername(e.target.value);
                                                }}
                                                // onChange={setUsername}
                                                required
                                            />
                                            <FormText>{errorUsername}</FormText>
                                        </FormGroup> */}
												<FormGroup>
													<AvField
														type="password"
														name="password"
														id="password"
														placeholder="Password"
														value={password}
														onChange={(e) => {
															setPassword(e.target.value);
														}}
														// onChange={setPassword}
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
														value={newPassword}
														onChange={(e) => {
															setNewPassword(e.target.value);
														}}
														// onChange={setNewPassword}
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
														value={passwordConfirm}
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
							</Container>
						</div>
					</div>
					{/* <Card className="d-flex justify-content-center">
                            <CardBody className={`${style.card_costumeInput} card`}>
                                <AvForm className="form-horizontal mt-4 mb-3" 
                                    // onValidSubmit={(e,v) => { handleValidSubmit(e,v) }}
                                    >
                                    <div className="form-group">
                                        <AvField name="inputAlasan" label="Pengajuan Pengaktifan Akun" value="" className="form-control" placeholder="Input Alasan" type="text" required />
                                    </div>
                                    <div className="text-center mt-4">
                                        <Button type="submit" color="danger">Input Alasan</Button>
                                    </div>
                                </AvForm>
                            
                            </CardBody>
                        </Card> */}
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
