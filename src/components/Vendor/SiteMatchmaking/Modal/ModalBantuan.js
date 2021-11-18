import {
	MDBModal,
	MDBModalBody,
	MDBModalHeader,
	MDBContainer,
	MDBFooter,
} from "mdbreact";
import React, { useState } from "react";
import "../../../Admin/SiteMatchmaking/StepWizardAddBatch/style.css";
import { Col, Button, Row, Container } from "reactstrap";
const ModalBantuan = (props) => {
	return (
		<MDBContainer>
			<MDBModal
				isOpen={props.modalBantuan}
				toggle={props.toggleModalBantuan}
				size="lg"
				centered={true}
				// className="modal-xl"
			>
				<MDBModalHeader id="headerTC">
					<Row style={{ display: "flex", justifyContent: "flex-end" }}>
						<button
							style={{ backgroundColor: "transparent", border: "transparent" }}
							onClick={() => {
								props.closeModalBantuan();
							}}
						>
							<span aria-hidden="true" className="white-text">
								&times;
							</span>
						</button>
					</Row>
					<center>
						<p
							style={{
								color: "#073030",
								fontSize: "20px",
								fontWeight: "bold",
							}}
						>
							Mohon Perhatian!
						</p>
					</center>
				</MDBModalHeader>
				<MDBModalBody>
					<Container>
						<Row>
							<span className="textTcBlue">
								Pada dokumen penunjang harap menyediakan informasi sebagai
								berikut
							</span>
						</Row>
						<div style={{ height: "18px" }} />
						<Row>
							<p className="textTcBlue font-weight-bold">
								1. Surat Penawaran RFI
							</p>
						</Row>
						<Row>
							<p className="textTcBlue font-weight-bold">
								2. Titik Yang Ditawarkan
							</p>
						</Row>
						<Row>
							<p className="textTcBlue font-weight-bold">3. Daftar Team</p>
						</Row>
					</Container>
				</MDBModalBody>
				<MDBFooter>
					<Row
						style={{
							width: "100% !important",
							padding: "2% 2%",
						}}
					>
						<Col lg="12" className="text-right">
							<Button
								onClick={() => {
									props.closeModalBantuan();
								}}
								color=""
								className="tcNext"
								style={{ marginRight: "2%" }}
							>
								Tutup
							</Button>
						</Col>
					</Row>
				</MDBFooter>
			</MDBModal>
		</MDBContainer>
	);
};

export default ModalBantuan;
