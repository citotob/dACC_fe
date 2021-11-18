import React, { useState, useRef } from "react";
import MapBase from "./Map";
import BasemapModal from "../Modal/BasemapModal";
import styled from "styled-components";
// import { useSelector, useDispatch } from 'react-redux';
import LayerManagementPanel from "../Layer/LayerManagementPanel";
import ErrorHandler from "../Utilities/ErrorHandler";
import Table from "../Table/Table";
import FlexiCard from "../Cards/FlexiCard";
import BottomNav from "../Navigation/BottomNav";

// styled components
const MainContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100vw;
	height: 100vh;
	padding: 1rem;
`;
const MapContainer = styled.div`
	width: 100%;
	height: 100%;
`;
const BasemapContainer = styled.div`
	position: absolute;
	top: 10px;
	right: 50px;
`;
const LayerContainer = styled.div`
	position: absolute;
	top: 5px;
	left: 5px;
	background: white;
	border-radius: 4px;
`;
const AnalysisContainer = styled.div`
	position: absolute;
	bottom: 5px;
	left: 25%;
`;

// react functional component
const MapVast = () => {
	const [basemap, setBasemap] = useState("light-v10");
	// const dispatch = useDispatch()
	const MapRef = useRef(null);
	const maptype = () => {
		switch (basemap) {
			case "streets-v11":
				return "Street";
			case "light-v10":
				return "Light";
			case "dark-v10":
				return "Dark";
			default:
				return "Satellite";
		}
	};

	return (
		<ErrorHandler>
			<MainContainer>
				<MapContainer>
					<MapBase basemap={basemap} ref={MapRef} />
				</MapContainer>
				<BasemapContainer>
					<BasemapModal
						buttonLabel={`${"Basemap: " + maptype()}`}
						color={"#F2F1F9"}
						setMap={setBasemap}
					/>
				</BasemapContainer>
				<LayerContainer>
					<LayerManagementPanel mapRef={MapRef} />
				</LayerContainer>
				<AnalysisContainer>
					<BottomNav />
				</AnalysisContainer>
			</MainContainer>
		</ErrorHandler>
	);
};

export default MapVast;
