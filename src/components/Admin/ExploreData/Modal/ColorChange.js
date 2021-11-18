import React, {  useState, useContext } from "react";
import { LocalContext } from "../LocalContext";
import {
	MDBContainer,
	MDBModal,
	MDBModalBody,
	MDBModalHeader,
	MDBModalFooter,
} from "mdbreact";
import {Button } from "reactstrap";
// import { SketchPicker } from "react-color";
import ColorSwatch from "../Utilities/ColorSwatch";

export default function ModalColorChange({
	open,
	modalToggle,
	layerName,
	type,
	setColorLabel,
}) {
	//handle change tab
	const { mapRef, defaultLayers } = useContext(LocalContext);
	const selectedLayer = defaultLayers
		.map((data) => {
			return { ...data };
		})
		.find((data) => {
			return data.name === layerName;
		});
	const [color, setColor] = useState(selectedLayer.color);
	const changeColor = (newColor) => setColor(newColor);
	const handleSubmit = () => {
		if (type === "polygon") {
			setColorLabel((prev) => ({ ...prev, Indo: color }));
			mapRef.current.state.map.setPaintProperty(
				layerName + "Layer",
				"fill-color",
				color
			);
		} else {
			if (layerName === "pointRL") {
				setColorLabel((prev) => ({ ...prev, RL: color }));
			} else if (layerName === "pointFO") {
				setColorLabel((prev) => ({ ...prev, FO: color }));
			} else if (layerName === "pointVSAT") {
				setColorLabel((prev) => ({ ...prev, VSAT: color }));
			}
			mapRef.current.state.map.setPaintProperty(
				layerName + "Layer",
				"circle-color",
				color
			);
		}
		modalToggle();
	};

	const handleCancel = () => {
		modalToggle();
	};
	return (
		<MDBContainer>
			<MDBModal size="md" isOpen={open} fullHeight={true} centered={true}>
				<MDBModalHeader>Edit Layer</MDBModalHeader>
				<MDBModalBody>
					<span>Choose Color</span>
					<ColorSwatch
						layerName={layerName}
						changeColor={changeColor}
						color={color}
					/>
				</MDBModalBody>
				<MDBModalFooter>
					<Button onClick={handleCancel}>Cancel</Button>
					<Button color="primary" onClick={handleSubmit}>
						Submit
					</Button>
				</MDBModalFooter>
			</MDBModal>
		</MDBContainer>
	);
}
