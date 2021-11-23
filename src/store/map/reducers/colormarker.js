const init = {
	colorRL: "#F36666",
	colorFO: "#D7C843",
	colorVSAT: "#5EA2F2",
	statusRL: "none",
	statusFO: "none",
	statusVSAT: "none",
};

const colorMarkerReducer = (state = init, action) => {
	switch (action.type) {
		case "CHANGE_COLOR_MARKER":
			return action.payload;
		default:
			return state;
	}
};

export default colorMarkerReducer;
