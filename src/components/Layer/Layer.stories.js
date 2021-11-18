import React from "react";
import { Provider } from "react-redux";
import { storiesOf } from "@storybook/react";
import store from "../../redux/store";
import Layer from "./Layer";
import LayerManagementPanel from "./LayerManagementPanel";
import Fade from "react-reveal/Fade";

storiesOf("Layer", module)
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
	.add("default", () => (
		<div
			style={{
				width: "20rem",
				height: "max-content",
				border: "0.5px solid grey",
				borderRadius: "4px",
				padding: "0 1rem",
			}}
		>
			<Layer />
		</div>
	))
	.add("layer management", () => (
		<Fade bottom>
			<div
				style={{
					width: "20rem",
					height: "max-content",
					border: "0.5px solid grey",
					borderRadius: "4px",
				}}
			>
				<LayerManagementPanel />
			</div>
		</Fade>
	));
