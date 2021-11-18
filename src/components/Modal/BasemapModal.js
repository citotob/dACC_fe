import React, { useState, useRef } from "react";
import { Modal, ModalFooter } from "reactstrap";
import Button from "../Button/Button";
import Select from "react-dropdown-select";
import { useSelector, useDispatch } from "react-redux";
import { setBasemap } from "../../store/map/action/actions";
import styled from "styled-components";

import Img from "../Image/Image";
import street from "../../assets/images/street.png";
import light from "../../assets/images/light.png";
import dark from "../../assets/images/dark.png";
import satellite from "../../assets/images/satellite.png";

// init constant
const mapSelection = [
	{ label: "Street", value: "streets-v11" },
	{ label: "Light", value: "light-v10" },
	{ label: "Dark", value: "dark-v10" },
	{ label: "Satellite", value: "satellite-streets-v11" },
];

// styled component
const Selection = styled(Select)`
	background-color: #f2f1f9;
	width: 10rem;
	padding: 0 0.5rem !important;
	margin-top: 1rem;
	border: none !important;
`;
const BasemapContainer = styled.div`
	backgroundcolor: #f2f1f9;
	padding: 1rem;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
`;

// react functional components
const BaseMapPanel = React.forwardRef(( props, ref ) => {
	const [mapType, setMapType] = useState("Street");
	const dispatch = useDispatch();
	return (
		<>
			{mapType === "Street" ? (
				<Img key={1} source={street} alt="basemap" />
			) : mapType === "Light" ? (
				<Img key={2} source={light} alt="basemap" />
			) : mapType === "Dark" ? (
				<Img key={3} source={dark} alt="basemap" />
			) : (
				<Img key={4} source={satellite} alt="basemap" />
			)}
			<Selection
				ref={ref}
				options={mapSelection}
				values={[{ label: "Street", value: "streets-v11" }]}
				onChange={(value) => {
					setMapType(value[0].label);
					dispatch(setBasemap(value[0].value));
				}}
			/>
		</>
	);
});

const BasemapModal = (props) => {
	const [modal, setModal] = useState(false);
	const basemap = useSelector((state) => state.BaseMap);
	const inputRef = useRef(null);
	const toggle = () => setModal(!modal);

	return (
		<div>
			<Button name={props.buttonLabel} onClick={toggle} />
			<Modal isOpen={modal} size={"xl"} toggle={toggle} centered={true}>
				<BasemapContainer>
					<BaseMapPanel ref={inputRef} />
				</BasemapContainer>
				<ModalFooter>
					<Button
						name={"Cancel"}
						color={props.color ? props.color : false}
						onClick={toggle}
					/>
					<Button
						name={"Select"}
						affirmative
						onClick={() => {
							setModal(!modal);
							props.setMap(basemap);
						}}
					/>
				</ModalFooter>
			</Modal>
		</div>
	);
};

export default BasemapModal;
