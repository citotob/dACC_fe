import React from "react";
import { Card, CardBody, Row, Col, CardTitle } from "reactstrap";

export default function CardLokasiDummy() {
	return (
		<div>
			<Card style={{ width: "100%", height: "300px", fontSize: "15px" }}>
				<CardBody>
					<CardTitle style={{ fontSize: "20px" }}>Weather</CardTitle>
				</CardBody>
			</Card>
		</div>
	);
}
