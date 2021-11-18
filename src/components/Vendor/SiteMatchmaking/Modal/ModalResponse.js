import React, { useEffect, useState } from "react";
import { MDBContainer, MDBModal, MDBModalBody, MDBModalHeader } from "mdbreact";
import { Col, Row, Input, Button, Spinner } from "reactstrap";
import moment from "moment";
import API from "../../../../services";
import styles from "./style.module.css";
import './style.css'

function ModalResponseSMV(props) {
	const [dokumen, setDokumen] = useState("");
	const [error, setError] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [tanggalAwal, setTanggalAwal] = useState("");
	const [tanggalAkhir, setTanggalAkhir] = useState("");
	const [nomorSuratRespon, setNomorSuratRespon] = useState("");

	const handleFormInput = (e) => {
		let { name, files, value } = e.target;
		if (name === "dokumen") {
			var FileSize = files[0].size / 1024 / 1024;
			if (FileSize <= 10) {
				setError(false);
				setDokumen(files[0]);
			} else {
				setError(true);
				setDokumen("null");
			}
		} else if (name === "ns") {
			setNomorSuratRespon(value);
		} else if (name === "ta") {
			setTanggalAwal(value);
		} else if (name === "ti") {
			setTanggalAkhir(value);
		}
	};

	const onButtonClick = () => {
		if (
			tanggalAwal === "" ||
			tanggalAkhir === "" ||
			nomorSuratRespon === "" ||
			typeof dokumen !== "object"
		) {
			setIsLoading(false);
		} else {
			const role = window.localStorage.getItem("userId");
			let tanggalAwalPost = moment(tanggalAwal).format("YYYY-MM-DD 00:00:00");
			let tanggalAkhirPost = moment(tanggalAkhir).format("YYYY-MM-DD 00:00:00");
			setIsLoading(true);
			setDokumen("");

			var bodyFormData = new FormData();
			bodyFormData.append("batch", props.data.id);
			bodyFormData.append("tanggal_mulai_sla", tanggalAwalPost);
			bodyFormData.append("tanggal_selesai_sla", tanggalAkhirPost);
			bodyFormData.append("doc", dokumen);
			bodyFormData.append("rfi_no", nomorSuratRespon);
			bodyFormData.append("userid", role);

			API.postVendorRespon(bodyFormData)
				.then((res) => {
					if (res.data.success === true) {
						setIsLoading(false);
						props.toggleResponse();
						props.resetTable();
					} else {
						setIsLoading(false);
					}
				})
				.catch((err) => {
					console.log(err);
					setIsLoading(false);
				});
		}
	};

	useEffect(() => {
		console.log(dokumen);
	}, [dokumen]);

	return (
		<MDBContainer>
			<MDBModal
				size="lg"
				isOpen={props.modalResponse}
				toggle={props.toggleResponse}
				centered={true}
			>
				<MDBModalHeader toggle={props.toggleResponse}>
					Respon Undangan
				</MDBModalHeader>
				<MDBModalBody>
					<Row>
						<Col xs="12">
							<div>
								<center>
									<h2>{props.data.judul}</h2>
								</center>
							</div>
							<div className={styles.marginTB}>
								<Input
									className={styles.inputUpdate}
									name="ns"
									placeholder="Nomor Surat Respon RFI"
									onChange={handleFormInput}
								/>
							</div>
							<div className={styles.marginTB}>
								<div className={styles.titleForm}>
									SLA Administratif & Logistic
								</div>
								<div style={{ color: "#767676" }}>Tanggal Awal :</div>
								<Input
									className={styles.inputUpdate}
									name="ta"
									placeholder="dd/mm/yyyy"
									type="date"
									onChange={handleFormInput}
								/>
								<br />
								<div style={{ color: "#767676" }}>Tanggal Akhir :</div>
								<Input
									className={styles.inputUpdate}
									name="ti"
									placeholder="dd/mm/yyyy"
									type="date"
									onChange={handleFormInput}
								/>
							</div>
							<div className={styles.marginTB}>
								<div className={styles.titleForm}>Unggah Dokumen</div>
								<div className={styles.inputRegisterFile}>
									<label style={{ margin: "0px" }}>
										<Input
											className={styles.inputRegister}
											name="dokumen"
											type="file"
											accept="application/pdf, image/jpeg, image/png, image/jpg"
											onChange={handleFormInput}
											style={{ display: "none" }}
										></Input>
										<a className={styles.inputRegChoose}>Pilih Berkas</a>
									</label>
									{error ? (
										<label
											style={{
												margin: "0px",
												paddingLeft: "10px",
												color: "red",
												paddingRight: "10px",
											}}
										>
											Maksimal File 10 MB
										</label>
									) : typeof dokumen.name === "undefined" ||
									  dokumen === "null" ? (
										<label
											style={{
												margin: "0px",
												paddingLeft: "10px",
												color: "#9F9F9F",
												paddingRight: "10px",
											}}
										>
											Tidak ada berkas
										</label>
									) : (
										<label
											style={{
												margin: "0px",
												paddingLeft: "10px",
												paddingRight: "10px",
											}}
										>
											{dokumen.name}
										</label>
									)}
								</div>
							</div>
							{isLoading ? (
								<center>
									<Button className={styles.buttonRFI}>
										<Spinner></Spinner>
									</Button>
								</center>
							) : (
								<center>
									<Button className={styles.buttonRFI} onClick={onButtonClick}>
										Buat RFI
									</Button>
								</center>
							)}
						</Col>
					</Row>
				</MDBModalBody>
			</MDBModal>
		</MDBContainer>
	);
}
export default ModalResponseSMV;
