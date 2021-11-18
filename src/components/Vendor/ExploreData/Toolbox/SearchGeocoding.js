import React, { useState, useContext } from "react";
import { CardText, Button, Row, Col } from "reactstrap";
import { LocalContext } from "../LocalContext";
import { removeGeoPoint } from "../Map/maphelper";

// COMPONENTS

// MODAL
import ModalSearchGeo from "../Modal/SearchGeocoding";

export default function SearchGeocoding(props) {
	const { mapRef } = useContext(LocalContext);

	const [layerGeo, setLayerGeo] = useState(false);

	const [location, setLocation] = useState("");

	//BUTTON DUMMY SITE
	const [modalGeo, setModalGeo] = useState(false);

	const toggleButtonGeo = () => {
		setModalGeo(!modalGeo);
	};

	const handleButton = () => {
		toggleButtonGeo();
	};

	const handleDeleteGeo = () => {
		// remove dummy from context
		removeGeoPoint(mapRef);
		setLayerGeo(false);
	};

	return (
		<div>
			<ModalSearchGeo
				modalGeo={modalGeo}
				toggleGeo={toggleButtonGeo}
				setLayerGeo={setLayerGeo}
				setLocation={setLocation}
				mapRef={mapRef}
			/>
			{layerGeo ? (
				<Row className="mt-1">
					<Col lg={12} className="text-center">
						<CardText
							style={
								{
									// color: dummyColor,
									// fontWeight: "bold",
								}
							}
						>
							Lokasi: {location}
						</CardText>
					</Col>
					<Col lg={12} className="d-flex justify-content-center">
						<Button
							style={{
								backgroundColor: "#073030",
								borderRadius: "10px",
								fontSize: "12px",
							}}
							onClick={(e) => {
								handleDeleteGeo();
							}}
						>
							{" "}
							Delete Lokasi
						</Button>
					</Col>
				</Row>
			) : (
				<div className="d-flex justify-content-center mt-2">
					<Button
						className="w-50"
						style={{
							backgroundColor: "#073030",
							border: "solid black",
							borderRadius: "10px",
							borderWidth: "1px",
							fontSize: "12px",
						}}
						onClick={handleButton}
					>
						Cari
					</Button>
				</div>
			)}
		</div>
	);
}
