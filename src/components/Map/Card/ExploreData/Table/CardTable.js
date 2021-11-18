import React, { useEffect, useState } from "react";
// import { useHistory } from "react-router-dom";
import { MDBDataTable, MDBNavLink } from "mdbreact";
import { Row, Col, Card, CardBody, Button } from "reactstrap";
import Skeleton from "react-loading-skeleton";
import "./datatables.scss";
import moment from "moment";
import "./style.css";
// import ModalUpdateNilai from "../Modal/updateNilai";

import { exportPDF } from "../Download/PDF/DownloadPDF";
import DownloadXLS from "../Download/XLS/DownloadXLS";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
// import API from "../../../../services";

const VendorPerformanceTable = (props) => {
	const [rows, setRows] = useState([]);
	const [dataDownload, setDataDownload] = useState([]);

	//handle download pdf
	const handleDownloadPDF = () => {
		exportPDF(data);
	};

	//Create Data for Row
	function createData(np, tpt, ket, kua, kec, act) {
		return { np, tpt, ket, kua, kec, act };
	}

	// async function fetchDataTable() {
	// 	API.getVPAll()
	// 		.then((res) => {
	// 			if (res.data.values.length === 0) {
	// 				setRows([
	// 					{
	// 						kode_titik: "Tidak ada data",
	// 						nama_lokasi: "",
	// 						alamat: "",
	// 						provinsi: "",
	// 						kab_kot: "",
	// 						kec: "",
	// 						desa: "",
	// 						long: "",
	// 						lat: "",
	// 					},
	// 				]);
	// 			} else {
	// 				let rowsData = [];
	// 				const json = res.data;
	// 				for (let i of json.values) {
	// 					let act = "";
	// 					act =
	// 						/* eslint-disable */
	// 						[
	// 							<Button
	// 								className={styles.buttonUpdatePerformance}
	// 								key={i.id}
	// 								onClick={() => toggleUpdate(i)}
	// 							>
	// 								Update
	// 							</Button>,
	// 						];
	// 					// rowsData.push(
	// 					// 	createData(
	// 					// 		i.vendor.name,
	// 					// 		`${moment(i.updated_at).format("DD/MM/YYYY")}`,
	// 					// 		i.ketepatan,
	// 					// 		i.kualitas,
	// 					// 		i.kecepatan,
	// 					// 		act
	// 					// 	)
	// 					// );
	// 				}
	// 				setRows(rowsData);
	// 			}
	// 		})
	// 		.catch((err) => {
	// 			console.log(err);
	// 			setRows([
	// 				{
	// 					kode_titik: "Terjadi Kesalahan",
	// 					nama_lokasi: "",
	// 					alamat: "",
	// 					provinsi: "",
	// 					kab_kot: "",
	// 					kec: "",
	// 					desa: "",
	// 					long: "",
	// 					lat: "",
	// 				},
	// 			]);
	// 		});
	// }

	// useEffect(() => {
	// 	if (rows.length === 0) {
	// 		fetchDataTable();
	// 	}
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [rows]);

	const data = {
		columns: [
			{
				label: "Kode Titik",
				field: "kode_titik",
				sort: "disabled",
				width: 200,
			},
			{
				label: "Nama Lokasi",
				field: "nama_lokasi",
				sort: "disabled",
				width: 200,
			},
			{
				label: "Alamat",
				field: "alamat",
				sort: "asdisabledc",
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
		// rows:
		// 	rows.length === 0
		// 		? [
		// 				{
		// 					kode_titik: "",
		// 					nama_lokasi: "",
		// 					alamat: "",
		// 					provinsi: "",
		// 					kab_kot: "",
		// 					kec: "",
		// 					desa: "",
		// 					long: "",
		// 					lat: "",
		// 				},
		// 		  ]
		// 		: rows,
		rows: [
			{
				kode_titik: "00001",
				nama_lokasi: "Lokasi 1",
				alamat: "JL Cilandak",
				provinsi: "DKI Jakarta",
				kab_kot: "Jakarta Selatan",
				kec: "Cilandak",
				desa: "Cilandak",
				long: "101.1111",
				lat: "1.22111",
			},
			{
				kode_titik: "00001",
				nama_lokasi: "Lokasi 1",
				alamat: "JL Cilandak",
				provinsi: "DKI Jakarta",
				kab_kot: "Jakarta Selatan",
				kec: "Cilandak",
				desa: "Cilandak",
				long: "101.1111",
				lat: "1.22111",
			},
			{
				kode_titik: "00001",
				nama_lokasi: "Lokasi 1",
				alamat: "JL Cilandak",
				provinsi: "DKI Jakarta",
				kab_kot: "Jakarta Selatan",
				kec: "Cilandak",
				desa: "Cilandak",
				long: "101.1111",
				lat: "1.22111",
			},
			{
				kode_titik: "00001",
				nama_lokasi: "Lokasi 1",
				alamat: "JL Cilandak",
				provinsi: "DKI Jakarta",
				kab_kot: "Jakarta Selatan",
				kec: "Cilandak",
				desa: "Cilandak",
				long: "101.1111",
				lat: "1.22111",
			},
			{
				kode_titik: "00001",
				nama_lokasi: "Lokasi 1",
				alamat: "JL Cilandak",
				provinsi: "DKI Jakarta",
				kab_kot: "Jakarta Selatan",
				kec: "Cilandak",
				desa: "Cilandak",
				long: "101.1111",
				lat: "1.22111",
			},
			{
				kode_titik: "00001",
				nama_lokasi: "Lokasi 1",
				alamat: "JL Cilandak",
				provinsi: "DKI Jakarta",
				kab_kot: "Jakarta Selatan",
				kec: "Cilandak",
				desa: "Cilandak",
				long: "101.1111",
				lat: "1.22111",
			},
			{
				kode_titik: "00001",
				nama_lokasi: "Lokasi 1",
				alamat: "JL Cilandak",
				provinsi: "DKI Jakarta",
				kab_kot: "Jakarta Selatan",
				kec: "Cilandak",
				desa: "Cilandak",
				long: "101.1111",
				lat: "1.22111",
			},
			{
				kode_titik: "00001",
				nama_lokasi: "Lokasi 1",
				alamat: "JL Cilandak",
				provinsi: "DKI Jakarta",
				kab_kot: "Jakarta Selatan",
				kec: "Cilandak",
				desa: "Cilandak",
				long: "101.1111",
				lat: "1.22111",
			},
		],
	};

	return (
		<React.Fragment>
			<Card
				style={{
					boxShadow: "0px 0px 10px #D3D3D3",
					paddingBottom: "30px",
					paddingTop: "20px",
					height: "100%",
				}}
			>
				<CardBody style={{ maxHeight: "100%", overflowY: "auto" }}>
					<div className="wrapperAction">
						<ReactHTMLTableToExcel
							id="TableXLS"
							className="DownloadTableXLS"
							table="DownloadTableXLS"
							filename="Conten_report"
							sheet="users"
							buttonText="XLS"
						/>
						<MDBNavLink onClick={handleDownloadPDF} link to="#">
							PDF
						</MDBNavLink>
					</div>
					<DownloadXLS
						id="DownloadTableXLS"
						className="DownloadTableXLS"
						data={dataDownload}
					/>
					{/* {rows.length === 0 ? (
						<div>
							<h1>
								<Skeleton />
							</h1>
							<Skeleton count={10} />
						</div>
					) : ( */}
					<MDBDataTable
						className="text-center"
						responsive
						striped
						bordered
						searching={true}
						displayEntries={false}
						info={false}
						noBottomColumns={true}
						paging={false}
						// entries={10} //How much data that you want to show in 1 table
						// disableRetreatAfterSorting //Show red Warning after use
						data={data}
					/>
					{/* )} */}
				</CardBody>
			</Card>
		</React.Fragment>
	);
};

export default VendorPerformanceTable;
