import React, { useState } from "react";
import { Card, CardTitle, CardText, Button, Row, Col, Input } from "reactstrap";

export default function CardAreaPotensial() {
	return (
		<div>
			<Row>
				<Col lg={12}>
					<Input type="checkbox" />
					<CardText className="ml-5">Kepadatan Penduduk</CardText>
				</Col>
			</Row>
			<Row className="my-2">
				<Col lg={12}>
					<Input type="checkbox" />
					<CardText className="ml-5">Sebaran Titik Akses Internet</CardText>
				</Col>
			</Row>
			<Row>
				<Col lg={12}>
					<Input type="checkbox" />
					<CardText className="ml-5">Sebaran Titik BTS</CardText>
				</Col>
			</Row>
		</div>
	);
}
