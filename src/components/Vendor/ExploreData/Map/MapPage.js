import React, { useState, useContext, useEffect } from "react";
import MapStreet from "./MapStreet";
import MapSatelite from "./MapSatelite";
import MapPotensial from "./MapPotensial";
import { LocalContext } from "../LocalContext";
import style from "../style.module.css";
import ToolboxStreet from "../Toolbox/ToolboxStreet";
import ToolboxSatelite from "../Toolbox/ToolboxSatelite";
import Table from "../Card/Table/CardTable";
import Dummy from "../Card/DummySite";
import BaseMap from "../Modal/BasemapModal";

const MapPage = (props) => {
	const { showTable, basemap } = useContext(LocalContext);
	const [longLat, setLongLat] = useState({
		long: "",
		lat: "",
		condition: false,
	});
	// const [basemap, setBasemap] = useState("streets-v11");
	const [tab, setTab] = useState("1");

	const maptype = () => {
		switch (basemap) {
			case "streets-v11":
				return "Street";
			// case "light-v10":
			// 	return "Light";
			// case "dark-v10":
			// 	return "Dark";
			default:
				return "Satellite";
		}
	};

	return (
		<div className={style.containermap}>
			<MapStreet />
			{/* {longLat.condition && <Dummy longLat={longLat} />} */}
			{/* {(showTable && !longLat.condition) ? <Table /> : (showTable && longLat.condition) && alert('hapus dummy site dulu')} */}
			<Table />
			{/* <BaseMap buttonLabel={maptype} /> */}
			<ToolboxStreet setLongLat={setLongLat} setTab={setTab} />
		</div>
	);
};

export default MapPage;
