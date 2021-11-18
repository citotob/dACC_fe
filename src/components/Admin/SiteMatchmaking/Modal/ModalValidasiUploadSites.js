import { MDBModal, MDBModalBody, MDBModalHeader, MDBContainer } from "mdbreact";
import React, { useState, useEffect } from "react";
import "../StepWizardAddBatch/style.css";
import { Col, Button, Row, Container, Card, CardText } from "reactstrap";
const ModalValidasiUploadSites = (props) => {
	let { toggleModalValidation, modalValidation, dataModalValidation } = props;

	return (
		<MDBContainer>
			<MDBModal
				isOpen={modalValidation}
				toggle={toggleModalValidation}
				size="lg"
				centered={true}
			>
				<MDBModalHeader id="headerTC">
					<Container
						style={{ width: "100% !important", textAlign: "center !important" }}
					>
						<p
							style={{
								color: "#B5453C",
								fontSize: "20px",
								fontWeight: "bold",
							}}
						>
							UPLOAD GAGAL
						</p>
					</Container>
				</MDBModalHeader>
				<MDBModalBody
					style={{
						maxHeight: "50vh",
						overflow: "auto",
						padding:"3% 0"
					}}
				>
					{dataModalValidation.map((list, index) => {
						if (list && list.length !== 0) {
							return (
								<Container key={index}>
									<Row className="col-lg-12">
										<p style={{fontSize: "18px", fontWeight: "bold"}}>Lokasi {index + 1}</p>
									</Row>
									<Row className="col-lg-12">
										<Card
											style={{
												backgroundColor: "#E4E1E1",
												width: "100%",
												padding: "4% 0",
												fontSize: "16px",
                                                maxHeight:"fit-content"
											}}
										>
											<CardText>
												<ul style={{ color: "#B5453C" }}>
													{list.map((item, index) => (
														<li key={index}>{item}</li>
													))}
												</ul>
											</CardText>
										</Card>
									</Row>
								</Container>
							);
						}
					})}
				</MDBModalBody>
			</MDBModal>
		</MDBContainer>
	);
};

export default ModalValidasiUploadSites;
