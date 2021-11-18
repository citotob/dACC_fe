import React, { useState, useEffect } from "react";
import {
	MDBContainer,
	MDBModal,
	MDBModalBody,
	MDBModalHeader,
	MDBNav,
	MDBNavItem,
	MDBNavLink,
	MDBTabContent,
	MDBTabPane,
} from "mdbreact";
import {
	Col,
	Row,
	Input,
	Button,
	CardBody,
} from "reactstrap";
import { addDummyPoint } from "../Map/maphelper";
import Axios from "axios";

// import TextField from "@material-ui/core/TextField";
// import Autocomplete from "@material-ui/lab/Autocomplete";
import style from "../style.module.css";

export default function ModalDummySite(props) {
	//handle change tab
	const [activeTab, setActiveTab] = useState("1");

	const handleChangeTab = (tab) => {
		setActiveTab(tab);
	};
	const [value, setValue] = useState("");
	const [sugestion, setSugestion] = useState([]);
	const [sugestionLongLat, setSugestionLongLat] = useState([]);

	// var regLat = new RegExp(/^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,15}/g);
	// var regLng = new RegExp(/^-?(([1]?[0-7][0-9]|[1-9]?[0-9])\.{1}\d{1,15})/g);

	const handleAddDummy = () => {
		if (props.long === "" && props.lat === "") {
			alert("Longitude dan Latitude tidak boleh kosong");
		} else if (isNaN(props.long) || isNaN(props.lat)) {
			alert("Input salah");
		} else if (props.long === "") {
			alert("Longitude tidak boleh kosong");
		} else if (props.lat === "") {
			alert("Latitude tidak boleh kosong");
		} else if (Number(props.long) > 180 || Number(props.long) < -180) {
			alert("Longitude antara -180 s/d 180");
		} else if (Number(props.lat) > 90 || Number(props.lat) < -90) {
			alert("Latitude antara -90 s/d 90");
		} else if (
			Number(props.long) <= 86.160622 ||
			Number(props.long) >= 149.441872
		) {
			alert("Longitude berada di luar jangkauan");
		} else if (
			Number(props.lat) <= -17.545353 ||
			Number(props.lat) >= 18.118934
		) {
			alert("Latitude berada di luar jangkauan");
		} else {
			// Longlat untuk ditampilkan di toolbox
			props.setLong(props.long);
			props.setLat(props.lat);

			// Longlat untuk dikirim ke param API
			// karena state di MapPage berubah, maka function flyTo tidak jalan
			props.setLongLat({ long: props.long, lat: props.lat, condition: true });
			props.setLayerDummy(true);

			// CONTEXT
			// send data from api to context
			// addDummyPoint(props.mapRef, features);

			// send long lat by input
			setTimeout(() => {
				addDummyPoint(props.mapRef, [props.long, props.lat]);
			}, 300);
			props.toggleDummySite();
		}
	};

	const handleAddDummyLokasi = () => {
		if (props.long === "" && props.lat === "") {
			alert("Lokasi belum dipilih");
		} else {
			// Longlat untuk ditampilkan di toolbox
			props.setLong(props.long);
			props.setLat(props.lat);

			// Longlat untuk dikirim ke param API
			// karena state di MapPage berubah, maka function flyTo tidak jalan
			props.setLongLat({ long: props.long, lat: props.lat, condition: true });
			props.setLayerDummy(true);

			// CONTEXT
			// send data from api to context
			// addDummyPoint(props.mapRef, features);

			// send long lat by input
			setSugestion([]);
			setValue("");
			setTimeout(() => {
				addDummyPoint(props.mapRef, [props.long, props.lat]);
			}, 300);
			props.toggleDummySite();
		}
	};

	useEffect(() => {
		const url = "https://api.mapbox.com";
		// props.setLong("");
		// props.setLat("");
		// const longlat = `${props.long},${props.lat}`;
		if (value !== "") {
			Axios.get(
				// `${url}/geocoding/v5/mapbox.places/${longlat}.json?types=poi&access_token=${process.env.REACT_APP_MAPBOX_GL_TOKEN}`
				`${url}/geocoding/v5/mapbox.places/${value}.json?country=ID&access_token=${process.env.REACT_APP_MAPBOX_GL_TOKEN}`
			)
				.then((res) => {
					// setFeatures(res.data.features);
					setSugestion(res.data.features);
				})
				.catch((e) => {
					setSugestion([]);
				});
		}
	}, [value]);

	const customStyle = {
		borderBottom: "2px solid #E7883A",
		color: "#E7883A",
	};
	const containerCSS = {
		width: "40vw",
	};

	const renderSugestion = () => {
		return sugestion.map((e, i) => (
			<div
				className={style.listSugestLokasi}
				key={i}
				onClick={() => {
					props.setLong(e.geometry.coordinates[0]);
					props.setLat(e.geometry.coordinates[1]);
					setValue(e.place_name);
					setTimeout(() => {
						setSugestion([]);
					}, 300);
				}}
			>
				<span key={i}>{e.place_name}</span>
			</div>
		));
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

						<MDBTabContent
							activeItem={activeTab}
							className="mx-auto mt-3 w-100"
						>
							<MDBTabPane tabId="1">
								{activeTab === "1" && (
									<div className="container-fluid">
										<Row>
											<Col lg={6}>
												<Input
													type="text"
													placeholder="Longitude: -180 s/d 180"
													onChange={(e) => {
														props.setLong(e.target.value);
													}}
												/>
											</Col>
											<Col lg={6}>
												<Input
													type="text"
													placeholder="Latitude: -90 s/d 90"
													onChange={(e) => {
														props.setLat(e.target.value);
													}}
												/>
											</Col>
										</Row>
										<div className="w-100 d-flex justify-content-center">
											<Button
												className="w-50 mt-4 mb-2"
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
									<div style={{ width: "100%" }} className="container-fluid">
										<Row>
											<Col lg={12}>
												<div className="d-flex justify-content-center">
													<Input
														type="text"
														style={{ width: "80%" }}
														placeholder="Tulis Lokasi Desa..."
														onChange={(e) => {
															setValue(e.target.value);
														}}
														value={value}
													/>
												</div>
												<div
													className="d-flex justify-content-center mx-auto mt-2"
													style={{ width: "80%" }}
												>
													{sugestion.length !== 0 && (
														<CardBody
															style={{
																maxHeight: "150px",
																width: "150px",
																overflowY: "auto",
															}}
														>
															{renderSugestion()}
														</CardBody>
													)}
												</div>
											</Col>
											<Col></Col>
										</Row>
										<div className="w-100 d-flex justify-content-center">
											<Button
												className="w-50 mt-4 mb-2"
												style={{
													backgroundColor: "#073030",
													border: "solid black",
													borderRadius: "5px",
													borderWidth: "1px",
												}}
												onClick={handleAddDummyLokasi}
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
