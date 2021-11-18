import React, { useEffect, useState } from "react";
import {
	MDBContainer,
	MDBModal,
	MDBCard,
	MDBCardBody,
	MDBCardTitle,
	MDBCardHeader,
	MDBDataTable,
} from "mdbreact";
import Skeleton from "react-loading-skeleton";
import {
	Col,
	Row,
	Input,
	Button,
	ButtonDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
} from "reactstrap";
import styles from "./style.module.css";
import iconDown from "../../../../assets/images/back.png";
import API from "../../../../services";
import Swal from "sweetalert2";
import _ from "lodash";
//redux
import { useDispatch } from "react-redux";
import { changeDataCluster } from "../../../../store/actions";
// import XLSX from "xlsx";
// import fileDownload from "../../../../assets/Template_SIS.xlsm"

function UploadSites(props) {
	// const [modal, setModal] = useState(false);
	// const [uploadFile, setUploadFile] = useState(0);
	// const [Table, setTable] = useState("");
	//PROVINCE
	const [listProvince, setListProvince] = useState([]);
	const [titleProvince, setTitleProvince] = useState("");
	const [idProvince, setIdProvince] = useState("");
	//GET KAB KEC CLUSTER
	const dispatch = useDispatch();
	// CEK TIPE INPUT
	let typeInput = localStorage.getItem("typeInput") || "";
	useEffect(() => {
		typeInput = localStorage.getItem("typeInput") || "";
	}, [props.refresh]);

	// DROPDOWN PROVINCE
	const [dropdownProvinceCond, setDropdownProvinceCond] = useState(false);
	const toggleDropdownProvince = () =>
		setDropdownProvinceCond((prevState) => !prevState);

	//KABUPATEN KOTA
	const [listKabKot, setListKabKot] = useState([]);
	const [titleKabKot, setTitleKabKot] = useState("");
	const [idKabKot, setIdKabKot] = useState("");

	const [idKec, setIdKec] = useState("");

	// DROPDOWN KabKot
	const [dropdownKabKotCond, setDropdownKabKotCond] = useState(false);
	const toggleDropdownKabKot = () =>
		setDropdownKabKotCond((prevState) => !prevState);

	// KECAMATAN
	const [listKecamatan, setListKecamatan] = useState([]);
	const [titleKecamatan, setTitleKecamatan] = useState("");
	// DROPDOWN KECAMATAN
	const [dropdownKecamatanCond, setDropdownKecamatanCond] = useState(false);
	const toggleDropdownKecamatan = () =>
		setDropdownKecamatanCond((prevState) => !prevState);

	// MODAL FILTER LOKASI
	const [ModalFilterLokasi, setModalFilterLokasi] = useState(false);
	const ToggleModalClustering = () => {
		setModalFilterLokasi((prevState) => !prevState);
		handleResetModalClustering();
	};

	// MODAL PILIH LOKASI
	const [rows, setRows] = useState([]);
	const [ModalPilihClustering, setModalPilihClustering] = useState(false);
	const ToggleModalPilihClustering = () => {
		setDataLokasiSelected([]);
		setIsSelectAll(false);
		setModalPilihClustering((prevState) => !prevState);
	};

	const handleResetModalClustering = () => {
		setRows([]);
		setIdProvince("");
		setIdKabKot("");
		setIdKec("");
		setTitleProvince("");
		setTitleKabKot("");
		setTitleKecamatan("");
	};

	// function displayModal() {
	// 	setUploadFile(0);
	// 	setTable("");
	// 	setModal((prevModal) => !prevModal);
	// }

	useEffect(() => {
		API.getProvinsi()
			.then((res) => {
				if (res.data.success) {
					setListProvince(res.data.data);
				} else {
					setListProvince([{ id: "1", name: "Tidak Ada Table" }]);
				}
			})
			.catch((err) => {
				setListProvince([{ id: "1", name: "Terjadi Kesalahan" }]);
			});

		const handleProps = () => {};
		handleProps();
		return () => {
			handleProps();
		};
	}, []);

	// DROPDOWN FILTER BERDASARKAN KABUPATEN KOTA
	useEffect(() => {
		setTitleKabKot("");
		setIdKabKot("");
		// setZoomLongLatKabKot("");
		if (idProvince) {
			API.getKabupatenKota(idProvince)
				.then((res) => {
					if (res.data.success) {
						setListKabKot(res.data.data);
					} else {
						setListKabKot([{ id: "1", name: "Tidak Ada Data" }]);
					}
				})
				.catch((err) => {
					setListKabKot([{ id: "1", name: "Terjadi Kesalahan" }]);
				});
		}

		const handleProps = () => {};
		handleProps();
		return () => {
			handleProps();
		};
	}, [titleProvince]);

	// DROPDOWN FILTER BERDASARKAN KECAMATAN
	useEffect(() => {
		setTitleKecamatan("");
		setIdKec("");
		// setZoomLongLatKecamatan("");
		if (idKabKot) {
			API.getKecamatan(idKabKot)
				.then((res) => {
					if (res.data.success) {
						setListKecamatan(res.data.data);
					} else {
						setListKecamatan([{ id: "1", name: "Tidak Ada Data" }]);
					}
				})
				.catch((err) => {
					setListKecamatan([{ id: "1", name: "Terjadi Kesalahan" }]);
				});
		}

		const handleProps = () => {};
		handleProps();
		return () => {
			handleProps();
		};
	}, [titleKabKot]);

	// const [listLongLat, setListLongLat] = useState([]);

	// const [dataClustering, setDataClustering] = useState([]);

	// Lokasi Clustering Dipilih
	const [dataLokasiSelected, setDataLokasiSelected] = useState([]);
	let checkLokasi = [];

	const checker = (e, it) => {
		if (e.target.checked) {
			let idxVar = checkLokasi.findIndex((e) => e.id === it.id);
			// checkLokasi.splice(idxVar, 1);
			if (idxVar < 0) {
				checkLokasi.push(it);
				setDataLokasiSelected(checkLokasi);
			}
		} else {
			// Cek di index keberapa data yg di uncheck
			let idxVar = checkLokasi.findIndex((e) => e.id === it.id);
			// hapus data di array sesuai dengan index
			checkLokasi.splice(idxVar, 1);
			setDataLokasiSelected(checkLokasi);
		}
	};

	const handleOk = () => {
		if (!idProvince) {
			return Swal.fire({
				position: "center",
				icon: "warning",
				title: "Provinsi Belum Dipilih",
				// text: "Terjadi Kesalahan",
				// showConfirmButton: false,
				// timer: 1500,
			});
		}
		// else if (!idKabKot) {
		// 	return Swal.fire({
		// 		position: "center",
		// 		icon: "warning",
		// 		title: "Kabupaten Belum Dipilih",
		// 		// text: "Terjadi Kesalahan",
		// 		// showConfirmButton: false,
		// 		// timer: 1500,
		// 	});
		// }
		else {
			const param =
				idProvince && !idKabKot && !idKec
					? `provinsi=${idProvince}`
					: idProvince && idKabKot && !idKec
					? `kabupaten=${idKabKot}`
					: `kecamatan=${idKec}`;
			// const tech = JSON.parse(localStorage.getItem("teknologi") || "[]") || "";
			const tipe = JSON.parse(localStorage.getItem("teknologi") || "[]") || "";
			var param_tipe = [];
			// "Sewa Jasa, Belanja Modal"
			// tech = [FO. RL, VSAT_GS_SEWA_JASA, VSAT_GS_BELANJA_MODAL]
			if (tipe.includes("VSAT_GS_BELANJA_MODAL")) {
				param_tipe.push("Belanja Modal");
				// add sewa jasa supaya semua jenis keluar
				param_tipe.push("Sewa Jasa");
			}
			if (
				tipe.includes("FO") ||
				tipe.includes("RL") ||
				tipe.includes("VSAT_GS_SEWA_JASA")
			) {
				param_tipe.push("Sewa Jasa");
				// add belanja modal supaya semua jenis keluar
				param_tipe.push("Belanja Modal");
			}
			if (tipe.includes("UNDEFINED")) {
				param_tipe.push("Sewa Jasa");
				param_tipe.push("Belanja Modal");
			}
			var param_tipe_unik = Array.from(new Set(param_tipe));
			// console.log(param_tipe_unik.toString(), "<<< param_tipe_unik")
			// console.log(param_tipe_unik.join(", "), "<<< param_tipe_unik join")

			API.GetClustering(param, param_tipe_unik.join(", "))
				.then((res) => {
					if (res.data.success) {
						console.log("res data dari get clustering", res.data);
						// setDataClustering(res.data.values);

						setRows(
							res.data.values.length !== 0 &&
								res.data.values.map((it, idx) => ({
									id: it?.id ?? "",
									unik_id: it?.unik_id ?? "",
									nama: it?.nama ?? "",
									provinsi: it?.provinsi ?? "",
									kecamatan: it?.kecamatan ?? "",
									kabupaten:
										it?.kabupaten === null
											? it?.kota ?? ""
											: it?.kabupaten ?? "",
									desa_kelurahan: it?.desa_kelurahan ?? "",
									act: [
										<input
											key={idx}
											type="checkbox"
											// value={{it}}
											// checked={}
											onClick={(e) => {
												checker(e, it);
											}}
										/>,
									],
									latitude: it?.latitude ?? "",
									longitude: it?.longitude ?? "",
									nama: it?.nama ?? "",
									tipe: it?.tipe_batch ?? "",
								}))
						);
						setTimeout(() => {
							ToggleModalPilihClustering();
						}, 500);
					} else {
						setRows([]);
						// setDataClustering([]);
					}
				})
				.catch((err) => {
					return Swal.fire({
						position: "center",
						icon: "error",
						title: "Data Tidak Ada",
						// text: "Data Tidak Ada",
						showConfirmButton: false,
						timer: 1500,
					});
				});
		}

		//////// ADD DATA FROM API TO TABLE ///////
		// const param = idKec ? `kecamatan=${idKec}` : `kabupaten=${idKabKot}`;
		// localStorage.setItem("sitesData", "[]");
		// API.GetClustering(param)
		// 	.then((res) => {
		// 		res.data.values.map((datum, index) => {
		// 			var sitesData = JSON.parse(localStorage.getItem("sitesData") || "[]");
		// 			// var sitesData = [];
		// 			const data = {
		// 				id: datum.id,
		// 				unikid: datum.unik_id,
		// 				location: datum.nama,
		// 				provinsi: datum.provinsi,
		// 				kecamatan: datum.kecamatan,
		// 				kabupatenKota: datum.kabupaten,
		// 				kelurahanDesa: datum.desa_kelurahan,
		// 				latitude: datum.latitude,
		// 				longitude: datum.longitude,
		// 			};
		// 			sitesData.push(data);
		// 			localStorage.setItem("sitesData", JSON.stringify(sitesData));
		// 		});
		// 		ToggleModalClustering();
		// 		props.resetTable();
		// 	})
		// 	.catch((e) => console.log(e));
		////////////
	};

	const handleAddClustering = () => {
		// const listLongLat = checkLokasi.map((e) => {});
		// if (dataLokasiSelected.length === 0) {
		// 	Swal.fire({
		// 		position: "center",
		// 		icon: "warning",
		// 		title: "Lokasi Belum Dipilih",
		// 		showConfirmButton: false,
		// 		timer: 1500,
		// 	});
		// }
		const listLongLat = dataLokasiSelected.map((e, index) => [
			e?.longitude,
			e?.latitude,
			e?.unik_id,
		]);
		API.getCheckNearOffAir({ coordinates: listLongLat })
			.then((stat) => {
				if (!stat.data.success) {
					return Swal.fire({
						position: "center",
						icon: "error",
						title: "ERROR",
						text: "Terjadi Kesalahan",
						showConfirmButton: false,
						timer: 1500,
					});
				}
				// if (stat.data.values.length !== 0) {
				// 	Swal.fire({
				// 		position: "center",
				// 		icon: "error",
				// 		title: "Lokasi Sudah Ada",
				// 		// text: `Unik ID Lokasi yang sudah ada: \n - ${res.data.values.toString()}`,
				// 		html:
				// 			`Terdapat ${stat.data.values.length} Unik ID lokasi yang sudah ada: </br>` +
				// 			`<h6>${stat.data.values.map((e) => {
				// 				return ` ${e}`;
				// 			})}</h6>`,
				// 		// showConfirmButton: false,
				// 		// timer: 1500,
				// 	});
				// } else {
				// localStorage.setItem("sitesData", "[]");
				dataLokasiSelected.map((datum, index) => {
					var sitesData = JSON.parse(localStorage.getItem("sitesData") || "[]");
					// console.log("datum dari dalam modal pilih clustering", datum);
					const data = {
						id: datum?.id,
						unikid: datum?.unik_id,
						nama: datum?.nama,
						location: datum?.nama,
						provinsi: datum?.provinsi,
						kecamatan: datum?.kecamatan,
						kabupatenKota:
							datum?.kabupaten === null ? datum?.kota : datum?.kabupaten,
						kelurahanDesa: datum?.desa_kelurahan,
						latitude: datum?.latitude,
						longitude: datum?.longitude,
						tipe_batch: datum?.tipe_batch,
					};
					sitesData.push(data);
					localStorage.setItem(
						"sitesData",
						JSON.stringify(_.uniqBy(sitesData, "id"))
					);
					// buat id cek vendor rekomendasi
					localStorage.setItem("idKabupaten", idKabKot);
					localStorage.setItem("idKecamatan", idKec);
					localStorage.setItem("typeInput", "cluster-input");
				});
				ToggleModalClustering();
				ToggleModalPilihClustering();
				props.resetTable();
				//get recommend after validate near offair
				dispatch(changeDataCluster(idProvince, idKabKot, idKec, false));
				// }
			})
			.catch((e) => console.log(e));
	};
	const dropdownProvince = () => {
		return (
			<ButtonDropdown
				style={{ minWidth: "100%" }}
				isOpen={dropdownProvinceCond}
				toggle={toggleDropdownProvince}
			>
				<DropdownToggle
					style={{
						backgroundColor: "#F8F9FA",
						borderRadius: "5px",
						borderColor: "#2C3280",
						paddingTop: "4px",
						paddingBottom: "4px",
					}}
				>
					<div
						style={{
							color: "#2C3280",
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
						}}
					>
						<span>{titleProvince === "" ? "Provinsi" : titleProvince}</span>
						<img src={iconDown} />
					</div>
				</DropdownToggle>
				<DropdownMenu
					style={{ maxHeight: "300px", minWidth: "100%", overflowY: "auto" }}
				>
					<DropdownItem
						onClick={() => {
							setTitleProvince("");
							setIdProvince("");
						}}
					>
						Provinsi
					</DropdownItem>
					{listProvince.length === 0 ? (
						<DropdownItem>Tidak Ada Data</DropdownItem>
					) : (
						listProvince.map((e, i) => (
							<DropdownItem
								key={i}
								onClick={() => {
									setTitleProvince(e.name);
									setIdProvince(e.id);
								}}
							>
								{e.name}
							</DropdownItem>
						))
					)}
				</DropdownMenu>
			</ButtonDropdown>
		);
	};

	const dropdownKabKot = () => {
		return (
			<ButtonDropdown
				style={{ minWidth: "100%" }}
				isOpen={dropdownKabKotCond}
				toggle={toggleDropdownKabKot}
				disabled={!idProvince}
			>
				<DropdownToggle
					style={{
						backgroundColor: "#F8F9FA",
						borderRadius: "5px",
						borderColor: "#2C3280",
						paddingTop: "4px",
						paddingBottom: "4px",
					}}
				>
					<div
						style={{
							color: "#2C3280",
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
						}}
					>
						<span>{titleKabKot === "" ? "Kabupaten/Kota" : titleKabKot}</span>
						<img src={iconDown} />
					</div>
				</DropdownToggle>
				<DropdownMenu
					style={{ maxHeight: "300px", minWidth: "100%", overflowY: "auto" }}
				>
					<DropdownItem
						onClick={() => {
							setTitleKabKot("");
							setIdKabKot("");
						}}
					>
						Kabupaten/Kota
					</DropdownItem>
					{listKabKot.length === 0 ? (
						<DropdownItem>Tidak Ada Data</DropdownItem>
					) : (
						listKabKot.map((e, i) => (
							<DropdownItem
								key={i}
								onClick={() => {
									setTitleKabKot(e.name);
									setIdKabKot(e.id);
									// setZoomLongLatKabKot(e.longlat.coordinates);
								}}
							>
								{e.name}
							</DropdownItem>
						))
					)}
				</DropdownMenu>
			</ButtonDropdown>
		);
	};

	const dropdownKecamatan = () => {
		return (
			<ButtonDropdown
				style={{ minWidth: "100%" }}
				isOpen={dropdownKecamatanCond}
				toggle={toggleDropdownKecamatan}
				disabled={!idKabKot}
			>
				<DropdownToggle
					style={{
						backgroundColor: "#F8F9FA",
						borderRadius: "5px",
						borderColor: "#2C3280",
						paddingTop: "4px",
						paddingBottom: "4px",
					}}
				>
					<div
						style={{
							color: "#2C3280",
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
						}}
					>
						<span>{titleKecamatan === "" ? "Kecamatan" : titleKecamatan}</span>
						<img src={iconDown} />
					</div>
				</DropdownToggle>
				<DropdownMenu
					style={{ maxHeight: "300px", minWidth: "100%", overflowY: "auto" }}
				>
					<DropdownItem
						onClick={() => {
							setTitleKecamatan("");
							setIdKec("");
							// setZoomLongLatKecamatan(e.longlat.coordinates);
						}}
					>
						Kecamatan
					</DropdownItem>
					{listKecamatan.kength === 0 ? (
						<DropdownItem>Tidak Ada Data</DropdownItem>
					) : (
						listKecamatan.map((e, i) => (
							<DropdownItem
								key={i}
								onClick={() => {
									setTitleKecamatan(e.name);
									setIdKec(e.id);
									// setZoomLongLatKecamatan(e.longlat.coordinates);
								}}
							>
								{e.name}
							</DropdownItem>
						))
					)}
				</DropdownMenu>
			</ButtonDropdown>
		);
	};

	const ModalClustering = () => {
		return (
			<MDBContainer>
				<MDBModal
					// id="modal-content-detail"
					isOpen={ModalFilterLokasi}
					toggle={ToggleModalClustering}
					size="lg"
					// className="modal-xl"
					centered={true}
				>
					<MDBCard>
						<MDBCardHeader>
							<MDBCardTitle className="text-center">CLUSTERING</MDBCardTitle>
						</MDBCardHeader>
						<MDBCardBody>
							<Row className="my-5">
								<Col>{dropdownProvince()}</Col>
								<Col>{dropdownKabKot()}</Col>
								<Col
									lg="1"
									className="d-flex align-items-center justify-content-center"
								>
									atau
								</Col>
								<Col>{dropdownKecamatan()}</Col>
							</Row>
							<div className="text-center my-5">
								<Row className="px-5">
									<Col style={{ display: "flex", justifyContent: "center" }}>
										<Button
											onClick={() => {
												// handleZoom(
												// 	zoomLongLatKecamatan
												// 		? zoomLongLatKecamatan
												// 		: zoomLongLatKabKot
												// );
												// setbuttonOK(true);
												handleOk();
											}}
											style={{ minWidth: "50%" }}
											className=" button-pilih-lokasi-ok"
										>
											<span style={{ color: "white" }}>OK</span>
										</Button>
									</Col>
									{/* <Col
										style={{ display: "flex", justifyContent: "flex-start" }}
									>
										<Button
											onClick={ToggleModalClustering}
											style={{ minWidth: "50%" }}
											className="button-pilih-lokasi-cancel"
										>
											<span style={{ color: "#073030" }}>Cancel</span>
										</Button>
									</Col> */}
								</Row>
							</div>
						</MDBCardBody>
					</MDBCard>
				</MDBModal>
			</MDBContainer>
		);
	};

	const dataTable = {
		columns: [
			{
				label: "Pilih",
				field: "act",
				sort: "disabled",
				width: 200,
			},
			{
				label: "KODE TITIK",
				field: "unik_id",
				sort: "asc",
				width: 200,
			},
			{
				label: "NAMA LOKASI",
				field: "nama",
				sort: "asc",
				width: 200,
			},
			// {
			// 	label: "PROVINSI",
			// 	field: "provinsi",
			// 	sort: "asc",
			// 	width: 200,
			// },
			// {
			// 	label: "KABUPATEN/KOTA",
			// 	field: "kabupaten",
			// 	sort: "asc",
			// 	width: 200,
			// },
			// {
			// 	label: "KECAMATAN",
			// 	field: "kecamatan",
			// 	sort: "asc",
			// 	width: 200,
			// },
			// {
			// 	label: "DESA",
			// 	field: "desa_kelurahan",
			// 	sort: "asc",
			// 	width: 200,
			// },
			// {
			// 	label: "Tipe",
			// 	field: "tipe",
			// 	sort: "asc",
			// 	width: 200,
			// },
		],
		rows: rows ?? [],
	};

	const [isSelectAll, setIsSelectAll] = useState(false);

	const handlePilihSemua = () => {
		setRows(
			rows.map((it, idx) => ({
				id: it?.id,
				unik_id: it?.unik_id,
				nama: it?.nama,
				provinsi: it?.provinsi,
				kecamatan: it?.kecamatan,
				kabupaten: it?.kabupaten,
				desa_kelurahan: it?.desa_kelurahan,
				act: [
					<input
						key={idx}
						type="checkbox"
						// value={{it}}
						defaultChecked={true}
						onClick={(e) => {
							checker(e, it);
						}}
					/>,
				],
				latitude: it?.latitude ?? "",
				longitude: it?.longitude ?? "",
				nama: it?.nama ?? "",
			}))
		);
		checkLokasi = rows;
		setDataLokasiSelected(rows);
		setIsSelectAll(true);
	};
	const handleHapusPilihSemua = () => {
		setRows(
			rows.map((it, idx) => ({
				id: it.id,
				unik_id: it.unik_id,
				nama: it.nama,
				provinsi: it.provinsi,
				kecamatan: it.kecamatan,
				kabupaten: it.kabupaten,
				desa_kelurahan: it.desa_kelurahan,
				act: [
					<input
						key={idx}
						type="checkbox"
						// value={{it}}
						defaultChecked={false}
						onClick={(e) => {
							checker(e, it);
						}}
					/>,
				],
				latitude: it.latitude ?? "",
				longitude: it.longitude ?? "",
				nama: it.nama ?? "",
			}))
		);
		checkLokasi = [];
		setDataLokasiSelected([]);
		setIsSelectAll(false);
	};

	const ModalPilihTitikClustering = () => {
		return (
			<MDBContainer>
				<MDBModal
					// id="modal-content-detail"
					isOpen={ModalPilihClustering}
					toggle={ToggleModalPilihClustering}
					// size="lg"
					className="modal-xl"
					centered={true}
				>
					<MDBCard>
						<MDBCardHeader>
							<MDBCardTitle className="text-center">PILIH LOKASI</MDBCardTitle>
						</MDBCardHeader>
						<MDBCardBody>
							{rows.length === 0 ? (
								<div>
									<h1>
										<Skeleton />
									</h1>
									<Skeleton count={10} />
								</div>
							) : (
								<>
									<div
										style={{
											// marginBottom: "-25px",
											marginLeft: "20px",
											// zIndex: 10,
										}}
									>
										{/* <Input type="checkbox" /> */}
										<Button
											onClick={
												!isSelectAll ? handlePilihSemua : handleHapusPilihSemua
											}
											style={{ borderRadius: "15px", padding: "2px" }}
										>
											{!isSelectAll ? "Select All" : "Unselect All"}
										</Button>
									</div>
									<div style={{ maxHeight: "70vh", overflowY: "auto" }}>
										<MDBDataTable
											className="text-center align-middle font-size-12"
											responsive
											striped
											bordered
											searching={true}
											displayEntries={false}
											// info={false}
											entries={8} //How much data that you want to show in 1 table
											disableRetreatAfterSorting //Show red Warning after use
											data={dataTable}
											paging={false}
										/>
									</div>
								</>
							)}
						</MDBCardBody>
						<div className="text-center my-1">
							<Row className="px-5">
								<Col style={{ display: "flex", justifyContent: "flex-end" }}>
									<Button
										onClick={() => {
											if (dataLokasiSelected.length === 0) {
												ToggleModalPilihClustering();
												ToggleModalClustering();
											} else {
												handleAddClustering();
											}
										}}
										style={{ minWidth: "50%" }}
										className=" button-pilih-lokasi-ok"
									>
										<span style={{ color: "white" }}>OK</span>
									</Button>
								</Col>
								<Col style={{ display: "flex", justifyContent: "flex-start" }}>
									<Button
										onClick={() => {
											if (dataLokasiSelected.length === 0) {
												ToggleModalPilihClustering();
												ToggleModalClustering();
											} else {
												ToggleModalPilihClustering();
											}
										}}
										style={{ minWidth: "50%" }}
										className="button-pilih-lokasi-cancel"
									>
										<span style={{ color: "#073030" }}>Cancel</span>
									</Button>
								</Col>
							</Row>
						</div>
					</MDBCard>
				</MDBModal>
			</MDBContainer>
		);
	};

	return (
		<>
			<Button
				className={styles.buttonStyle}
				onClick={ToggleModalClustering}
				disabled={
					typeInput === ""
						? false
						: typeInput === "cluster-input"
						? false
						: true
				}
			>
				Clustering
			</Button>
			{ModalClustering()}
			{ModalPilihTitikClustering()}
		</>
	);
}
export default UploadSites;
