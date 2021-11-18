import React, { useState, useRef } from "react";
// import PropTypes from 'prop-types';
import MapBase from "./Map";
import BasemapModal from "../Modal/BasemapModal";
import LayerManagementPanel from "../Layer/LayerManagementPanel";
import ErrorHandler from "../Utilities/ErrorHandler";

function MapPanel() {
	const [basemap, setBasemap] = useState("light-v10");
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
			<div
				className={"FlexRowBetween"}
				style={{ width: "100vw", height: "100vh" }}
			>
				<div
					className={"FlexRowBetween"}
					style={{ width: "25%", height: "100%" }}
				>
					<LayerManagementPanel mapRef={MapRef} />
				</div>
				<div style={{ width: "75%", height: "100%" }}>
					<MapBase basemap={basemap} ref={MapRef} />
				</div>
				<div style={{ position: "absolute", top: "10px", right: "50px" }}>
					<BasemapModal
						buttonLabel={`${"Basemap: " + maptype()}`}
						color={"#F2F1F9"}
						setMap={setBasemap}
					/>
				</div>
			</div>
		</ErrorHandler>
	);
}

export default MapPanel;
