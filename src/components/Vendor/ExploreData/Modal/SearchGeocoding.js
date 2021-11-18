import React, { useState, useEffect, useContext } from "react";
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
import Axios from "axios";
import { LocalContext } from "../LocalContext";
import { addGeoPoint } from "../Map/maphelper";
// import './style.css';

export default function ModalGeo(props) {
	const { mapRef } = useContext(LocalContext);
	//handle change tab
	const [features, setFeatures] = useState([]);
	const [value, setValue] = useState("");
	// const [state, setstate] = useState(initialState)

	const handleButton = () => {
		if (features.length===0) {
			alert("Lokasi tidak ditemukan");
		} else {
			addGeoPoint(mapRef, features);
			props.setLayerGeo(true);
		}
		props.toggleGeo();
	};

	// useEffect(() => {
	// 	const url = "https://api.mapbox.com";
	// 	if (value !== "") {
	// 		Axios.get(
	// 			`${url}/geocoding/v5/mapbox.places/${value}.json?access_token=${process.env.REACT_APP_MAPBOX_GL_TOKEN}
	// 		`
	// 		)
	// 			.then((res) => {
	// 				setFeatures(res.data.features);
	// 			})
	// 			.catch((e) => {
	// 				console.log(e);
	// 			});
	// 	}
	// }, [value]);

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
				isOpen={props.modalGeo}
				toggle={props.toggleGeo}
				fullHeight={true}
				centered={true}
			>
				<MDBModalHeader toggle={props.toggleGeo}>Cari Lokasi</MDBModalHeader>
				<MDBModalBody>
					<Row>
						<div className="container">
							<Row>
								<Col lg={12}>
									<Input
										type="text"
										placeholder="..."
										onChange={(e) => {
											props.setLocation(e.target.value);
											setValue(e.target.value);
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
									onClick={handleButton}
								>
									Cari
								</Button>
							</div>
						</div>
					</Row>
				</MDBModalBody>
			</MDBModal>
		</MDBContainer>
	);
}
