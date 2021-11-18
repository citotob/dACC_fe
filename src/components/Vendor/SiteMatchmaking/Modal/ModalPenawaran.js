import React, { useEffect, useState } from "react";
import { MDBContainer, MDBModal, MDBModalBody, MDBModalHeader } from "mdbreact";
import { Col, Row, Input, Button, Spinner } from "reactstrap";
import moment from "moment";
import styles from "./style.module.css";
import RTFilter from "./RTFilter";
// import { LocalContext } from "../LocalContext";
// import { useParams } from "react-router-dom";
import "./style.css";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { copyFormVendorPenawaran } from "../../../../store/actions";
import _ from "lodash";
import TeamFilter from "./TeamFilter";

function ModalPenawaranSMV(props) {
	// console.log(props);

	const dataCheckSite = JSON.parse(localStorage.getItem("tempCheck") || "[]");

	const [isLoading, setIsLoading] = useState(false);
	const [errorN, setErrorN] = useState(false);

	const [tanggalAwal, setTanggalAwal] = useState("");
	const [tanggalAkhir, setTanggalAkhir] = useState("");

	const [hp, setHp] = useState("");
	const [hpSave, setHpSave] = useState(0);

	const [hi, setHi] = useState("");
	const [hiSave, setHiSave] = useState(0);

	const [ho, setHo] = useState("");
	const [hoSave, setHoSave] = useState(0);

	const [filter, setFilter] = useState("");
	const [teamFilter, setTeamFilter] = useState("");

	const filterData = (filt) => {
		setFilter(filt);
	};

	const filterTeam = (filt) => {
		setTeamFilter(filt);
	};

	const addCommas = (num) =>
		num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

	const removeNonNumeric = (num) => num.toString().replace(/[^0-9]/g, "");

	const handleFormInput = (e) => {
		let { name, value } = e.target;
		if (name === "tawal") {
			setTanggalAwal(value);
		} else if (name === "takhir") {
			setTanggalAkhir(value);
		} else if (name === "harga_perangkat") {
			setHp(addCommas(removeNonNumeric(value)));
			setHpSave(value.replaceAll(".", ""));
		} else if (name === "harga_instalasi") {
			setHi(addCommas(removeNonNumeric(value)));
			setHiSave(value.replaceAll(".", ""));
		} else if (name === "harga_om") {
			setHo(addCommas(removeNonNumeric(value)));
			setHoSave(value.replaceAll(".", ""));
		}
	};

	function validate(data) {
		for (const [key, value] of Object.entries(data)) {
			if (value === "") {
				return false;
			}
		}
		return true;
	}

	const onButtonClick = () => {
		if (
			typeof filter !== "object" ||
			tanggalAwal === "" ||
			tanggalAkhir === "" ||
			hp === "" ||
			hi === "" ||
			ho === ""
		) {
			setErrorN(true);
			setIsLoading(false);
		} else {
			const userid = localStorage.getItem("userId");
			const companyId = window.localStorage.getItem("companyId");
			setIsLoading(true);
			setErrorN(false);

			const data = {
				batchid: props.dataBatch.id,
				batchname: props.dataBatch.judul,
				harga_perangkat: hpSave,
				harga_instalasi: hiSave,
				harga_om: hoSave,
				siteid: props.data.siteid.id,
				sitenama: props.data.siteid.nama,
				siteunikid: props.data.siteid.unik_id,
				tanggal_awal_penawaran: moment(tanggalAwal).format("YYYY-MM-DD"),
				tanggal_akhir_penawaran: moment(tanggalAkhir).format("YYYY-MM-DD"),
				tanggal_mulai_material_w: moment(tanggalAwal).format("DD/MM/YYYY"),
				tanggal_selesai_installation: moment(tanggalAkhir).format("DD/MM/YYYY"),
				teknologi: filter.teknologi,
				unik_id: props.data.siteid.unik_id,
				userfrom: userid,
				vendorid: companyId,
				// team: teamFilter.toUpperCase(),
				team: teamFilter,
			};

			var sitesData = JSON.parse(localStorage.getItem("tempXcl") || "[]");
			const siteListA = sitesData.map((data) => {
				return { ...data };
			});

			if (validate(data)) {
				if (siteListA.some((x) => x.siteid === props.data.siteid.id)) {
					let indexData = siteListA.findIndex(
						(x) => x.siteid === props.data.siteid.id
					);
					sitesData[indexData] = data;
					localStorage.setItem("tempXcl", JSON.stringify(sitesData));
				} else {
					sitesData.push(data);
					localStorage.setItem("tempXcl", JSON.stringify(sitesData));
				}
				setIsLoading(false);
				setTanggalAwal("");
				setTanggalAkhir("");
				setFilter("");
				setTeamFilter("");
				setHp("");
				setHi("");
				setHo("");
				setHpSave(0);
				setHiSave(0);
				setHoSave(0);
				props.togglePenawaran(props.data);
			} else {
				alert("empty field");
			}
		}
	};

	var sitesData = JSON.parse(localStorage.getItem("tempXcl") || "[]");
	const siteListA = sitesData.map((data) => {
		return { ...data };
	});

	useEffect(() => {
		if (props.data) {
			if (Object.values(props.data).length !== 0) {
				// console.log("dataaa", props.data);
				if (siteListA.some((x) => x.siteid === props.data.siteid.id)) {
					const dataEdit = siteListA.filter(
						(x) => x.siteid === props.data.siteid.id
					);
					// console.log("dataEdit", dataEdit[0]);
					setFilter({
						teknologi: dataEdit ? dataEdit[0]?.teknologi ?? "" : "",
					});
					setTeamFilter(dataEdit ? dataEdit[0]?.team ?? "" : "");
					setTanggalAwal(
						dataEdit
							? moment(dataEdit[0]?.tanggal_awal_penawaran).format(
									"YYYY-MM-DD"
							  ) ?? ""
							: ""
					);
					setTanggalAkhir(
						dataEdit
							? moment(dataEdit[0]?.tanggal_akhir_penawaran).format(
									"YYYY-MM-DD"
							  ) ?? ""
							: ""
					);
					setHp(addCommas(removeNonNumeric(dataEdit[0].harga_perangkat)));
					setHpSave(dataEdit[0].harga_perangkat);
					setHi(addCommas(removeNonNumeric(dataEdit[0].harga_instalasi)));
					setHiSave(dataEdit[0].harga_instalasi);
					setHo(addCommas(removeNonNumeric(dataEdit[0].harga_om)));
					setHoSave(dataEdit[0].harga_om);
				} else {
					setFilter("");
					setTeamFilter("");
					setTanggalAwal("");
					setTanggalAkhir("");
					setHp("");
					setHpSave(0);
					setHi("");
					setHiSave(0);
					setHo("");
					setHoSave(0);
				}
			}
		}
	}, [props.modalPenawaran, props.data]);

	return (
		<MDBContainer>
			<MDBModal
				size="lg"
				isOpen={props.modalPenawaran}
				toggle={props.togglePenawaran}
				centered={true}
			>
				<MDBModalHeader toggle={props.togglePenawaran}>
					Buat Penawaran RFI
				</MDBModalHeader>
				<MDBModalBody>
					<Row>
						<Col xs="12">
							<div className={styles.penawaranHead}>
								<div>
									<center>
										<h4>
											{typeof props.data.siteid === "undefined"
												? ""
												: props.data?.siteid?.nama ?? ""}
										</h4>
									</center>
								</div>
								<div>
									<center>
										<h5>
											{typeof props.data.siteid === "undefined"
												? ""
												: props.data?.siteid?.desa_kelurahan?.name ?? ""}
										</h5>
									</center>
								</div>
								<Row>
									<Col className={styles.lngph}>
										<div>
											{typeof props.data.siteid === "undefined"
												? ""
												: props.data?.siteid?.longitude ?? "" + "°E"}
										</div>
									</Col>
									<Col className={styles.latph}>
										<div>
											{typeof props.data.siteid === "undefined"
												? ""
												: props.data?.siteid?.latitude ?? "" + "°S"}
										</div>
									</Col>
								</Row>
							</div>

							<div className={styles.marginTB}>
								<RTFilter filter={filter} clicked={filterData} />
							</div>

							<div className={styles.marginTB}>
								{/* <TeamFilter filter={teamFilter} clicked={filterTeam} /> */}
								<Row>
									<Col>
										<div style={{ color: "#767676" }}>Team :</div>
										<Input
											className={styles.inputUpdate}
											name="teamFilter"
											placeholder={teamFilter}
											type="number"
											defaultValue={teamFilter}
											onChange={(e) => setTeamFilter(e.target.value)}
											min={1}
											value={teamFilter}
										/>
									</Col>
								</Row>
							</div>

							<div className={styles.marginTB}>
								<Row>
									<Col>
										<div style={{ color: "#767676" }}>Tanggal Awal :</div>
										<Input
											className={styles.inputUpdate}
											name="tawal"
											placeholder="dd/mm/yyyy"
											type="date"
											defaultValue={tanggalAwal}
											onChange={handleFormInput}
											min={Date()}
											value={tanggalAwal}
										/>
									</Col>
									<Col>
										<div style={{ color: "#767676" }}>Tanggal Akhir :</div>
										<Input
											className={styles.inputUpdate}
											name="takhir"
											placeholder="dd/mm/yyyy"
											type="date"
											onChange={handleFormInput}
											disabled={tanggalAwal === "" ? true : false}
											min={tanggalAwal}
											defaultValue={tanggalAkhir}
											value={tanggalAkhir}
										/>
									</Col>
								</Row>
							</div>

							<div className={styles.marginTB}>
								<div className={styles.titleForm}>Harga Perangkat</div>
								<Row>
									<Col>
										<Input
											className={styles.inputUpdate}
											name="harga_perangkat"
											placeholder="Harga Perangkat"
											type="text"
											onChange={handleFormInput}
											value={hp}
										/>
									</Col>
								</Row>
							</div>
							<div className={styles.marginTB}>
								<div className={styles.titleForm}>Harga Instalasi</div>
								<Row>
									<Col>
										<Input
											className={styles.inputUpdate}
											name="harga_instalasi"
											placeholder="Harga Instalasi"
											type="text"
											onChange={handleFormInput}
											value={hi}
										/>
									</Col>
								</Row>
							</div>
							<div className={styles.marginTB}>
								<div className={styles.titleForm}>Harga OM</div>
								<Row>
									<Col>
										<Input
											className={styles.inputUpdate}
											name="harga_om"
											placeholder="Harga OM"
											type="text"
											onChange={handleFormInput}
											value={ho}
										/>
									</Col>
								</Row>
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
										OK
									</Button>
								</center>
							)}
							{errorN ? (
								<center style={{ color: "red", paddingTop: "10px" }}>
									Silahkan Lengkapi Data
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
export default ModalPenawaranSMV;
