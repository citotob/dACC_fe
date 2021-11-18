import React, { useEffect, useState } from "react";
import { MDBContainer, MDBModal, MDBModalBody, MDBModalHeader } from "mdbreact";
import { Col, Row, Input, Button, Spinner, Label } from "reactstrap";
import "./style.css";
import moment from "moment";
import styles from "./style.module.css";
import API from "../../../../services";

function ModalDetail(props) {
	// const data = props.dataDetail.teknologi_vendor;
	const [data, setData] = useState("");
	// const [dataTeknologi, setDataTeknologi] = useState("");
	const userid = props.dataDetail._id;

	const fetchUserData = () => {
		API.getUserProfile(props.dataDetail._id)
			.then((res) => {
				const valuesTeknologi = res?.data?.values?.teknologi_vendor;
				setData(valuesTeknologi);
			})
			.catch((err) => {
				console.log(err);
				setData(null);
			});
	};

	useEffect(() => {
		setData(props?.dataDetail?.teknologi_vendor);
		if (props.dataDetail._id) {
			fetchUserData();
		}
		return () => {};
	}, [props.dataDetail._id]);

	const handleApprove = (name) => {
		//do something
		let params = {
			user_id: userid,
			aksi: "terima",
			teknologi_name: name,
		};

		API.postVerifikasiTeknologi(params)
			.then((res) => {
				fetchUserData();
				props.refreshTable();
			})
			.catch((err) => console.log(err));
	};

	const handleDecline = (name) => {
		//do something
		let params = {
			user_id: userid,
			aksi: "tolak",
			teknologi_name: name,
		};

		API.postVerifikasiTeknologi(params)
			.then((res) => {
				fetchUserData();
				props.refreshTable();
			})
			.catch((err) => console.log(err));
	};

	// console.log("dataaaaa", data);
	return (
		<MDBContainer>
			<MDBModal
				size="md"
				isOpen={props.modalDetail}
				toggle={props.toggleDetail}
				centered={true}
			>
				<MDBModalHeader toggle={props.toggleDetail}>
					Detail Teknologi
				</MDBModalHeader>
				<MDBModalBody>
					<div className="d-flex flex-column justify-content-center">
						<div className="text-center h5 mb-2">Teknologi Terdaftar</div>
						<Row className="justify-content-center align-items-center mb-1">
							{typeof data === "object" ? (
								data.map((e, id) => {
									if (e?.status === "active") {
										return (
											<div className="d-flex flex-column text-center mr-4">
												<Label>
													<input
														type="checkbox"
														checked
														disabled
														className="mr-2"
													/>
													{e?.name === "FO"
														? "FO"
														: e?.name === "RL"
														? "RL"
														: e?.name === "VSAT_GS_SEWA_JASA"
														? "VSAT SEWA"
														: e?.name === "VSAT_GS_BELANJA_MODAL"
														? "VSAT BM"
														: ""}
												</Label>
											</div>
										);
									}
								})
							) : typeof data !== "object" && data !== undefined ? (
								<div className="d-flex flex-column text-center mr-4">
									<Label>
										<input type="checkbox" checked disabled className="mr-2" />
										{data}
									</Label>
								</div>
							) : (
								// <Col className="d-flex flex-row justify-content-center text-danger">
								// 	Tidak ada teknologi terdaftar
								// </Col>
								""
							)}
						</Row>
						<Row className="justify-content-center align-items-center">
							{data === "undefined" ||
								(data === undefined && (
									<Col className="d-flex flex-row justify-content-center text-danger">
										Tidak ada teknologi terdaftar
									</Col>
								))}
						</Row>
						<div className="text-center h5 mb-2 mt-4">
							Pengajuan Teknologi Baru
						</div>
						{typeof data === "object" ? (
							data.map((e, id) => {
								return (
									<Row className="justify-content-center align-items-center">
										{e?.status?.toLowerCase() === "pending" ? (
											<>
												<div className="col-3">
													<div className="wraperCheckboxLabel">
														<Label for="fo" className="LabelSolKateg">
															{e?.name === "FO"
																? "FO"
																: e?.name === "RL"
																? "RL"
																: e?.name === "VSAT_GS_SEWA_JASA"
																? "VSAT SEWA"
																: e?.name === "VSAT_GS_BELANJA_MODAL"
																? "VSAT BM"
																: ""}
														</Label>
													</div>
												</div>
												<Button
													className="btnApproveVendor"
													onClick={() => handleApprove(e?.name)}
												>
													<span className="text-dark">Approve</span>
												</Button>
												<Button
													className="btnDeclineVendor"
													onClick={() => handleDecline(e?.name)}
												>
													<span className="text-dark">Decline</span>
												</Button>
											</>
										) : (
											// id === 0 && "Tidak ada pengajuan baru"
											""
										)}
									</Row>
								);
							})
						) : (
							<Row className="justify-content-center align-items-center">
								Tidak ada pengajuan baru
							</Row>
						)}
					</div>
				</MDBModalBody>
			</MDBModal>
		</MDBContainer>
	);
}
export default ModalDetail;
