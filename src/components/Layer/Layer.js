import React, { useState } from "react";
import styled from "styled-components";
import ModalWindowEditLayer from "../Modal/ModalWindowEditLayer";
import ModalWindowFilter from "../Modal/ModalWindowFilter";

// styled component
const LayerContainer = styled.div`
  display: flex;
  justify-content space-between;
  align-items: center;
  margin: 0.25rem 0rem;
  height: 100%;
  width: 100%;
  animation: fade-in-right 0.5s`;
const LayerTextContainer = styled.div`
  display: flex;
  justify-content space-between;
  align-items: center;
  height: 100%;
  width: max-content;`;
const IconsContainer = styled.div`
  display: flex;
  justify-content flex-end;
  align-items: center;
  height: 100%;
  width: max-content;`;
const StyledText = styled.p`
	margin: 0px 1rem;
`;

// react functional component
const Layer = ({ layer: { id, color, radius, title }, mapRef }) => {
	const [status, setStatus] = useState(true);
	return (
		<LayerContainer>
			<LayerTextContainer>
				<input
					type="checkbox"
					defaultChecked={status}
					onClick={() => {
						if (status) {
							mapRef.current.hideLayer(id);
							setStatus(!status);
						} else if (!status) {
							mapRef.current.showLayer(id);
							setStatus(!status);
						}
					}}
				/>
				<StyledText> {title} </StyledText>
			</LayerTextContainer>
			<IconsContainer>
				<ModalWindowFilter />
				<ModalWindowEditLayer
					mapRef={mapRef}
					layerId={id}
					layerColor={color}
					layerRadius={radius}
				/>
			</IconsContainer>
		</LayerContainer>
	);
};

Layer.defaultProps = {
	layer: {
		id: "Testing",
		color: "white",
		radius: "6px",
		title: "Demo Layer",
	},
	mapRef: {},
};

export default Layer;
