import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import Layer from "./Layer";
import ModalWindowAddLayer from "../Modal/ModalWindowAddLayer";
import ModalWindowSaveTemplate from "../Modal/ModalWindowSaveTemplate";
import { addLayerList } from "../../redux/action/actions";

// styled component
const FlexRow = styled.div`
  width: 100%;
  display: flex;
  justify-content center;
  align-items: center;`;
const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content center;
  align-items: center;`;
const PanelContainer = styled(FlexColumn)`
  justify-content space-between;
  margin: 0.5rem 0rem;
  height: max-content;
  width: 100%;
  padding: 1rem`;
const PanelHeading = styled(FlexRow)`
	justify-content: flex-start;
`;
const ActionContainer = styled(FlexRow)`
	justify-content: flex-end;
	margin: 0.5rem 0;
`;
const LayerListContainer = styled(FlexColumn)`
  justify-content:${(props) =>
		props.layerList.length !== 0 ? "flex-start" : "center"}
  margin: 0.5rem 0rem;
  height: max-content;
  align-items: center;
  width: 100%;
  padding: 1rem`;

// react functional component
const LayerManagementPanel = ({ mapRef }) => {
	const layerList = useSelector((state) => state.layerlist);
	const dispatch = useDispatch();
	const addLayer = (data) => {
		dispatch(addLayerList(data));
	};

	return (
		<PanelContainer>
			<PanelHeading>
				<h3> Layer Management </h3>
			</PanelHeading>
			<ActionContainer>
				<ModalWindowAddLayer onSubmit={addLayer} mapRef={mapRef} />
			</ActionContainer>
			<LayerListContainer layerList={layerList}>
				{layerList.map((layer) => (
					<Layer key={layer.id} layer={layer} mapRef={mapRef} />
				))}
			</LayerListContainer>
			<ActionContainer>
				{layerList.length !== 0 ? <ModalWindowSaveTemplate /> : ""}
			</ActionContainer>
		</PanelContainer>
	);
};

LayerManagementPanel.defaultProps = {
	mapRef: "",
};

export default LayerManagementPanel;
