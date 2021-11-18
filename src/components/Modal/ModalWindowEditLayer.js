import React, { useState } from "react";
import { Modal, ModalHeader, ModalFooter, Tooltip } from "reactstrap";
import Button from "../Button/Button";
import FormEditLayer from "../Forms/FormEditLayer";

const ModalWindowEditLayer = ({ layerRadius, layerColor, layerId, mapRef }) => {
	const [modal, setModal] = useState(false);
	const [tooltipOpen, setTooltipOpen] = useState(false);
	const [color, setColor] = useState("#FFFFFF");
	const [radius, setRadius] = useState("0");
	const toggle = () => setModal(!modal);
	const toggleTooltip = () => setTooltipOpen(!tooltipOpen);

	return (
		<div>
			<svg
				onClick={() => {
					setModal(!modal);
				}}
				id={"editIcon"}
				style={{ cursor: "pointer" }}
				width="10"
				height="10"
				viewBox="0 0 10 10"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M10 1.85629L8.22857 0L0.742857 7.24551L0 9.7006L0.228571 10L2.85714 9.34132L10 1.85629Z"
					fill="#19324A"
				/>
			</svg>
			<Tooltip
				placement="top"
				isOpen={tooltipOpen}
				target="editIcon"
				toggle={toggleTooltip}
			>
				Edit Style
			</Tooltip>
			<Modal isOpen={modal} size={"m"} toggle={toggle} centered={true}>
				<ModalHeader style={{ display: "block" }}>
					<div className={"FlexRowEndFluid"}>
						<h2>Edit Layer</h2>
					</div>
				</ModalHeader>
				<div className={"FlexRowCenter"} style={{ margin: "1rem" }}>
					<FormEditLayer
						layerId={layerId}
						radius={{
							radius: radius,
							setRadius: setRadius,
							layerRadius: layerRadius,
						}}
						color={{ color: color, setColor: setColor, layerColor: layerColor }}
					/>
				</div>
				<ModalFooter>
					<Button
						name={"Cancel"}
						color={color ? color : false}
						onClick={toggle}
					/>
					<Button
						name={"Select"}
						affirmative
						onClick={() => {
							if (layerId === "PL1" || layerId === "PL2") {
							} else {
								mapRef.current.changeColorPoint(layerId, color);
								mapRef.current.changeRadius(layerId, radius);
							}
							setModal(!modal);
						}}
					/>
				</ModalFooter>
			</Modal>
		</div>
	);
};

ModalWindowEditLayer.defaultProps = {
	layerRadius: "3px",
	layerColor: "blue",
	layerId: "testing",
	mapRef: () => console.log("MAP REF"),
};

export default ModalWindowEditLayer;
