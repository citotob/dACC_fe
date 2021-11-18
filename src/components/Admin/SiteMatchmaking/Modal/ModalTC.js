import {
	MDBModal,
	MDBModalBody,
	MDBModalHeader,
	MDBContainer,
	MDBFooter,
} from "mdbreact";
import React, { useState } from "react";
import "../StepWizardAddBatch/style.css";
import { Col, Button, Row, Container } from "reactstrap";
const ModalTC = (props) => {
	const [step, setStep] = useState(1);

	const Tutorial = () => {
		switch (step) {
			case 1:
				return (
					<Container>
						<Row className="mb-4">
							<span className="ml-auto textTcBlue">
								Isi Informasi Batch yang ingin dibangun pada step
							</span>
							<span className="mr-auto ml-1 textTcOrange">
								"Add Batch Info"
							</span>
						</Row>
						<Row className="mb-1 d-flex flex-wrap">
							<p className="textTcBlue col-lg-4 ml-auto font-weight-bold">
								1. Format Judul Batch
							</p>
							<p className="textTcBlue col-lg-1">:</p>
							<p className="textTcBlue col-lg-6 mr-auto">
								Judul Batch yang Diberikan Untuk Pembangunan Akses Internet
							</p>
						</Row>
						<Row className="mb-1 d-flex flex-wrap">
							<p className="textTcBlue col-lg-4 ml-auto font-weight-bold">
								2. Format Undangan Batch
							</p>
							<p className="textTcBlue col-lg-1">:</p>
							<p className="textTcBlue col-lg-6 mr-auto">
								Tanggal Awal - Tanggal Akhir
							</p>
						</Row>
						<Row className="mb-1 d-flex flex-wrap">
							<p className="textTcBlue col-lg-4 ml-auto font-weight-bold">
								3. Format Durasi Pengerjaan
							</p>
							<p className="textTcBlue col-lg-1">:</p>
							<p className="textTcBlue col-lg-6 mr-auto">
								Tanggal Awal - Tanggal Akhir
							</p>
						</Row>
						{/* <Row className="mb-1 d-flex flex-wrap">
							<p className="textTcBlue col-lg-4 ml-auto font-weight-bold">
								4. Format Tipe Batch
							</p>
							<p className="textTcBlue col-lg-1">:</p>
							<p className="textTcBlue col-lg-6 mr-auto">VIP/Non VIP</p>
						</Row> */}
						<Row className="mb-1 d-flex flex-wrap">
							<p className="textTcBlue col-lg-4 ml-auto font-weight-bold">
								4. Nomor Surat Permohonan RFI
							</p>
							<p className="textTcBlue col-lg-1">:</p>
							<p className="textTcBlue col-lg-6 mr-auto">
								Nomor Surat Pembangunan Akses Internet
							</p>
						</Row>
						<Row className="mb-1 d-flex flex-wrap">
							<p className="textTcBlue col-lg-4 ml-auto font-weight-bold">
								5. Teknologi
							</p>
							<p className="textTcBlue col-lg-1">:</p>
							<p className="textTcBlue col-lg-6 mr-auto">
								RL/FO/VSAT-GS-Sewa-Jasa/VSAT-GS-Belanja-Modal/Belum Terdefinisi
							</p>
						</Row>
						<Row className="mb-1 d-flex flex-wrap">
							<p className="textTcBlue col-lg-4 ml-auto font-weight-bold">
								6. Unggah Surat Permohonan RFI
							</p>
							<p className="textTcBlue col-lg-1">:</p>
							<p className="textTcBlue col-lg-6 mr-auto">
								File Yang Diunggah Harus Berbentuk Pdf
							</p>
						</Row>
						{/* <Row className="mb-1 d-flex flex-wrap">
							<p className="textTcBlue col-lg-4 ml-auto font-weight-bold">
								7. Owner Price Expectation
							</p>
							<p className="textTcBlue col-lg-1">:</p>
							<p className="textTcBlue col-lg-6 mr-auto">
								Masukan Harga Total Dari Pembangunan Titik Akses Internet
							</p>
						</Row>
						<Row className="mb-1 d-flex flex-wrap">
							<p className="textTcBlue col-lg-4 ml-auto font-weight-bold">
								8. Sewa Jasa/Belanja Modal
							</p>
							<p className="textTcBlue col-lg-1">:</p>
							<p className="textTcBlue col-lg-6 mr-auto">
								Pilihan tipe Batch Sewa Jasa atau Belanja Modal
							</p>
						</Row> */}
					</Container>
				);
				break;
			case 2:
				return (
					<Container style={{ padding: "2% 0" }}>
						<Row className="mb-3">
							<span className="textTcBlue mx-auto">
								Masukkan yang ingin dibangun melalui tipe dibawah ini:
							</span>
						</Row>

						<Row className="ml-2 mb-2">
							<Col className="textTcOrange text-left" lg="4">
								SINGLE INPUT
							</Col>
							<Col lg="1">:</Col>
							<Col className="textTcBlue text-left" lg="7">
								Masukkan Sites yang ingin dibangun satu persatu
							</Col>
						</Row>
						<Row className="ml-2 mb-2">
							<Col className="textTcOrange  text-left" lg="4">
								BULK SITES
							</Col>
							<Col lg="1">:</Col>
							<Col className="textTcBlue text-left" lg="7">
								<ul style={{ padding: "0", listStyleType: "none" }}>
									<li>Bulk Sites dari file excel yang dimiliki</li>
									<li>
										Harap Sesuaikan isian File Excel dengan template excel dari
										fitur ini
									</li>
								</ul>
							</Col>
						</Row>
						<Row className="ml-2 mb-2">
							<Col className="textTcOrange  text-left" lg="4">
								CLUSTERING
							</Col>
							<Col lg="1">:</Col>
							<Col className="textTcBlue text-left" lg="7">
								<ul style={{ padding: "0", listStyleType: "none" }}>
									<li>Masukkan Cluster yang ingin Dipilih</li>
									<li>Harap Pilih Kabupaten/Kecamatan yang ingin dimasukkan</li>
									<li>
										Jika ingin memilih Kecamatan, harap masukan Kabupatennya
										terlebih dahulu
									</li>
								</ul>
							</Col>
						</Row>
					</Container>
				);
				break;
			case 3:
				return (
					<Container style={{ padding: "8% 0", textAlign: "center" }}>
						<Row className="mx-auto mb-3">
							<span className="textTcBlue mx-auto font-weight-bold">
								RFI Scoring Method
							</span>
						</Row>
						<Row className="mx-auto mb-3">
							<span className="textTcBlue mx-auto">
								Pemberian informasi bobot penilaian, dengan maksimal persentasi
								100% pada seluruh komponen yang dipilih.
							</span>
						</Row>
						{/* <Row className="mx-auto mb-3">
							<span className="textTcBlue ml-auto mr-1">Vendor yang sudah</span>
							<span className="textTcOrange mx-0">
								memiliki minimal 5 Titik Akses Internet aktif
							</span>
							<span className="textTcBlue mx-1">pada suatu</span>
							<span className="textTcOrange  ml-0 mr-auto ">Kecamatan</span>
							<span className="textTcBlue mx-auto">
								akan direkomendasikan pada fitur Vendor Rekomendasi.
							</span>
						</Row>
						<Row className="mx-auto mb-3">
							<span className="textTcBlue">
								Jika tidak ada vendor yang bisa memenuhi persyaratan tersebut,
								maka tidak ada vendor yang direkomendasikan pada fitur Vendor
								Rekomendasi.
							</span>{" "}
						</Row> */}
					</Container>
				);
				break;
			case 4:
				return (
					<Container style={{ padding: "12% 0", textAlign: "center" }}>
						<Row className=" mb-3">
							<span className="textTcBlue mx-auto">
								Pilih Vendor yang Ingin Diundang oleh Pengguna
							</span>
						</Row>
						<Row className=" mb-3">
							<span className="textTcBlue mx-auto">
								Informasi vendor akan muncul berdasarkan teknologi yang dipilih
								pengguna pada halaman "Add Batch Info"
							</span>
						</Row>
					</Container>
				);
				break;
			case 5:
				return (
					<div className="firstStep w-100">
						<span className="textTcBlue">
							Harap Dibaca Summary dari Batch yang ingit dibuat.
						</span>
					</div>
				);
				break;
		}
	};
	return (
		<MDBContainer>
			<MDBModal
				isOpen={props.modalTC}
				toggle={props.toggleModalTC}
				// size="lg"
				centered={true}
				className="modal-xl"
			>
				<MDBModalHeader id="headerTC">
					<Row style={{ display: "flex", justifyContent: "flex-end" }}>
						<button
							style={{ backgroundColor: "transparent", border: "transparent" }}
							onClick={() => {
								props.closeModalTC();
							}}
						>
							<span aria-hidden="true" className="white-text">
								&times;
							</span>
						</button>
					</Row>
					<Row style={{ width: "100% !important" }}>
						<Col lg="6">
							<Button className="tcBtn">?</Button>
						</Col>

						<Col lg="6">
							<p className="stepText">{`${step}/5`}</p>
						</Col>
					</Row>
					<Row>
						{" "}
						<Col lg="12">
							<p
								className="text-center"
								style={{
									color: "#073030",
									fontSize: "20px",
									fontWeight: "bold",
								}}
							>
								MOHON DIBACA TERLEBIH DAHULU
							</p>
						</Col>
					</Row>
				</MDBModalHeader>
				<MDBModalBody id="bodyTC">
					<Tutorial />
				</MDBModalBody>
				<MDBFooter>
					<Row
						style={{
							width: "100% !important",
							padding: "2% 4%",
						}}
					>
						<Col lg="8" className="text-right">
							<Button
								onClick={() => {
									if (step !== 1) {
										setStep(step - 1);
									}
								}}
								color=""
								className="tcPrev"
							>
								Sebelumnya
							</Button>
							{step === 5 ? (
								<Button
									onClick={() => {
										props.closeModalTC();
									}}
									color=""
									className="tcNext"
								>
									Close
								</Button>
							) : (
								<Button
									onClick={() => {
										if (step !== 5) {
											setStep(step + 1);
										}
									}}
									color=""
									className="tcNext"
								>
									Lanjutkan
								</Button>
							)}
						</Col>
						<Col lg="4" className="text-right">
							{step !== 5 && (
								<Button
									onClick={() => {
										setStep(5);
									}}
									color=""
									className="tcSkip"
								>
									Skip
								</Button>
							)}
						</Col>
					</Row>
				</MDBFooter>
			</MDBModal>
		</MDBContainer>
	);
};

export default ModalTC;
