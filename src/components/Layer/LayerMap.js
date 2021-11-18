import React, { useState } from "react";
import PropTypes from "prop-types";
import ModalWindowEditLayer from "../Modal/ModalWindowEditLayer";

const LayerMap = (props) => {
	const [status, setStatus] = useState(true);
	return (
		<div className={"FlexRowBetweenFluid"} style={{ margin: "0.5rem 0" }}>
			<div
				className={"FlexRowCenterFluid"}
				style={{ width: "max-content", animation: "fade-in-right 0.5s" }}
			>
				<input
					type="checkbox"
					defaultChecked={status}
					onClick={() => {
						if (status) {
							props.mapRef.current.hideLayer(props.layer.id);
							setStatus(!status);
						} else if (!status) {
							props.mapRef.current.showLayer(props.layer.id);
							setStatus(!status);
						}
					}}
				/>
				<p style={{ margin: "0px 1rem 0px 1rem" }}> {props.layer.title} </p>
			</div>
			<ModalWindowEditLayer
				mapRef={props.mapRef}
				layerId={props.layer.id}
				layerColor={props.layer.color}
				layerRadius={props.layer.radius}
			/>
		</div>
	);
};

export default LayerMap;
