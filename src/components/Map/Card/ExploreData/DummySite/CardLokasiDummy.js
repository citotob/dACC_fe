import React, { useEffect, useState } from "react";
import { Card, CardBody, Row, Col, CardTitle } from "reactstrap";
import API from "../../../../../services";

export default function CardLokasiDummy(props) {
	return (
		<div>
			<Card style={{ width: "100%", height: "300px", fontSize: "15px" }}>
				{props.data === "Data tidak ada" ? (
					<CardBody>
						<CardTitle style={{ fontSize: "20px" }}>Dummy Site</CardTitle>
						<Row
							className="my-1 p-1 text-center"
							style={{ borderTop: "solid 1px", borderColor: "#D6D6D7" }}
						>
							<Col lg="12">Data Tidak Ada</Col>
						</Row>
					</CardBody>
				) : props.data === "Terjadi Kesalahan Pada Server" ? (
					<CardBody>
						<CardTitle style={{ fontSize: "20px" }}>Dummy Site</CardTitle>
						<Row
							className="my-1 p-1 text-center"
							style={{ borderTop: "solid 1px", borderColor: "#D6D6D7" }}
						>
							<Col lg="12">Terjadi Kesalahan Pada Server</Col>
						</Row>
					</CardBody>
				) : (
					<CardBody>
						<CardTitle style={{ fontSize: "20px" }}>Dummy Site</CardTitle>
						<Row className="my-1 p-1">
							<Col lg="12" style={{ color: "grey", fontSize: "13px" }}>
								Lon: {props.data[0] !== undefined && props.data[0].longitude} |
								Lat: {props.data[0] !== undefined && props.data[0].latitude}
							</Col>
						</Row>
						<Row
							className="my-1 p-1"
							style={{ borderTop: "solid 1px", borderColor: "#D6D6D7" }}
						>
							<Col lg="6">Provinsi:</Col>
							<Col lg="6" className="font-weight-bold">
								DKI Jakarta
							</Col>
						</Row>
						<Row
							className="my-1 p-1"
							style={{ borderTop: "solid 1px", borderColor: "#D6D6D7" }}
						>
							<Col lg="6">Kabupaten/Kota:</Col>
							<Col lg="6" className="font-weight-bold">
								Jakarta Selatan
							</Col>
						</Row>
						<Row
							className="my-1 p-1"
							style={{ borderTop: "solid 1px", borderColor: "#D6D6D7" }}
						>
							<Col lg="6">Kecamatan:</Col>
							<Col lg="6" className="font-weight-bold">
								Cilandak
							</Col>
						</Row>
						<Row
							className="my-1 p-1"
							style={{ borderTop: "solid 1px", borderColor: "#D6D6D7" }}
						>
							<Col lg="6">Desa:</Col>
							<Col lg="6" className="font-weight-bold">
								Cilandak
							</Col>
						</Row>
						<Row
							className="my-1 p-1"
							style={{ borderTop: "solid 1px", borderColor: "#D6D6D7" }}
						>
							<Col lg="6">Guna Lahan:</Col>
							<Col lg="6" className="font-weight-bold">
								Perumahan
							</Col>
						</Row>
					</CardBody>
				)}
			</Card>
		</div>
	);
}
