import React, { useEffect, useState, useContext, useRef } from "react";
// import { useHistory } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import { Row, Col, Card, CardBody, Button } from "reactstrap";
// import Skeleton from "react-loading-skeleton";
import "./datatables.scss";
import moment from "moment";
import Skeleton from "react-loading-skeleton";
import styles from "./style.module.css";
import ModalResponseSMV from "../Modal/ModalResponse";
import API from "../../../../services";
import MapIcon from "../../../../assets/images/MapIcon.svg";
import DetailIcon from "../../../../assets/images/DetailIcon.svg";
import { Link } from "react-router-dom";
import ModalPreviewDoc from "../../../Admin/SiteMatchmaking/Modal/PreviewDocs";
import PDFIcon from "../../../../assets/images/PdfIcon.svg";

const SMVTable = (props) => {
	const [modalResponse, setModalResponse] = useState(false);
	const [dataResponse, setDataResponse] = useState({});
	const [rows, setRows] = useState([]);

	let toggleResponse = (i) => {
		setDataResponse(i);
		setModalResponse(!modalResponse);
	};

	let resetTable = () => {
		setRows([]);
	};

	// MODAL PREVIEW DOC
	const [dataModalDoc, setDataModalDoc] = useState({});
	const [modalDoc, setModalDoc] = useState(false);
	const toggleModalDoc = () => {
		setModalDoc(!modalDoc);
	};

	const handleModalDoc = (it) => {
		setDataModalDoc(it);
		toggleModalDoc();
	};

	const DokPenunjang = ({ it }) => {
		return (
			<div className="wrapperBtnAction">
				<div className="d-block">
					<img
						className="btnAction"
						src={PDFIcon}
						onClick={() => handleModalDoc(it)}
					></img>
					{/* <p style={{ fontSize: "10px", width: "37px" }}>Surat Tugas</p> */}
				</div>
			</div>
		);
	};

	//Create Data for Row
	function createData(
		batch,
		nprfi,
		jmlhtitik,
		tglmulai,
		tglselesai,
		act,
		act_doc,
		batch_id
	) {
		return {
			batch,
			nprfi,
			jmlhtitik,
			tglmulai,
			tglselesai,
			act,
			act_doc,
			batch_id,
		};
	}

	async function fetchDataTable() {
		// hardcode dlu gengs biar ga lama.
		const role = window.localStorage.getItem("companyId");

		// return;
		API.postVendorSMAll({
			penyedia: role,
		})
			.then((res) => {
				if (res.data.values.length === 0) {
					setRows([
						{
							batch: "Tidak ada data",
							nprfi: "",
							jmlhtitik: "",
							tglmulai: "",
							tglselesai: "",
							act: "",
							act_doc: "",
						},
					]);
				} else {
					let rowsData = [];
					const json = res?.data;
					for (let i of json?.values) {
						let act = "";
						let act_doc = "";
						let judul = encodeURIComponent(i?.judul.trim());
						act = (
							<Row>
								<Col xs="12" xl="12">
									{i?.sites?.length === 0 ? (
										<div key={i?.id}>
											<Button
												className={styles.buttonResponsedSMV}
												key={i?.id}
												disabled
											>
												Penawaran
											</Button>
										</div>
									) : i.summary === true ? (
										// i?.sites?.some((a) =>
										// 		a?.rfi_score?.some(
										// 			(x) => x?.vendor_app?.vendorid?.id === role
										// 		)
										//   )
										<Link
											key={i?.id}
											to={`/vendor/sm/summary/${i?.id}/${judul}`}
										>
											<Button
												className={styles.buttonSummarySMV}
												key={i?.id}
												onClick={() => localStorage.setItem("batch_id", i.id)}
											>
												Summary
											</Button>
										</Link>
									) : (
										<Link
											key={i?.id}
											to={`/vendor/sm/penawaran/${i?.id}/${judul}`}
										>
											<Button
												className={styles.buttonEditSMV}
												key={i?.id}
												onClick={async () => {
													localStorage.removeItem("tempXcl");
													localStorage.removeItem("tanggalAwalVendor");
													localStorage.removeItem("tanggalAkhirVendor");
													localStorage.removeItem("nomorSuratRespon");
													localStorage.setItem("batch_id", i.id);
													localStorage.setItem("judul_batch_vendor", i.judul);
												}}
											>
												Penawaran
											</Button>
										</Link>
									)}
								</Col>
							</Row>
						);
						act_doc = <DokPenunjang it={i?.doc_permohonan_rfi?.path ?? ""} />;
						if (i?.status[i?.status.length - 1].status === "Dibuka") {
							rowsData.push(
								createData(
									i?.judul,
									i?.no_doc_permohonan_rfi,
									i?.sites.length,
									`${moment(i?.tanggal_mulai_undangan).format("DD/MM/YYYY")}`,
									`${moment(i?.tanggal_selesai_undangan).format("DD/MM/YYYY")}`,
									act,
									act_doc,
									i?.id
								)
							);
						}
					}
					setRows(rowsData);
				}
			})
			.catch((err) => {
				console.log("Error table batch", err);
				setRows([
					{
						batch: "Terjadi Kesalahan",
						nprfi: "",
						jmlhtitik: "",
						tglmulai: "",
						tglselesai: "",
						act: "",
					},
				]);
			});
	}

	useEffect(() => {
		if (rows.length === 0) {
			fetchDataTable();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [rows]);

	// const getDataPerBatch = (batch_id) => {
	// 	const role = window.localStorage.getItem("companyId");
	// 	let params = {
	// 		penyedia: role,
	// 		batch: batch_id,
	// 	};
	// 	API.postVendorSM(params)
	// 		.then((res) => console.log(`console log nya res`, res))
	// 		.catch((err) => console.log(`console log nya err`, err));
	// };

	const data = {
		columns: [
			{
				label: "Batch",
				field: "batch",
				sort: "asc",
				width: 200,
			},
			{
				label: "No Surat Permintaan RFI",
				field: "nprfi",
				sort: "asc",
				width: 200,
			},
			{
				label: "Jumlah Titik",
				field: "jmlhtitik",
				sort: "asc",
				width: 200,
			},
			{
				label: "Tanggal Dimulai",
				field: "tglmulai",
				sort: "asc",
				width: 200,
			},
			{
				label: "Tanggal Selesai",
				field: "tglselesai",
				sort: "asc",
				width: 200,
			},
			{
				label: "Dokumen Penunjang",
				field: "act_doc",
				sort: "disabled",
				width: 200,
			},
			{
				label: "",
				field: "act",
				sort: "disabled",
				width: 200,
			},
		],
		rows:
			rows.length === 0
				? [
						{
							batch: "Tidak ada data",
							nprfi: "",
							jmlhtitik: "",
							tglmulai: "",
							tglselesai: "",
							act: "",
						},
				  ]
				: rows,
	};

	return (
		<React.Fragment>
			<ModalPreviewDoc
				dataModalDoc={dataModalDoc}
				modalDoc={modalDoc}
				toggleModalDoc={toggleModalDoc}
			/>
			<Card
				style={{
					boxShadow: "0px 0px 10px #D3D3D3",
					paddingBottom: "30px",
					paddingTop: "20px",
				}}
			>
				<CardBody>
					{rows.length === 0 ? (
						<div>
							<h1>
								<Skeleton />
							</h1>
							<Skeleton count={10} />
						</div>
					) : (
						<div>
							<MDBDataTable
								className="text-center font-size-12"
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
						</div>
					)}
				</CardBody>
			</Card>
		</React.Fragment>
	);
};

export default SMVTable;
