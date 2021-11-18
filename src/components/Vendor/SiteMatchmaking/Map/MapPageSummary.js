import React from "react";
import Map from "./MapSummary";
import { LocalContext } from "../LocalContext";
import style from "./style.module.css";
import { useParams } from "react-router-dom";
// import Toolbox from "../Toolbox";
// import Table from "../Card/Table/CardTable";
// import Dummy from "../Card/DummySite";
// import BaseMap from "../Modal/BasemapModal";

const MapPage = (props) => {
	let { id, judul } = useParams();

	return (
		<div className={style.containermap}>
			{props.activeTab === "2" && <Map batch_id={id} judul={judul} />}
		</div>
	);
};

export default MapPage;
