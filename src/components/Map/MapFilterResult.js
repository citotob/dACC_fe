import React, { useState, useRef } from "react";
// import PropTypes from 'prop-types';
import Map from "./Map";
import BasemapModal from "../Modal/BasemapModal";
import LayerManagementPanel from "../Layer/LayerManagementPanel";
import FilterPanel from "../Filter/FilterPanel";
import ErrorHandler from "../Utilities/ErrorHandler";
import { Resizable } from "re-resizable";
import Table from "../Table/Table";

function MapFilterResult() {
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
					className={"FlexColumnCenter"}
					style={{ width: "25%", height: "100%" }}
				>
					<LayerManagementPanel mapRef={MapRef} />
					<hr />
					<FilterPanel mapRef={MapRef} />
				</div>
				<div style={{ width: "75%", height: "100%" }}>
					<div
						className={"FlexRowBetween"}
						style={{ width: "100%", height: "100%" }}
					>
						<Resizable
							bounds="window"
							defaultSize={{ width: "95%", height: "100%" }}
							maxWidth={"95%"}
							minWidth={"50%"}
							enable={{
								top: false,
								right: true,
								bottom: false,
								left: false,
								topRight: false,
								bottomRight: false,
								bottomLeft: false,
								topLeft: false,
							}}
						>
							<Resizable
								bounds="window"
								defaultSize={{ width: "100%", height: "95%" }}
								maxHeight={"90%"}
								minHeight={"50%"}
							>
								<Map basemap={basemap} ref={MapRef} />
								<div
									style={{ position: "absolute", top: "10px", right: "50px" }}
								>
									<BasemapModal
										buttonLabel={`${"Basemap: " + maptype()}`}
										color={"#F2F1F9"}
										setMap={setBasemap}
									/>
								</div>
							</Resizable>
							<div
								style={{
									height: "100%",
									width: "100%",
									backgroundColor: "blue",
								}}
							>
								<Table />
							</div>
						</Resizable>
						<div
							style={{ height: "100%", width: "100%", backgroundColor: "red" }}
						>
							{" "}
							GRAPHIC{" "}
						</div>
					</div>
				</div>
			</div>
		</ErrorHandler>
	);
}

export default MapFilterResult;
