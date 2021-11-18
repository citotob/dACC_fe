import React, { useState, useRef, useEffect } from "react";
import { MDBDataTable } from "mdbreact";
import {
	Row,
	Col,
	Card,
	CardBody,
	Modal,
	ModalHeader,
	FormGroup,
	Label,
} from "reactstrap";
import Skeleton from "react-loading-skeleton";
import Filter from "../../../Filter/FilterTable";
import moment from "moment";
import { useHistory } from "react-router-dom";
// import MapIcon from "../../../../assets/images/MapIcon.svg";
// import MailIcon from "../../../../assets/images/MailIcon.svg";
import DetailIcon from "../../../../assets/images/DetailIcon.svg";
import EditBatch from "../Modal/EditBatch";
import API from "../../../../services";
import InvitationSM from "../Modal/InvitationSM";
import ReactTooltip from "react-tooltip";
import summaryIcon from "../../../../assets/icons/summaryIcon.svg";

import "./style.css";

const BatchTable = (props) => {
	const searchRef = useRef();
	const [search, setSearch] = useState("");
	const [rows, setRows] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const history = useHistory();

	const [reset, setReset] = useState(true);
	function resetTable() {
		setReset(!reset);
	}
	const filterData = (item) => {
		props.handleData(item);
	};
	useEffect(() => {
		filterData(items);
	}, [search]);

	var items = [];
	if (rows.length > 0) {
		items = rows.filter((data) => {
			if (search === "") return data;
			const index = [
				data.judul,
				data.type,
				data.tech_type,
				data.no_doc_permohonan_rfi,
				moment(data.tanggal_mulai_undangan).format("DD/MM/YYYY").toString(),
				moment(data.tanggal_selesai_undangan).format("DD/MM/YYYY").toString(),
				data.status[data.status.length - 1].status,
			];
			if (
				Filter.byIndex({
					index: index,
					search: search,
				})
			) {
				return data;
			}
		});
	}

	const handleSearch = () => {
		const searchValue = searchRef.current.value;
		setSearch(searchValue);
	};

	useEffect(() => {
		async function fetchAllBatch() {
			setIsLoading(true);
			await API.getAllBatch()
				.then((res) => {
					// console.log(res.data.values)
					setIsLoading(false);
					filterData(res.data.values);
					setRows(res.data.values);
				})
				.catch((e) => {
					setIsLoading(false);
					// console.log(e.message);
				});
		}
		fetchAllBatch();
	}, [reset]);

	//modal summary
	const [modalSummaryOpen, setmodalSummaryOpen] = useState(false);
	const toggleModalSummary = () => setmodalSummaryOpen((prev) => !prev);
	const [judulBatch, setjudulBatch] = useState("");
	const [mulaiUndangan, setmulaiUndangan] = useState("");
	const [selesaiUndangan, setselesaiUndangan] = useState("");
	const [mulaiKerja, setmulaiKerja] = useState("");
	const [selesaiKerja, setselesaiKerja] = useState("");
	const [noSurat, setnoSurat] = useState("");
	const [teknologi, setteknologi] = useState("");
	const [sitesData, setsitesData] = useState("");
	const [dataInvitation, setdataInvitation] = useState("");
	const [rfi_score, setrfi_score] = useState("");
	const [bobotPrice, setbobotPrice] = useState("");
	const [bobotTeam, setbobotTeam] = useState("");
	const [bobotVP, setbobotVP] = useState("");

	const ModalSummary = (props) => {
		const { buttonLabel, className } = props;

		return (
			<div>
				<Modal
					isOpen={modalSummaryOpen}
					toggle={toggleModalSummary}
					className={className}
					centered
				>
					<ModalHeader toggle={toggleModalSummary}></ModalHeader>
					<div className="ml-4 mt-4">
						<Row className="w-100 position-relative">
							<div
								className="position-absolute"
								style={{
									left: "50%",
									transform: "translateX(-50%)",
									top: "-60px",
									fontSize: "16px",
									fontWeight: "bold",
								}}
							>
								Summary
							</div>
						</Row>
						<Row>
							<Col lg="12">
								<FormGroup>
									<Label for="basicpill-firstname-input14">
										Judul Batch :{" "}
										<span className={"text-muted"}>
											{judulBatch ? judulBatch : ""}
										</span>
									</Label>
								</FormGroup>
							</Col>
						</Row>

						<Row>
							<Col lg="12">
								<FormGroup>
									<Label for="basicpill-phoneno-input16">
										Durasi Undangan batch :{" "}
										<span className={"text-muted"}>
											{mulaiUndangan
												? moment(mulaiUndangan).format("DD/MM/YYYY").toString()
												: ""}
										</span>{" "}
										sampai{" "}
										<span className={"text-muted"}>
											{selesaiUndangan
												? moment(selesaiUndangan)
														.format("DD/MM/YYYY")
														.toString()
												: ""}
										</span>
									</Label>
								</FormGroup>
							</Col>
						</Row>

						<Row>
							<Col lg="12">
								<FormGroup>
									<Label for="basicpill-phoneno-input16">
										Durasi Pengerjaan batch :{" "}
										<span className={"text-muted"}>
											{mulaiKerja
												? moment(mulaiKerja).format("DD/MM/YYYY").toString()
												: ""}
										</span>{" "}
										sampai{" "}
										<span className={"text-muted"}>
											{selesaiKerja
												? moment(selesaiKerja).format("DD/MM/YYYY").toString()
												: ""}
										</span>
									</Label>
								</FormGroup>
							</Col>
						</Row>

						{/* <Row>
				<Col lg="12">
					<FormGroup>
						<Label for="basicpill-phoneno-input16">
							Tipe Batch :{" "}
							<span className={"text-muted"}>{tipe ? tipe : ""}</span>
						</Label>
					</FormGroup>
				</Col>
			</Row> */}

						<Row>
							<Col lg="12">
								<FormGroup>
									<Label for="basicpill-phoneno-input16">
										Nomor Surat Permohonan RFI :{" "}
										<span className={"text-muted"}>
											{noSurat ? noSurat : ""}
										</span>
									</Label>
								</FormGroup>
							</Col>
						</Row>

						{/* <Row>
				<Col lg="12">
					<FormGroup>
						<Label for="basicpill-phoneno-input16">
							Sewa Jasa/Belanja Modal:{" "}
							<span className={"text-muted"}>
								{sewaBelanja
									? sewaBelanja == "0"
										? "Sewa Jasa"
										: "Belanja Modal"
									: ""}
							</span>
						</Label>
					</FormGroup>
				</Col>
			</Row> */}

						<Row>
							<Col lg="12">
								<FormGroup>
									<Label for="basicpill-phoneno-input16">
										Teknologi:{" "}
										<span className={"text-muted"}>
											{teknologi[0] === "UNDEFINED"
												? "Belum Terdefinisi"
												: teknologi ?? ""}
										</span>
									</Label>
								</FormGroup>
							</Col>
						</Row>

						{/* <Row>
				<Col lg="12">
					<FormGroup>
						<Label for="basicpill-phoneno-input16">
							Price Expectation:{" "}
							<span className={"text-muted"}>{price ? price : ""}</span>
						</Label>
					</FormGroup>
				</Col>
			</Row> */}

						<Row>
							<Col lg="12">
								<FormGroup>
									<Label for="basicpill-phoneno-input16">
										TOTAL SITES :{" "}
										<span className={"text-muted"}>{sitesData.length}</span>
									</Label>
								</FormGroup>
							</Col>
						</Row>

						<Row>
							<Col lg="12">
								<FormGroup>
									<Label for="basicpill-phoneno-input16">
										TOTAL VENDOR DIUNDANG :{" "}
										<span className={"text-muted"}>
											{dataInvitation.length}
										</span>
									</Label>
								</FormGroup>
							</Col>
						</Row>
						<Row>
							<Col lg="12">
								<FormGroup>
									<Label for="basicpill-phoneno-input16">
										RFI SCORING METHOD : Durasi : {rfi_score}%, VP : {bobotVP}%,
										Price : {bobotPrice}%, Team : {bobotTeam}%
									</Label>
								</FormGroup>
							</Col>
						</Row>

						{/* <Row>
				<Col lg="12">
					<MDBDataTable
						className="text-center align-middle font-size-10"
						responsive
						striped
						bordered
						searching={false}
						displayEntries={false}
						info={false}
						paging={false}
						// entries={10} //How much data that you want to show in 1 table
						// disableRetreatAfterSorting //Show red Warning after use
						data={dataSites}
						noBottomColumns
					/>
				</Col>
			</Row> */}

						{/* <Row>
				<Col lg="12">
					<Label for="basicpill-phoneno-input16">
						DOKUMEN : {" "}
						{docUrl
							? 	<Label>
									<a href={docUrl} rel="noopener noreferrer" target="_blank">See Uploaded File</a>
								</Label>
							: 	<div></div>
						}
					</Label>
				</Col>
			</Row> */}
					</div>
				</Modal>
			</div>
		);
	};

	const data = {
		columns: [
			{
				label: "Batch",
				field: "batch",
				width: 300,
				attributes: {
					"aria-controls": "DataTable",
					"aria-label": "Name",
				},
				sort: "asc",
			},
			// {
			// 	label: "Tipe Batch ",
			// 	field: "tipe",
			// 	width: 300,
			// 	sort: "asc",
			// },
			{
				label: "No Surat Permintaan RFI",
				field: "no_doc_permohonan_rfi",
				width: 300,
				sort: "asc",
			},
			{
				label: "Tanggal Dimulai",
				field: "mulai",
				width: 200,
				sort: "asc",
			},
			{
				label: "Tanggal Selesai",
				field: "selesai",
				width: 200,
				sort: "asc",
			},
			{
				label: "Status",
				field: "status",
				width: 200,
				sort: "asc",
			},
			// {
			// 	label: "Tipe Jasa ",
			// 	field: "jasa",
			// 	width: 300,
			// 	sort: "asc",
			// },
			{
				label: "Teknologi",
				field: "tech",
				width: 150,
				sort: "asc",
			},
			{
				label: "Action ",
				field: "action",
				width: 300,
				sort: "disabled",
			},
			{
				label: "Summary ",
				field: "summary",
				width: 300,
				sort: "disabled",
			},
		],
		rows:
			rows.length === 0
				? [
						{
							batch: "Tidak Ada Data",
							tipe: "",
							no_doc_permohonan_rfi: "",
							mulai: "",
							selesai: "",
							status: "",
							// jasa: "",
							tech: "",
							action: "",
							summary: "",
						},
				  ]
				: items.map((item, index) => {
						const goToDetail = () => {
							localStorage.setItem("judul_batch_admin", item.judul);
							history.push(`/admin/batch-detail/${item.id}/${item.judul}`);
						};

						// console.log("isinya item", item);
						const setSummaryItems = () => {
							setjudulBatch(item?.judul ?? "");
							setmulaiUndangan(item?.tanggal_mulai_undangan ?? "");
							setselesaiUndangan(item?.tanggal_selesai_undangan ?? "");
							setmulaiKerja(item?.tanggal_mulai_kerja ?? "");
							setselesaiKerja(item?.tanggal_selesai_kerja ?? "");
							setnoSurat(item?.no_doc_permohonan_rfi ?? "");
							setteknologi(item?.tech_type ?? "");
							setsitesData(item?.sites ?? "");
							setdataInvitation(item?.penyedia_undang ?? "");
							setrfi_score(item?.bobot_rfi ?? "");
							setbobotPrice(item?.bobot_price ?? "");
							setbobotTeam(item?.bobot_team ?? "");
							setbobotVP(item?.bobot_vp ?? "");
						};

						return {
							batch: item?.judul ?? "-",
							// tipe: item?.type ?? "-",
							no_doc_permohonan_rfi: item?.no_doc_permohonan_rfi ?? "-",
							mulai: item?.tanggal_mulai_undangan
								? `${moment(item?.tanggal_mulai_undangan, "YYYY-MM-DD").format(
										"YYYYMMDD"
								  )} 
								${moment(item?.tanggal_mulai_undangan, "YYYY-MM-DD")
									.format("DD/MM/YYYY")
									.toString()}`
								: "-",
							selesai: item?.tanggal_selesai_undangan
								? `${moment(
										item?.tanggal_selesai_undangan,
										"YYYY-MM-DD"
								  ).format("YYYYMMDD")} 
							${moment(item?.tanggal_selesai_undangan, "YYYY-MM-DD")
								.format("DD/MM/YYYY")
								.toString()}`
								: "-",
							status: item?.status[item?.status.length - 1]?.status ?? "-",
							// jasa: item.buying_type == 1 ? "Belanja Modal" : "Sewa Jasa",
							tech: item?.tech_type ?? "-",
							action: [
								<Row
									key={index}
									style={{
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
									}}
								>
									{item?.status[item?.status.length - 1]?.status ===
									"Selesai" ? (
										""
									) : (
										<Col md="4" lg="4" xl="4">
											<EditBatch
												batch_id={item?.id}
												batch_title={item?.judul}
												resetTable={() => resetTable()}
											/>
										</Col>
									)}
									{item?.status[item?.status.length - 1].status ===
									"Selesai" ? (
										""
									) : (
										<Col md="4" lg="4" xl="4">
											<InvitationSM
												batch_id={item?.id}
												batch_title={item?.judul}
												showModalSuccess={props.showModalSuccess}
												item={item}
											/>
										</Col>
									)}
									<Col md="4" lg="4" xl="4">
										<a
											key={item?.id}
											onClick={goToDetail}
											data-tip="Batch Detail"
										>
											<img
												src={DetailIcon}
												alt={item?.id}
												style={{ marginTop: "5px", marginRight: "5px" }}
											/>
											{/* Tooltip */}
											<ReactTooltip place="left" />
										</a>
									</Col>
								</Row>,
							],
							summary: [
								<Row
									key={index}
									style={{
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
									}}
								>
									<Col md="4" lg="4" xl="4">
										<a
											key={item?.id}
											onClick={toggleModalSummary}
											data-tip="Summary Detail"
										>
											<img
												src={summaryIcon}
												onClick={() => setSummaryItems()}
												alt={item?.id}
												style={{ height: "20px", marginTop: "8px" }}
											/>
											{/* Tooltip */}
											<ReactTooltip place="left" />
										</a>
									</Col>
								</Row>,
							],
						};
				  }),
	};

	return (
		<Card>
			<CardBody>
				<ModalSummary />
				{isLoading ? (
					<div>
						<h1>
							<Skeleton />
						</h1>
						<Skeleton count={10} />
					</div>
				) : (
					<div>
						<div className="d-flex ml-auto my-3" style={{ width: "30%" }}>
							<input
								placeholder="Cari..."
								ref={searchRef}
								className="form-control"
								onChange={handleSearch}
								type="text"
							/>
						</div>
						<div style={{ whiteSpace: "pre-line" }}>
							<MDBDataTable
								id="TableKontenSMMAdmin"
								className="text-center"
								responsive
								striped
								bordered
								searching={false}
								displayEntries={false}
								info={false}
								entries={8} //How much data that you want to show in 1 table
								disableRetreatAfterSorting //Show red Warning after use
								data={data || data}
							/>
						</div>
					</div>
				)}
			</CardBody>
		</Card>
	);
};

export default BatchTable;
