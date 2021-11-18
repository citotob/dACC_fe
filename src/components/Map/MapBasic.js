import React, { useState, useRef } from "react";
import Map from "./Map";
import BasemapModal from "../Modal/BasemapModal";
import Table from "./Card/ExploreData/Table/CardTable";
import CardDummy from "./Card/ExploreData/DummySite";
// import {useSelector} from 'react-redux'

function MapBasic() {
	const [basemap, setBasemap] = useState("streets-v11");
	const [dummy, setDummy] = useState(false);
	const [activeTab, setActiveTab] = useState("1");
	const [longLat, setLongLat] = useState({ long: "", lat: "" });
	// const markerColor = useSelector(state => state.ColorMarker)
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

	// console.log("mapbasic", basemap);
	// console.log("longlat", longLat);

	return (
		<div style={{ width: "100%", height: "100vh", marginTop: "70px" }}>
			<Map
				basemap={basemap}
				ref={MapRef}
				setDummy={setDummy}
				setActiveTab={setActiveTab}
				setLongLat={setLongLat}
			/>
		</div>
	);
}

export default MapBasic;
