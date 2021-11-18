import React, { useState, useContext } from "react";
import { Button, Row, Col } from "reactstrap";
import { LocalContext } from "../LocalContext";
import { removeDummyPoint } from "../Map/maphelper";

// COMPONENTS

// MODAL
import ModalDummySite from "../Modal/AddDummySite";

export default function AddDummySite(props) {
	const { mapRef } = useContext(LocalContext);

	const [layerDummy, setLayerDummy] = useState(false);

	const [long, setLong] = useState("");
	const [lat, setLat] = useState("");

	//BUTTON DUMMY SITE
	const [modalDummySite, setModalDummySite] = useState(false);

	const toggleButtonDummySite = () => {
		setModalDummySite(!modalDummySite);
	};

	const handleButtonDummySite = () => {
		if (layerDummy) {
			alert("Hapus terlebih dahulu dummy site sebelumnya");
		} else {
			toggleButtonDummySite();
		}
	};

	const handleDeleteDummy = () => {
		// remove dummy from context
		removeDummyPoint(mapRef);
		setLayerDummy(false);
		props.setLongLat({ long: "", lat: "", condition: false });
		setLong("");
		setLat("");
	};

	return (
		<div>
			<ModalDummySite
				modalDummySite={modalDummySite}
				toggleDummySite={toggleButtonDummySite}
				setLong={setLong}
				setLat={setLat}
				long={long}
				lat={lat}
				setLayerDummy={setLayerDummy}
				setLongLat={props.setLongLat}
				mapRef={mapRef}
			/>
			{layerDummy ? (
				<Row>
					<Col
						lg={12}
						className="d-flex justify-content-center"
					>
						<Button
							style={{
								backgroundColor: "#838383",
								borderRadius: "4px",
								fontSize: "12px",
								paddingTop: "3px",
								paddingBottom: "3px",
								minWidth: "50%",
							}}
							onClick={(e) => {
								handleDeleteDummy();
							}}
						>
							Delete Dummy Site
						</Button>
					</Col>
				</Row>
			) : (
				// <div>
				<Row>
					<Col lg={12} className="d-flex justify-content-center">
						<Button
							style={{
								backgroundColor: "#E7883A",
								border: "solid black",
								borderRadius: "4px",
								borderWidth: "1px",
								fontSize: "12px",
								paddingTop: "3px",
								paddingBottom: "3px",
								minWidth: "50%",
							}}
							onClick={handleButtonDummySite}
						>
							Add Dummy Site
						</Button>
					</Col>
				</Row>

				// </div>
			)}
		</div>
	);
}
