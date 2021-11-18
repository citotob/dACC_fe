import React, { useState, useContext, useEffect } from "react";
import MapStreet from "./MapStreet";
import MapSatelite from "./MapSatelite";
import MapPotensial from "./MapPotensial";
import ToolboxStreet from "../Toolbox/ToolboxStreet";
import ToolboxSatelite from "../Toolbox/ToolboxSatelite";
import { LocalContext } from "../LocalContext";
import style from "../style.module.css";
import Table from "../Card/Table/CardTable";
import Dummy from "../Card/DummySite";
import BaseMap from "../Modal/BasemapModal";
import { Card, CardBody, CardTitle, Collapse } from "reactstrap";

// ICON //
import foImg from "../../../../assets/images/FO.png";
import rlImg from "../../../../assets/images/RL.png";
import vsatImg from "../../../../assets/images/VSATIcon.png";

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

	useEffect(() => {
		setLongLat({ long: "", lat: "", condition: false });
	}, [tab, basemap]);

	// const [showTable, setshowTable] = useState(false);
	// const toggleShow = () => setshowTable(!showTable)

	const [reset, setreset] = useState(false);
	const fnReset = () => {
		setreset(!reset);
	};

	return (
		<div className={style.containermap}>
			{tab === "1" &&
				(basemap === "streets-v11" ? (
					<>
						<MapStreet />
						{longLat.condition && <Dummy longLat={longLat} />}
						{/* {(showTable && !longLat.condition) ? <Table /> : (showTable && longLat.condition) && alert('hapus dummy site dulu')} */}
						{/* awal */}
						{/* {showTable && !longLat.condition && <Table />} */}
						{/* try new option */}
						{showTable && !longLat.condition && <Table reset={reset} />}
						{/* <BaseMap buttonLabel={maptype} /> */}
						<ToolboxStreet
							tab={tab}
							setLongLat={setLongLat}
							setTab={setTab}
							fnReset={fnReset}
						/>
					</>
				) : (
					<>
						<MapSatelite />
						{longLat.condition && <Dummy longLat={longLat} />}
						{/* {(showTable && !longLat.condition) ? <Table /> : (showTable && longLat.condition) && alert('hapus dummy site dulu')} */}
						{/* awal */}
						{/* {showTable && !longLat.condition && <Table />} */}
						{/* try new option */}
						{showTable && !longLat.condition && <Table reset={reset} />}
						{/* <BaseMap buttonLabel={maptype} /> */}
						<ToolboxSatelite
							tab={tab}
							setLongLat={setLongLat}
							setTab={setTab}
						/>
					</>
				))}
			{tab === "2" ? (
				<>
					<MapPotensial />
					<ToolboxStreet tab={tab} setLongLat={setLongLat} setTab={setTab} />
					{/* z-index: 1;
						position: absolute;
						width: 93.5%;
						min-width: 10rem;
						bottom: 1vh;
						left: 5.5%;
						display: block;
						width: 10%;
						min-width: 10rem;
						top: 10%;
						left: 31%; */}
					<div
						className="card"
						style={{
							zIndex: 1,
							position: "absolute",
							right: "1.5%",
							bottom: "1.5%",
							display: "block",
							padding: "10px",
						}}
					>
						<div>
							<span
								className="mdi mdi-checkbox-blank-circle mr-4"
								style={{ color: "#FD2D2D" }}
							/>
							Area Rendah Potensi
						</div>
						<div>
							<span
								className="mdi mdi-checkbox-blank-circle mr-4"
								style={{ color: "#fe981b" }}
							/>
							Area Sedang Potensi
						</div>
						<div>
							<span
								className="mdi mdi-checkbox-blank-circle mr-4"
								style={{ color: "#fcd303" }}
							/>
							Area Tinggi Potensi
						</div>
					</div>
					<div
						style={{
							zIndex: 1,
							position: "absolute",
							left: "5.5%",
							bottom: "1.5%",
							display: "block",
							padding: "10px",
							fontSize: "10px",
						}}
					>
						<p>Data kependudukan berdasarkan data BPS tahun 2020</p>
					</div>
				</>
			) : (
				!showTable && (
					<>
						{/* <div
							className="card"
							style={{
								zIndex: 1,
								position: "absolute",
								right: "1.5%",
								bottom: "1.5%",
								display: "block",
								padding: "10px",
							}}
						>
							<CardBody className="p-0">
								<div>
									<div
										onClick={() => {
											setcol1(!col1);
										}}
										className="mb-2"
										style={{
											display: "flex",
											justifyContent: "center",
											alignItems: "center",
											cursor: "pointer",
											fontSize: "11px",
										}}
									>
										<span className="mr-3">Keterangan Layer Penyedia</span>
										<i
											className={`mdi ${
												!col1
													? "mdi-arrow-up-bold-box"
													: "mdi-arrow-down-bold-box-outline"
											}`}
										/>
									</div>
								</div>
								<Collapse isOpen={col1}>
									<div
										style={{
											fontSize: "11px",
										}}
									>
										<div>
											<img
												className="mr-2"
												src={rlImg}
												style={{ width: "20px" }}
											/>
											<span>Radio Link</span>
										</div>
										<div className="my-2">
											<img
												className="mr-2"
												src={foImg}
												style={{ width: "20px" }}
											/>
											<span>Fiber Optic</span>
										</div>
										<div>
											<img
												className="mr-2"
												src={vsatImg}
												style={{ width: "20px" }}
											/>
											<span>VSAT</span>
										</div>
									</div>
								</Collapse>
							</CardBody>
						</div> */}
					</>
				)
			)}
			{tab === "1" && <BaseMap buttonLabel={maptype} />}
		</div>
	);
};

export default MapPage;
