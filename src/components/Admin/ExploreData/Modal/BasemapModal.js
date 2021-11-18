import React, { useState, useRef, useContext } from "react";
import { Modal, Button } from "reactstrap";
import ButtonComponent from "../../../Button/Button";
import Select from "react-dropdown-select";
// import { useSelector, useDispatch } from "react-redux";
// import { setBasemap } from "../../store/map/action/actions";
import styled from "styled-components";
import style from "../../../Admin/ExploreData/style.module.css";

// CONTEXT
import { LocalContext } from "../LocalContext";

import Img from "../../../Image/Image";
import street from "../../../../assets/images/street.png";
// import light from "../../../../assets/images/light.png";
// import dark from "../../../../assets/images/dark.png";
import satellite from "../../../../assets/images/satellite.png";

// init constant
const mapSelection = [
	{ label: "Street", value: "streets-v11" },
	// { label: "Light", value: "light-v10" },
	// { label: "Dark", value: "dark-v10" },
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
const BaseMapPanel = React.forwardRef(( props,ref ) => {
	const { maptype, basemap } = useContext(LocalContext);
	const [label, setLabel] = useState(maptype(basemap));
	return (
		<>
			{/* {mapType === "Street" ? (
				<Img key={1} source={street} alt="basemap" />
			) : mapType === "Light" ? (
				<Img key={2} source={light} alt="basemap" />
			) : mapType === "Dark" ? (
				<Img key={3} source={dark} alt="basemap" />
			) : (
				<Img key={4} source={satellite} alt="basemap" />
			)} */}
			{label === "Street" ? (
				<Img key={1} source={street} alt="basemap" />
			) : (
				<Img key={4} source={satellite} alt="basemap" />
			)}
			<Selection
				ref={ref}
				options={mapSelection}
				values={[{ label: label, value: basemap }]}
				onChange={(value) => {
					maptype(value[0].value);
					props.setMapStyle(value[0].value);
					setLabel(value[0].label);
				}}
			/>
		</>
	);
});

const BasemapModal = (props) => {
	const [modal, setModal] = useState(false);
	// const basemap = useSelector((state) => state.BaseMap);
	const { basemap, changeBasemap } = useContext(LocalContext);
	const [mapStyle, setMapStyle] = useState(basemap);
	const inputRef = useRef(null);
	const toggle = () => setModal(!modal);

	return (
		<div className={style.baseMap}>
			<ButtonComponent name={props.buttonLabel()} onClick={toggle} />

			<Modal isOpen={modal} size={"xl"} toggle={toggle} centered={true}>
				<BasemapContainer>
					<BaseMapPanel ref={inputRef} setMapStyle={setMapStyle} />
					{/* <BaseMapPanel setMapStyle={setMapStyle} /> */}
				</BasemapContainer>
				<div className="d-flex justify-content-center my-2">
					<Button
						color={props.color ? props.color : "white"}
						style={{ width: "40%" }}
						onClick={toggle}
					>
						Cancel
					</Button>
				</div>

				<div className="d-flex justify-content-center my-2">
					<Button
						style={{ width: "40%" }}
						onClick={() => {
							setModal(!modal);
							changeBasemap(mapStyle);
						}}
					>
						Select
					</Button>
				</div>
			</Modal>
		</div>
	);
};

export default BasemapModal;
