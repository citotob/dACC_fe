import React from "react";
import Map from "./Map";
// import { LocalContext } from "../LocalContext";
import style from "../style.module.css";
// import Toolbox from "../Toolbox";
// import Table from "../Card/Table/CardTable";
// import Dummy from "../Card/DummySite";
// import BaseMap from "../Modal/BasemapModal";

const MapPage = (props) => {
	// const { showTable } = useContext(LocalContext);
	// const [longLat, setLongLat] = useState({
	// 	long: "",
	// 	lat: "",
	// 	condition: false,
	// });
	// const [basemap, setBasemap] = useState("streets-v11");

	return (
		<div className={style.containermap}>
			{props.activeTab === "2" && (
				<Map batch_id={props.batch_id} judul={props.judul} />
			)}
		</div>
	);
};

export default MapPage;
