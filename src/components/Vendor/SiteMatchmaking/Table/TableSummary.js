import React, { useEffect, useState, useContext } from "react";
// import { useHistory } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import { Button, Row, Col } from "reactstrap";
// import Skeleton from "react-loading-skeleton";
import "./datatables.scss";
import Skeleton from "react-loading-skeleton";
import styles from "./style.module.css";
import ModalPenawaranSMV from "../Modal/ModalPenawaran";
import ModalGanttChart from "../Modal/ModalGanttChart";
import API from "../../../../services";
import { useParams } from "react-router-dom";
import MapIcon from "../../../../assets/images/MapIcon.svg";

const SMVTableSummary = (props) => {
	let { id, judul } = useParams();
	const [rows, setRows] = useState([]);
	const [dataBatch, setDataBatch] = useState({});
	const [modalGanttChart, setModalGanttChart] = useState(false);

	let toggleGanttChart = (i) => {
		setModalGanttChart(!modalGanttChart);
		setDataBatch(i);
	};

	let resetTable = () => {
		setRows([]);
	};

	//Create Data for Row
	function createData(kt, loc, prov, kk, kec, des, lng, lat, act) {
		return { kt, loc, prov, kk, kec, des, lng, lat, act };
	}

	async function fetchDataTable() {
		const role = window.localStorage.getItem("companyId");
		const batch_id = window.localStorage.getItem("batch_id");
		const user_id = window.localStorage.getItem("userId");
		await API.postVendorSMSummary({
			penyedia: role,
			batch: batch_id,
			user: user_id,
		})
			.then((res) => {
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
							// act: "",
						},
					]);
				} else {
					let rowsData = [];
					let dats = res.data.values;
					console.log("datss", dats);
					setDataBatch(dats[0]);
					if (dats.length === 0) {
						setRows([
							{
								kt: "Belum Melakukan Penawaran",
								prov: "",
								kk: "",
								kec: "",
								des: "",
								lng: "",
								lat: "",
								// act: "",
							},
						]);
					} else {
						for (let i of dats) {
							let act = "";
							// act = (
							// 	<Row>
							// 		<Col xs="12" xl="12">
							// 			<Button
							// 				className={styles.buttonSummarySMV}
							// 				key={i.id}
							// 				onClick={() => toggleGanttChart(i)}
							// 			>
							// 				Gantt Chart
							// 			</Button>
							// 		</Col>
							// 	</Row>
							// );
							rowsData.push(
								createData(
									i?.unik_id,
									i?.nama,
									i?.provinsi_name,
									i?.kabupaten_name,
									i?.kecamatan_name,
									i?.desa_kelurahan_name,
									i?.longitude,
									i?.latitude,
									// act
								)
							);
						}
						setRows(rowsData);
					}
				}
			})
			.catch((err) => {
				console.log(err);
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
						// act: "",
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

	const data = {
		columns: [
			{
				label: "Kode Titik",
				field: "kt",
				sort: "asc",
				width: 200,
			},
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
			// {
			// 	label: "",
			// 	field: "act",
			// 	sort: "disabled",
			// 	width: 200,
			// },
		],
		rows:
			rows.length === 0
				? [
						{
							jamtayang: "",
							durasi: "",
							video: "",
							banner: "",
							berita: "",
						},
				  ]
				: rows,
	};

	return (
		<React.Fragment>
			<ModalGanttChart
				modalGanttChart={modalGanttChart}
				toggleGanttChart={() => toggleGanttChart(dataBatch)}
				dataBatch={dataBatch}
			></ModalGanttChart>

			{rows.length === 0 ? (
				<div>
					<h1>
						<Skeleton />
					</h1>
					<Skeleton count={10} />
				</div>
			) : (
				<MDBDataTable
					className="text-center"
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
			)}
			{/* </CardBody> */}
			{/* </Card> */}
		</React.Fragment>
	);
};

export default SMVTableSummary;
