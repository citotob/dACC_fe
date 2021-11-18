const basemapReducer = (state = "streets-v11", action) => {
	switch (action.type) {
		case "SET_BASEMAP":
			return action.payload;
		default:
			return state;
	}
};

export default basemapReducer;
