import React, { useState } from "react";
import styled from "styled-components";
import { Modal, ModalHeader, ModalFooter } from "reactstrap";
import Button from "../Button/Button";
import FormAddLayer from "../Forms/FormAddLayer";

// styled components
const FlexRow = styled.div`
	display: flex;
	align-items: center;
`;
const Link = styled.p`
	margin: 0px 1rem;
	color: #cfcfcf;
	cursor: pointer;
`;
const HeadingContainer = styled(FlexRow)`
	width: 100%;
	height: 100%;
	justify-content: flex-end;
`;
const FormContainer = styled(FlexRow)`
	margin: 1rem;
	width: 100%;
	height: 100%;
	justify-content: center;
`;

// react functional component
const ModalWindowAddLayer = ({ mapRef, onSubmit }) => {
	const [modal, setModal] = useState(false);
	const [layerData, setLayerData] = useState("");
	const [color, setColor] = useState("#FFFFFF");
	const [radius, setRadius] = useState("0");
	const toggle = () => setModal(!modal);

	return (
		<>
			<Link onClick={toggle}>{"+ Add Layer"}</Link>
			<Modal isOpen={modal} size={"m"} toggle={toggle} centered={true}>
				<ModalHeader style={{ display: "block" }}>
					<HeadingContainer>
						<h2>+ Add Layer</h2>
					</HeadingContainer>
				</ModalHeader>
				<FormContainer>
					<FormAddLayer
						setLayerData={setLayerData}
						radius={{ radius: radius, setRadius: setRadius }}
						color={{ color: color, setColor: setColor }}
					/>
				</FormContainer>
				<ModalFooter>
					<Button name={"Cancel"} onClick={toggle} />
					<Button
						name={"Select"}
						affirmative
						onClick={() => {
							if (layerData.value === "PL1" || layerData.value === "PL2") {
								mapRef.current.addPolygon([layerData.value, radius, color]);
							} else {
								mapRef.current.addGeoPoints([layerData.value, radius, color]);
							}
							onSubmit({
								id: layerData.value,
								title: layerData.label,
								color: color,
								radius: radius,
								value: layerData.value,
								label: layerData.label,
							});
							toggle();
						}}
					/>
				</ModalFooter>
			</Modal>
		</>
	);
};

ModalWindowAddLayer.defaultProps = {
	mapRef: () => console.log("MAP REF"),
	onSubmit: () => console.log("ON SUBMIT"),
};

export default ModalWindowAddLayer;
