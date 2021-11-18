import React, { useEffect, useState } from "react";
import {
	MDBContainer,
	MDBModal,
	MDBModalBody,
	MDBModalHeader,
	MDBDataTable,
	MDBNavLink,
} from "mdbreact";
import { Col, Row, Input, Button, Modal, ModalBody } from "reactstrap";
import styles from "./style.module.css";
import Skeleton from "react-loading-skeleton";
import PDFIcon from "../../../../assets/images/PdfIcon.svg";
import "./style.css";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { exportPDF } from "../../../Admin/Download/PenilaianRFI/DownloadPDF";
import DownloadXLS from "../../../Admin/Download/PenilaianRFI/DownloadXLS";
import ModalPreviewDoc from "./PreviewDocs";
import moment from "moment";
import _ from "lodash";
import API from "../../../../services";

function LihatVendor(props) {
	// console.log('data table nya',props.data.rfi_score[0].vendor_app.vp_score_id.doc)
	const [modalDownloadPDF, setModalDownloadPDF] = useState(false);
	const [modalDownloadXLS, setModalDownloadXLS] = useState(false);
	const [modalDoc, setModalDoc] = useState(false);
	const [dataModalDoc, setDataModalDoc] = useState({});
	const [loading, setLoading] = useState(false);

	const toggleDownloadPDF = () => {
		setModalDownloadPDF(!modalDownloadPDF);
	};

	const toggleDownloadXLS = () => {
		setModalDownloadXLS(!modalDownloadXLS);
	};

	const [rows, setRows] = useState([]);

	const handleDownloadPDF = () => {
		setModalDownloadPDF(!modalDownloadPDF);
		exportPDF(rows, props.data.siteid.unik_id);
	};

	const toggleModalDoc = () => {
		setModalDoc(!modalDoc);
	};

	const handleModalDoc = (it) => {
		// console.log(it)
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

	async function fetchDataTable() {
		setLoading(true);
		API.getSMMSiteSummaryDetail(props.data.id)
			.then((res) => {
				console.log(res);
				if (res.data.success) {
					if (res.data.values.rfi_score.length === 0) {
						setRows([]);
					} else {
						let rowsData = [];

						///Get if there's only 1 FO
						let cekFO = [];
						res.data.values.rfi_score.map((e) => {
							return cekFO.push(e?.n_teknologi);
						});
						let countFO = 0;
						cekFO.forEach((e) =>
							e == 100.0 ? (countFO = countFO + 1) : (countFO = countFO)
						);
						for (let i of res.data.values.rfi_score) {
							// console.log((res.data.values.rfi_score.length === 1 && i.rekomendasi_teknologi === 'FO'));

							let act = "";
							act = (
								// <a key={i.id} href="#">
								//     <img src={PDFIcon} alt={i.id}/>
								// </a>
								<DokPenunjang it={i?.vendor_app?.rfi_doc} />
							);

							rowsData.push({
								naven: i?.vendor_name,
								kelogi: countFO === 1 ? i?.n_teknologi : "N/A",
								duper: countFO === 1 ? "N/A" : i?.n_rfi,
								harga: countFO === 1 ? "N/A" : i?.n_harga,
								score: countFO === 1 ? "N/A" : i?.n_vp,
								team: countFO === 1 ? "N/A" : i?.n_team,
								nilai: i?.total_scoring ?? "N/A",
								act: act,
								rank: i?.ranking,
							});
						}
						let sortByNilai = _.sortBy(rowsData, ["rank"]);

						setRows(sortByNilai);
						setLoading(false);
					}
				} else {
					setRows([]);
					setLoading(false);
				}
			})
			.catch((e) => {
				console.log(e?.response?.message);
				setRows([]);
				setLoading(false);
			});
	}

	useEffect(() => {
		if (props?.data?.id) {
			fetchDataTable();
		} else {
			setRows([]);
		}
	}, [props?.data?.id]);

	const data = {
		columns: [
			{
				label: "Rank",
				field: "rank",
				sort: "asc",
				width: 200,
			},
			{
				label: "Nama Vendor",
				field: "naven",
				sort: "asc",
				width: 200,
			},
			{
				label: "Scoring Ketepatan Teknologi",
				field: "kelogi",
				sort: "asc",
				width: 200,
			},
			{
				label: `Scoring Kecepatan Timeline Pembangunan (${props.dataBatch.bobot_rfi}%)`,
				field: "duper",
				sort: "asc",
				width: 200,
			},
			{
				label: `Scoring Tim (${props.dataBatch.bobot_team}%)`,
				field: "team",
				sort: "asc",
				width: 200,
			},
			{
				label: `Scoring Harga (${props.dataBatch.bobot_price}%)`,
				field: "harga",
				sort: "asc",
				width: 200,
			},
			{
				label: `Scoring VP (${props.dataBatch.bobot_vp}%)`,
				field: "score",
				sort: "asc",
				width: 200,
			},
			{
				label: "Total Scoring",
				field: "nilai",
				sort: "asc",
				width: 200,
			},
			{
				label: "",
				field: "act",
				sort: "disabled",
				width: 200,
			},
		],
		rows: rows,
	};

	return (
		<>
			{props?.data && (
				<MDBContainer>
					<MDBModal
						// size="lg"
						isOpen={props.modal}
						toggle={props.toggleModal}
						centered={true}
						className="modal-xl"
					>
						<MDBModalHeader className="d-flex justify-content-center">
							<Col xs="12" className="text-center">Kode Titik</Col>
							<Col xs="12">{props.data.siteid.unik_id}</Col>
						</MDBModalHeader>
						<MDBModalBody>
							<Modal
								size="md"
								isOpen={modalDownloadXLS}
								toggle={toggleDownloadXLS}
								centered={true}
							>
								<MDBModalHeader toggle={toggleDownloadXLS}>
									<span className={styles.headText}>Download XLS</span>
								</MDBModalHeader>
								<ModalBody>
									<center className="container-popup">
										<div className={styles.text}>
											Anda Yakin Untuk Download XLS?
										</div>
										<Button
											color=""
											className={styles.btn_reject}
											onClick={toggleDownloadXLS}
										>
											Batal
										</Button>
										<Button
											color=""
											className={styles.btn_confirm_xls}
											onClick={toggleDownloadXLS}
										>
											<ReactHTMLTableToExcel
												id="TableXLS"
												className="DownloadTableXLSSMRFI"
												table="DownloadTableXLS"
												filename={`Penilaian_RFI_${moment(Date())
													.format("DDMMYYYY")
													.toString()}`}
												sheet="dataSMAdmin"
												buttonText="Download"
											/>
										</Button>
									</center>
								</ModalBody>
							</Modal>
							<ModalPreviewDoc
								dataModalDoc={dataModalDoc}
								modalDoc={modalDoc}
								toggleModalDoc={toggleModalDoc}
							/>
							<Modal
								size="md"
								isOpen={modalDownloadPDF}
								toggle={toggleDownloadPDF}
								centered={true}
							>
								<MDBModalHeader toggle={toggleDownloadPDF}>
									<span className={styles.headText}>Download PDF</span>
								</MDBModalHeader>
								<ModalBody>
									<center className="container-popup">
										<div className={styles.text}>
											Anda Yakin Untuk Download PDF?
										</div>
										<Button
											color=""
											className={styles.btn_reject}
											onClick={toggleDownloadPDF}
										>
											Batal
										</Button>
										<Button
											color=""
											className={styles.btn_confirm}
											onClick={handleDownloadPDF}
										>
											Download
										</Button>
									</center>
								</ModalBody>
							</Modal>
							<div className="container-fluid">
								{/* <div style={{display:'flex', width:"100%", justifyContent:'flex-end'}}>
                                <MDBNavLink to="#" className="textDownload">
                                    Download
                                </MDBNavLink>
                                <MDBNavLink onClick={toggleDownloadXLS} link to="#" style={{paddingRight:'0px'}}>
                                    XLS
                                </MDBNavLink>
                                <MDBNavLink onClick={toggleDownloadPDF} link to="#" style={{paddingRight:'0px'}}>
                                    PDF
                                </MDBNavLink>
                            </div> */}
								<DownloadXLS
									id="DownloadTableXLS"
									className="DownloadTableXLS"
									data={rows}
									siteid={props.data.siteid.unik_id}
								/>
								<MDBDataTable
									className="text-center align-middle"
									responsive
									striped
									bordered
									searching={false}
									displayEntries={false}
									info={false}
									entries={10} //How much data that you want to show in 1 table
									disableRetreatAfterSorting //Show red Warning after use
									data={data}
								/>
							</div>
						</MDBModalBody>
					</MDBModal>
				</MDBContainer>
			)}
		</>
	);
}
export default LihatVendor;
