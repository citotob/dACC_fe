import React, { useEffect, useState } from "react";
import { MDBDataTable, MDBNavLink } from "mdbreact";
// import { Row, Col, Card, CardBody, Button } from "reactstrap";
// import { LocalContext } from "../LocalContext";
import "../../VendorPerformance/Table/datatables.scss";
import API from "../../../../services";
import Skeleton from "react-loading-skeleton";
import LihatVendor from "../Modal/LihatVendor";
import _ from "lodash";

const SiteList = (props) => {
	// const userid = localStorage.getItem("userId");
	const [rows, setRows] = useState([]);
	const [dataLihatVendor, setDataLihatVendor] = useState("");
	const [dataDetailBatch, setDataDetailBatch] = useState("");
	const batch_id = props.batch_id;
	// const batch_judul = props.judul

	const [modal, setModal] = useState(false);
	function displayModal() {
		setModal((prevModal) => !prevModal);
	}

	const [loading, setLoading] = useState(false);

	let resetTable = () => {
		setRows([]);
	};

	//Create Data for Row
	function createData(kotik, loc, provinsi, kabupatenKota, v1, v2, v3, act) {
		return { kotik, loc, provinsi, kabupatenKota, v1, v2, v3, act };
	}

	async function fetchDataTable() {
		API.postAdminSM({
			batch: batch_id,
		})
			.then((res) => {
				// console.log(res.data.values);
				if (res.data.values.length === 0) {
					setRows([
						{
							kotik: "Tidak ada data",
							loc: "",
							provinsi: "",
							kabupatenKota: "",
							v1: "",
							v2: "",
							v3: "",
							act: "",
						},
					]);
				} else {
					let rowsData = [];
					if (res.data.values.sites.length > 0) {
						for (let i of res.data.values.sites) {
							let act = "";
							act = (
								<a
									onClick={() => {
										setDataLihatVendor(i);
										setDataDetailBatch(res.data.values);
										displayModal();
									}}
								>
									<u>Lihat Vendor</u>
								</a>
							);
							rowsData.push(
								createData(
									i?.siteid?.unik_id,
									i?.siteid?.nama,
									i?.siteid?.provinsi_name,
									i?.siteid?.kabupaten_name,
									i?.vendor_1 ?? "N/A",
									i?.vendor_2 ?? "N/A",
									i?.vendor_3 ?? "N/A",
									act
								)
							);
						}
						setRows(rowsData);
					} else {
						setRows([
							{
								kotik: "Tidak ada data",
								loc: "",
								provinsi: "",
								kabupatenKota: "",
								v1: "",
								v2: "",
								v3: "",
								act: "",
							},
						]);
					}
				}
			})
			.catch((err) => {
				// console.log(err);
				setRows([
					{
						kotik: "Terjadi Kesalahan",
						loc: "",
						provinsi: "",
						kabupatenKota: "",
						v1: "",
						v2: "",
						v3: "",
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
				label: "Kode Titik",
				field: "kotik",
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
				label: "Vendor #1",
				field: "v1",
				sort: "asc",
				width: 200,
			},
			{
				label: "Vendor #2",
				field: "v2",
				sort: "asc",
				width: 200,
			},
			{
				label: "Vendor #3",
				field: "v3",
				sort: "asc",
				width: 200,
			},
			// {
			// 	label: "Vendor #4",
			// 	field: "v4",
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

	const handleGenerateExcel = () => {
		API.getGeneratedExcel(batch_id)
			.then(async (res) => {
				// console.log("kamu berhasil!!", res);
				window.open(
					`${process.env.REACT_APP_BE_URL}/site/generateNilaiExcel?batchid=${batch_id}`,
					"_blank"
				);
				setLoading(false);
			})
			// .then(setLoading(false))
			.catch((err) => {
				// console.log(err.response.data.message);
				if (err.response.data.message.toLowerCase().includes("harap tunggu")) {
					alert("Harap tunggu 30 menit");
				} else {
					alert("Terjadi kesalahan!");
				}
				setLoading(false);
			});
	};

	return (
		<React.Fragment>
			{rows.length === 0 ? (
				<div>
					<h1>
						<Skeleton />
					</h1>
					<Skeleton count={10} />
				</div>
			) : (
				<>
					<LihatVendor
						modal={modal}
						toggleModal={displayModal}
						data={dataLihatVendor}
						dataBatch={dataDetailBatch}
					/>
					<div
						style={{
							display: "flex",
							width: "100%",
							justifyContent: "flex-end",
						}}
					>
						<p to="#" className="textDownload">
							{loading ? "Downloading..." : "Download"}
						</p>
						<div style={{ marginRight: "12px" }} />
						<a
							style={{ color: "blue" }}
							onClick={() => {
								setLoading(true);
								handleGenerateExcel();
							}}
							// href={`${process.env.REACT_APP_BE_URL}/site/generateNilaiExcel?batchid=${batch_id}`}
							// download={`batch_detail_${batch_id}_${new Date().getTime()}.xlsm`}
							target="_blank"
						>
							{loading ? "" : "XLS"}
						</a>
					</div>
					<MDBDataTable
						className="text-center align-middle"
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
		</React.Fragment>
	);
};

export default SiteList;
