import React, { useState } from "react";
import styled from "styled-components";
import { Modal, ModalHeader, ModalFooter } from "reactstrap";
import Button from "../Button/Button";
import FormSaveTemplate from "../Forms/FormSaveTemplate";

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
const ModalWindowSaveTemplate = ({ mapRef, onSubmit }) => {
	const [modal, setModal] = useState(false);
	const [layerData, setLayerData] = useState("");
	const [color, setColor] = useState("#FFFFFF");
	const [radius, setRadius] = useState("0");
	const toggle = () => setModal(!modal);

	return (
		<>
			<div
				onClick={() => {
					setModal(!modal);
				}}
				className={"FlexRowCenter"}
				style={{ width: "max-content", cursor: "pointer" }}
			>
				<svg
					width="13"
					height="12"
					viewBox="0 0 13 12"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path d="M0.5 11.5H12.5" stroke="#CFCFCF" />
					<path
						d="M6.64704 9.89306C6.55938 9.95681 6.44062 9.95681 6.35296 9.89306L1.62175 6.45218C1.42594 6.30978 1.52668 6 1.7688 6L11.2312 6C11.4733 6 11.5741 6.30978 11.3782 6.45218L6.64704 9.89306Z"
						fill="#CFCFCF"
					/>
					<rect x="4" width="5" height="7" rx="0.25" fill="#CFCFCF" />
				</svg>
				<p style={{ margin: "0px 1rem 0px 1rem", color: "#CFCFCF" }}>
					{" "}
					Save Layer Set{" "}
				</p>
			</div>
			<Modal isOpen={modal} size={"m"} toggle={toggle} centered={true}>
				<ModalHeader style={{ display: "block" }}>
					<HeadingContainer>
						<h2>Save Layer Set</h2>
					</HeadingContainer>
				</ModalHeader>
				<FormContainer>
					<FormSaveTemplate
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

ModalWindowSaveTemplate.defaultProps = {
	mapRef: () => console.log("MAP REF"),
	onSubmit: () => console.log("ON SUBMIT"),
};

export default ModalWindowSaveTemplate;
