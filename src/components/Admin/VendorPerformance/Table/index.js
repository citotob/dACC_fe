import React, { useEffect, useState } from "react";
// import { useHistory } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import { Row, Col, Card, CardBody, Button } from "reactstrap";
import Skeleton from "react-loading-skeleton";
import "./datatables.scss";
import moment from "moment";
import styles from "./style.module.css";
import ModalUpdateNilai from "../Modal/updateNilai";

import API from "../../../../services";

const VendorPerformanceTable = (props) => {
	const [modalUpdate, setModalUpdate] = useState(false);
	const [dataUpdate, setDataUpdate] = useState({});
	const [rows, setRows] = useState([]);

	let toggleUpdate = (i) => {
		setDataUpdate(i);
		setModalUpdate(!modalUpdate);
	};

	let resetTable = () => {
		setRows([]);
	};

	//Create Data for Row
	function createData(np, tpt, ket, kua, kec, avg, act) {
		return { np, tpt, ket, kua, kec, avg, act };
	}

	async function fetchDataTable() {
		API.getVPAll()
			.then((res) => {
				if (res.data.values.length === 0) {
					setRows([
						{
							np: "Tidak ada data",
							tpt: "",
							ket: "",
							kua: "",
							kec: "",
							avg: "",
							act: "",
						},
					]);
				} else {
					let rowsData = [];
					const json = res.data;
					for (let i of json.values) {
						let act = "";
						let ketepatan = 0;
						let kualitas = 0;
						let kecepatan = 0;
						if (i.nilai.length === 0) {
							ketepatan = 0;
							kualitas = 0;
							kecepatan = 0;
						} else {
							for (let n of i.nilai) {
								ketepatan = ketepatan + n.ketepatan;
								kualitas = kualitas + n.kualitas;
								kecepatan = kecepatan + n.kecepatan;
							}
						}
						act = (
							/* eslint-disable */
							<Button
								className={styles.buttonUpdatePerformance}
								key={i.id}
								onClick={() => toggleUpdate(i)}
							>
								Update
							</Button>
						);
						rowsData.push(
							createData(
								i.name,
								i.nilai.length === 0
									? "-"
									: `${moment(i.nilai[0].created_at).format("DD/MM/YYYY")}`,
								i.nilai.length === 0
									? "-"
									: (ketepatan / i.nilai.length).toFixed(2).replace(".", ","),
								i.nilai.length === 0
									? "-"
									: (kualitas / i.nilai.length).toFixed(2).replace(".", ","),
								i.nilai.length === 0
									? "-"
									: (kecepatan / i.nilai.length).toFixed(2).replace(".", ","),
								i.nilai.length === 0
									? "-"
									: (
											(ketepatan / i.nilai.length +
												kualitas / i.nilai.length +
												kecepatan / i.nilai.length) /
											3
									  )
											.toFixed(2)
											.replace(".", ","),
								act
							)
						);
					}
					setRows(rowsData);
				}
			})
			.catch((err) => {
				console.log(err);
				setRows([
					{
						np: "Terjadi Kesalahan",
						tpt: "",
						ket: "",
						kua: "",
						kec: "",
						avg: "",
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

	const data = {
		columns: [
			{
				label: "Nama Penyedia",
				field: "np",
				sort: "asc",
				width: 200,
			},
			{
				label: "Tanggal Penilaian Terakhir",
				field: "tpt",
				sort: "asc",
				width: 200,
			},
			{
				label: "Ketepatan",
				field: "ket",
				sort: "asc",
				width: 200,
			},
			{
				label: "Kualitas",
				field: "kua",
				sort: "asc",
				width: 200,
			},
			{
				label: "Kecepatan",
				field: "kec",
				sort: "asc",
				width: 200,
			},
			{
				label: "Average",
				field: "avg",
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
		rows:
			rows.length === 0
				? [
						{
							np: "Terjadi Kesalahan",
							tpt: "",
							ket: "",
							kua: "",
							kec: "",
							avg: "",
							act: "",
						},
				  ]
				: rows,
	};

	return (
		<React.Fragment>
			<ModalUpdateNilai
				modalUpdate={modalUpdate}
				toggleUpdate={() => toggleUpdate(dataUpdate)}
				data={dataUpdate}
				resetTable={() => resetTable()}
			></ModalUpdateNilai>

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
						<MDBDataTable
							id="tableVendorPerformance"
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
				</CardBody>
			</Card>
		</React.Fragment>
	);
};

export default VendorPerformanceTable;
