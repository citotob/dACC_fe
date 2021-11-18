import React from "react";
import { storiesOf } from "@storybook/react";
import { Provider } from "react-redux";
import store from "../../redux/store";
import BasemapModal from "./BasemapModal";
import ModalWindowEditLayer from "./ModalWindowEditLayer";
import ModalWindowAddLayer from "./ModalWindowAddLayer";
import ModalWindowSaveTemplate from "./ModalWindowSaveTemplate";
import ModalWindowFilter from "./ModalWindowFilter";
import ModalWindowGeocoding from "./ModalWindowGeocoding";
import ModalWindowNetwork from "./ModalWindowNetwork";
import ModalWindowDataViz from "./ModalWindowDataViz";

storiesOf("Modal", module)
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
	.add("basemap modal", () => (
		<BasemapModal buttonLabel={"Basemap: Street"} color={"#F2F1F9"} />
	))
	.add("add layer modal", () => <ModalWindowAddLayer color={"#F2F1F9"} />)
	.add("edit layer modal", () => <ModalWindowEditLayer />)
	.add("save template modal", () => <ModalWindowSaveTemplate />)
	.add("filter layer modal", () => <ModalWindowFilter />)
	.add("geocoding form", () => <ModalWindowGeocoding />)
	.add("network analysis form", () => <ModalWindowNetwork />)
	.add("data viz form", () => <ModalWindowDataViz />);
