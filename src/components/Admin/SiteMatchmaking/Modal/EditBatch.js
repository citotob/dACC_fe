import React, { useState } from "react";
import { MDBContainer, MDBModal, MDBModalBody, MDBModalHeader } from "mdbreact";
import { Col, Row, Input, Button, Spinner, Label } from "reactstrap";
import moment from "moment";
import API from "../../../../services";
import styles from "./style.module.css";
import StatusDropdown from "./StatusDropdown";
import EditIcon from "../../../../assets/images/EditIcon.svg";
import "./style.css";
import ReactTooltip from "react-tooltip";

function ModalEditBatch(props) {
	const [toggle, setToggle] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [tanggalAwal, setTanggalAwal] = useState("");
	const [tanggalAkhir, setTanggalAkhir] = useState("");
	const [filter, setFilter] = useState({});
	const [docUpload, setDocUpload] = useState("");
	const [error, setError] = useState(false);
	const [errorEmpty, setErrorEmpty] = useState(false);

	const [errorDocFormat, setErrorDocFormat] = useState("");

	const filterData = (filt) => {
		setFilter(filt);
	};

	const handleFormInput = (e) => {
		let { name, files, value } = e.target;
		if (name === "ta") {
			setTanggalAwal(value);
		} else if (name === "ti") {
			setTanggalAkhir(value);
		} else if (name === "dokumen") {
			// let fileName = fileUploaded.name;
			let fileExtension = files[0].name.split(".").pop();
			if (fileExtension !== "pdf") {
				setErrorDocFormat("Format Dokumen harus .pdf");
				setDocUpload("");
			} else {
				setErrorDocFormat("");
				setDocUpload(files[0]);
			}
		}
	};

	const displayToggle = () => {
		setError(false);
		setToggle((prevState) => !prevState);
	};

	const onButtonClick = () => {
		if (
			tanggalAwal === "" ||
			tanggalAkhir === "" ||
			typeof filter.status === "undefined" ||
			docUpload === ""
		) {
			setErrorEmpty(true);
			setIsLoading(false);
		} else {
			setErrorEmpty(false);
			const userid = localStorage.getItem("userId");
			let tanggalAwalPost = moment(tanggalAwal).format("YYYY-MM-DD 00:00:00");
			let tanggalAkhirPost = moment(tanggalAkhir).format("YYYY-MM-DD 00:00:00");
			setIsLoading(true);

			var bodyFormData = new FormData();
			bodyFormData.append("batch", props.batch_id);
			bodyFormData.append("tanggal_mulai_undangan", tanggalAwalPost);
			bodyFormData.append("tanggal_selesai_undangan", tanggalAkhirPost);
			bodyFormData.append("status", filter.status);
			bodyFormData.append("doc", docUpload);
			bodyFormData.append("id", userid);

			API.postEditBatch(bodyFormData)
				.then((res) => {
					if (res.data.success === true) {
						// console.log(res.data)
						setIsLoading(false);
						props.resetTable();
						displayToggle();
					} else {
						setError(true);
						setIsLoading(false);
					}
				})
				.catch((err) => {
					setError(true);
					console.log(err);
					setIsLoading(false);
				});
		}
	};

	return (
		<>
			<a key={props.batch_id} onClick={displayToggle} data-tip="Edit Batch">
				<img src={EditIcon} alt={props.batch_id} />
				{/* Tooltip */}
				<ReactTooltip place="left"/>
			</a>
			<div>
				<MDBContainer>
					<MDBModal
						size="lg"
						isOpen={toggle}
						toggle={displayToggle}
						centered={true}
					>
						<MDBModalHeader toggle={displayToggle}>Edit Batch</MDBModalHeader>
						<MDBModalBody>
							<Row>
								<Col xs="12">
									<div className={styles.judulHeaderEdit}>
										<center>
											<h2>{props.batch_title}</h2>
										</center>
									</div>
									<div className={styles.marginTB}>
										<div style={{ color: "#767676" }}>
											Tanggal Dimulai Undangan :
										</div>
										<Input
											className={styles.inputUpdate}
											name="ta"
											placeholder="dd/mm/yyyy"
											type="date"
											onChange={handleFormInput}
										/>
										<br />
										<div style={{ color: "#767676" }}>
											Tanggal Selesai Undangan :
										</div>
										<Input
											className={styles.inputUpdate}
											name="ti"
											placeholder="dd/mm/yyyy"
											type="date"
											onChange={handleFormInput}
										/>
										<br />
										<div style={{ color: "#767676" }}>Pilih Status :</div>
										<StatusDropdown clicked={filterData} filter={filter} />
										<br />
										<div style={{ color: "#767676" }}>Unggah Dokumen :</div>
										<Label style={{ color: "red" }}>
											{errorDocFormat === "" ? "" : errorDocFormat}
										</Label>
										<input
											type="file"
											className="form-control"
											name="dokumen"
											onChange={handleFormInput}
											style={{
												display: "flex",
												justifyItems: "center",
												alignItems: "center",
												height: "43px",
											}}
											accept="application/pdf"
										/>
									</div>
									{errorEmpty ? (
										<div style={{ color: "red", paddingBottom: "10px" }}>
											Silahkan melengkapi data terlebih dahulu
										</div>
									) : error ? (
										<div style={{ color: "red", paddingBottom: "10px" }}>
											Terjadi kesalahan
										</div>
									) : (
										<div style={{ color: "red", paddingBottom: "10px" }}></div>
									)}
									{isLoading ? (
										<center>
											<Button className={styles.buttonSimpan}>
												<Spinner></Spinner>
											</Button>
										</center>
									) : (
										<center>
											<Button
												className={styles.buttonSimpan}
												onClick={onButtonClick}
												disabled={docUpload === "" ? true : false}
											>
												Simpan
											</Button>
										</center>
									)}
								</Col>
							</Row>
						</MDBModalBody>
					</MDBModal>
				</MDBContainer>
			</div>
		</>
	);
}
export default ModalEditBatch;
