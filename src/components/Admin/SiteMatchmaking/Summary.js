import React, { useState } from "react";
import { Row, Col, Label, FormGroup } from "reactstrap";
import moment from "moment";
// import { MDBDataTable } from "mdbreact";

const Summary = (props) => {
	const userid = localStorage.getItem("userId");
	var judulBatch = localStorage.getItem("judulBatch");
	var mulaiUndangan = localStorage.getItem("mulaiUndangan");
	var selesaiUndangan = localStorage.getItem("selesaiUndangan");
	var mulaiKerja = localStorage.getItem("mulaiKerja");
	var selesaiKerja = localStorage.getItem("selesaiKerja");
	var tipe = localStorage.getItem("tipe");
	var noSurat = localStorage.getItem("noSurat");
	var dataInvitation = JSON.parse(localStorage.getItem("dataInvitation")) ?? [];
	var sitesData = JSON.parse(localStorage.getItem("sitesData") || "[]");
	// var sewaBelanja = localStorage.getItem("sewaBelanja");
	var teknologi = JSON.parse(localStorage.getItem("teknologi") || "[]");
	// var price = localStorage.getItem("priceExp");
	var rfi_score = JSON.parse(localStorage.getItem("rfi-score"));

	// const siteListA = sitesData.map((data) => {
	// 	return { ...data };
	// });

	// const dataSites = {
	// 	columns: [
	// 		{
	// 			label: "UNIK-ID",
	// 			field: "unikid",
	// 			sort: "asc",
	// 			width: 200,
	// 		},
	// 		{
	// 			label: "Nama lokasi",
	// 			field: "location",
	// 			sort: "asc",
	// 			width: 200,
	// 		},
	// 		{
	// 			label: "Provinsi",
	// 			field: "provinsi",
	// 			sort: "asc",
	// 			width: 200,
	// 		},
	// 		{
	// 			label: "Kabupaten/Kota",
	// 			field: "kabupatenKota",
	// 			sort: "asc",
	// 			width: 200,
	// 		},
	// 		{
	// 			label: "Kecamatan",
	// 			field: "kecamatan",
	// 			sort: "asc",
	// 			width: 200,
	// 		},
	// 		{
	// 			label: "Kelurahan/Desa",
	// 			field: "kelurahanDesa",
	// 			sort: "asc",
	// 			width: 200,
	// 		},
	// 		{
	// 			label: "Latitude",
	// 			field: "latitude",
	// 			sort: "asc",
	// 			width: 200,
	// 		},
	// 		{
	// 			label: "Longitude",
	// 			field: "longitude",
	// 			sort: "asc",
	// 			width: 200,
	// 		},
	// 		{
	// 			label: "",
	// 			field: "act",
	// 			sort: "disabled",
	// 			width: 200,
	// 		},
	// 	],
	// 	rows:
	// 		sitesData.length !== 0
	// 			? sitesData.map((i) => ({
	// 					unikid: i?.unikid ?? "",
	// 					location: i?.location ?? "",
	// 					provinsi:
	// 						typeof i?.provinsi === "object"
	// 							? i?.provinsi.nama
	// 							: i?.provinsi ?? "",
	// 					kabupatenKota:
	// 						typeof i?.kabupatenKota === "object"
	// 							? i?.kabupatenKota?.nama ?? ""
	// 							: i?.kabupatenKota ?? "",
	// 					kecamatan:
	// 						typeof i?.kecamatan === "object"
	// 							? i?.kecamatan?.nama ?? ""
	// 							: i?.kecamatan ?? "",
	// 					kelurahanDesa:
	// 						typeof i?.kelurahanDesa === "object"
	// 							? i?.kelurahanDesa?.nama ?? ""
	// 							: i?.kelurahanDesa ?? "",
	// 					latitude: i?.latitude ?? "",
	// 					longitude: i?.longitude ?? "",
	// 			  }))
	// 			: [],
	// };

	return (
		<div>
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
									? moment(selesaiUndangan).format("DD/MM/YYYY").toString()
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
							<span className={"text-muted"}>{noSurat ? noSurat : ""}</span>
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
								{
									teknologi[0] === "UNDEFINED" ? "Belum Terdefinisi" : teknologi.join(', ') ?? ""
								}
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
							<span className={"text-muted"}>{dataInvitation.length}</span>
						</Label>
					</FormGroup>
				</Col>
			</Row>
			<Row>
				<Col lg="12">
					<FormGroup>
						<Label for="basicpill-phoneno-input16">
							RFI SCORING METHOD :{" "}
							{rfi_score?.durasi?.check ? (
								<span className={"text-muted"}>
									Durasi:{rfi_score?.durasi?.value}%{" "}
								</span>
							) : (
								""
							)}
							{rfi_score?.vp?.check ? (
								<span className={"text-muted"}>VP:{rfi_score?.vp?.value}%{" "}</span>
							) : (
								""
							)}
							{rfi_score?.price?.check ? (
								<span className={"text-muted"}>
									Price:{rfi_score?.price?.value}%{" "}
								</span>
							) : (
								""
							)}
							{rfi_score?.team?.check ? (
								<span className={"text-muted"}>
									Team:{rfi_score?.team?.value}%{" "}
								</span>
							) : (
								""
							)}
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
	);
};

export default Summary;
