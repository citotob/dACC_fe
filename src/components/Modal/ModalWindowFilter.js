import React, { useState } from "react";
import styled from "styled-components";
import { Modal, ModalHeader, ModalFooter, Tooltip } from "reactstrap";
import Button from "../Button/Button";
import FormAddLayer from "../Forms/FormAddLayer";
import FormFilter from "../Forms/FormFilter";

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
const ModalWindowFilter = ({ mapRef, onSubmit }) => {
	const [tooltipOpen, setTooltipOpen] = useState(false);
	const [modal, setModal] = useState(false);
	const [layerData, setLayerData] = useState("");
	const [color, setColor] = useState("#FFFFFF");
	const [radius, setRadius] = useState("0");
	const toggle = () => setModal(!modal);
	const toggleTooltip = () => setTooltipOpen(!tooltipOpen);

	return (
		<>
			<svg
				onClick={toggle}
				id={"filterIcon"}
				style={{ cursor: "pointer", marginRight: "1rem" }}
				width="10"
				height="11"
				viewBox="0 0 10 11"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M3.88793 5.97284C3.94575 6.03407 3.97976 6.1123 3.97976 6.19733V10.949L6.02058 9.20414V6.19733C6.02058 6.1123 6.05459 6.03407 6.11242 5.97284L9.5648 2.21094H0.435547L3.88793 5.97284Z"
					fill="#19324A"
				/>
				<path d="M10 0H0V1.53061H10V0Z" fill="#19324A" />
			</svg>
			<Tooltip
				placement="top"
				isOpen={tooltipOpen}
				target="filterIcon"
				toggle={toggleTooltip}
			>
				Filter Data
			</Tooltip>
			<Modal isOpen={modal} size={"m"} toggle={toggle} centered={true}>
				<ModalHeader style={{ display: "block" }}>
					<HeadingContainer>
						<h2>Filter Layer Data</h2>
					</HeadingContainer>
				</ModalHeader>
				<FormContainer>
					<FormFilter />
				</FormContainer>
				<ModalFooter>
					<Button name={"Cancel"} onClick={toggle} />
					<Button name={"Select"} affirmative onClick={() => toggle()} />
				</ModalFooter>
			</Modal>
		</>
	);
};

ModalWindowFilter.defaultProps = {
	mapRef: () => console.log("MAP REF"),
	onSubmit: () => console.log("ON SUBMIT"),
};

export default ModalWindowFilter;
