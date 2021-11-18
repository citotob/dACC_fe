import React from "react";
import { storiesOf } from "@storybook/react";
import { Provider } from "react-redux";
import store from "../../redux/store";
import MapBasic from "./MapBasic";
import MapPanel from "./MapPanel";
import MapFilterResult from "./MapFilterResult";
import MapFilter from "./MapFilter";
import MapGrid from "./MapGrid";
import MapVast from "./MapVast";

storiesOf("Map", module)
	.addDecorator((story) => (
		<Provider store={store}>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					height: "100vh",
					width: "100vw",
				}}
			>
				{story()}
			</div>
		</Provider>
	))
	.add("basic", () => <MapBasic />)
	.add("grided layout", () => <MapGrid />);
