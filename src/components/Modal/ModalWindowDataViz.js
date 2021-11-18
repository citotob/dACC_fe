import React, { useState } from "react";
import styled from "styled-components";
import { Modal, ModalHeader, ModalFooter } from "reactstrap";
import Button from "../Button/Button";
import FormDataViz from "../Forms/FormDataViz";
import DataVizIcon from "../../asset/icons/dataviz.svg";
import Icon from "../Utilities/Icon";

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
const ModalWindowDataViz = ({ mapRef, onSubmit }) => {
	const [tooltipOpen, setTooltipOpen] = useState(false);
	const [modal, setModal] = useState(false);
	const [layerData, setLayerData] = useState("");
	const [color, setColor] = useState("#FFFFFF");
	const [radius, setRadius] = useState("0");
	const toggle = () => setModal(!modal);
	const toggleTooltip = () => setTooltipOpen(!tooltipOpen);
	console.log("")

	return (
		<>
			<Icon onClick={toggle} source={DataVizIcon} text={"Data Visualization"} />
			<Modal isOpen={modal} size={"m"} toggle={toggle} centered={true}>
				<ModalHeader style={{ display: "block" }}>
					<HeadingContainer>
						<h2>Data Visualization</h2>
					</HeadingContainer>
				</ModalHeader>
				<FormContainer>
					<FormDataViz />
				</FormContainer>
				<ModalFooter>
					<Button name={"Cancel"} onClick={toggle} />
					<Button name={"Select"} affirmative onClick={() => toggle()} />
				</ModalFooter>
			</Modal>
		</>
	);
};

ModalWindowDataViz.defaultProps = {
	mapRef: () => console.log("MAP REF"),
	onSubmit: () => console.log("ON SUBMIT"),
};

export default ModalWindowDataViz;
