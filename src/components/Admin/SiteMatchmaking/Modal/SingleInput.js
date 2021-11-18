import React, { useEffect, useState, useContext } from "react";
import {
	MDBContainer,
	MDBModal,
	MDBModalBody,
	MDBModalHeader,
	MDBModalFooter,
} from "mdbreact";
import { Col, Row, Input, Button, Form, FormGroup, Label } from "reactstrap";
// import { LocalContext } from "../LocalContext";
import styles from "./style.module.css";
import ProvinsiDropdown from "./ProvinsiDropdown";
import KabupatenKotaDropdown from "./KabupatenKotaDropdown";
import KecamatanDropdown from "./KecamatanDropdown";
import DesaDropdown from "./DesaDropdown";
import { Typeahead } from "react-bootstrap-typeahead";
import API from "../../../../services";
import Skeleton from "react-loading-skeleton";
import "./style.css";

import _ from "lodash";

import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { changeDataCluster } from "../../../../store/actions";

function SingleInput(props) {
	//redux
	const dispatch = useDispatch();
	// const { db } = useContext(LocalContext);
	const [unikid, setUnikid] = useState([]);
	const [optionsUnikID, setOptionUnikID] = useState([]);
	const [optionsUnikIDNoData, setOptionUnikIDNoData] = useState("");
	const [optionsLocation, setOptionLocation] = useState([]);
	const [location, setLocation] = useState("");
	const [latitude, setLat] = useState("");
	const [longitude, setLon] = useState("");
	const [tipeBatch, setTipeBatch] = useState("");
	const [error, setError] = useState(false);
	const [errorLat, setErrorLat] = useState(false);
	const [errorLng, setErrorLng] = useState(false);
	const [modal, setModal] = useState(false);

	//Provinsi
	const [filterProv, setFilterProv] = useState({ id: "", nama: "" });
	const filterDataProv = (filt) => {
		setFilterProv(filt);
	};

	//Kabupaten/Kota
	const [filterKabKot, setFilterKabKot] = useState({ id: "", nama: "" });
	const filterDataKabKot = (filt) => {
		setFilterKabKot(filt);
	};

	//Kecamatan
	const [filterKecamatan, setFilterKecamatan] = useState({ id: "", nama: "" });
	const filterDataKecamatan = (filt) => {
		setFilterKecamatan(filt);
	};

	//Kecamatan
	const [filterDesa, setFilterDesa] = useState({ id: "", nama: "" });
	const filterDataDesa = (filt) => {
		setFilterDesa(filt);
	};

	function displayModal() {
		setModal((prevModal) => !prevModal);
	}

	// CEK TIPE INPUT
	let typeInput = localStorage.getItem("typeInput") || "";

	useEffect(() => {
		typeInput = localStorage.getItem("typeInput") || "";
	}, [props.refresh]);

	// function handleChange(e) {
	// 	var regLat = new RegExp(/^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,15}/g);
	// 	var regLng = new RegExp(/^-?(([1]?[0-7][0-9]|[1-9]?[0-9])\.{1}\d{1,15})/g)
	// 	switch (e.target.name) {
	// 		case "unikid":
	// 			setUnikid(e.target.value);
	// 			break;
	// 		case "location":
	// 			setlocation(e.target.value);
	// 			break;
	// 		case "latitude":
	// 			if( regLat.exec(e.target.value) ) {
	// 				setErrorLat(false)
	// 				setLat(e.target.value);
	// 			} else {
	// 				setLat("");
	// 			}
	// 			break;
	// 		case "longitude":
	// 			if( regLng.exec(e.target.value) ) {
	// 				setErrorLng(false)
	// 				setLon(e.target.value);
	// 			} else {
	// 				setLon("");
	// 			}
	// 			break;
	// 	}
	// }

	function validate(data) {
		for (const [key, value] of Object.entries(data)) {
			if (value === "") {
				return false;
			}
		}

		return true;
	}

	function handleSubmit() {
		const userid = localStorage.getItem("userId");
		// const sitesData = localStorage.getItem("sitesData");

		if (
			unikid.length === 0 ||
			location === "" ||
			typeof filterProv?.id === "undefined" ||
			typeof filterKabKot?.id === "undefined" ||
			typeof filterKecamatan?.id === "undefined" ||
			typeof filterDesa?.id === "undefined"
		) {
			setError(true);
		} else {
			// send req api untuk mengecek
			if (longitude && latitude) {
				API.getCheckNearOffAir({
					coordinates: [[longitude, latitude, unikid?.[0]?.unikid]],
				})
					.then((res) => {
						// console.log("asda", res);
						if (!res.data.success) {
							return Swal.fire({
								position: "center",
								icon: "error",
								title: "ERROR",
								text: "Terjadi Kesalahan",
								showConfirmButton: false,
								timer: 1500,
							});
						}
						if (res.data.values.length !== 0) {
							Swal.fire({
								position: "center",
								icon: "error",
								title: "Lokasi Sudah Ada",
								html: `Unik ID lokasi yang sudah ada: </br> <b>${unikid[0].unikid}</b>`,
								// showConfirmButton: false,
								// timer: 1500,
							});
						} else {
							setError(false);
							const data = {
								id: unikid[0]?.id,
								unikid: unikid[0]?.unikid,
								location,
								provinsi: filterProv,
								kecamatan: filterKecamatan,
								kabupatenKota: filterKabKot,
								kelurahanDesa: filterDesa,
								latitude,
								longitude,
								tipe_batch: tipeBatch,
							};
							if (latitude === "") {
								setErrorLat(true);
							} else if (longitude === "") {
								setErrorLng(true);
							} else {
								var sitesData = JSON.parse(
									localStorage.getItem("sitesData") || "[]"
								);

								let x = sitesData.filter((e) => e.unikid === unikid[0].unikid)
									.length;
								// console.log(unikid[0].unikid);
								// console.log("unikid", unikid);
								// console.log("sites", sitesData);
								// console.log("x", x);
								if (x !== 0 && sitesData.length !== 0) {
									return alert(
										"Tidak bisa input unik id yang sama dalam 1 batch"
									);
								} else {
									if (validate(data)) {
										displayModal();
										sitesData.push(data);
										localStorage.setItem(
											"sitesData",
											JSON.stringify(sitesData)
										);
										localStorage.setItem("typeInput", "single-input");
										//empty recommendation if single-input
										dispatch(changeDataCluster("", "", "", true));
										//reset table sites
										props.resetTable();
										setUnikid([]);
										setLocation("");
										setFilterProv({});
										setFilterKabKot({});
										setFilterKecamatan({});
										setFilterDesa({});
										setLat("");
										setLon("");
										setTipeBatch("");

										return;
									} else {
										return alert("empty field");
									}
								}
								// console.log("x", x);
								// console.log("local uniik", sitesData);
								// console.log("ceekk", unikid[0].unikid);
							}
						}
					})
					.catch((e) => console.log(e));
			} else {
				alert("Lokasi Belum Dipilih");
			}
		}
	}

	// MENGECEK APAKAH TITIK SUDAH ADA/BELUM SEBELUM MENAMBAHKAN LOKASI

	// const checkUnikID = () => {
	// 	// send req api untuk mengecek
	// 	if (longlatCheck) {
	// 		API.getCheckNearOffAir({ coordinates: [longlatCheck] })
	// 			.then((res) => {
	// 				console.log("asda", res);
	// 			})
	// 			.catch((e) => console.log(e));
	// 	} else {
	// 		alert("Lokasi Belum dipilih");
	// 	}
	// Swal.fire({
	// 	position: 'center',
	// 	icon: 'error',
	// 	title: 'Lokasi Sudah Ada',
	// 	text: 'Lokasi yang anda tambahkan sudah ada, silahkan masukan lokasi yang lain',
	// 	showConfirmButton: false,
	// 	timer: 1500
	//   })
	// jika lokasi belum ada, lanjut ke proses handle submit
	// handleSubmit()
	// };
	let tech = JSON.parse(localStorage.getItem("teknologi") || "[]");

	async function getListUnikId() {
		setOptionUnikIDNoData("");
		await API.getListUnikID(tech !== undefined ? tech[0] : "")
			.then((res) => {
				if (res.data.values.length !== 0) {
					let data = [];
					let index = 0;
					for (let i of res.data.values) {
						data.push({ id: index, unikid: i.unik_id, nama: i.nama });
						index = index + 1;
					}
					setOptionUnikID(data);
				}
			})
			.catch((e) => {
				console.log(e?.response?.data?.message ?? "-");
				setOptionUnikIDNoData(e?.response?.data?.message ?? "-");
			});
	}

	async function postUnikID() {
		await API.postDataUnikID({
			unik_id: unikid?.[0]?.unikid,
		})
			.then((res) => {
				setLocation(res?.data?.values?.nama);
				setFilterProv({
					id: res?.data?.values?.provinsi?.id,
					nama: res?.data?.values?.provinsi?.name,
				});
				if (res?.data?.values?.kota !== null) {
					setFilterKabKot({
						id: res?.data?.values?.kota?.id,
						nama: res?.data?.values?.kota?.name,
					});
				} else {
					setFilterKabKot({
						id: res?.data?.values?.kabupaten?.id,
						nama: res?.data?.values?.kabupaten?.name,
					});
				}
				setFilterKecamatan({
					id: res?.data?.values?.kecamatan?.id,
					nama: res?.data?.values?.kecamatan?.name,
				});
				setFilterDesa({
					id: res?.data?.values?.desa_kelurahan?.id,
					nama: res?.data?.values?.desa_kelurahan?.name,
				});
				setLat(res?.data?.values?.latitude);
				setLon(res?.data?.values?.longitude);
				setTipeBatch(res?.data?.values?.tipe_batch);
			})
			.catch((e) => {
				console.log(e);
			});
	}

	// useEffect(() => {
	// 	setFilterKabKot({})
	// 	setFilterKecamatan({})
	// 	setFilterDesa({})
	// }, [filterProv]);

	// useEffect(() => {
	// 	setFilterKecamatan({})
	// 	setFilterDesa({})
	// }, [filterKabKot]);

	// useEffect(() => {
	//     setFilterDesa({})
	// }, [filterKecamatan]);

	useEffect(() => {
		if (unikid.length !== 0) {
			postUnikID();
		}
	}, [unikid]);

	useEffect(() => {
		getListUnikId();
		// }, [props.refreshSite]);
	}, []);

	return (
		<>
			<Button
				className={styles.buttonStyle}
				onClick={displayModal}
				disabled={
					typeInput === "" ? false : typeInput === "single-input" ? false : true
				}
			>
				Single Input
			</Button>
			<MDBContainer>
				<MDBModal
					size="lg"
					isOpen={modal}
					toggle={displayModal}
					centered={true}
				>
					<MDBModalHeader>Tambah Titik</MDBModalHeader>
					<MDBModalBody>
						<Form>
							<Row>
								<Col lg="12">
									<FormGroup>
										<Label for="basicpill-firstname-input14">Unik ID</Label>
										{optionsUnikID.length === 0 &&
										optionsUnikIDNoData === "" ? (
											<Skeleton></Skeleton>
										) : optionsUnikIDNoData ? (
											<div>{optionsUnikIDNoData}</div>
										) : (
											<Typeahead
												id="Unik-id-TypeAhead"
												placeholder="Masukkan Unik ID..."
												onChange={setUnikid}
												minLength={1}
												labelKey="unikid"
												options={optionsUnikID}
												selected={unikid}
											/>
										)}
									</FormGroup>
								</Col>
							</Row>

							<Row>
								<Col lg="12">
									<FormGroup>
										<Label for="basicpill-firstname-input14">Nama Lokasi</Label>
										{optionsUnikID.length === 0 &&
										optionsUnikIDNoData === "" ? (
											<Skeleton></Skeleton>
										) : optionsUnikIDNoData ? (
											<div>{optionsUnikIDNoData}</div>
										) : (
											<Typeahead
												id="Unik-id-TypeAhead"
												placeholder="Masukkan Nama Lokasi..."
												onChange={setUnikid}
												minLength={1}
												labelKey="nama"
												options={optionsUnikID}
												selected={unikid}
											/>
										)}
									</FormGroup>
								</Col>
							</Row>

							<Row>
								<Col lg="6">
									<FormGroup>
										<Label for="basicpill-firstname-input14">Provinsi</Label>
										<Input
											type="text"
											className="form-control"
											id="basicpill-firstname-input14"
											// onChange={handleChange}
											name={"location"}
											defaultValue={filterProv.nama}
											readOnly
										/>
										{/* <ProvinsiDropdown clicked={filterDataProv} filter={filterProv}/> */}
									</FormGroup>
								</Col>

								<Col lg="6">
									<FormGroup>
										<Label for="basicpill-firstname-input14">
											Kabupaten/Kota
										</Label>
										<Input
											type="text"
											className="form-control"
											id="basicpill-firstname-input14"
											// onChange={handleChange}
											name={"location"}
											defaultValue={filterKabKot.nama}
											readOnly
										/>
										{/* <KabupatenKotaDropdown clicked={filterDataKabKot} filter={filterKabKot} provinsi={filterProv.id}/> */}
									</FormGroup>
								</Col>

								<Col lg="6">
									<FormGroup>
										<Label for="basicpill-firstname-input14">Kecamatan</Label>
										<Input
											type="text"
											className="form-control"
											id="basicpill-firstname-input14"
											// onChange={handleChange}
											name={"location"}
											defaultValue={filterKecamatan.nama}
											readOnly
										/>
										{/* <KecamatanDropdown clicked={filterDataKecamatan} filter={filterKecamatan} kabupatenkota={filterKabKot.id}/> */}
									</FormGroup>
								</Col>

								<Col lg="6">
									<FormGroup>
										<Label for="basicpill-firstname-input14">
											Kelurahan/Desa
										</Label>
										<Input
											type="text"
											className="form-control"
											id="basicpill-firstname-input14"
											// onChange={handleChange}
											name={"location"}
											defaultValue={filterDesa.nama}
											readOnly
										/>
										{/* <DesaDropdown clicked={filterDataDesa} filter={filterDesa} kecamatan={filterKecamatan.id}/> */}
									</FormGroup>
								</Col>

								{/* <Col lg="6">
									<FormGroup>
										<Label for="basicpill-firstname-input14">Latitude</Label>
										<Input
											type="text"
											className="form-control"
											id="basicpill-firstname-input14"
											// onChange={handleChange}
											name={"latitude"}
											defaultValue={latitude}
											readOnly
										/>
									</FormGroup>
								</Col> */}

								{/* <Col lg="6">
									<FormGroup>
										<Label for="basicpill-firstname-input14">Longitude</Label>
										<Input
											type="text"
											className="form-control"
											id="basicpill-firstname-input14"
											// onChange={handleChange}
											name={"longitude"}
											defaultValue={longitude}
											readOnly
										/>
									</FormGroup>
								</Col> */}

								<Col lg="12">
									{error ? (
										<div style={{ color: "red" }}>
											Silahkan lengkapi data terlebih dahulu
										</div>
									) : errorLat ? (
										<div style={{ color: "red" }}>
											Format Latitude salah, Format Latitude = xx.xxx, Minimal :
											-90 dan Maksimal : 90
										</div>
									) : errorLng ? (
										<div style={{ color: "red" }}>
											Format Longitude salah, Format Longitude = xxx.xxx,
											Minimal : -180 dan Maksimal : 180
										</div>
									) : (
										<div></div>
									)}
								</Col>
							</Row>
						</Form>
					</MDBModalBody>
					<MDBModalFooter>
						<Button onClick={displayModal} className={styles.btn_reject}>
							Batal
						</Button>
						<Button onClick={handleSubmit} className={styles.btn_add_sites}>
							Tambah
						</Button>
					</MDBModalFooter>
				</MDBModal>
			</MDBContainer>
		</>
	);
}
export default SingleInput;
