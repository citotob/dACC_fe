import React, { useEffect, useState } from "react";
// import { useHistory } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import { Card, CardBody, Alert, Button } from "reactstrap";
import Skeleton from "react-loading-skeleton";
import "./datatables.scss";
import moment from "moment";
import styles from "./style.module.css";
import "./datatables.scss";
// import ModalUpdateNilai from "../Modal/updateNilai";
import ButtonPDF from "../../../../assets/images/pdf-icon.svg";
import btnVerif from "../../../../assets/images/Setuju.svg";
import btnDelete from "../../../../assets/images/Tolak.svg";

import PopVerif from "../Popup/PopupVerify";
import PopDecline from "../Popup/PopupDecline";
import PopupDokPenunjang from "../Popup/PopupDokPenunjang";
import PopDelete from "../Popup/PopupDelete";
import ModalDetail from "../Modal/ModalDetail";
import _ from "lodash";

// import PopBerhasilVerif from "../Popup/PopupBerhasilVerif";
// import PopBerhasilDecline from "../Popup/PopupBerhasilDecline";
// import PopBerhasilDelete from "../Popup/PopupBerhasilDelete";

import API from "../../../../services";
// import { useHistory } from "react-router-dom";

const UserManagementTable = () => {
	// const [modalUpdate, setModalUpdate] = useState(false);
	// const [dataUpdate, setDataUpdate] = useState({});
	const [rows, setRows] = useState([]);
	const [refresh, setRefresh] = useState(0);
	// const history = useHistory();

	const [alertVerif, setAlertVerif] = useState(false);
	const [alertDelete, setAlertDelete] = useState(false);
	const [alertDecline, setAlertDecline] = useState(false);

	const [notifVerif, setNotifVerif] = useState(false);
	const [notifDelete, setNotifDelete] = useState(false);
	const [notifDecline, setNotifDecline] = useState(false);

	// popup verify
	const [modalVerify, setModalVerify] = useState(false);
	const [dataVerify, setDataVerify] = useState([]);
	// pop delete
	const [dataDelete, setDataDelete] = useState([]);
	const [modalDelete, setModalDelete] = useState(false);
	// pop trash
	const [dataTrash, setDataTrash] = useState([]);
	const [modalTrash, setModalTrash] = useState(false);

	// pop berhasil Verif
	const [modalBerhasilVerif, setModalBerhasilVerif] = useState(false);
	// pop berhasil Hapus
	const [modalBerhasilHapus, setModalBerhasilHapus] = useState(false);
	// pop berhasil Decline
	const [modalBerhasilDecline, setModalBerhasilDecline] = useState(false);

	// pop Detail
	const [modalDetail, setModalDetail] = useState(false);
	const toggleDetail = () => {
		setModalDetail(!modalDetail);
	};

	//data modal detail
	const [dataDetail, setDataDetail] = useState("");

	// handle alasan
	const [dataAlasan, setDataAlasan] = useState("");

	//data pdf
	const [dataPDF, setDataPDF] = useState([]);

	//modal pengguna pdf
	const [modalDok, setModalDok] = useState(false);
	const toggleDok = () => {
		setModalDok(!modalDok);
	};
	const toggleVerif = () => {
		setModalVerify(!modalVerify);
	};

	const toggleBerhasilVerif = () => {
		setModalBerhasilVerif(!modalBerhasilVerif);
	};

	const toggleBerhasilDecline = () => {
		setModalBerhasilDecline(!modalBerhasilDecline);
	};

	const toggleBerhasilHapus = () => {
		setModalBerhasilHapus(!modalBerhasilHapus);
	};

	let toggleDecline = (i) => {
		// setDataDelete(i);
		setModalDelete(!modalDelete);
	};

	let toggleDelete = (i) => {
		setModalTrash(!modalTrash);
	};

	const handlePreviewPDF = (i) => {
		setDataPDF(i);
		toggleDok();
	};

	const handleChange = (e) => {
		let term = e.target.value;
		setDataAlasan(term);
	};

	let handleVerif = (i) => {
		setDataVerify(i);
		toggleVerif();
	};

	let handleDecline = (i) => {
		setDataDelete(i);
		toggleDecline();
	};

	let handleDelete = (i) => {
		setDataTrash(i);
		toggleDelete();
	};
	const refreshTable = () => {
		setRefresh(refresh + 1);
	};

	//Create Data for Row
	function createData(np, em, tgl, stat, doc, detail, verf) {
		return { np, em, tgl, stat, doc, detail, verf };
	}

	async function fetchDataTable() {
		API.getUserMene()
			.then((res) => {
				if (res.status === !200) {
					setRows([
						{
							np: "Tidak ada data",
							em: "",
							tgl: "",
							stat: "",
							doc: "",
							detail: "",
							verf: "",
						},
					]);
				} else {
					let rowsData = [];
					const json = res.data;

					// console.log(res.data.values);
					for (let data of json.values) {
						let verf = "";
						verf =
							/* eslint-disable */
							// "kalo misal button ditambah tag nya, button nya malah ikut terus ketambah ketika pagination"
							// <Row>
							{
								/* <Button
										className={styles.buttonUpdate}
										key={data._id}
										onClick={() => toggleUpdate(pop)}
									>
									Update
									</Button> */
							};
						{
							/* </Row> */
						}

						const dokumen_penunjang = (
							<div>
								{/* <Button
									color=""
									className={styles.button_pdf_verifp}
									onClick={() => handlePreviewPDF(data)}
								> */}
								<img
									src={ButtonPDF}
									color=""
									className={styles.button_pdf_verifp}
									onClick={() => handlePreviewPDF(data)}
								/>
								{/* </Button> */}
							</div>
						);

						const buttonAction =
							data.status === "Belum Terverifikasi" ? (
								<div style={{ display: "flex", justifyContent: "center" }}>
									{/* <Button
										className={styles.button_verif}
										color=""
										onClick={() => handleVerif(data)}
									> */}
									<img
										className={styles.button_verif}
										src={btnVerif}
										alt=""
										color=""
										onClick={() => handleVerif(data)}
									/>
									{/* </Button> */}
									{/* <Button color="" onClick={() => handleDecline(data)}> */}
									{/* todo: delete user button*/}
									<img
										className={styles.button_delete}
										src={btnDelete}
										alt=""
										onClick={() => handleDecline(data)}
									/>
									{/* </Button> */}
								</div>
							) : (
								<div />
							);

						const buttonDetail = (
							<div>
								<Button
									style={{
										padding: "0px",
										paddingLeft: "10px",
										paddingRight: "10px",
										borderRadius: "15px",
									}}
									onClick={() => {
										toggleDetail(dataDetail);
										setDataDetail(data);
									}}
								>
									Lihat Detail
								</Button>
							</div>
						);

						rowsData.push(
							createData(
								data.name,
								data.email,
								`${moment(data.create_date).format("YYYYMMDD")} 
								${moment(data.create_date).format("DD/MM/YYYY")}`,
								data.status,
								// data.doc.name,
								// i.ketepatan,
								// i.kualitas,
								// i.kecepatan,
								dokumen_penunjang,
								buttonDetail,
								buttonAction,
								verf
							)
						);
					}
					const sortByStatus = _.reverse(
						_.sortBy(rowsData, [
							(e) => e?.stat === "Belum Terverifikasi",
							(e) => e?.stat === "Butuh Persetujuan",
						])
					);
					setRows(sortByStatus);
				}
			})
			.catch((err) => {
				// console.log(err);
				setRows([
					{
						np: "Terjadi Kesalahan",
						em: " - ",
						tgl: " - ",
						stat: " - ",
						doc: " - ",
						detail: " - ",
						verf: "",
					},
				]);
			});
	}

	const verifyAction = () => {
		// console.log(dataVerify._id)
		// alert('berhasil di setujui')
		API.postVerif({
			id: dataVerify._id,
		})
			.then(function (res) {
				// console.log("verif", res);
				toggleVerif();
				toggleBerhasilVerif(true);
				setAlertVerif(false);
				setNotifVerif(true);
				setTimeout(() => {
					toggleBerhasilVerif(false);
					setNotifVerif(false);
					// history.go(1);
				}, 5000);
				refreshTable();
				// history.go(0)
				setRows([]);
				// console.log("verif",res)
			})
			.catch((err) => {
				// console.log(err)
				refreshTable();
			});
	};

	const deleteAction = () => {
		// alert('berhasil di tolak')
		API.postDecline({
			id: dataDelete._id,
			comment: dataAlasan,
		})
			.then(function (res) {
				// console.log("decline", res);
				toggleDecline();
				// toggleBerhasilDecline();
				toggleBerhasilDecline(true);
				setAlertDecline(false);
				setNotifDecline(true);
				setTimeout(() => {
					toggleBerhasilDecline(false);
					setNotifDecline(false);
					// history.go(1);
				}, 5000);
				refreshTable();
				// history.go(0)
				setRows([]);
			})
			.catch((err) => {
				// console.log(err)
				refreshTable();
			});
	};

	const TrashAction = () => {
		API.postDelete({
			id: dataTrash._id,
		})
			.then((res) => {
				// console.log("delete", res);
				toggleDelete();
				// toggleBerhasilHapus();
				toggleBerhasilHapus(true);
				setAlertDelete(false);
				setNotifDelete(true);
				setTimeout(() => {
					toggleBerhasilHapus(false);
					setNotifDelete(false);
					// history.go(1);
				}, 5000);
				refreshTable();
				// history.go(0)
				setRows([]);
			})
			.catch((err) => {
				console.log(err);
				refreshTable();
			});
	};

	useEffect(() => {
		// if (rows.length === 0) {
		fetchDataTable();
		// }
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [refresh]);

	const data = {
		columns: [
			{
				label: "Nama",
				field: "np",
				sort: "asc",
				width: 200,
			},
			{
				label: "email",
				field: "em",
				sort: "asc",
				width: 200,
			},
			{
				label: "Tanggal",
				field: "tgl",
				sort: "asc",
				width: 200,
			},
			{
				label: "Status",
				field: "stat",
				sort: "asc",
				width: 200,
			},
			{
				label: "Dokumen Penunjang",
				field: "doc",
				sort: "disabled",
				width: 200,
			},
			{
				label: "Verifikasi",
				field: "verf",
				sort: "disabled",
				width: 200,
			},
			// {
			// 	label: "Detail Teknologi",
			// 	field: "detail",
			// 	sort: "disabled",
			// 	width: 200,
			// },
		],
		rows:
			rows.length === 0
				? [
						{
							np: "",
							em: "",
							tgl: "",
							stat: "",
							doc: "",
						},
				  ]
				: rows,
	};

	return (
		<React.Fragment>
			<Alert
				color={alertVerif ? "danger" : "success"}
				isOpen={notifVerif}
				className={styles.alertDetail}
			>
				{alertVerif ? `User gagal Di Setujui` : `User Berhasil Di Setujui`}
			</Alert>
			<Alert
				color={alertDecline ? "danger" : "success"}
				isOpen={notifDecline}
				className={styles.alertDetail}
			>
				{alertDecline ? `User Gagal Di Tolak` : `User Berhasil Di Tolak`}
			</Alert>
			<Alert
				color={alertDelete ? "danger" : "success"}
				isOpen={notifDelete}
				className={styles.alertDetail}
			>
				{alertDelete ? `User Gagal Di Hapus` : `User Berhasil Di Hapus`}
			</Alert>

			<PopupDokPenunjang
				modalDok={modalDok}
				toggleDok={() => toggleDok()}
				data={dataPDF}
			/>

			<PopVerif
				modalVerify={modalVerify}
				toggleVerify={() => toggleVerif(dataVerify)}
				data={dataVerify}
				verifyAction={verifyAction}
			/>

			<PopDecline
				modalDelete={modalDelete}
				toggleDecline={() => toggleDecline(dataDelete)}
				data={dataDelete}
				handleChangeAlasan={handleChange}
				deleteAction={deleteAction}
				dataAlasan={dataAlasan}
			/>

			<PopDelete
				modalTrash={modalTrash}
				toggleDelete={() => toggleDelete(dataTrash)}
				data={dataTrash}
				TrashAction={TrashAction}
			/>
			<ModalDetail
				modalDetail={modalDetail}
				toggleDetail={toggleDetail}
				dataDetail={dataDetail}
				refreshTable={refreshTable}
				refresh={refresh}
			/>

			<Card
				style={{
					boxShadow: "0px 0px 10px #D3D3D3",
					paddingBottom: "10px",
					paddingTop: "20px",
				}}
			>
				<CardBody>
					{rows.length === 0 ? (
						<div>
							<h1>
								<Skeleton />
							</h1>
							<Skeleton count={5} />
						</div>
					) : (
						<div style={{ whiteSpace: "pre-line" }}>
							<MDBDataTable
								id="tableUser"
								// className="mx-auto mt-3"
								className={`${styles.tableUser} text-center`}
								responsive
								striped
								bordered
								searching={true}
								displayEntries={true}
								entriesOptions={[5, 10, 15, 20]}
								info={true}
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

export default UserManagementTable;

//asset kiboo
{
	/* <PopBerhasilVerif
				modalBerhasilVerif={modalBerhasilVerif}
				toogleBerhasilVerif={() => toggleBerhasilVerif()}
				handleAlert={{
					setAlertVerif: setAlertVerif,
				}}
				fetchData={handleFetch}
			/>

			<PopBerhasilDecline
				modalBerhasilDecline={modalBerhasilDecline}
				toogleBerhasilDecline={() => toggleBerhasilDecline()}
				handleAlert={{
					setAlertDecline: setAlertDecline,
				}}
				fetchData={handleFetch}
			/>

			<PopBerhasilDelete
				modalBerhasilHapus={modalBerhasilHapus}
				toogleBerhasilHapus={() => toggleBerhasilHapus()}
				handleAlert={{
					setAlertDelete: setAlertDelete,
				}}
				fetchData={handleFetch}
			/> */
}
{
	/* {alertVerif==="success" ? (
				<SweetAlert
				timeout={3}
				title="User Berhasil di Setujui"
				showConfirm={false}
				onConfirm={handleFetch}>
				<img src={IconGreenCheckList}></img>
				</SweetAlert>
			) : (
				""
			)}
			{alertDelete==="success" ? (
				<SweetAlert
				timeout={3}
				title="User Berhasil di Setujui"
				showConfirm={false}
				onConfirm={handleFetch}>
				<img src={IconGreenCheckList}></img>
				</SweetAlert>
			): (
				""
			)}
			{alertDecline==="success" ? (
				<SweetAlert
				timeout={3}
				title="User Berhasil di Setujui"
				showConfirm={false}
				onConfirm={handleFetch}>
				<img src={IconGreenCheckList}></img>
				</SweetAlert>
			): (
				""
			)} */
}
{
	/* alert==="fail" ? ( */
}
{
	/* <SweetAlert
				timeout={3}
				title="Konten Berhasil di Tolak"
				showConfirm={false}
				onConfirm={handleFetch}>
				<img src={IconRedCheckList}></img>
				</SweetAlert> */
}
{
	/* ) : alert==="failedFetch" ? ( */
}
{
	/* <SweetAlert
				timeout={3}
				error
				title="Konten Tidak Berhasil di Kurasi"
				showConfirm={false}
				onConfirm={handleFetch}>
				<img src={IconRedCheckList}></img>
				</SweetAlert> */
}
{
	/* ) :  */
}
