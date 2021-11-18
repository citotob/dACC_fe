import React, {
	useEffect,
	useState,
	useContext,
	useMemo,
	useCallback,
} from "react";
// import { useHistory } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import { Button, FormGroup, Input, Spinner, Row, Col } from "reactstrap";
// import Skeleton from "react-loading-skeleton";
import "./datatables.scss";
// import { useSelector, useDispatch } from "react-redux";
import Skeleton from "react-loading-skeleton";
import styles from "./style.module.css";
import ModalPenawaranSMV from "../Modal/ModalPenawaran";
import ModalGanttChart from "../Modal/ModalGanttChart";
import API from "../../../../services";
import { useParams } from "react-router-dom";
// import { LocalContext } from "../LocalContext";
// import { check } from "prettier";
// import {
// 	getArrCheckedPenawaran,
// 	getCheckedPenawaran,
// 	getUnCheckedPenawaran,
// } from "../../../../store/actions";
import _ from "lodash";
import XLSX from "xlsx";
import moment from "moment";

const SMVTablePenawaran = ({ setTblePenawaran }) => {
	// const { siteList } = useContext(LocalContext);
	// let dispatch = useDispatch();

	// const dataReduxCheckedPenawaran = useSelector(
	// 	(state) => state.dataReducer.checkedPenawaran.data
	// );
	const [check, setCheck] = useState([]);

	const checker = useCallback(
		async (e, i) => {
			let tempCheck = check;
			if (e.target.checked) {
				tempCheck.push(i);
				window.localStorage.setItem("tempCheck", JSON.stringify(tempCheck));
			} else {
				let index = tempCheck.findIndex((x) => x.id === i.id);
				tempCheck.splice(index, 1);
				window.localStorage.setItem("tempCheck", JSON.stringify(tempCheck));
			}
		},
		[check]
	);

	useEffect(() => {
		window.localStorage.setItem("tempCheck", JSON.stringify([]));
	}, []);

	// useEffect(() => {
	// 	let dataSite = sitesData.map((data) => {
	// 		return { ...data };
	// 	});
	// 	setSiteListA(dataSite);
	// }, []);

	let { id, judul } = useParams();
	const [modalPenawaran, setModalPenawaran] = useState(false);
	const [dataPenawaran, setDataPenawaran] = useState({});
	const [rows, setRows] = useState([]);
	const [dataBatch, setDataBatch] = useState({});
	const [modalGanttChart, setModalGanttChart] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	let togglePenawaran = (i) => {
		setDataPenawaran(i);
		setModalPenawaran(!modalPenawaran);
	};
	let toggleGanttChart = () => {
		setModalGanttChart(!modalGanttChart);
	};
	let resetTable = () => {
		// refreshJon()
	};
	//Create Data for Row
	function createData(kt, loc, prov, kk, kec, des, lng, lat, act) {
		// return { kt, loc, prov, kk, kec, des, lng, lat, act };
		return { kt, loc, prov, kk, kec, des, lng, lat, act };
	}
	const role = window.localStorage.getItem("companyId");
	const batch_id = window.localStorage.getItem("batch_id");
	async function fetchDataTable() {
		setIsLoading(true);
		await API.postVendorSM({
			penyedia: role,
			batch: batch_id,
		})
			.then((res) => {
				setIsLoading(false);
				let indexData = res.data.values.findIndex(
					(dataPenawaran) => dataPenawaran.id === id
				);
				if (
					res.data.values[indexData].judul.toLowerCase() ===
						// judul.replaceAll("%20", " ").replaceAll("%24", "/").toLowerCase() &&
						decodeURIComponent(judul).toLowerCase() &&
					res.data.values[indexData].id === id
				) {
					if (res.data.values.length === 0) {
						setRows([
							{
								kt: "Tidak ada data",
								loc: "",
								prov: "",
								kk: "",
								kec: "",
								des: "",
								lng: "",
								lat: "",
								act: "",
							},
						]);
					} else {
						let rowsData = [];
						let dats = res.data.values.filter((dataPenawaran) => {
							return dataPenawaran.id === id;
						});
						setDataBatch(dats[0]);
						console.log("dats", dats);

						for (let i of dats[0].sites) {
							var sitesData = JSON.parse(
								localStorage.getItem("sitesData") || "[]"
							);
							let act = "";
							act = sitesData.some((x) => x?.siteid === i?.siteid?.id)
								? [
										<Button
											className={styles.buttonEditSMVPenawaran}
											key={i.id}
											onClick={() => togglePenawaran(i, false)}
										>
											Edit
										</Button>,
								  ]
								: [
										<Button
											className={styles.buttonSummarySMVPenawaran}
											key={i?.id}
											disabled
										>
											Penawaran
										</Button>,
								  ];
							rowsData.push(
								createData(
									i?.siteid?.unik_id,
									i?.siteid?.nama,
									i?.siteid?.provinsi_name,
									i?.siteid?.kabupaten_name,
									i?.siteid?.kecamatan_name,
									i?.siteid?.desa_kelurahan_name,
									i?.siteid?.longitude,
									i?.siteid?.latitude,
									act
								)
							);
						}
						setRows(rowsData);
					}
				} else {
					setRows([
						{
							kt: "Tidak ada data",
							loc: "",
							prov: "",
							kk: "",
							kec: "",
							des: "",
							lng: "",
							lat: "",
							act: "",
						},
					]);
				}
			})
			.catch((err) => {
				setIsLoading(false);
				setRows([
					{
						kt: "Terjadi Kesalahan",
						loc: "",
						prov: "",
						kk: "",
						kec: "",
						des: "",
						lng: "",
						lat: "",
						act: "",
					},
				]);
			});
	}

	useEffect(() => {
		setTblePenawaran(rows.length);
	}, [rows]);

	let [refresh, setRefresh] = useState(false);
	let checkFunction = () => {
		setRefresh(!refresh);
	};

	useEffect(() => {
		let tempCheck = window.localStorage.getItem("tempCheck");
		fetchDataTable(tempCheck);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [batch_id]);

	const data = {
		columns: [
			// {
			// 	label: "Kode Titik",
			// 	field: "kt",
			// 	sort: "asc",
			// 	width: 200,
			// },
			{
				label: "Nama Lokasi",
				field: "loc",
				sort: "asc",
				width: 200,
			},
			{
				label: "Provinsi",
				field: "prov",
				sort: "asc",
				width: 200,
			},
			{
				label: "Kabupaten/Kota",
				field: "kk",
				sort: "disabled",
				width: 200,
			},
			{
				label: "Kecamatan",
				field: "kec",
				sort: "asc",
				width: 200,
			},
			{
				label: "Desa",
				field: "des",
				sort: "asc",
				width: 200,
			},
			// {
			// 	label: "Longitude",
			// 	field: "lng",
			// 	sort: "asc",
			// 	width: 200,
			// },
			// {
			// 	label: "Latitude",
			// 	field: "lat",
			// 	sort: "asc",
			// 	width: 200,
			// },
			{
				label: "",
				field: "act",
				sort: "disabled",
				width: 200,
			},
		],
		rows: rows ?? [],
	};

	// update c3budiman
	const vendorid = window.localStorage.getItem("companyId");
	const userId = window.localStorage.getItem("userId");

	function refreshJon() {
		let rowsData = [];
		for (let i of dataBatch.sites) {
			var sitesData = JSON.parse(localStorage.getItem("tempXcl") || "[]");
			let act = "";

			act = sitesData.some((x) => x.siteid === i.siteid.id)
				? [
						<Button
							className={styles.buttonEditSMVPenawaran}
							key={i.id}
							onClick={() => togglePenawaran(i, false)}
						>
							Edit
						</Button>,
				  ]
				: [
						<Button
							className={styles.buttonSummarySMVPenawaran}
							key={i.id}
							disabled
						>
							Penawaran
						</Button>,
				  ];
			rowsData.push(
				createData(
					i?.siteid?.unik_id,
					i?.siteid?.nama,
					i?.siteid?.provinsi_name,
					i?.siteid?.kabupaten_name,
					i?.siteid?.kecamatan_name,
					i?.siteid?.desa_kelurahan_name,
					i?.siteid?.longitude,
					i?.siteid?.latitude,
					act
				)
			);
		}
		// console.log('rowdata', rowsData);
		setRows(rowsData);
	}

	function ExcelDateToJSDate(serial) {
		var utc_days = Math.floor(serial - 25569);
		var utc_value = utc_days * 86400;
		var date_info = new Date(utc_value * 1000);

		var fractional_day = serial - Math.floor(serial) + 0.0000001;

		var total_seconds = Math.floor(86400 * fractional_day);

		var seconds = total_seconds % 60;

		total_seconds -= seconds;

		var hours = Math.floor(total_seconds / (60 * 60));
		var minutes = Math.floor(total_seconds / 60) % 60;

		// return date_info.getFullYear() + "-" + date_info.getMonth() + "-" + date_info.getDate();
		var date = new Date(
			date_info.getFullYear(),
			date_info.getMonth(),
			date_info.getDate(),
			hours,
			minutes,
			seconds
		);
		return moment(date).format("DD/MM/YYYY");
	}

	function ExcelDateToJSDateNoMoment(serial) {
		var utc_days = Math.floor(serial - 25569);
		var utc_value = utc_days * 86400;
		var date_info = new Date(utc_value * 1000);

		var fractional_day = serial - Math.floor(serial) + 0.0000001;

		var total_seconds = Math.floor(86400 * fractional_day);

		var seconds = total_seconds % 60;

		total_seconds -= seconds;

		var hours = Math.floor(total_seconds / (60 * 60));
		var minutes = Math.floor(total_seconds / 60) % 60;

		// return date_info.getFullYear() + "-" + date_info.getMonth() + "-" + date_info.getDate();
		var date = new Date(
			date_info.getFullYear(),
			date_info.getMonth(),
			date_info.getDate(),
			hours,
			minutes,
			seconds
		);
		return moment(date).format("YYYY-MM-DD");
	}

	// update uploadFile
	const [uploadFile, setUploadFile] = useState(0);
	const [fileName, setfileName] = useState("");
	// update data
	const [dataXcl, setDataXcl] = useState(null);

	const onChangeFileUpload = (e) => {
		setUploadFile(1);
		setfileName(e.target.files[0].name);
		var reader = new FileReader();

		reader.onload = function (e) {
			var data = new Uint8Array(e.target.result);
			var workbook = XLSX.read(data, { type: "array" });
			var first_worksheet = workbook.Sheets[workbook.SheetNames[3]];
			var dataxcl = XLSX.utils.sheet_to_json(first_worksheet, { header: 1 });
			setUploadFile(2);
			setDataXcl(dataxcl);
			// console.log("excel data", dataxcl);
			// console.log("data batch", dataBatch);
			let sitesDataWow = [];

			dataxcl.forEach((element) => {
				// console.log("element dari excel data nih", element[2]);
				let databruh = dataBatch.sites
					.filter((i) => i.siteid.unik_id == element[2])
					.shift();
				// console.log("oiii >", databruh);
				// console.log("element", element);
				if (typeof databruh != "undefined") {
					if (element[1].toLowerCase() == "yes") {
						// console.log("masuk")
						// if (typeof element[9] == "undefined") {
						// 	alert("teknologi tidak boleh kosong");
						// 	return;
						// }
						// if (typeof element[10] == "undefined") {
						// 	alert("tanggal awal penawaran tidak boleh kosong");
						// 	return;
						// }
						// if (typeof element[11] == "undefined") {
						// 	alert("tanggal akhir penawaran tidak boleh kosong");
						// 	return;
						// }
						// if (
						// 	typeof element[12] == "undefined" ||
						// 	element[12] == 0 ||
						// 	element[12] == null
						// ) {
						// 	alert("harap menghubungi pihak Admin untuk mengupdate catalog");
						// 	return;
						// }
						// if (
						// 	typeof element[13] == "undefined" ||
						// 	element[13] == 0 ||
						// 	element[13] == null
						// ) {
						// 	alert("harap menghubungi pihak Admin untuk mengupdate catalog");
						// 	return;
						// }
						// if (
						// 	typeof element[14] == "undefined" ||
						// 	element[14] == 0 ||
						// 	element[14] == null
						// ) {
						// 	alert("harap menghubungi pihak Admin untuk mengupdate catalog");
						// 	return;
						// }
						// if (
						// 	typeof element[15] == "undefined" ||
						// 	element[15] == 0 ||
						// 	element[15] == null
						// ) {
						// 	alert("silahkan lengkapi team");
						// 	return;
						// }
						// if (typeof element[1] == "undefined") {
						// 	alert("pilih site tidak boleh kosong");
						// 	return;
						// }

						// sitesDataWow.push({
						// 	batchname: dataBatch["judul"],
						// 	batchid: dataBatch["id"],
						// 	vendorid: vendorid,
						// 	siteid: databruh["siteid"]["id"],
						// 	sitenama: databruh["siteid"]["nama"],
						// 	siteunikid: databruh["siteid"]["unik_id"],
						// 	unik_id: databruh["siteid"]["unik_id"],
						// 	teknologi: element[9].toUpperCase(),
						// 	harga_perangkat: element[12],
						// 	harga_instalasi: element[13],
						// 	harga_om: element[14],
						// 	tanggal_awal_penawaran: ExcelDateToJSDateNoMoment(element[10]),
						// 	tanggal_akhir_penawaran: ExcelDateToJSDateNoMoment(element[11]),
						// 	tanggal_mulai_material_w: ExcelDateToJSDate(element[10]),
						// 	tanggal_selesai_installation: ExcelDateToJSDate(element[11]),
						// 	userfrom: userId,
						// 	team: element[15],
						// });

						if (typeof element[7] == "undefined") {
							alert("teknologi tidak boleh kosong");
							return;
						}
						if (typeof element[8] == "undefined") {
							alert("tanggal awal penawaran tidak boleh kosong");
							return;
						}
						if (typeof element[9] == "undefined") {
							alert("tanggal akhir penawaran tidak boleh kosong");
							return;
						}
						if (
							typeof element[10] == "undefined" ||
							element[10] == 0 ||
							element[10] == null
						) {
							alert("harap menghubungi pihak Admin untuk mengupdate catalog");
							return;
						}
						if (
							typeof element[11] == "undefined" ||
							element[11] == 0 ||
							element[11] == null
						) {
							alert("harap menghubungi pihak Admin untuk mengupdate catalog");
							return;
						}
						if (
							typeof element[12] == "undefined" ||
							element[12] == 0 ||
							element[12] == null
						) {
							alert("harap menghubungi pihak Admin untuk mengupdate catalog");
							return;
						}
						if (
							typeof element[13] == "undefined" ||
							element[13] == 0 ||
							element[13] == null
						) {
							alert("silahkan lengkapi team");
							return;
						}
						if (typeof element[1] == "undefined") {
							alert("pilih site tidak boleh kosong");
							return;
						}

						sitesDataWow.push({
							batchname: dataBatch["judul"],
							batchid: dataBatch["id"],
							vendorid: vendorid,
							siteid: databruh["siteid"]["id"],
							sitenama: databruh["siteid"]["nama"],
							siteunikid: databruh["siteid"]["unik_id"],
							unik_id: databruh["siteid"]["unik_id"],
							teknologi: element[7].toUpperCase(),
							harga_perangkat: element[10],
							harga_instalasi: element[11],
							harga_om: element[12],
							tanggal_awal_penawaran: ExcelDateToJSDateNoMoment(element[8]),
							tanggal_akhir_penawaran: ExcelDateToJSDateNoMoment(element[9]),
							tanggal_mulai_material_w: ExcelDateToJSDate(element[8]),
							tanggal_selesai_installation: ExcelDateToJSDate(element[9]),
							userfrom: userId,
							team: element[13],
						});
					}
				}
			});
			console.log("dataXCl", sitesDataWow);
			window.localStorage.setItem("tempXcl", JSON.stringify(sitesDataWow));
			window.localStorage.setItem(
				"tanggalAwalVendor",
				dataBatch["tanggal_mulai_kerja"]
			);
			window.localStorage.setItem(
				"tanggalAkhirVendor",
				dataBatch["tanggal_selesai_kerja"]
			);

			refreshJon();
		};
		reader.readAsArrayBuffer(e.target.files[0]);
	};

	return (
		<React.Fragment>
			<ModalPenawaranSMV
				modalPenawaran={modalPenawaran}
				togglePenawaran={() => togglePenawaran(dataPenawaran)}
				data={dataPenawaran}
				dataBatch={dataBatch}
				resetTable={() => resetTable()}
				// checkedPenawaran={dataReduxCheckedPenawaran}
				checkFunction={checkFunction}
			/>
			<ModalGanttChart
				modalGanttChart={modalGanttChart}
				toggleGanttChart={() => toggleGanttChart()}
				// data={dataPenawaran}
				// dataBatch={dataBatch}
			></ModalGanttChart>
			{/* <Card
				style={{
					boxShadow: "0px 0px 10px #D3D3D3",
					paddingBottom: "30px",
					paddingTop: "20px",
				}}
			> */}
			{/* <CardHeader style={{display:'flex', backgroundColor:'white', justifyContent:'flex-end', alignItems:'flex-end'}}>
					<Button className={styles.buttonGantt} onClick={() => toggleGanttChart()}>Gantt Chart</Button>
				</CardHeader> */}
			{/* <CardBody> */}
			{isLoading ? (
				<div>
					<h1>
						<Skeleton />
					</h1>
					<Skeleton count={10} />
				</div>
			) : (
				<>
					{/* <Button
						className={styles.buttonRFI}
						onClick={() => togglePenawaran({ siteid: 'multiple' }, true)}
						disabled={_.isEmpty(check)}
					>
						Multiple Penawaran
					</Button> */}

					<div style={{ fontWeight: "bold", textAlign: "center" }}>{`${
						dataBatch?.judul ?? "N/A"
					} merupakan batch mempunyai ${
						dataBatch?.sites?.length ?? "N/A"
					} titik, yang dibuat pada ${moment(
						dataBatch.tanggal_mulai_undangan
					).format("DD MMMM YYYY")} - ${moment(
						dataBatch.tanggal_selesai_undangan
					).format(
						"DD MMMM YYYY"
					)} dengan komponen RFI Scoring: Scoring Kecepatan Timeline Pembangunan (${
						dataBatch.bobot_rfi
					}%), Scoring Tim (${dataBatch.bobot_team}%), Scoring Harga (${
						dataBatch.bobot_price
					}%), Scoring VP (${dataBatch.bobot_vp}%)`}</div>
					<div style={{ marginBottom: "12px" }} />
					<div className="d-flex flex-row justify-content-start mb-2">
						{/* <div className="col-md-3 col-lg-2 col-sm-12"> */}
						<a
							href={`${process.env.REACT_APP_BE_URL}/vendor/generatePenawaranExcel/?penyedia=${vendorid}&batch=${id}`}
							download="template_penawaran.xlsm"
							target="_blank"
							className="mr-2"
						>
							<Button className={styles.buttonRFI}>Download Excel</Button>
						</a>
						{/* </div> */}
						<div
						// style={
						// 	uploadFile === 0 || uploadFile === 2
						// 		? { marginTop: "-5px" }
						// 		: {}
						// }
						// className="col-md-3 col-lg-6 col-sm-11"
						>
							{uploadFile === 0 && (
								<>
									<label labelfor="file-upload">
										<div className={styles.buttonRFI + " btn"}>
											{"Upload Excel "}
											{/* {uploadFile === 2 && (
												<i
													style={{ color: "green" }}
													className="mdi mdi-check-circle font-size-12"
												></i>
											)} */}
										</div>

										<input
											type="file"
											onChange={onChangeFileUpload}
											accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, .xlsm, .xls"
											id="file"
											style={{ display: "none" }}
										/>
									</label>
								</>
							)}
							{uploadFile === 2 && (
								<>
									<label labelfor="file-upload">
										<div className={styles.buttonRFI + " btn"}>
											{"Reupload excel"}
											{/* {uploadFile === 2 && (
												<i
													style={{ color: "green" }}
													className="mdi mdi-check-circle font-size-12"
												></i>
											)} */}
										</div>

										<input
											type="file"
											onChange={onChangeFileUpload}
											accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, .xlsm, .xls"
											id="file"
											style={{ display: "none" }}
										/>
									</label>
								</>
							)}
							{uploadFile === 1 && (
								<div
									style={{
										display: "flex",
										justifyContent: "flex-start",
										alignItems: "center",
									}}
								>
									<Spinner
										color=""
										style={{ color: "orange", marginRight: "10px" }}
									/>
									Mengunggah File...
								</div>
							)}
						</div>
					</div>
					{uploadFile === 2 ? (
						<span
							className="mt-4 rounded p-2"
							style={{ backgroundColor: "#F4F3F3", color: "black" }}
						>
							{fileName}
						</span>
					) : (
						<></>
					)}

					<div style={{ height: "10px" }} />
					<MDBDataTable
						className="text-center font-size-11"
						responsive
						striped
						bordered
						searching={true}
						displayEntries={false}
						info={false}
						entries={10} //How much data that you want to show in 1 table
						disableRetreatAfterSorting //Show red Warning after use
						data={data}
					/>
				</>
			)}
			{/* </CardBody> */}
			{/* </Card> */}
		</React.Fragment>
	);
};
export default SMVTablePenawaran;
