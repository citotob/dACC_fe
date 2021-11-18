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
import AdminDashboard from "./Admin/AdminDashboard";

storiesOf("Dashboard", module)
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
	.add("admin dashboard", () => <AdminDashboard />)
	.add("+ layer management", () => <MapPanel />)
	.add("layer management + filter panel", () => <MapFilter />)
	.add("layer management + filter panel + grid", () => <MapFilterResult />)
	.add("wide concept", () => <MapVast />);
