import React, { useContext, useEffect, useState } from "react";
// import { LocalContext } from "../LocalContext";
import {
	Row,
	Col,
	FormGroup,
	Label,
	Input,
	UncontrolledTooltip,
} from "reactstrap";
import moment from "moment";
import ModalGanttChartPenawaran from "../Modal/ModalGanttPenawaran";

import { MDBDataTable } from "mdbreact";

import { getDoc } from "../../../../store/actions";
import { useDispatch } from "react-redux";
import _ from "lodash";
import ModalBantuan from "../Modal/ModalBantuan";

const Summary = (props) => {
	let dispatch = useDispatch();
	var sitesData = JSON.parse(localStorage.getItem("tempXcl") || "[]");
	const siteListA = sitesData.map((data) => {
		return { ...data };
	});

	let tempTT = [];
	sitesData.forEach((element) => {
		tempTT.push(element?.team);
	});
	const totalTeam = Array.from(new Set(tempTT));

	const durasiAwal = _.first(
		_.sortBy(sitesData, (e) => e.tanggal_awal_penawaran)
	)?.tanggal_awal_penawaran;
	const durasiAkhir = _.last(
		_.sortBy(sitesData, (e) => e.tanggal_akhir_penawaran)
	)?.tanggal_akhir_penawaran;

	const [modalGantt, setModalGantt] = useState(false);

	const toggleGantt = () => {
		setModalGantt(!modalGantt);
	};

	const penawaran = [];
	let count = 0;

	if (siteListA.length > 0) {
		for (let i of siteListA) {
			count = count + 1;
			penawaran.push(
				<Row key={i.siteunikid + count}>
					<Col>
						<span className={"text-muted"}>
							• {i.siteunikid + " (" + i.sitenama + ")"}
						</span>
					</Col>
				</Row>
			);
		}
	} else {
		penawaran.push(
			<Row key={"nodata"}>
				<Col>
					<span className={"text-muted"}>{"-"}</span>
				</Col>
			</Row>
		);
	}

	const dataSites = {
		columns: [
			{
				label: "Site ID",
				field: "siteunikid",
				sort: "asc",
				width: 200,
			},
			{
				label: "Nama Site",
				field: "sitenama",
				sort: "asc",
				width: 200,
			},
			{
				label: "Tanggal Mulai",
				field: "tanggal_mulai_material_w",
				sort: "asc",
				width: 200,
			},
			{
				label: "Tanggal Selesai",
				field: "tanggal_selesai_installation",
				sort: "asc",
				width: 200,
			},
			{
				label: "Team",
				field: "team",
				sort: "asc",
				width: 200,
			},
		],
		rows:
			sitesData.length !== 0
				? sitesData.map((i) => ({
						siteunikid: i?.siteunikid ?? "",
						sitenama: i?.sitenama ?? "",
						tanggal_mulai_material_w: i?.tanggal_mulai_material_w ?? "",
						tanggal_selesai_installation: i?.tanggal_selesai_installation ?? "",
						team: i?.team ?? "",
				  }))
				: [],
	};

	// modal bantuan (bawaan upload document)
	let [modalBantuan, setModalBantuan] = useState(false);
	const showModalBantuan = () => {
		setModalBantuan(true);
	};
	const closeModalBantuan = () => {
		setModalBantuan(false);
	};
	const toggleModalBantuan = () => {
		setModalBantuan(!modalBantuan);
	};

	return (
		<div>
			<ModalBantuan
				modalBantuan={modalBantuan}
				showModalBantuan={showModalBantuan}
				closeModalBantuan={closeModalBantuan}
				toggleModalBantuan={toggleModalBantuan}
			/>
			<ModalGanttChartPenawaran modal={modalGantt} toggle={toggleGantt} />
			<Row>
				<Col lg="12">
					<FormGroup>
						<Row>
							<Col>Judul Batch : </Col>
							<Col>
								<span className={"text-muted"}>
									{siteListA[0] ? siteListA[0].batchname : "-"}
								</span>
							</Col>
						</Row>
					</FormGroup>
				</Col>
			</Row>

			{/* <Row>
				<Col lg="12">
					<FormGroup>
						<Row>
							<Col>Penawaran : </Col>
							<Col>{penawaran}</Col>
						</Row>
					</FormGroup>
				</Col>
			</Row> */}

			{props.responsed ? (
				<div></div>
			) : (
				<Row>
					<Col lg="12">
						<FormGroup>
							<Row>
								<Col lg="6">Durasi Pengerjaan : </Col>
								<Col lg="6">
									<span className={"text-muted"}>
										{durasiAwal ? moment(durasiAwal).format("DD/MM/YYYY") : "-"}
									</span>{" "}
									sampai{" "}
									<span className={"text-muted"}>
										{durasiAkhir
											? moment(durasiAkhir).format("DD/MM/YYYY")
											: "-"}
									</span>
								</Col>
							</Row>
						</FormGroup>
					</Col>
				</Row>
			)}

			<Row>
				<Col lg="12">
					<FormGroup>
						<Row>
							<Col lg="6">Jumlah Team : </Col>
							<Col lg="6">{totalTeam.length}</Col>
						</Row>
					</FormGroup>
				</Col>
			</Row>

			<Row>
				<Col lg="12">
					<MDBDataTable
						className="text-center align-middle font-size-10"
						responsive
						striped
						bordered
						searching={false}
						displayEntries={false}
						info={false}
						paging={true}
						entries={5} //How much data that you want to show in 1 table
						// disableRetreatAfterSorting //Show red Warning after use
						data={dataSites}
						noBottomColumns
					/>
				</Col>
			</Row>

			{/* <Row>
				<Col lg="12">
					<FormGroup>
						<Label for="basicpill-firstname-input14">
							Unggah Dokumen Penunjang <span id="tooltipHelp" className='mdi mdi-help-circle-outline' style={{cursor:'pointer'}} onClick={()=>showModalBantuan()}/>
							<UncontrolledTooltip placement="right" target="tooltipHelp">
								klik untuk membuka bantuan
							</UncontrolledTooltip>
						</Label>
						<Input
							type="file"
							className="form-control"
							name="dokumen"
							accept="application/pdf"
							onChange={(e) => {
								// console.log("file", e.target.files[0])
								dispatch(getDoc(e.target.files[0]));
							}}
							style={{
								display: "flex",
								justifyItems: "center",
								alignItems: "center",
								height: "43px",
							}}
						/>
					</FormGroup>
				</Col>
			</Row> */}

			{/* {props.responsed ? 
				(
					<div></div>
				) : (
					<Row>
						<Col lg="12">
							<Row>
								<Col lg="6">Dokumen yang di upload : </Col>
								<Col lg="6">
									{docUrl 
										? 	<a href={docUrl} rel="noopener noreferrer" target="_blank">See Uploaded File</a>
										: 	<div></div>
									}
								</Col>
							</Row>
						</Col>
					</Row>
				)
			} */}
		</div>
	);
};

export default Summary;
