import basemapReducer from "./basemap";
import layerlistReducer from "./layerlist";
import layerfieldReducer from "./layerfield";
import layerdataReducer from "./layerdata";
import colorMarkerReducer from "./colormarker";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
	basemap: basemapReducer,
	layerlist: layerlistReducer,
	layerField: layerfieldReducer,
	layerData: layerdataReducer,
	colormarker: colorMarkerReducer,
});

export default rootReducer;
