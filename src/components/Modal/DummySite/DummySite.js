import React, { useEffect, useState } from "react";
import {
	MDBContainer,
	MDBModal,
	MDBModalBody,
	MDBModalHeader,
	MDBNavLink,
	MDBNav,
	MDBNavItem,
	MDBTabContent,
	MDBTabPane,
} from "mdbreact";
import { Col, Row, Input, Button } from "reactstrap";
// import './style.css';

// export const tabKoordinat = () => {
//     return (

//     )
// };

export default function ModalDummySite(props) {
	//handle change tab
	const [activeTab, setActiveTab] = useState("1");
	// const [long, setLong] = useState("");
	// const [lat, setLat] = useState("");

	const handleChangeTab = (tab) => {
		setActiveTab(tab);
	};
	const handleAddDummy = () => {
		if (props.long === "" && props.lat === "") {
			alert("Longitude dan Latitude tidak boleh kosong");
		} else if (props.long === "") {
			alert("Longitude tidak boleh kosong");
		} else if (props.lat === "") {
			alert("Latitude tidak boleh kosong");
		} else {
			props.setLongLat({ long: props.long, lat: props.lat });
			props.addLayerDummy(props.long, props.lat);
			props.setAddLayerDummy(true);
			props.setDummy(true);
			props.toggleDummySite();
		}
	};

	const customStyle = {
		borderBottom: "2px solid #E7883A",
		color: "#E7883A",
	};
	const containerCSS = {
		width: "40vw",
	};
	return (
		<MDBContainer>
			<MDBModal
				size="md"
				isOpen={props.modalDummySite}
				toggle={props.toggleDummySite}
				fullHeight={true}
				centered={true}
			>
				<MDBModalHeader toggle={props.toggleDummySite}>
					ADD DUMMY SITE
				</MDBModalHeader>
				<MDBModalBody>
					<Row>
						<MDBNav className="container-fluid my-3" classicTabs>
							<Col lg={6}>
								<MDBNavItem>
									<MDBNavLink
										link
										to="#"
										active={activeTab === "1"}
										onClick={() => handleChangeTab("1")}
										className="text-center font-weight-bold"
										style={
											activeTab === "1" ? customStyle : { color: "#19324A" }
										}
									>
										Koordinat
									</MDBNavLink>
								</MDBNavItem>
							</Col>
							<Col lg={6}>
								<MDBNavItem>
									<MDBNavLink
										link
										to="#"
										active={activeTab === "2"}
										onClick={() => handleChangeTab("2")}
										className="text-center font-weight-bold"
										style={
											activeTab === "2" ? customStyle : { color: "#19324A" }
										}
									>
										Lokasi
									</MDBNavLink>
								</MDBNavItem>
							</Col>
						</MDBNav>

						<MDBTabContent activeItem={activeTab} className="mx-auto mt-3">
							<MDBTabPane tabId="1">
								{activeTab === "1" && (
									<div className="container">
										<Row>
											<Col lg={6}>
												<Input
													type="number"
													placeholder="Longitude: -180 s/d 180"
													onChange={(e) => {
														props.setLong(e.target.value);
													}}
												/>
											</Col>
											<Col lg={6}>
												<Input
													type="number"
													placeholder="Latitude: -90 s/d 90"
													onChange={(e) => {
														props.setLat(e.target.value);
													}}
												/>
											</Col>
										</Row>
										<div className="w-100 d-flex justify-content-center">
											<Button
												className="w-25 mt-4 mb-2"
												style={{
													backgroundColor: "#073030",
													border: "solid black",
													borderRadius: "5px",
													borderWidth: "1px",
												}}
												onClick={handleAddDummy}
											>
												Add
											</Button>
										</div>
									</div>
								)}
							</MDBTabPane>
							<MDBTabPane tabId="2">
								{activeTab === "2" && (
									<div className="container">
										<Row>
											<Col lg={12}>
												<Input type="text" placeholder="Tulis Nama Lokasi..." />
											</Col>
										</Row>
										<div className="w-100 d-flex justify-content-center">
											<Button
												className="w-25 mt-4 mb-2"
												style={{
													backgroundColor: "#073030",
													border: "solid black",
													borderRadius: "5px",
													borderWidth: "1px",
												}}
											>
												Add
											</Button>
										</div>
									</div>
								)}
							</MDBTabPane>
						</MDBTabContent>
					</Row>
				</MDBModalBody>
			</MDBModal>
		</MDBContainer>
	);
}
