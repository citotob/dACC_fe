const layerfieldReducer = (state = [], action) => {
	switch (action.type) {
		case "POPULATE_LAYERFIELD_POINT":
			return Object.keys(action.payload);
		default:
			return state;
	}
};

export default layerfieldReducer;
