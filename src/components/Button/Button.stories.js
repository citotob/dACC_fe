import React from "react";
import { storiesOf } from "@storybook/react";

import Button from "./Button";
import EditButton from "./EditButton";

storiesOf("Button", module)
	.addDecorator((story) => (
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
	))
	.add("default", () => <Button name={"Find"} />)
	.add("affirmative", () => <Button name={"Find"} affirmative />)
	.add("edit button", () => (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<EditButton />
		</div>
	));
