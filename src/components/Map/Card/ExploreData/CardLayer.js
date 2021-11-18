import React, { useEffect, useState } from "react";
import { Card, CardTitle, CardText, Button, Row, Col, Input } from "reactstrap";
import imgColor from "../../../../assets/images/Vector.png";
import FilterField from "../../../Filter/FilterField";
import { SketchPicker } from "react-color";
import { useSelector, useDispatch } from "react-redux";
import { changeColorMarker } from "../../../../store/map/action/actions";

// COMPONENTS

// MODAL
import ModalDummySite from "../../../Modal/DummySite/DummySite";
import ModalColorChange from "../../../Modal/ColorChange/ColorChange";

export default function CardLayer(props) {
	const dispatch = useDispatch();

	const [type, setType] = useState("");

	const [RLColor, setRLColor] = useState("#F36666");
	const [FOColor, setFOColor] = useState("#D7C843");
	const [VSATColor, setVSATColor] = useState("#5EA2F2");
	const [dummyColor, setDummyColor] = useState("#ff8000");
	const [addLayerRL, setAddLayerRL] = useState(false);
	const [addLayerFO, setAddLayerFO] = useState(false);
	const [addLayerVSAT, setAddLayerVSAT] = useState(false);
	const [addLayerDummy, setAddLayerDummy] = useState(false);

	const [long, setLong] = useState("");
	const [lat, setLat] = useState("");
	// const [modalColorRL, setModalColorRL] = useState(false);
	// const [modalColorFO, setModalColorFO] = useState(false);
	// const [modalColorVSAT, setModalColorVSAT] = useState(false);
	// const [cbRL, setCbRL] = useState(false);
	// const [modalColorFO, setModalColorFO] = useState(false);
	// const [modalColorVSAT, setModalColorVSAT] = useState(false);

	//BUTTON DUMMY SITE
	const [modalDummySite, setModalDummySite] = useState(false);

	//MODAL COLOR CHANGE
	const [modalColorChange, setModalColorChange] = useState(false);

	// useEffect(() => {
	// 	dispatch(
	// 		changeColorMarker({
	// 			colorRL: RLColor,
	// 			colorFO: FOColor,
	// 			colorVSAT: VSATColor,
	// 			statusRL: RLVisibility,
	// 			statusFO: FOVisibility,
	// 			statusVSAT: VSATVisibility,
	// 		})
	// 	);
	// }, [RLColor, FOColor, VSATColor, RLVisibility, FOVisibility, VSATVisibility]);

	const toggleButtonDummySite = () => {
		setModalDummySite(!modalDummySite);
	};

	const handleButtonDummySite = () => {
		if (addLayerDummy) {
			alert("Hapus terlebih dahulu dummy site sebelumnya");
		} else {
			toggleButtonDummySite();
		}
	};

	const toggleColorChange = () => {
		setModalColorChange(!modalColorChange);
		props.changeColorPointRL(RLColor);
		props.changeColorPointFO(FOColor);
		props.changeColorPointVSAT(VSATColor);
	};

	const handleColorChange = (type) => {
		setType(type);
		toggleColorChange();
	};

	const handleDeleteDummy = () => {
		props.removeLayerDummy();
		setAddLayerDummy(false);
		props.setDummy(false);
		setLong("");
		setLat("");
	};

	const handleLayer = (layer) => {
		if (layer==="RL") {
			props.addLayerRL();
			setAddLayerRL(!addLayerRL);
		} else if (layer==="FO") {
			props.addLayerFO(layer);
			setAddLayerFO(!addLayerFO);
		} else if (layer==="VSAT") {
			props.addLayerVSAT(layer);
			setAddLayerVSAT(!addLayerVSAT);
		} else {
			// props.addLayerVSAT(layer);
			// setAddLayerVSAT(!addLayerVSAT);
		}
	};

	return (
		<div>
			<ModalDummySite
				modalDummySite={modalDummySite}
				toggleDummySite={toggleButtonDummySite}
				addLayerDummy={props.addLayerDummy}
				setAddLayerDummy={setAddLayerDummy}
				removeLayerDummy={props.removeLayerDummy}
				setLong={setLong}
				setLat={setLat}
				setLongLat={props.setLongLat}
				long={long}
				lat={lat}
				setDummy={props.setDummy}
			/>
			<ModalColorChange
				modalColorChange={modalColorChange}
				toggleColorChange={toggleColorChange}
				type={type}
				//RL
				setRLColor={setRLColor}
				RLColor={RLColor}
				//FO
				setFOColor={setFOColor}
				FOColor={FOColor}
				//VSAT
				setVSATColor={setVSATColor}
				VSATColor={VSATColor}
			/>
			<Row>
				<Col lg={2} className="text-center">
					<a>
						<img
							alt="img"
							src={imgColor}
							onClick={() => {
								handleColorChange("RL");
							}}
						/>
					</a>
				</Col>
				<Col lg={8}>
					<CardText style={{ color: RLColor }}>
						Titik Akses Internet RL
					</CardText>
				</Col>
				<Col lg={2}>
					<Input
						type="checkbox"
						// checked={cbRL}
						onChange={(e) => {
							e.target.checked && !addLayerRL
								? handleLayer("RL")
								: !e.target.checked && addLayerRL
								? props.hideLayer("RL")
								: props.showLayer("RL");
						}}
					/>
				</Col>
			</Row>
			<Row className="my-2">
				<Col lg={2} className="text-center">
					<a>
						<img
							alt="img"
							src={imgColor}
							onClick={() => {
								handleColorChange("FO");
							}}
						/>
					</a>
				</Col>
				<Col lg={8}>
					<CardText style={{ color: FOColor }}>
						Titik Akses Internet FO
					</CardText>
				</Col>
				<Col lg={2}>
					<Input
						type="checkbox"
						onChange={(e) => {
							e.target.checked && !addLayerFO
								? handleLayer("FO")
								: !e.target.checked && addLayerFO
								? props.hideLayer("FO")
								: props.showLayer("FO");
						}}
					/>
				</Col>
			</Row>
			<Row>
				<Col lg={2} className="text-center">
					<a>
						<img
							alt="img"
							src={imgColor}
							onClick={() => {
								handleColorChange("VSAT");
							}}
						/>
					</a>
				</Col>
				<Col lg={8}>
					<CardText style={{ color: VSATColor }}>
						Titik Akses Internet VSAT-GS
					</CardText>
				</Col>
				<Col lg={2}>
					<Input
						type="checkbox"
						onChange={(e) => {
							e.target.checked && !addLayerVSAT
								? handleLayer("VSAT")
								: !e.target.checked && addLayerVSAT
								? props.hideLayer("VSAT")
								: props.showLayer("VSAT");
						}}
					/>
				</Col>
			</Row>
			{addLayerDummy && (
				<Row className="mt-1">
					{/* <Col lg={2} className="text-center">
						<a>
							<img
								alt="img"
								src={imgColor}
								onClick={() => {
									handleColorChange("Dummy");
								}}
							/>
						</a>
					</Col> */}
					<Col lg={12} className="text-center">
						<CardText
							style={
								{
									// color: dummyColor,
									// fontWeight: "bold",
								}
							}
						>
							Long: {long} Lat: {lat}
						</CardText>
					</Col>
					<Col lg={12} className="d-flex justify-content-center">
						<Button
							style={{
								backgroundColor: "#E7883A",
								borderRadius: "10px",
								fontSize: "12px",
							}}
							onClick={(e) => {
								handleDeleteDummy();
							}}
						>
							{" "}
							Delete Dummy Site
						</Button>
					</Col>
				</Row>
			)}
			<div className="d-flex justify-content-center">
				<Button
					className="w-50"
					style={{
						backgroundColor: "#E7883A",
						border: "solid black",
						borderRadius: "10px",
						borderWidth: "1px",
						fontSize: "12px",
					}}
					onClick={handleButtonDummySite}
				>
					Add Dummy Site
				</Button>
			</div>
		</div>
	);
}
