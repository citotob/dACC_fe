import React, { useEffect, useState, useContext } from "react";
import { MDBDataTable } from "mdbreact";
import { Row, Col, Button } from "reactstrap";
import { LocalContext } from "../LocalContext";
import "../../VendorPerformance/Table/datatables.scss";
import { MDBContainer, MDBModal, MDBModalBody, MDBModalHeader } from "mdbreact";
import styles from "./style.module.css";

const SiteMatchmakingTable = (props) => {
	// const userid = localStorage.getItem("userId");
	// const { db, siteList } = useContext(LocalContext);
	var sitesData = JSON.parse(localStorage.getItem("sitesData") || "[]");
	const [resetT, setResetT] = useState(false);
	const resetTable = () => {
		setResetT(!resetT);
	};

	const DeleteButton = ({ unikid }) => {
		const [toggle, setToggle] = useState(false);
		const displayToggle = () => {
			setToggle((prevState) => !prevState);
		};

		function removeTask() {
			var sitesData = JSON.parse(localStorage.getItem("sitesData") || "[]");
			var removeIndex = sitesData.map((item) => item.unikid).indexOf(unikid);
			sitesData.splice(removeIndex, 1);
			localStorage.setItem("sitesData", JSON.stringify(sitesData));
			displayToggle();
			resetTable();
		}
		return (
			<div>
				<Button onClick={displayToggle} size={"sm"} className={"ml-2"}>
					Delete
				</Button>
				<MDBContainer>
					<MDBModal
						size="lg"
						isOpen={toggle}
						toggle={displayToggle}
						centered={true}
					>
						<MDBModalHeader toggle={displayToggle}>Delete Site</MDBModalHeader>
						<MDBModalBody>
							<center className="container-popup">
								<div className={styles.text}>
									Anda Yakin Untuk Menghapus Site ini?
								</div>
								<Row>
									<Col xs={{ size: 4, offset: 2 }}>
										<Button
											color=""
											className={styles.btn_nope}
											onClick={displayToggle}
										>
											Tidak
										</Button>
									</Col>
									<Col xs="4">
										<Button
											color=""
											className={styles.btn_confirm}
											onClick={removeTask}
										>
											Ya
										</Button>
									</Col>
								</Row>
							</center>
						</MDBModalBody>
					</MDBModal>
				</MDBContainer>
			</div>
		);
	};

	const [rows, setRows] = useState([]);
	const siteListA = sitesData.map((data) => {
		return { ...data, act: <DeleteButton unikid={data.unikid} /> };
	});
	async function fetchDataTable() {
		let dataRows = [];
		for (let i of siteListA) {
			dataRows.push({
				unikid: i?.unikid,
				location: i?.location,
				provinsi: typeof i?.provinsi === "object" ? i?.provinsi?.nama : i?.provinsi,
				kabupatenKota:
					typeof i?.kabupatenKota === "object"
						? i?.kabupatenKota?.nama
						: i?.kabupatenKota,
				kecamatan:
					typeof i?.kecamatan === "object" ? i?.kecamatan?.nama : i?.kecamatan,
				kelurahanDesa:
					typeof i?.kelurahanDesa === "object"
						? i?.kelurahanDesa?.nama
						: i?.kelurahanDesa,
				latitude: i?.latitude,
				longitude: i?.longitude,
				act: i?.act,
			});
		}
		setRows(dataRows);
	}

	useEffect(() => {
		fetchDataTable();
		props.refresh();
		if (sitesData.length === 0) {
			localStorage.setItem("typeInput", "");
		}
	}, [props.reset, resetT]);

	const data = {
		columns: [
			{
				label: "UNIK-ID",
				field: "unikid",
				sort: "asc",
				width: 200,
			},
			{
				label: "Nama lokasi",
				field: "location",
				sort: "asc",
				width: 200,
			},
			{
				label: "Provinsi",
				field: "provinsi",
				sort: "asc",
				width: 200,
			},
			{
				label: "Kabupaten/Kota",
				field: "kabupatenKota",
				sort: "asc",
				width: 200,
			},
			{
				label: "Kecamatan",
				field: "kecamatan",
				sort: "asc",
				width: 200,
			},
			{
				label: "Kelurahan/Desa",
				field: "kelurahanDesa",
				sort: "asc",
				width: 200,
			},
			// {
			// 	label: "Latitude",
			// 	field: "latitude",
			// 	sort: "asc",
			// 	width: 200,
			// },
			// {
			// 	label: "Longitude",
			// 	field: "longitude",
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

	return (
		<React.Fragment>
			<MDBDataTable
				className="text-center align-middle font-size-12"
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
		</React.Fragment>
	);
};

export default SiteMatchmakingTable;
