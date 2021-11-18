import React, { useEffect, useState } from "react";
import { MDBContainer, MDBModal, MDBModalBody, MDBModalHeader } from "mdbreact";
import { Col, Row, Input, Button, Spinner } from "reactstrap";
import "./style.css";
import moment from "moment";
import styles from "./style.module.css";
import API from "../../../../services";

function ModalUpdateNilai(props) {
	const [isLoading, setIsLoading] = useState(false);
	const [errorN, setErrorN] = useState(false);
	const [errorF, setErrorF] = useState(false);
	// const [error, setError] = useState(false);

	// const [dokumen, setDokumen] = useState("");
	// const [tanggalPenilaian, setTanggalPenilaian] = useState("");
	// const [namaPenilai, setNamaPenilai] = useState("");
	const [ketepatan, setKetepatan] = useState("");
	const [kualitas, setKualitas] = useState("");
	const [kecepatan, setKecepatan] = useState("");

	// const [filter, setFilter] = useState({});

	// const filterData = (filt) => {
	// 	setFilter(filt);
	// };

	const handleFormInput = (e) => {
		let { name, value } = e.target;
		// var FileSize = files[0].size / 1024 / 1024;
		// if (name === "dokumen") {
		// 	if (FileSize <= 10) {
		// 		setError(false);
		// 		setDokumen(files[0]);
		// 	} else {
		// 		setError(true);
		// 		setDokumen("null");
		// 	}
		// }
		// else if (name === "namaPenilai") {
		// 	setNamaPenilai(value);
		// } else if (name === "tglPenilaian") {
		// 	setTanggalPenilaian(value);
		// }
		if (name === "ket") {
			setKetepatan(value);
		} else if (name === "kua") {
			setKualitas(value);
		} else if (name === "kec") {
			setKecepatan(value);
		}
	};

	const onButtonClick = () => {
		if (ketepatan === "" || kualitas === "" || kecepatan === "") {
			setErrorN(true);
			setIsLoading(false);
		} else {
			// const role = window.localStorage.getItem("userId")
			// let tanggalPenilaianPost = moment(tanggalPenilaian).format(
			// 	"YYYY-MM-DD 00:00:00"
			// );
			setIsLoading(true);
			setErrorN(false);

			var bodyFormData = new FormData();
			bodyFormData.append("id", props.data.id);
			bodyFormData.append("kecepatan", kecepatan);
			bodyFormData.append("ketepatan", ketepatan);
			bodyFormData.append("kualitas", kualitas);

			API.postUpdateVPAdmin(bodyFormData)
				.then((res) => {
					if (res.data.success) {
						setIsLoading(false);
						props.toggleUpdate();
						props.resetTable();
					} else {
						setIsLoading(false);
					}
				})
				.catch((err) => {
					setIsLoading(false);
					setErrorF(true);
				});
		}
	};

	useEffect(() => {});

	return (
		<MDBContainer>
			<MDBModal
				size="lg"
				isOpen={props.modalUpdate}
				toggle={props.toggleUpdate}
				centered={true}
			>
				<MDBModalHeader toggle={props.toggleUpdate}>
					Update Nilai Penyedia
				</MDBModalHeader>
				<MDBModalBody>
					<Row>
						<Col xs="12">
							<div>
								<Input
									className={styles.inputUpdate}
									value={
										typeof props.data.vendor === "undefined"
											? ""
											: props.data.vendor.name
									}
									readOnly
								/>
							</div>
							{/* <div className={styles.marginTB}>
								<div>Tanggal Penilaian</div>
								<Input
									className={styles.inputUpdate}
									name="tglPenilaian"
									placeholder="dd/mm/yyyy"
									type="date"
								/>
							</div>
							<div className={styles.marginTB}>
								<Input
									className={styles.inputUpdate}
									placeholder="Nama Penilai"
									name="namaPenilai"
								/>
							</div> */}
							<Row className={styles.marginTB}>
								<Col>
									<div>Ketepatan Pengerjaan</div>
									<Input
										className={styles.inputUpdate}
										placeholder="0"
										name="ket"
										onChange={handleFormInput}
									/>
								</Col>
								<Col>
									<div>Kualitas Pengerjaan</div>
									<Input
										className={styles.inputUpdate}
										placeholder="0"
										name="kua"
										onChange={handleFormInput}
									/>
								</Col>
								<Col>
									<div>Kecepatan Pengerjaan</div>
									<Input
										className={styles.inputUpdate}
										placeholder="0"
										name="kec"
										onChange={handleFormInput}
									/>
								</Col>
							</Row>
							{/* <div className={styles.marginTB}>
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
							</div> */}
							{isLoading ? (
								<center>
									<Button className={styles.buttonUpdateNilai}>
										<Spinner></Spinner>
									</Button>
								</center>
							) : (
								<center>
									<Button
										className={styles.buttonUpdateNilai}
										onClick={onButtonClick}
									>
										Update Nilai
									</Button>
								</center>
							)}
							{errorN ? (
								<center style={{ color: "red", paddingTop: "10px" }}>
									Silahkan Lengkapi Data
								</center>
							) : errorF ? (
								<center style={{ color: "red", paddingTop: "10px" }}>
									Terjadi Kesalahan
								</center>
							) : (
								<div></div>
							)}
						</Col>
					</Row>
				</MDBModalBody>
			</MDBModal>
		</MDBContainer>
	);
}
export default ModalUpdateNilai;
