import React, { useState, useEffect } from "react";
import {
	Row,
	Col,
	Card,
	CardBody,
	TabContent,
	TabPane,
	NavItem,
	NavLink,
	Label,
	Input,
	Form,
	FormGroup,
	Progress,
	Spinner,
	Button,
} from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import classnames from "classnames";
import BatchTable from "../Table";
import Invitation from "../Table/Invitation";
import UploadSites from "../Modal/UploadSites";
import ModalTC from "../Modal/ModalTC";
// import SelectFromDb from "../Modal/SelectFromDb";
import SingleInput from "../Modal/SingleInput";
import { LocalProvider } from "../LocalContext";
import Summary from "../Summary";
import API from "../../../../services";
// import { RecordBatchToDB } from "./helper";
import styles from "./style.module.css";
import moment from "moment";
import Clustering from "../Modal/Clustering";
import VendorRecommendation from "../VendorRecommendation";
import NumberFormat from "react-number-format";
//redux
import { useSelector, useDispatch } from "react-redux";
import { changeDataCluster } from "../../../../store/actions";
import _ from "lodash";
const FormWizard = (props) => {
	// form states ========== step 1
	const [judulBatch, setjudulBatch] = useState("");
	const [mulaiUndangan, setmulaiUndangan] = useState("");
	const [selesaiUndangan, setselesaiUndangan] = useState("");
	const [mulaiKerja, setmulaiKerja] = useState("");
	const [selesaiKerja, setselesaiKerja] = useState("");
	const [noSurat, setnoSurat] = useState("");
	const [suratRFIFilename, setsuratRFIFilename] = useState("");
	const [docUpload, setDocUpload] = useState("");
	const [reset, setReset] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	// const [sewaBelanja, setSewaBelanja] = useState(null);
	const [teknologi, setTeknologi] = useState({
		fo: false,
		rl: false,
		vsat_gs_sewa_jasa: false,
		vsat_gs_belanja_modal: false,
		undefined: false,
	});

	// refresh vendor list, get ulang API vendor jika ada perubahan sewe/belanja di step 1
	const [refreshVendorList, setRefreshVendorList] = useState(false);
	const toggleRefreshVendorList = () =>
		setRefreshVendorList(!refreshVendorList);

	// refresh site list offair, get ulang API siteoffair jika ada perubahan jenis teknologi di step 1
	const [refreshSiteList, setRefreshSiteList] = useState(false);
	const toggleRefreshSiteList = () => setRefreshSiteList(!refreshSiteList);

	const history = useHistory();

	const [activeTabProgress, setactiveTabProgress] = useState(1);
	const [progressValue, setprogressValue] = useState(20);
	const [dateAwal, setDateAwal] = useState("");
	const [dateAwal2, setDateAwal2] = useState("");
	const [dateAwal3, setDateAwal3] = useState("");

	const [errorDocFormat, setErrorDocFormat] = useState("");

	const convertBase64 = (file, cb) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = function () {
			cb(null, reader.result);
		};
		reader.onerror = function (error) {
			cb(error, null);
		};
	};
	// convert base64 back to file
	function dataURLtoFile(dataurl, filename) {
		var arr = dataurl.split(","),
			mime = arr[0].match(/:(.*?);/)[1],
			bstr = atob(arr[1]),
			n = bstr.length,
			u8arr = new Uint8Array(n);

		while (n--) {
			u8arr[n] = bstr.charCodeAt(n);
		}

		return new File([u8arr], filename, { type: mime });
	}

	// set local state to be the same as local storage if there is any on the first render
	useEffect(() => {
		if (
			localStorage.getItem("surat_rfi") ||
			localStorage.getItem("surat_rfi_filename")
		) {
			setDocUpload(
				dataURLtoFile(
					localStorage.getItem("surat_rfi"),
					localStorage.getItem("surat_rfi_filename")
				)
			);
		}
		if (localStorage.getItem("judulBatch")) {
			setjudulBatch(localStorage.getItem("judulBatch"));
		}
		if (localStorage.getItem("mulaiUndangan")) {
			setmulaiUndangan(localStorage.getItem("mulaiUndangan"));
		}
		if (localStorage.getItem("selesaiUndangan")) {
			setselesaiUndangan(localStorage.getItem("selesaiUndangan"));
		}
		if (localStorage.getItem("mulaiKerja")) {
			setmulaiKerja(localStorage.getItem("mulaiKerja"));
		}
		if (localStorage.getItem("selesaiKerja")) {
			setselesaiKerja(localStorage.getItem("selesaiKerja"));
		}
		if (localStorage.getItem("noSurat")) {
			setnoSurat(localStorage.getItem("noSurat"));
		}
	}, []);
	//Usage example:

	async function handleChange(e) {
		switch (e.target.name) {
			case "judul":
				localStorage.setItem("judulBatch", e.target.value);
				// updateBatchInfoField("judul", e.target.value);
				break;
			case "mulai-undangan":
				localStorage.setItem("mulaiUndangan", e.target.value);
				setDateAwal(e.target.value);
				// updateBatchInfoField("mulaiUndangan", e.target.value);
				break;
			case "selesai-undangan":
				localStorage.setItem("selesaiUndangan", e.target.value);
				setDateAwal2(e.target.value);
				// updateBatchInfoField("selesaiUndangan", e.target.value);
				break;
			case "mulai-kerja":
				localStorage.setItem("mulaiKerja", e.target.value);
				setDateAwal3(e.target.value);
				// updateBatchInfoField("mulaiKerja", e.target.value);
				break;
			case "selesai-kerja":
				localStorage.setItem("selesaiKerja", e.target.value);
				// updateBatchInfoField("selesaiKerja", e.target.value);
				break;
			// case "tipe":
			// 	localStorage.setItem("tipe", e.target.value);
			// 	// updateBatchInfoField("tipe", e.target.value);
			// 	break;
			// case "sewa-or-belanja":
			// 	// setSewaBelanja(e.target.value);
			// 	setTeknologi((prev) => ({
			// 		...prev,
			// 		fo: false,
			// 		rl: false,
			// 		vsat_gs_sewa_jasa: false,
			// 		vsat_gs_belanja_modal: false,
			// 		undefined: false,
			// 	}));
			// 	// localStorage.setItem("sewaBelanja", e.target.value);
			// 	toggleRefreshVendorList();
			// 	// updateBatchInfoField("tipe", e.target.value);
			// 	break;
			case "teknologi":
				setTeknologi((prev) => ({
					...prev,
					[e.target.value]: e.target.checked,
				}));
				let temp = { ...teknologi, [e.target.value]: e.target.checked };
				if (temp["undefined"]) {
					setTeknologi((prev) => ({
						...prev,
						fo: false,
						rl: false,
						vsat_gs_sewa_jasa: false,
						vsat_gs_belanja_modal: false,
						undefined: true,
					}));
					temp = {
						...teknologi,
						fo: false,
						rl: false,
						vsat_gs_sewa_jasa: false,
						vsat_gs_belanja_modal: false,
						undefined: true,
					};
				}
				if (temp["vsat_gs_belanja_modal"]) {
					setTeknologi((prev) => ({
						...prev,
						fo: false,
						rl: false,
						vsat_gs_sewa_jasa: false,
						vsat_gs_belanja_modal: true,
						undefined: false,
					}));
					temp = {
						...teknologi,
						fo: false,
						rl: false,
						vsat_gs_sewa_jasa: false,
						vsat_gs_belanja_modal: true,
						undefined: false,
					};
				}
				let tempSave = Object.entries(temp)
					.filter(([key, value]) => value)
					.map((item) =>
						item[0].toUpperCase() == "VSAT" ? "VSAT-GS" : item[0].toUpperCase()
					);
				localStorage.setItem("teknologi", JSON.stringify(tempSave));
				toggleRefreshSiteList();

				// updateBatchInfoField("tipe", e.target.value);
				break;
			case "nomor-surat":
				localStorage.setItem("noSurat", e.target.value);
				// updateBatchInfoField("noSurat", e.target.value);
				break;
			case "unggah-rfi":
				// setDocUrl("true");
				// adminBatchDocRef.put(e.target.files[0]).then(function (snapshot) {
				// 	console.log("Uploaded temporary file!");
				// });
				let fileExtension = e.target.files[0].name.split(".").pop();
				if (fileExtension !== "pdf") {
					setErrorDocFormat("Format Dokumen harus .pdf");
					setDocUpload("");
				} else if (e.target.files < 1 || !e.target.validity.valid) {
					return;
				} else {
					convertBase64(e.target.files[0], (err, result) => {
						if (result) {
							localStorage.setItem("surat_rfi", result);
						} else {
							console.log("err doc convert to base64", err);
						}
					});
					setDocUpload(e.target.files[0]);
					localStorage.setItem("surat_rfi_filename", e.target.files[0].name);
					setErrorDocFormat("");
					setsuratRFIFilename(e.target.files[0].name);
				}

				break;
		}
	}
	const resetTable = () => {
		dispatch(changeDataCluster("", "", "", true));
		setReset(!reset);
	};
	// useEffect(() => {
	// 	localStorage.setItem("typeInput", "");
	// 	localStorage.setItem("sitesData", "[]");
	// 	resetTable();
	// }, []);

	useEffect(() => {
		if (localStorage.getItem("mulaiUndangan")) {
			setDateAwal(localStorage.getItem("mulaiUndangan"));
		}
		if (localStorage.getItem("selesaiUndangan")) {
			setDateAwal2(localStorage.getItem("selesaiUndangan"));
		}
		if (localStorage.getItem("mulaiKerja")) {
			setDateAwal3(localStorage.getItem("mulaiKerja"));
		}
		if (localStorage.getItem("teknologi")) {
			let tech = localStorage.getItem("teknologi");
			if (tech.includes("FO")) {
				setTeknologi((prev) => ({
					...prev,
					["fo"]: true,
				}));
			}
			if (tech.includes("RL")) {
				setTeknologi((prev) => ({
					...prev,
					["rl"]: true,
				}));
			}
			if (tech.includes("VSAT_GS_SEWA_JASA")) {
				setTeknologi((prev) => ({
					...prev,
					["vsat_gs_sewa_jasa"]: true,
				}));
			}
			if (tech.includes("VSAT_GS_BELANJA_MODAL")) {
				setTeknologi((prev) => ({
					...prev,
					["vsat_gs_belanja_modal"]: true,
				}));
			}
			if (tech.includes("UNDEFINED")) {
				setTeknologi((prev) => ({
					...prev,
					["undefined"]: true,
				}));
			}
		}
		// if (localStorage.getItem("surat_rfi")) {
		// 	setDocUpload(localStorage.getItem("surat_rfi"));
		// }
	}, []);

	function handleChangePrice(value) {
		localStorage.setItem("priceExp", value);
	}
	const dispatch = useDispatch();

	const [error, setError] = useState({
		judul: "",
		ns: "",
	});
	const checkJudul = (judul) => {
		let result = API.postCheckJudul({ judul: judul })
			.then((res) => {
				if (res.data.success === true) {
					setError((prev) => ({ ...prev, judul: "" }));
					return true;
				} else if (res.data.success === false) {
					setError((prev) => ({ ...prev, judul: "Judul Batch sudah Ada" }));
					return false;
				}
			})
			.catch((res) => {
				setError((prev) => ({ ...prev, judul: "Judul Batch sudah Ada" }));
				return false;
			})
			.finally((res) => {
				return false;
			});

		return result;
	};
	const checkRFI = async (nsr) => {
		let result = await API.postCheckRFIBatch({ rfi: nsr })
			.then((res) => {
				if (res.data.success === true) {
					setError((prev) => ({ ...prev, ns: "" }));
					return true;
				} else if (res.data.success === false) {
					setError((prev) => ({ ...prev, ns: "Nomor Surat RFI sudah Ada" }));
					return false;
				}
			})
			.catch((res) => {
				setError((prev) => ({ ...prev, ns: "Nomor Surat RFI sudah Ada" }));
				return false;
			})
			.finally((res) => {
				return false;
			});

		return result;
	};
	//checking no rfi and judul
	const checkInput = async (judul, nrs) => {
		let isJudulNotDuplicate = await checkJudul(judul);
		let isRFINotDuplicate = await checkRFI(nrs);
		return [isJudulNotDuplicate, isRFINotDuplicate];
	};

	// PENGECEKAN VALIDASI HARUS LENGKAP SEBELUM NEXT WIZARD
	const isBasicBatchInfoSaved = async () => {
		var a = localStorage.getItem("judulBatch");
		var b = localStorage.getItem("mulaiUndangan");
		var c = localStorage.getItem("selesaiUndangan");
		var d = localStorage.getItem("mulaiKerja");
		var e = localStorage.getItem("selesaiKerja");
		// var f = localStorage.getItem("tipe");
		var g = localStorage.getItem("noSurat");
		// var h = localStorage.getItem("priceExp");
		// var i = localStorage.getItem("sewaBelanja");
		var j = JSON.parse(localStorage.getItem("teknologi") || "[]");
		if (
			a === null ||
			b === null ||
			c === null ||
			d === null ||
			e === null ||
			// f === null ||
			g === null ||
			// h === null ||
			// i === null ||
			j === null ||
			!docUpload
		) {
			alert(`Lengkapi Data Terlebih Dahulu`);
			return false;
		} else if (
			a === "" ||
			b === "" ||
			c === "" ||
			d === "" ||
			e === "" ||
			// f === "" ||
			g === "" ||
			// h === "" ||
			// i === "" ||
			j === "" ||
			j.length === 0 ||
			!docUpload
		) {
			alert(`Lengkapi Data Terlebih Dahulu`);
			return false;
		} else {
			//check input judul and no rfi
			let res = await checkInput(a, g);
			if (res[0] && res[1]) {
				return true;
			} else {
				return false;
			}
		}
	};
	const typeInput = window.localStorage.getItem("typeInput");
	const toggleTabProgress = async (tab) => {
		const rfi_score = JSON.parse(window.localStorage.getItem("rfi-score"));

		const valueRFIPrice = rfi_score?.price?.check ? rfi_score?.price?.value : 0;
		const valueRFIVP = rfi_score?.vp?.check ? rfi_score?.vp?.value : 0;
		const valueRFIDurasi = rfi_score?.durasi?.check
			? rfi_score?.durasi?.value
			: 0;
		const valueRFITeam = rfi_score?.team?.check ? rfi_score?.team?.value : 0;
		const valueRFI =
			parseInt(valueRFIDurasi) +
			parseInt(valueRFIPrice) +
			parseInt(valueRFIVP) +
			parseInt(valueRFITeam);
		if (activeTabProgress !== tab) {
			if (tab >= 1 && tab <= 5) {
				let checkBatchInfoSaved = await isBasicBatchInfoSaved();
				if (checkBatchInfoSaved) {
					// PENGECEKAN BUAT NEXT TAB/WIZARD JIKA DATA TERISI MAKA NEXT
					if (tab == 4) {
						if (valueRFI == 100) {
							setprogressValue(80);
							setactiveTabProgress(tab);
						} else if (valueRFI > 100) {
							alert("Total Kalkulasi Scoring Value Melebihi 100%");
						} else if (valueRFI < 100) {
							alert("Total Kalkulasi Scoring Value Kurang Dari 100%");
						}
					} else if (tab == 5) {
						if (valueRFI == 100) {
							setprogressValue(100);
							setactiveTabProgress(tab);
						} else if (valueRFI > 100) {
							alert("Total Kalkulasi Scoring Value Melebihi 100%");
						} else if (valueRFI < 100) {
							alert("Total Kalkulasi Scoring Value Kurang Dari 100%");
						}
					} else {
						if (checkBatchInfoSaved) {
							setactiveTabProgress(tab);
						}
					}

					if (tab === 1) {
						setprogressValue(20);
					} else if (tab === 2) {
						setprogressValue(40);
					} else if (tab === 3) {
						if (typeInput === "") {
							alert("Harap isi titik yang ingin dibangun terlebih dahulu");
						} else {
							setprogressValue(60);
						}
					}
				}
			}
		}
	};

	// INI DATA YG DI INPUT DI SIMPAN DI LOCAL STORAGE BUAT NEXT STEP
	async function RecordBatchToDB() {
		const userid = localStorage.getItem("userId");
		var judulBatch = localStorage.getItem("judulBatch");
		var mulaiUndangan = localStorage.getItem("mulaiUndangan");
		var selesaiUndangan = localStorage.getItem("selesaiUndangan");
		var mulaiKerja = localStorage.getItem("mulaiKerja");
		var selesaiKerja = localStorage.getItem("selesaiKerja");
		// var tipe = localStorage.getItem("tipe");
		// var price = localStorage.getItem("priceExp");
		var rfi_score = JSON.parse(localStorage.getItem("rfi-score"));
		var sewaBelanja = localStorage.getItem("sewaBelanja");
		var teknologi = JSON.parse(localStorage.getItem("teknologi") || "[]");
		var noSurat = localStorage.getItem("noSurat");
		var dataInvitation =
			JSON.parse(localStorage.getItem("dataInvitation")) ?? [];
		var sitesData = JSON.parse(localStorage.getItem("sitesData") || "[]");
		const siteListA = sitesData.map((data) => {
			return { ...data };
		});

		if (
			judulBatch !== null &&
			mulaiUndangan !== null &&
			selesaiUndangan !== null &&
			mulaiKerja !== null &&
			selesaiKerja !== null &&
			// tipe !== null &&
			// price !== null &&
			rfi_score !== null &&
			// sewaBelanja !== null &&
			noSurat !== null &&
			siteListA.length !== 0 &&
			docUpload &&
			dataInvitation.length !== 0
		) {
			if (
				judulBatch !== "" &&
				mulaiUndangan !== "" &&
				selesaiUndangan !== "" &&
				mulaiKerja !== "" &&
				selesaiKerja !== "" &&
				// tipe !== "" &&
				// price !== "" &&
				rfi_score !== "" &&
				// sewaBelanja !== "" &&
				noSurat !== "" &&
				siteListA.length !== 0 &&
				docUpload &&
				dataInvitation.length !== 0
			) {
				var data = JSON.parse(localStorage.getItem("dataInvitation")) ?? [];
				data = _.groupBy(data, (e) => e.id);
				let tempData = [];
				let tempID = [];
				Object.entries(data).forEach((datum) => {
					tempData.push({
						id: datum[0],
						teknologi: datum[1].map((e) => e.teknologi),
					});
				});
				Object.entries(data).forEach((datum) => {
					tempID.push(datum[0]);
				});
				let formData = new FormData();
				formData.append("judul", judulBatch);
				formData.append(
					"tanggal_mulai_kerja",
					mulaiKerja ? `${mulaiKerja + " 00:00:00"}` : ""
				);
				formData.append(
					"tanggal_selesai_kerja",
					selesaiKerja ? `${selesaiKerja + " 00:00:00"}` : ""
				);
				formData.append(
					"tanggal_mulai_undangan",
					mulaiUndangan ? `${mulaiUndangan + " 00:00:00"}` : ""
				);
				formData.append(
					"tanggal_selesai_undangan",
					selesaiUndangan ? `${selesaiUndangan + " 00:00:00"}` : ""
				);
				formData.append("no_doc_permohonan_rfi", noSurat ? noSurat : "");
				formData.append("creator", userid);
				formData.append("doc", docUpload);
				// formData.append("type", tipe ? tipe : "");
				// formData.append("price", price ? price : "");
				formData.append(
					"tech_type",
					teknologi === ["UNDEFINED"]
						? ["FO", "RL", "VSAT_GS_SEWA_JASA", "VSAT_GS_BELANJA_MODAL"]
						: teknologi ?? ""
				);
				// formData.append("buying_type", sewaBelanja);
				formData.append("penyedia_undang", JSON.stringify(tempData));
				formData.append(
					"rfi_vp",
					rfi_score?.vp?.check ? rfi_score?.vp?.value : 0
				);
				formData.append(
					"rfi_durasi",
					rfi_score?.durasi?.check ? rfi_score?.durasi?.value : 0
				);
				formData.append(
					"rfi_price",
					rfi_score?.price?.check ? rfi_score?.price?.value : 0
				);
				formData.append(
					"rfi_team",
					rfi_score?.team?.check ? rfi_score?.team?.value : 0
				);

				let count = 0;
				let Condition = "";
				let respon = {};
				async function postSite(res) {
					for (let i of siteListA) {
						await API.postNewSite({
							batch: res.data.values.id,
							unik_id: i.unikid,
							nama: i.location,
							provinsi:
								typeof i.provinsi === "object"
									? i.provinsi.nama.toUpperCase()
									: i.provinsi.toUpperCase(),
							kab_kota:
								typeof i.kabupatenKota === "object"
									? i.kabupatenKota.nama.toUpperCase()
									: i.kabupatenKota.toUpperCase(),
							kecamatan:
								typeof i.kecamatan === "object"
									? i.kecamatan.nama.toUpperCase()
									: i.kecamatan.toUpperCase(),
							desa:
								typeof i.kelurahanDesa === "object"
									? i.kelurahanDesa.nama.toUpperCase()
									: i.kelurahanDesa.toUpperCase(),
							latitude: i.latitude.toString(),
							longitude: i.longitude.toString(),
							tipe_batch: i?.tipe_batch,
						})
							.then((res) => {
								if (res.data.success === true) {
									count = count + 1;
								}
							})
							.catch((err) => {
								// console.log(err);
								return "FAIL";
							});
					}
					if (count === siteListA.length) {
						return "SUCCESS";
					} else {
						return "FAIL";
					}
				}
				await API.postNewBatch(formData)
					.then((res) => {
						respon = res;
						Condition = "SUCCESS";
					})
					.catch((e) => {
						// console.log(e);
						Condition = "FAIL";
					});
				if (Condition === "SUCCESS") {
					await postSite(respon).then((res) => {
						Condition = res;
					});
					await API.postInVendor({
						batchid: respon.data.values.id,
						from: userid,
						to: tempID.toString(),
					});
				} else {
					Condition = "FAIL";
				}
				return Condition;
			} else {
				return "EMPTY";
			}
		} else {
			return "EMPTY";
		}
	}

	// REFRESH BUTTON INPUT
	const [refreshButton, setRefreshButton] = useState(false);

	function ButtonRefresh() {
		setRefreshButton((prevState) => !prevState);
	}
	//GET REDUX KEC KAB CLUSTER
	const dataCluster = useSelector((state) => state.dataReducer.dataCluster);
	//Modal T&C
	let [modalTC, setModalTC] = useState(true);
	const showModalTC = () => {
		setModalTC(true);
	};
	const closeModalTC = () => {
		setModalTC(false);
	};
	const toggleModalTC = () => {
		setModalTC(!modalTC);
	};

	return (
		<>
			<Col lg="12">
				<Button onClick={toggleModalTC} className={styles.tcBtn}>
					?
				</Button>
			</Col>
			<Col lg="12">
				<ModalTC
					modalTC={modalTC}
					showModalTC={showModalTC}
					closeModalTC={closeModalTC}
					toggleModalTC={toggleModalTC}
				></ModalTC>
				<Card>
					<CardBody>
						<div id="progrss-wizard" className="twitter-bs-wizard">
							<ul className="twitter-bs-wizard-nav nav-justified nav nav-pills">
								<Row className="w-100">
									<Col>
										<NavItem>
											<NavLink
												className={classnames({
													active: activeTabProgress === 1,
												})}
												onClick={() => {
													toggleTabProgress(1);
												}}
											>
												<div className="text-center">
													<span
														className="step-number"
														style={{
															backgroundColor:
																activeTabProgress === 1 ? "#F99746" : "#C4C4C4",
															color:
																activeTabProgress === 1 ? "#19324A" : "white",
															border: "1px solid #19324A",
														}}
													>
														1
													</span>
												</div>
												<div
													className="text-center"
													style={{
														color:
															activeTabProgress === 1 ? "#F99746" : "#19324A",
													}}
												>
													ADD BATCH INFO
												</div>
											</NavLink>
										</NavItem>
									</Col>
									<Col>
										<NavItem>
											<NavLink
												className={classnames({
													active: activeTabProgress === 2,
												})}
												onClick={() => {
													toggleTabProgress(2);
												}}
											>
												<div className="text-center">
													<span
														className="step-number"
														style={{
															backgroundColor:
																activeTabProgress === 2 ? "#F99746" : "#C4C4C4",
															color:
																activeTabProgress === 2 ? "#19324A" : "white",
															border: "1px solid #19324A",
														}}
													>
														2
													</span>
												</div>
												<div
													className="text-center"
													style={{
														color:
															activeTabProgress === 2 ? "#F99746" : "#19324A",
													}}
												>
													ADD SITES
												</div>
											</NavLink>
										</NavItem>
									</Col>
									<Col>
										<NavItem>
											<NavLink
												className={classnames({
													active: activeTabProgress === 3,
												})}
												onClick={() => {
													if (typeInput === "") {
														alert(
															"Harap isi titik yang ingin dibangun terlebih dahulu"
														);
													} else {
														toggleTabProgress(3);
													}
												}}
											>
												<div className="text-center">
													<span
														className="step-number"
														style={{
															backgroundColor:
																activeTabProgress === 3 ? "#F99746" : "#C4C4C4",
															color:
																activeTabProgress === 3 ? "#19324A" : "white",
															border: "1px solid #19324A",
														}}
													>
														3
													</span>
												</div>
												<div
													className="text-center"
													style={{
														color:
															activeTabProgress === 3 ? "#F99746" : "#19324A",
													}}
												>
													RFI SCORING METHOD
												</div>
											</NavLink>
										</NavItem>
									</Col>
									<Col>
										<NavItem>
											<NavLink
												className={classnames({
													active: activeTabProgress === 4,
												})}
												onClick={() => {
													toggleRefreshVendorList();
													toggleTabProgress(4);
												}}
											>
												<div className="text-center">
													<span
														className="step-number"
														style={{
															backgroundColor:
																activeTabProgress === 4 ? "#F99746" : "#C4C4C4",
															color:
																activeTabProgress === 4 ? "#19324A" : "white",
															border: "1px solid #19324A",
														}}
													>
														4
													</span>
												</div>
												<div
													className="text-center"
													style={{
														color:
															activeTabProgress === 4 ? "#F99746" : "#19324A",
													}}
												>
													INVITE VENDORS
												</div>
											</NavLink>
										</NavItem>
									</Col>
									<Col>
										<NavItem>
											<NavLink
												className={classnames({
													active: activeTabProgress === 5,
												})}
												onClick={() => {
													toggleTabProgress(5);
												}}
											>
												<div className="text-center">
													<span
														className="step-number"
														style={{
															backgroundColor:
																activeTabProgress === 5 ? "#F99746" : "#C4C4C4",
															color:
																activeTabProgress === 5 ? "#19324A" : "white",
															border: "1px solid #19324A",
														}}
													>
														5
													</span>
												</div>

												<div
													className="text-center"
													style={{
														color:
															activeTabProgress === 5 ? "#F99746" : "#19324A",
													}}
												>
													SUMMARY
												</div>
											</NavLink>
										</NavItem>
									</Col>
								</Row>
							</ul>

							<div id="bar" className="mt-4">
								<Progress
									color="success"
									striped
									animated
									value={progressValue}
								/>
								<div className="progress-bar bg-success progress-bar-striped progress-bar-animated"></div>
							</div>
							<TabContent
								activeTab={activeTabProgress}
								className="twitter-bs-wizard-tab-content"
							>
								<TabPane tabId={1}>
									<Form>
										<span
											className="text-right text-danger col-12 d-flex justify-content-end"
											style={{ cursor: "pointer", fontSize: "14px" }}
											onClick={() => {
												localStorage.removeItem("judulBatch");
												setjudulBatch("");
												localStorage.removeItem("mulaiUndangan");
												setmulaiUndangan("");
												localStorage.removeItem("selesaiUndangan");
												setselesaiUndangan("");
												localStorage.removeItem("mulaiKerja");
												setmulaiKerja("");
												localStorage.removeItem("selesaiKerja");
												setselesaiKerja("");
												localStorage.removeItem("teknologi");
												setTeknologi({
													fo: false,
													rl: false,
													vsat_gs_sewa_jasa: false,
													vsat_gs_belanja_modal: false,
													undefined: false,
												});
												localStorage.removeItem("noSurat");
												setnoSurat("");
												localStorage.removeItem("surat_rfi_filename");
												setDocUpload("");
												localStorage.removeItem("surat_rfi");
												setsuratRFIFilename("");
											}}
										>
											Reset
										</span>
										<Row>
											<Col lg="12">
												<FormGroup>
													<Label for="basicpill-firstname-input14">
														Judul Batch
													</Label>
													<Input
														type="text"
														className="form-control"
														value={judulBatch}
														name={"judul"}
														onChange={(e) => {
															handleChange(e);
															setjudulBatch(e.target.value);
														}}
													/>
													{error.judul !== "" && (
														<div
															style={{
																color: "red",
																fontSize: "12px",
																paddingTop: "5px",
															}}
														>
															{error.judul}
														</div>
													)}
												</FormGroup>
											</Col>
										</Row>

										<Row>
											<Col lg="12">
												<Label for="basicpill-phoneno-input16">
													{"Durasi undangan batch"}
												</Label>
											</Col>
											<Col lg="6">
												<FormGroup>
													<Input
														type="date"
														name={"mulai-undangan"}
														className="form-control"
														onChange={(e) => {
															handleChange(e);
															setmulaiUndangan(e.target.value);
														}}
														value={mulaiUndangan}
														min={moment(new Date()).format("YYYY-MM-DD")}
													/>
												</FormGroup>
											</Col>
											<Col lg="6">
												<FormGroup>
													<Input
														type="date"
														name={"selesai-undangan"}
														className="form-control"
														onChange={(e) => {
															handleChange(e);
															setselesaiUndangan(e.target.value);
														}}
														min={moment(dateAwal)
															.add(1, "days")
															.format("YYYY-MM-DD")
															.toString()}
														value={selesaiUndangan}
														disabled={dateAwal === "" ? true : false}
													/>
												</FormGroup>
											</Col>
										</Row>

										<Row>
											<Col lg="12">
												<Label for="basicpill-phoneno-input16">
													{"Durasi Pengerjaan Batch"}
												</Label>
											</Col>
											<Col lg="6">
												<FormGroup>
													<Input
														type="date"
														name={"mulai-kerja"}
														className="form-control"
														onChange={(e) => {
															handleChange(e);
															setmulaiKerja(e.target.value);
														}}
														min={moment(dateAwal2)
															.add(1, "days")
															.format("YYYY-MM-DD")
															.toString()}
														value={mulaiKerja}
														disabled={dateAwal2 === "" ? true : false}
													/>
												</FormGroup>
											</Col>
											<Col lg="6">
												<FormGroup>
													<Input
														type="date"
														name={"selesai-kerja"}
														className="form-control"
														min={moment(dateAwal3)
															.add(1, "days")
															.format("YYYY-MM-DD")
															.toString()}
														onChange={(e) => {
															handleChange(e);
															setselesaiKerja(e.target.value);
														}}
														disabled={dateAwal3 === "" ? true : false}
														value={selesaiKerja}
													/>
												</FormGroup>
											</Col>
										</Row>

										{/* <Row>
											<Col lg="12">
												<Label for="basicpill-firstname-input14">
													Tipe Batch
												</Label>
											</Col>
											<Col lg="6">
												<div className="form-check mb-3">
													<input
														type="radio"
														className="form-check-input"
														onChange={handleChange}
														defaultValue={"VIP"}
														name={"tipe"}
													/>
													<Label for="tipe">VIP</Label>
												</div>
											</Col>
											<Col lg="6">
												<div className="form-check mb-3">
													<input
														type="radio"
														className="form-check-input"
														defaultValue={"Non-VIP"}
														name={"tipe"}
														onChange={handleChange}
													/>
													<Label for="tipe">Non VIP</Label>
												</div>
											</Col>
										</Row> */}

										{/* <Row>
											<Col lg="12">
												<Label for="basicpill-firstname-input14">
													Sewa Jasa/Belanja Modal
												</Label>
											</Col>
											<Col lg="6">
												<div className="form-check mb-3">
													<input
														type="radio"
														className="form-check-input"
														onChange={handleChange}
														defaultValue={"0"}
														name={"sewa-or-belanja"}
													/>
													<Label for="sewa-or-belanja">Sewa Jasa</Label>
												</div>
											</Col>
											<Col lg="6">
												<div className="form-check mb-3">
													<input
														type="radio"
														className="form-check-input"
														defaultValue={"1"}
														name={"sewa-or-belanja"}
														onChange={handleChange}
													/>
													<Label for="sewa-or-belanja">Belanja Modal</Label>
												</div>
											</Col>
										</Row> */}

										<Row className="mb-2 w-100">
											<Col lg="12">
												<Label for="basicpill-firstname-input14">
													Teknologi
												</Label>
											</Col>
											<Col lg="12">
												<div>
													{/* <Col> */}
													<input
														type="checkbox"
														id="fo"
														name="teknologi"
														value="fo"
														checked={teknologi["fo"]}
														className="mr-1"
														onChange={handleChange}
														disabled={
															teknologi["undefined"] ||
															teknologi["vsat_gs_belanja_modal"]
														}
													/>
													<Label for="fo">FO</Label>
													{/* </Col> */}
													{/* <Col> */}
													<input
														type="checkbox"
														id="rl"
														name="teknologi"
														value="rl"
														checked={teknologi["rl"]}
														className="ml-3 mr-1"
														onChange={handleChange}
														disabled={
															teknologi["undefined"] ||
															teknologi["vsat_gs_belanja_modal"]
														}
													/>
													<Label for="rl">RL</Label>
													{/* </Col> */}
													{/* <Col> */}
													<input
														type="checkbox"
														id="vsat-sewa"
														name="teknologi"
														value="vsat_gs_sewa_jasa"
														checked={teknologi["vsat_gs_sewa_jasa"]}
														className="ml-3 mr-1"
														onChange={handleChange}
														disabled={
															teknologi["undefined"] ||
															teknologi["vsat_gs_belanja_modal"]
														}
													/>
													<Label for="vsat">VSAT-GS-Sewa-Jasa</Label>
													{/* </Col> */}
													{/* <Col> */}
													<input
														type="checkbox"
														id="vsat-belanja"
														name="teknologi"
														value="vsat_gs_belanja_modal"
														checked={teknologi["vsat_gs_belanja_modal"]}
														className="ml-3 mr-1"
														onChange={handleChange}
														disabled={teknologi["undefined"]}
													/>
													<Label for="vsat">VSAT-GS-Belanja-Modal</Label>
													{/* </Col> */}
													{/* <Col> */}
													<input
														type="checkbox"
														id="undefined"
														name="teknologi"
														value="undefined"
														checked={teknologi["undefined"]}
														onChange={handleChange}
														className="ml-3 mr-1"
														disabled={teknologi["vsat_gs_belanja_modal"]}
													/>
													<Label for="undefined">Belum Terdefinisi</Label>
													{/* </Col> */}
												</div>
											</Col>
										</Row>

										<Row>
											<Col lg="12">
												<FormGroup>
													<Label for="basicpill-firstname-input14">
														Nomor Surat Permohonan RFI
													</Label>
													<Input
														type="text"
														className="form-control"
														name={"nomor-surat"}
														onChange={(e) => {
															handleChange(e);
															setnoSurat(e.target.value);
														}}
														value={noSurat}
													/>
													{error.ns !== "" && (
														<div
															style={{
																color: "red",
																fontSize: "12px",
																paddingTop: "5px",
															}}
														>
															{error.ns}
														</div>
													)}
												</FormGroup>
											</Col>
											<Col lg="12">
												<FormGroup>
													<Label for="basicpill-firstname-input14">
														Unggah Surat Permohonan RFI
													</Label>
													<Label
														style={{
															color: "red",
															marginLeft: "15px",
															fontSize: "11px",
														}}
													>
														{errorDocFormat === "" ? "" : errorDocFormat}
													</Label>
													{docUpload ? (
														<>
															<div className="d-flex flex-row">
																<div
																	style={{
																		backgroundColor: "#C4C4C4",
																		borderRadius: "10px",
																	}}
																	className="col-lg-9 p-2 mb-2 mr-2"
																>
																	{localStorage.getItem("surat_rfi_filename")}
																</div>
																<div
																	style={{
																		backgroundColor: "#F99746",
																		borderRadius: "10px",
																		textAlign: "center",
																		cursor: "pointer",
																	}}
																	className="col-lg-2 p-2 mb-2"
																	onClick={() => {
																		document
																			.getElementById("file-upload")
																			.classList.toggle("d-flex");
																		document
																			.getElementById("file-upload")
																			.classList.toggle("d-none");
																	}}
																>
																	Unggah Ulang
																</div>
															</div>
															<input
																type="file"
																id="file-upload"
																className="form-control"
																name={"unggah-rfi"}
																onChange={handleChange}
																className="form-control d-none"
																style={{
																	justifyItems: "center",
																	alignItems: "center",
																	height: "43px",
																}}
																accept="application/pdf"
															/>
														</>
													) : (
														<input
															type="file"
															id="file-upload"
															className="form-control"
															name={"unggah-rfi"}
															onChange={handleChange}
															className="form-control"
															style={{
																display: "flex",
																justifyItems: "center",
																alignItems: "center",
																height: "43px",
															}}
															accept="application/pdf"
														/>
													)}
												</FormGroup>
											</Col>
										</Row>

										{/* <Row>
											<Col lg="12">
												<FormGroup>
													<Label for="basicpill-firstname-input14">
														Owner Price Expectation
													</Label>

													<NumberFormat
														className="form-control"
														thousandSeparator={true}
														prefix={"Rp "}
														onValueChange={(values) => {
															const { formattedValue, value } = values;
															// handleChange(values, value);
															handleChangePrice(value);
															// console.log(formattedValue, value)
															// formattedValue = $2,223
															// value ie, 2223
														}}
													/>
												</FormGroup>
											</Col>
										</Row>   */}
									</Form>
								</TabPane>
								<TabPane tabId={2}>
									<div>
										<div
											className={
												"d-flex justify-content-between align-items-start"
											}
										>
											<div className={"d-flex justify-content-start"}>
												<div className={"m-2"}>
													<SingleInput
														resetTable={() => resetTable()}
														refresh={refreshButton}
														refreshSite={refreshSiteList}
													/>
												</div>
												<div className={"m-2"}>
													<UploadSites
														resetTable={() => resetTable()}
														refresh={refreshButton}
													/>
												</div>
												<div className={"m-2"}>
													{/* <UploadSites resetTable={()=>resetTable()}/> */}
													<Clustering
														resetTable={() => resetTable()}
														refresh={refreshButton}
													/>
												</div>
											</div>
											<span
												className="text-right text-danger"
												style={{ cursor: "pointer", fontSize: "14px" }}
												onClick={() => {
													resetTable();
													localStorage.setItem("sitesData", []);
													localStorage.removeItem("typeInput");
												}}
											>
												Reset
											</span>
											{/* <div className={"m-2"}>
											<UploadSites resetTable={()=>resetTable()}/>
											<Button style={{backgroundColor: "#073030", padding: "8px 40px"}}>Clustering</Button>
										</div> */}
										</div>
										<BatchTable reset={reset} refresh={ButtonRefresh} />
									</div>
								</TabPane>
								<TabPane tabId={3}>
									<div>
										{/* <Invitation /> */}
										<VendorRecommendation
											dataCluster={dataCluster}
											reset={reset}
										/>
									</div>
								</TabPane>
								<TabPane tabId={4}>
									<div>
										<Invitation refresh={refreshVendorList} />
									</div>
								</TabPane>
								<TabPane tabId={5}>
									<div>
										<Summary />
									</div>
								</TabPane>
							</TabContent>
							<ul className="pager wizard twitter-bs-wizard-pager-link">
								<li className={"previous"}>
									<Link
										className={
											activeTabProgress === 1
												? styles.buttonCancel
												: styles.buttonPrevious
										}
										to="#"
										onClick={() => {
											if (activeTabProgress === 1) {
												// localStorage.removeItem("dataInvitation");
												// localStorage.removeItem("judulBatch");
												// localStorage.removeItem("mulaiUndangan");
												// localStorage.removeItem("selesaiUndangan");
												// localStorage.removeItem("mulaiKerja");
												// localStorage.removeItem("selesaiKerja");
												// localStorage.removeItem("tipe");
												// localStorage.removeItem("noSurat");
												// localStorage.removeItem("sitesData");
												history.push("/admin/site-matchmaking");
											}
											toggleTabProgress(activeTabProgress - 1);
										}}
									>
										{activeTabProgress === 1 ? (
											"Batal"
										) : (
											<span className={styles.centerElementSpan}>
												<i className="mdi mdi-24px mdi-chevron-left" />
												Kembali
											</span>
										)}
									</Link>
								</li>
								<li className={activeTabProgress === 5 ? "next" : "next"}>
									<a
										className={
											activeTabProgress === 5
												? styles.buttonSubmit
												: styles.buttonNext
										}
										onClick={() => {
											if (isLoading) {
											} else {
												if (activeTabProgress === 5) {
													setIsLoading(true);
													RecordBatchToDB().then((res) => {
														setIsLoading(false);
														if (res === "SUCCESS") {
															alert("Berhasil Membuat Batch");
															localStorage.removeItem("dataInvitation");
															localStorage.removeItem("judulBatch");
															localStorage.removeItem("mulaiUndangan");
															localStorage.removeItem("selesaiUndangan");
															localStorage.removeItem("mulaiKerja");
															localStorage.removeItem("selesaiKerja");
															localStorage.removeItem("tipe");
															localStorage.removeItem("noSurat");
															localStorage.removeItem("surat_rfi");
															localStorage.removeItem("surat_rfi_filename");
															localStorage.removeItem("sitesData");
															localStorage.removeItem("teknologi");
															localStorage.removeItem("idKecamatan");
															localStorage.removeItem("idKabupaten");
															localStorage.setItem(
																"rfi-score",
																JSON.stringify({
																	durasi: { check: false, value: 0 },
																	vp: { check: false, value: 0 },
																	price: { check: false, value: 0 },
																	team: { check: false, value: 0 },
																})
															);

															history.push("/admin/site-matchmaking");
														} else if (res === "FAIL") {
															alert("Terjadi Kesalahan");
															alert(res);
														} else if (res === "EMPTY") {
															alert("Silahkan Lengkapi Data Terlebih Dahulu");
														}
													});
												}
												if (activeTabProgress === 2) {
													toggleRefreshVendorList();
													let typeInput = window.localStorage.getItem(
														"typeInput"
													);
													if (typeInput === "") {
														alert(
															"Harap isi titik yang ingin dibangun terlebih dahulu"
														);
														return;
													} else {
														toggleTabProgress(activeTabProgress + 1);
													}
												} else {
													toggleTabProgress(activeTabProgress + 1);
												}
											}
										}}
									>
										{activeTabProgress === 5 ? (
											isLoading ? (
												<Spinner></Spinner>
											) : (
												"SUBMIT"
											)
										) : (
											<span className={styles.centerElementSpan}>
												Selanjutnya
												<i className="mdi mdi-24px mdi-chevron-right" />
											</span>
										)}
									</a>
								</li>
							</ul>
						</div>
					</CardBody>
				</Card>
			</Col>
		</>
	);
};

const WizardWrapper = (props) => {
	return (
		<LocalProvider>
			<FormWizard />
		</LocalProvider>
	);
};

export default WizardWrapper;
