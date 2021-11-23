const layerlistReducer = (state = [], action) => {
	switch (action.type) {
		case "ADD_LAYERLIST":
			return state.concat(action.payload);
		default:
			return state;
	}
};

export default layerlistReducer;
