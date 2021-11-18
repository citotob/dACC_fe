const layerdataReducer = (state = {}, action) => {
	switch (action.type) {
		case "ADD_LAYERDATA":
			return { ...state, [`{${action.payload.layerId}`]: action.payload };
		default:
			return state;
	}
};

export default layerdataReducer;
