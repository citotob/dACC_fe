import React from "react";
import Map from "./Map";
import BasemapModal from "../Modal/BasemapModal";
import { Resizable } from "re-resizable";

function MapBasic({ layersData, onAddLayer, onSaveLayerList, loading }) {
	return (
		<div
			className={"FlexRowBetween"}
			style={{ width: "100vw", height: "100vh" }}
		>
			<Resizable
				bounds="window"
				defaultSize={{
					width: "95%",
					height: "100%",
				}}
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
					defaultSize={{
						width: "100%",
						height: "95%",
					}}
					maxHeight={"90%"}
					minHeight={"50%"}
				>
					<Map basemap={"light-v10"} />
					<div style={{ position: "absolute", top: "10px", right: "50px" }}>
						<BasemapModal buttonLabel={"Basemap: Street"} color={"#F2F1F9"} />
					</div>
				</Resizable>
				{/* <div style={{height:"10%"}}></div> */}
				<div style={{ height: "100%", width: "100%", backgroundColor: "blue" }}>
					{" "}
					TABLE{" "}
				</div>
			</Resizable>
			<div style={{ height: "100%", width: "100%", backgroundColor: "red" }}>
				{" "}
				GRAPHIC{" "}
			</div>
		</div>
	);
}

export default MapBasic;
