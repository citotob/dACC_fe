import React, { useEffect, useState, useContext, useRef } from "react";
// import { useHistory } from "react-router-dom";
import { MDBDataTable, MDBNavLink, MDBModalHeader } from "mdbreact";
import { Card, CardBody, Button, Modal, ModalBody, Collapse } from "reactstrap";
import Skeleton from "react-loading-skeleton";
import "./datatables.scss";
import moment from "moment";
// import ModalUpdateNilai from "../Modal/updateNilai";
// import IconGreenCheckList from "../../../../../assets/images/IconGreenChecklist.svg";
import ModalSuccess from "../../../../Modal/ModalSuccess";

import { exportPDF } from "../Download/PDF/DownloadPDF";
import DownloadXLS from "../Download/XLS/DownloadXLS";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
// import API from "../../../../../services";
import { useHistory } from "react-router-dom";
// import Swal from "sweetalert2";

// CONTEXT
import { LocalContext } from "../../LocalContext";
import { flyToPoint } from "../../Map/maphelper";

// import SweetAlert from "react-bootstrap-sweetalert";

import style from "../../style.module.css";
import "./style.css";

import Filter from "./Filter";

// REDUX

import { useSelector } from "react-redux";

const TableExploreData = (props) => {
	const { mapRef, dataTitik, filterTable, fnCollapse } = useContext(
		LocalContext
	);
	const [rows, setRows] = useState([]);
	const [dataDownload, setDataDownload] = useState([]);
	// const [dataDownloadXLS, setDataDownloadXLS] = useState([]);
	const [searchValue, setSearchValue] = useState("");
	const history = useHistory();

	// REDUX SELECTOR
	const dataReduxTeknologi = useSelector(
		(state) => state.dataReducer.dataTeknologi.data
	);

	const searchRef = useRef();

	const [modalSuccess, setModalSuccess] = useState(false);
	const [modalDownloadPDF, setModalDownloadPDF] = useState(false);
	const [modalDownloadXLS, setModalDownloadXLS] = useState(false);

	const [collapseTable, setcollapseTable] = useState(false);

	// console.log("filter", filterTable);

	const toggleCollapseTable = () => {
		setcollapseTable(!collapseTable);
	};

	const toggleDownloadPDF = () => {
		setModalDownloadPDF(!modalDownloadPDF);
		setDataDownload(items);
	};

	const toggleDownloadXLS = () => {
		setModalDownloadXLS(!modalDownloadXLS);
		setDataDownload(items);
	};

	const toggleDownloadSuccess = () => {
		setModalSuccess(!modalSuccess);
	};

	//handle download pdf
	const handleDownloadPDF = () => {
		setModalDownloadPDF(!modalDownloadPDF);
		exportPDF(dataDownload);
	};

	const handleClick = (param) => {
		flyToPoint(mapRef, param);
	};

	//set search data based on input value
	const handleSearch = () => {
		const search = searchRef.current.value;
		setSearchValue(search);
	};

	const [loading, setLoading] = useState(true);
	// const toggleRefresh = () => setRefresh(!refresh);

	// 16 April
	useEffect(() => {
		// toggleRefresh();
		setLoading(true);
		// if (rows.length === 0) {
		// fetchDataTable();
		// setRows()
		if (dataTitik) {
			if (dataTitik.length !== 0) {
				if (filterTable) {
					if (filterTable.type === "kab") {
						setRows(
							dataTitik
								.filter((filt) => filt.kabupaten_name === filterTable.lokasi)
								.map((it) => ({
									kt: it.kode_titik ?? "-",
									nm: it.nama ?? "-",
									stat: it.teknologi ?? "-",
									penyedia: it.vendor_name ?? "-",
									prov: it.provinsi_name ?? "-",
									kab: it.kabupaten_name ?? "-",
									kec: it.kecamatan_name ?? "-",
									desa: it.desa_kelurahan_name ?? "-",
									long: it.longitude ?? "-",
									lat: it.latitude ?? "-",
								}))
						);
					} else {
						setRows(
							dataTitik
								.filter((filt) => filt.kecamatan_name === filterTable.lokasi)
								.map((it) => ({
									kt: it.kode_titik ?? "-",
									nm: it.nama ?? "-",
									stat: it.teknologi ?? "-",
									penyedia: it.vendor_name ?? "-",
									prov: it.provinsi_name ?? "-",
									kab: it.kabupaten_name ?? "-",
									kec: it.kecamatan_name ?? "-",
									desa: it.desa_kelurahan_name ?? "-",
									long: it.longitude ?? "-",
									lat: it.latitude ?? "-",
								}))
						);
					}
				} else {
					setRows(
						dataTitik.map((it) => ({
							kt: it.kode_titik ?? "-",
							nm: it.nama ?? "-",
							stat: it.teknologi ?? "-",
							penyedia: it.vendor_name ?? "-",
							prov: it.provinsi_name ?? "-",
							kab: it.kabupaten_name ?? "-",
							kec: it.kecamatan_name ?? "-",
							desa: it.desa_kelurahan_name ?? "-",
							long: it.longitude ?? "-",
							lat: it.latitude ?? "-",
						}))
					);
				}
			} else {
				setRows([]);
			}
		} else {
			setRows([
				{
					kt: "Terjadi Kesalahan",
					nm: "",
					stat: "",
					penyedia: "",
					prov: "",
					kab: "",
					kec: "",
					desa: "",
					long: "",
					lat: "",
				},
			]);
		}
		// }
		// eslint-disable-next-line react-hooks/exhaustive-deps
		setTimeout(() => {
			setLoading(false);
		}, 500);
	}, [dataTitik, filterTable]);

	// FILTER TABLE
	useEffect(() => {
		// toggleRefresh();
		setLoading(true);
		// if (rows.length === 0) {
		// fetchDataTable();
		// setRows()
		if (dataTitik) {
			if (dataTitik.length !== 0) {
				if (dataReduxTeknologi !== "empty") {
					setRows(
						dataTitik
							.filter((filt) => filt.teknologi === dataReduxTeknologi)
							.map((it) => ({
								kt: it.kode_titik ?? "-",
								nm: it.nama ?? "-",
								stat: it.teknologi ?? "-",
								penyedia: it.vendor_name ?? "-",
								prov: it.provinsi_name ?? "-",
								kab: it.kabupaten_name ?? "-",
								kec: it.kecamatan_name ?? "-",
								desa: it.desa_kelurahan_name ?? "-",
								long: it.longitude ?? "-",
								lat: it.latitude ?? "-",
							}))
					);
				} else {
					setRows(
						dataTitik.map((it) => ({
							kt: it.kode_titik ?? "-",
							nm: it.nama ?? "-",
							stat: it.teknologi ?? "-",
							penyedia: it.vendor_name ?? "-",
							prov: it.provinsi_name ?? "-",
							kab: it.kabupaten_name ?? "-",
							kec: it.kecamatan_name ?? "-",
							desa: it.desa_kelurahan_name ?? "-",
							long: it.longitude ?? "-",
							lat: it.latitude ?? "-",
						}))
					);
				}
			} else {
				setRows([]);
			}
		} else {
			setRows([
				{
					kt: "Terjadi Kesalahan",
					nm: "",
					stat: "",
					penyedia: "",
					prov: "",
					kab: "",
					kec: "",
					desa: "",
					long: "",
					lat: "",
				},
			]);
		}
		// }
		// eslint-disable-next-line react-hooks/exhaustive-deps
		setTimeout(() => {
			setLoading(false);
		}, 500);
	}, [dataReduxTeknologi]);

	// Old Version
	// useEffect(() => {
	// 	if (rows.length === 0) {
	// 		// fetchDataTable();
	// 		// setRows()
	// 		if (dataTitik) {
	// 			setRows(
	// 				dataTitik.map((it) => ({
	// 					kt: it.kode_titik ?? "-",
	// 					nm: it.nama ?? "-",
	// 					stat: it.teknologi ?? "-",
	// 					penyedia: it.vendor_name ?? "-",
	// 					prov: it.provinsi_name ?? "-",
	// 					kab: it.kabupaten_name ?? "-",
	// 					kec: it.kecamatan_name ?? "-",
	// 					desa: it.desa_kelurahan_name ?? "-",
	// 					long: it.longitude ?? "-",
	// 					lat: it.latitude ?? "-",
	// 				}))
	// 			);
	// 		} else {
	// 			setRows([
	// 				{
	// 					kt: "Terjadi Kesalahan",
	// 					nm: "",
	// 					stat: "",
	// 					penyedia: "",
	// 					prov: "",
	// 					kab: "",
	// 					kec: "",
	// 					desa: "",
	// 					long: "",
	// 					lat: "",
	// 				},
	// 			]);
	// 		}
	// 	}
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [rows]);

	var items = [];
	// if (rows.length > 0) {
	// 	items = rows.filter((data) => {
	// 		if (searchValue === "") return data;
	// 		const index =
	// 			data.kt +
	// 			data.nm +
	// 			data.stat +
	// 			data.penyedia +
	// 			data.prov +
	// 			data.kab +
	// 			data.kec +
	// 			data.desa +
	// 			data.long +
	// 			data.lat;
	// 		return index.toLowerCase().includes(searchValue.toLowerCase());
	// 	});
	// }
	// var items = [];
	if (rows.length > 0) {
		items = rows.filter((data) => {
			if (searchValue === "") return data;
			const index = [
				data.kt,
				data.nm,
				data.stat,
				data.penyedia,
				data.prov,
				data.kab,
				data.kec,
				data.desa,
				data.long,
				data.lat,
			];
			if (
				Filter.byIndex({
					index: index,
					search: searchValue,
				})
			) {
				return data;
			}
		});
	}

	// useEffect(() => {
	// 	filterData(items);
	// }, [props.reset, searchValue, rows]);

	const data = {
		columns: [
			// {
			// 	label: "Kode Titik",
			// 	field: "kode_titik",
			// 	sort: "disabled",
			// 	width: 200,
			// },
			{
				label: "Nama Lokasi",
				field: "nama_lokasi",
				sort: "disabled",
				width: 200,
			},
			{
				label: "Penyedia",
				field: "penyedia",
				sort: "disabled",
				width: 200,
			},
			{
				label: "Teknologi",
				field: "status",
				sort: "disabled",
				width: 200,
			},
			{
				label: "Provinsi",
				field: "provinsi",
				sort: "disabled",
				width: 200,
			},
			{
				label: "Kab/Kota",
				field: "kab_kot",
				sort: "disabled",
				width: 200,
			},
			{
				label: "Kecamatan",
				field: "kec",
				sort: "disabled",
				width: 200,
			},
			{
				label: "Desa",
				field: "desa",
				sort: "disabled",
				width: 200,
			},
			{
				label: "Longitude",
				field: "long",
				sort: "disabled",
				width: 200,
			},
			{
				label: "Latitude",
				field: "lat",
				sort: "disabled",
				width: 200,
			},
		],
		rows: items.map((d) => ({
			kode_titik: d?.kt,
			nama_lokasi: d?.nm,
			status: d?.stat,
			penyedia: d?.penyedia,
			provinsi: d?.prov,
			kab_kot: d?.kab,
			kec: d?.kec,
			desa: d?.desa,
			long: d?.long,
			lat: d?.lat,
			clickEvent: (e) => handleClick([d.long, d.lat]),
		})),
	};

	// const done = () => {
	// 	setModalSuccess(true);
	// 	setTimeout(() => {
	// 		setModalSuccess(false);
	// 		history.go(1);
	// 	}, 100);
	// };
	// console.log("itemsss", items);

	return (
		<div className={style.cardTable}>
			<Card
				style={{
					boxShadow: "0px 0px 10px #D3D3D3",
					// paddingBottom: "30px",
					// paddingTop: "20px",
					maxHeight: "38vh",
					// marginTop: 0,
					// marginBottom: 0,
					paddingTop: 0,
					paddingBottom: 0,
				}}
			>
				<div
					onClick={toggleCollapseTable}
					style={{
						display: "flex",
						justifyContent: "flex-end",
						alignItems: "center",
						cursor: "pointer",
						fontSize: "15px",
					}}
				>
					<span
						className="mr-2"
						style={{ fontSize: "12px", fontWeight: "bold" }}
					>
						{!collapseTable ? "Show Table" : ""}
					</span>
					<i
						className={`mdi ${
							!collapseTable
								? "mdi-arrow-up-bold-box"
								: "mdi-arrow-down-bold-box-outline"
						}`}
					/>
				</div>
				<CardBody
					className="p-1"
					style={{ maxHeight: "100%", overflowY: "auto" }}
				>
					<Collapse isOpen={collapseTable}>
						{/* <SweetAlert
						timeout={2}
						title="Data Berhasil di Unduh"
						showConfirm={false}
						onConfirm={handleDownloadPDF}>
						<img src={IconGreenCheckList}></img>
					</SweetAlert>  */}
						{loading ? (
							<div>
								<h1>
									<Skeleton />
								</h1>
								<Skeleton count={10} />
							</div>
						) : (
							<>
								{/* <ModalSuccess
								modalSuccess={modalSuccess}
								toggleSuccess={() => toggleSuccess()}
								doneSucces={done}
							/> */}
								<>
									<Modal
										size="md"
										isOpen={modalDownloadXLS}
										toggle={toggleDownloadXLS}
										centered={true}
									>
										<MDBModalHeader toggle={toggleDownloadXLS}>
											<span className={style.headText}>Download XLS</span>
										</MDBModalHeader>
										<ModalBody>
											<center className="container-popup">
												<div className={style.text}>
													Anda Yakin Untuk Download XLS?
												</div>
												<Button
													color=""
													className={style.btn_reject}
													onClick={toggleDownloadXLS}
												>
													Batal
												</Button>
												<Button
													color=""
													className={style.btn_confirm_xls}
													onClick={() => {
														toggleDownloadXLS(true);
														toggleDownloadSuccess(false);
														setTimeout(() => {
															toggleDownloadSuccess(true);
														}, 1000);
													}}
												>
													<ReactHTMLTableToExcel
														id="TableXLS"
														className="DownloadTableXLSSMADMIN"
														table="DownloadTableXLS"
														filename={`Data_Akses_Internet_${moment(Date())
															.format("DDMMYYYY")
															.toString()}`}
														sheet="dataAdmin"
														buttonText="Download"
													/>
													{/* toggleDownloadXLS */}
												</Button>
											</center>
										</ModalBody>
									</Modal>
									<Modal
										size="md"
										isOpen={modalDownloadPDF}
										toggle={toggleDownloadPDF}
										centered={true}
									>
										<MDBModalHeader toggle={toggleDownloadPDF}>
											<span className={style.headText}>Download PDF</span>
										</MDBModalHeader>
										<ModalBody>
											<center className="container-popup">
												<div className={style.text}>
													Anda Yakin Untuk Download PDF?
												</div>
												<Button
													color=""
													className={style.btn_reject}
													onClick={toggleDownloadPDF}
												>
													Batal
												</Button>
												<Button
													color=""
													className={style.btn_confirm}
													onClick={() => {
														handleDownloadPDF(true);
														toggleDownloadSuccess(false);
														setTimeout(() => {
															toggleDownloadSuccess(true);
														}, 1000);
													}}
												>
													Download
													{/* handleDownloadPDF */}
												</Button>
											</center>
										</ModalBody>
									</Modal>
									<ModalSuccess
										modalSuccess={modalSuccess}
										toggleSuccess={() => toggleDownloadSuccess()}
										// doneSucces={done}
									/>
									<div
										style={{
											display: "flex",
											width: "100%",
											justifyContent: "flex-start",
										}}
									>
										<MDBNavLink to="#" className="textDownload">
											Download
										</MDBNavLink>
										<MDBNavLink onClick={toggleDownloadXLS} link to="#">
											XLS
										</MDBNavLink>
										<MDBNavLink onClick={toggleDownloadPDF} link to="#">
											PDF
										</MDBNavLink>
									</div>
									<DownloadXLS
										id="DownloadTableXLS"
										className="DownloadTableXLS"
										data={dataDownload}
									/>
								</>
								{/* <div>
									Menampilkan{" "}
									{dataReduxTeknologi === "empty"
										? "Semua"
										: dataReduxTeknologi}{" "}
									Teknologi
								</div> */}

								<div className="d-flex ml-auto w-25 my-3 mr-3">
									<input
										placeholder="Cari..."
										ref={searchRef}
										className="form-control"
										onChange={handleSearch}
										type="text"
										// defaultValue={filterTable}
										style={{ marginTop: "-50px" }}
									/>
								</div>
								<div
									style={{
										maxHeight: "100%",
										maxWidth: "100%",
										// overflowY: "auto",
										marginTop: "-25px",
										paddingRight: "0px",
									}}
								>
									<MDBDataTable
										className="text-center TableExploreData mx-2"
										responsive
										bordered
										searching={false}
										displayEntries={false}
										// info={false}
										// noBottomColumns={true}
										// paging={false}
										entries={20} //How much data that you want to show in 1 table
										// disableRetreatAfterSorting //Show red Warning after use
										data={data}
										hover={true}
										theadColor={"grey"}
										// scrollX
										// scrollY
										// maxHeight="400px"
										// onSearch={(e) => {
										// 	setSearchValue(e);
										// }}
									/>
								</div>
							</>
						)}
					</Collapse>
				</CardBody>
			</Card>
		</div>
	);
};

export default TableExploreData;
