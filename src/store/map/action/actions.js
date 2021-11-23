const setBasemap = (mapType) => {
	return {
		type: "SET_BASEMAP",
		payload: mapType,
	};
};
const addLayerList = (layerData) => {
	return {
		type: "ADD_LAYERLIST",
		payload: layerData,
	};
};

const populateLayerField = (layerData) => {
	return {
		type: "POPULATE_LAYERFIELD_POINT",
		payload: layerData,
	};
};

const addLayerData = (layerData) => {
	return {
		type: "ADD_LAYER_DATA",
		payload: layerData,
	};
};

const changeColorMarker = (color) => {
	return {
		type: "CHANGE_COLOR_MARKER",
		payload: color,
	};
};

export {
	setBasemap,
	addLayerList,
	addLayerData,
	populateLayerField,
	changeColorMarker,
};
