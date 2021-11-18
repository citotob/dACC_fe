import React, { createContext, useState, useEffect, useRef } from "react";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";
import { useList, useObject } from "react-firebase-hooks/database";
import { Button } from "reactstrap";
import API from "../../../../services";
import fbinit from "../../../../helpers/fbinit";
import ModalColorChange from "../Modal/ColorChange";
import style from "../style.module.css";

import TableSite from "../Card/Table/CardTable";

import { useDispatch } from "react-redux";
import { getDataTeknologi } from "../../../../store/actions";

//init essential constants
export const LocalContext = createContext([]);
const db = fbinit.database();
// const userid = localStorage.getItem("userId");
// const defaultLayerRef = db.ref(`defaultlayer`);

//helper component and function
const maptype = (basemap) => {
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

const CheckBox = ({ mapRef, layer, layer_id }) => {
	// const [checked, setChecked] = useState(true);
	const [checked, setChecked] = useState(false);

	const hideLayer = () => {
		mapRef.current.state.map.setLayoutProperty(
			layer + "Layer",
			"visibility",
			"none"
		);
		setChecked((prevState) => !prevState);
	};

	const showLayer = () => {
		mapRef.current.state.map.setLayoutProperty(
			layer + "Layer",
			"visibility",
			"visible"
		);
		setChecked((prevState) => !prevState);
	};

	const checkedLayer = () => {
		// if (layer === "INDONESIA") {
		// 	setChecked(!checked);
		// }
		if (!checked) {
			// if (layer === "INDONESIA") {
			// 	hideLayer();
			// } else {
			// 	showLayer();
			// }
			showLayer();
		} else {
			// if (layer === "INDONESIA") {
			// 	showLayer();
			// } else {
			// 	hideLayer();
			// }
			hideLayer();
		}
	};

	return (
		<div className={style.checkbox}>
			<input
				type="checkbox"
				name="invite"
				// checked={layer === "INDONESIA" ? checked : !checked}
				checked={checked}
				style={{ marginTop: "0.2rem" }}
				onChange={checkedLayer}
			/>
		</div>
	);
};

const Edit = ({ layerName, type, setColorLabel }) => {
	const [open, setOpen] = useState(false);
	const modalToggle = () => setOpen((prevState) => !prevState);
	if (
		layerName === "heatmap" ||
		layerName === "pointPenduduk" ||
		layerName === "pointSebaranInternet" ||
		layerName === "pointSebaranBTS"
	) {
		return "";
	}
	return (
		<div className={style.edit}>
			<i className={`mdi mdi-image-edit`} onClick={modalToggle} />
			<ModalColorChange
				open={open}
				modalToggle={modalToggle}
				layerName={layerName}
				type={type}
				setColorLabel={setColorLabel}
			/>
		</div>
	);
};

const ShowTable = ({ setCondition, layerName }) => {
	const dispatch = useDispatch();
	return (
		<div className={style.edit}>
			<i
				className={`mdi mdi-table`}
				onClick={() => {
					// setCondition((prev) => !prev);
					dispatch(
						getDataTeknologi(
							layerName === "pointFO"
								? "FO"
								: layerName === "pointVSAT"
								? "VSAT"
								: layerName === "pointRL"
								? "RL"
								: "empty"
						)
					);
				}}
			/>
		</div>
	);
};

//Provider Components
export const LocalProvider = ({ children }) => {
	const [basemap, setBasemap] = useState("streets-v11");
	const [colorLabel, setColorLabel] = useState({
		Indo: "#ffb95a",
		RL: "#F36666",
		FO: "#D7C843",
		VSAT: "#5EA2F2",
		// Heatmap: "orange",
	});
	// const [defaultLayers, loadingDeflayer, errorDeflayer] = useList(
	// 	defaultLayerRef
	// );
	const [showTable, setShowTable] = useState(false);
	const [dataTitik, setDataTitik] = useState([]);
	const [showDataODP, setShowDataODP] = useState(false);

	const defaultLayers = [
		// {
		// 	color: "#ffb95a",
		// 	id: "1",
		// 	name: "INDONESIA",
		// 	type: "polygon",
		// 	label: "Indonesia Layer",
		// },
		{
			color: "#F36666",
			id: "2",
			name: "pointRL",
			type: "marker",
			label: "Titik Akses Internet RL",
		},
		{
			color: "#D7C843",
			id: "3",
			name: "pointFO",
			type: "marker",
			label: "Titik Akses Internet FO",
		},
		{
			color: "#5EA2F2",
			id: "4",
			name: "pointVSAT",
			type: "marker",
			label: "Titik Akses Internet VSAT-GS",
		},
	];
	const defaultLayersPotensial = [
		{
			color: "black",
			id: "5",
			name: "heatmap",
			type: "heatmap",
			label: "Heatmap",
		},
		{
			color: "black",
			id: "6",
			name: "pointPenduduk",
			type: "polygon",
			label: "Kepadatan Penduduk",
		},
		{
			color: "black",
			id: "7",
			name: "pointSebaranInternet",
			type: "polygon",
			label: "Sebaran Titik Akses Internet",
		},
		{
			color: "black",
			id: "8",
			name: "pointSebaranBTS",
			type: "polygon",
			label: "Sebaran Titik BTS",
		},
	];
	const mapRef = useRef(null);
	const changeBasemap = (maptype) => {
		setBasemap(maptype);
	};
	const layerList = defaultLayers.map((data) => {
		const labelList = () => {
			switch (data.name) {
				case "INDONESIA":
					return <span style={{ color: colorLabel.Indo }}> {data.label} </span>;

				case "pointRL":
					return <span style={{ color: colorLabel.RL }}> {data.label} </span>;

				case "pointFO":
					return <span style={{ color: colorLabel.FO }}> {data.label} </span>;

				case "pointVSAT":
					return <span style={{ color: colorLabel.VSAT }}> {data.label} </span>;

				default:
					break;
			}
		};

		// console.log(showTable);

		return {
			visibility: (
				<CheckBox layer={data.name} layer_id={data.id} mapRef={mapRef} />
			),
			layer: labelList(),
			edit: (
				<Edit
					layerName={data.name}
					type={data.type}
					setColorLabel={setColorLabel}
				/>
			),
			tabel: <ShowTable setCondition={setShowTable} layerName={data.name} />,
		};
	});

	const potensialList = defaultLayersPotensial.map((data) => {
		const labelList = () => {
			switch (data.name) {
				// case "INDONESIA":
				// 	return <span style={{ color: colorLabel.Indo }}> {data.label} </span>;

				// case "pointRL":
				// 	return <span style={{ color: colorLabel.RL }}> {data.label} </span>;

				// case "pointFO":
				// 	return <span style={{ color: colorLabel.FO }}> {data.label} </span>;

				// case "pointVSAT":
				// 	return <span style={{ color: colorLabel.VSAT }}> {data.label} </span>;

				case "heatmap":
					return <span style={{ color: "black" }}> {data.label} </span>;
				case "pointPenduduk":
					return <span style={{ color: "black" }}> {data.label} </span>;
				case "pointSebaranInternet":
					return <span style={{ color: "black" }}> {data.label} </span>;
				case "pointSebaranBTS":
					return <span style={{ color: "black" }}> {data.label} </span>;

				default:
					break;
			}
		};

		return {
			visibility: (
				<CheckBox layer={data.name} layer_id={data.id} mapRef={mapRef} />
			),
			layer: labelList(),
			// edit: (
			// 	<Edit
			// 		layerName={data.name}
			// 		type={data.type}
			// 		setColorLabel={setColorLabel}
			// 	/>
			// ),
			// tabel: <ShowTable setCondition={setShowTable} layerName={data.name} />,
		};
	});

	return (
		<LocalContext.Provider
			value={{
				db,
				mapRef,
				basemap,
				changeBasemap,
				maptype,
				layerList,
				defaultLayers,
				showTable,
				defaultLayersPotensial,
				potensialList,
				dataTitik,
				setDataTitik,
				setShowDataODP,
				showDataODP,
				// loadingDeflayer,
			}}
		>
			{children}
		</LocalContext.Provider>
	);
};
