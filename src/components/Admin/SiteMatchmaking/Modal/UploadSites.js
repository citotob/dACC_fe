import React, { useEffect, useState } from "react";
import {
	MDBContainer,
	MDBModal,
	MDBModalBody,
	MDBModalHeader,
	MDBModalFooter,
} from "mdbreact";
import { Col, Row, Input, Button, FormGroup, Spinner } from "reactstrap";
import styles from "./style.module.css";
import XLSX from "xlsx";
// import fileDownload from "../../../../assets/Template_SIS.xlsm";
import fileDownload from "../../../../assets/Template_Unggah_Site_Batch_SIS-V2.xlsm";
import Swal from "sweetalert2";
import ModalValidasiUploadSites from "./ModalValidasiUploadSites";
// API
import API from "../../../../services";
//redux
import { useDispatch } from "react-redux";
import { changeDataCluster } from "../../../../store/actions";

function UploadSites(props) {
	//redux
	const dispatch = useDispatch();
	const [modal, setModal] = useState(false);
	const [uploadFile, setUploadFile] = useState(0);
	const [data, setData] = useState("");
	//modal validasi
	const [modalValidation, setModalValidation] = useState(false);
	const [dataModalValidation, setDataModalValidation] = useState([]);
	function toggleModalValidation() {
		setModalValidation((prevModal) => !prevModal);
	}
	// CEK TIPE INPUT
	let typeInput = localStorage.getItem("typeInput") || "";
	useEffect(() => {
		typeInput = localStorage.getItem("typeInput") || "";
	}, [props.refresh]);

	const onChangeFileUpload = (e) => {
		setUploadFile(1);
		var reader = new FileReader();
		reader.onload = function (e) {
			var data = new Uint8Array(e.target.result);
			var workbook = XLSX.read(data, { type: "array" });
			var first_worksheet = workbook.Sheets[workbook.SheetNames[36]];
			var data = XLSX.utils.sheet_to_json(first_worksheet, { header: 2 });
			setUploadFile(2);
			setData(data);
		};
		reader.readAsArrayBuffer(e.target.files[0]);
	};

	const [checkLongLat, setcheckLongLat] = useState([]);

	const handleSubmit = () => {
		// CHECK LONGLAT
		// console.log(
		// 	"cek longlat",
		// data.map((datum, index) => {
		// 	const data = {
		// 		id: datum["KODE UNIK"],
		// 		unikid: datum["KODE UNIK"],
		// 		location: datum["NAMA LOKASI"],
		// 		provinsi: datum["PROPINSI"],
		// 		kecamatan: datum["KECAMATAN"],
		// 		kabupatenKota: datum["KABUPATEN/KOTA"],
		// 		kelurahanDesa: datum["KELURAHAN/DESA"],
		// 		latitude:
		// 			datum["LATITUDE (Pastikan menggunakan titik (.) sebagai pemisah)"],
		// 		longitude:
		// 			datum["LONGITUDE (Pastikan menggunakan titik (.) sebagai pemisah)"],
		// 	};
		// 	// sitesData.push(data);
		// })

		// 	data.map((datum, index) => [
		// 		datum["LONGITUDE (Pastikan menggunakan titik (.) sebagai pemisah)"],
		// 		datum["LATITUDE (Pastikan menggunakan titik (.) sebagai pemisah)"],
		// 	])
		// );

		const param = data.map((datum) => ({
			provinsi: datum["PROPINSI"] ?? "",
			kab_kota: datum["KABUPATEN/KOTA"] ?? "",
			kecamatan: datum["KECAMATAN"] ?? "",
			desa: datum["KELURAHAN/DESA"] ?? "",
			latitude:
				datum["LATITUDE (Pastikan menggunakan titik (.) sebagai pemisah)"] ??
				"",
			longitude:
				datum["LONGITUDE (Pastikan menggunakan titik (.) sebagai pemisah)"] ??
				"",
			unik_id: datum["KODE UNIK"] ?? "",
			nama_lokasi: datum["NAMA LOKASI"] ?? "",
		}));

		API.postValidationSites({ sites: param })
			.then((res) => {
				// console.log("asda", res);
				if (!res.data.success) {
					return Swal.fire({
						position: "center",
						icon: "error",
						title: "ERROR",
						text: "Terjadi Kesalahan",
						showConfirmButton: false,
						timer: 1500,
					});
				}
				let json = res.data.values.flat(); //flatten arr
				if (json.length !== 0) {
					setModal(false);
					toggleModalValidation();
					setDataModalValidation(res.data.values);
				} else {
					data.map((datum, index) => {
						var sitesData = JSON.parse(
							localStorage.getItem("sitesData") || "[]"
						);
						const data = {
							id: datum["KODE UNIK"],
							unikid: datum["KODE UNIK"],
							location: datum["NAMA LOKASI"],
							provinsi: datum["PROPINSI"],
							kecamatan: datum["KECAMATAN"],
							kabupatenKota: datum["KABUPATEN/KOTA"],
							kelurahanDesa: datum["KELURAHAN/DESA"],
							latitude:
								datum[
									"LATITUDE (Pastikan menggunakan titik (.) sebagai pemisah)"
								],
							longitude:
								datum[
									"LONGITUDE (Pastikan menggunakan titik (.) sebagai pemisah)"
								],
						};
						sitesData.push(data);
						localStorage.setItem("sitesData", JSON.stringify(sitesData));
					});
					localStorage.setItem("typeInput", "bulk-input");
					displayModal();
					//empty recommendation if upload-sites
					dispatch(changeDataCluster("", "", "", true));
					//reset table sites
					props.resetTable();
				}
			})
			.catch((e) => console.log(e));

		// data.map((datum, index) => {
		// 	var sitesData = JSON.parse(localStorage.getItem("sitesData") || "[]");
		// 	const data = {
		// 		id: datum["KODE UNIK"],
		// 		unikid: datum["KODE UNIK"],
		// 		location: datum["NAMA LOKASI"],
		// 		provinsi: datum["PROPINSI"],
		// 		kecamatan: datum["KECAMATAN"],
		// 		kabupatenKota: datum["KABUPATEN/KOTA"],
		// 		kelurahanDesa: datum["KELURAHAN/DESA"],
		// 		latitude:
		// 			datum["LATITUDE (Pastikan menggunakan titik (.) sebagai pemisah)"],
		// 		longitude:
		// 			datum["LONGITUDE (Pastikan menggunakan titik (.) sebagai pemisah)"],
		// 	};
		// 	sitesData.push(data);
		// 	localStorage.setItem("sitesData", JSON.stringify(sitesData));
		// });
		// displayModal();
		// props.resetTable();
	};

	const checkFile = () => {
		// send req api untuk mengecek
		// Swal.fire({
		// 	position: 'center',
		// 	icon: 'error',
		// 	title: 'Lokasi Sudah Ada',
		// 	text: 'Lokasi yang anda tambahkan sudah ada, silahkan masukan lokasi yang lain',
		// 	showConfirmButton: false,
		// 	timer: 1500
		//   })
		// jika lokasi belum ada, lanjut ke proses handle submit
		// handleSubmit()
	};

	function displayModal() {
		setUploadFile(0);
		setData("");
		setModal((prevModal) => !prevModal);
	}

	return (
		<>
			<ModalValidasiUploadSites
				toggleModalValidation={toggleModalValidation}
				modalValidation={modalValidation}
				dataModalValidation={dataModalValidation}
			/>
			<Button
				className={styles.buttonStyle}
				onClick={displayModal}
				disabled={
					typeInput === "" ? false : typeInput === "bulk-input" ? false : true
				}
			>
				Bulk Sites
			</Button>
			<MDBContainer>
				<MDBModal
					size="lg"
					isOpen={modal}
					toggle={displayModal}
					centered={true}
				>
					<MDBModalHeader>Unggah Site</MDBModalHeader>
					<MDBModalBody>
						<Row>
							<Col lg="12">
								<a
									href={fileDownload}
									download="Template_Unggah_Site_Batch_SIS.xlsm"
									target="_blank"
								>
									<Button className={styles.buttonStyle} color="">
										Unduh Template Excel
									</Button>
								</a>
								{uploadFile === 0 && (
									<FormGroup>
										<Input
											type="file"
											className="form-control"
											nama={"unggah-rfi"}
											id="basicpill-firstname-input14"
											onChange={onChangeFileUpload}
											accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, .xlsm, .xls"
											style={{
												display: "flex",
												justifyItems: "center",
												alignItems: "center",
												height: "43px",
											}}
										/>
									</FormGroup>
								)}
								{uploadFile === 1 && (
									<div
										style={{
											display: "flex",
											justifyContent: "flex-start",
											alignItems: "center",
										}}
									>
										<Spinner
											color=""
											style={{ color: "orange", marginRight: "10px" }}
										/>
										Mengunggah File...
									</div>
								)}
								{data && (
									<div
										style={{
											display: "flex",
											justifyContent: "flex-start",
											alignItems: "center",
										}}
									>
										Anda Memasukan {data.length} titik lokasi
									</div>
								)}
							</Col>
						</Row>
					</MDBModalBody>
					<MDBModalFooter>
						<Button onClick={displayModal} className={styles.btn_reject}>
							Batal
						</Button>
						<Button onClick={handleSubmit} className={styles.btn_add_sites} disabled={!data}>
							Tambah
						</Button>
					</MDBModalFooter>
				</MDBModal>
			</MDBContainer>
		</>
	);
}
export default UploadSites;
