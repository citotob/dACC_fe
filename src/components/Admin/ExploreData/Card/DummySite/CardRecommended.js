import React from "react";
import { Card, CardBody, Row, Col, CardTitle } from "reactstrap";
import Skeleton from "react-loading-skeleton";

export default function CardRecommended(props) {
	function compare(a, b) {
		if (a.distance < b.distance) {
			return -1;
		}
		if (a.distance > b.distance) {
			return 1;
		}
		return 0;
	}
	return (
		<div>
			<Card style={{ width: "100%", height: "300px", fontSize: "15px" }}>
				<CardTitle style={{ fontSize: "20px", margin: "20px 0px 0px 20px" }}>
					Rekomendasi Teknologi
				</CardTitle>
				{props.data !== undefined ? (
					props.loading ? (
						<CardBody>
							<Row>
								<Skeleton />
							</Row>
						</CardBody>
					) : (
						<CardBody style={{ overflowY: "auto" }}>
							<Row
								className="my-1 p-1 font-weight-bold text-center"
								style={{ borderTop: "solid 1px", borderColor: "#D6D6D7" }}
							>
								<Col lg="4">Nama</Col>
								<Col lg="4">Teknologi</Col>
								<Col lg="4">Jarak</Col>
							</Row>
							{props.data === "Data tidak ada" ? (
								<Row
									className="my-1 p-1 text-center"
									style={{ borderTop: "solid 1px", borderColor: "#D6D6D7" }}
								>
									<Col lg="12">Data Tidak Ada</Col>
								</Row>
							) : props.data === "Data sudah ada" ? (
								<Row
									className="my-1 p-1 text-center"
									style={{ borderTop: "solid 1px", borderColor: "#D6D6D7" }}
								>
									<Col lg="12">Data Sudah Ada</Col>
								</Row>
							) : props.data === "Terjadi Kesalahan Pada Server" ? (
								<Row
									className="my-1 p-1 text-center"
									style={{ borderTop: "solid 1px", borderColor: "#D6D6D7" }}
								>
									<Col lg="12">Data Tidak Ada</Col>
								</Row>
							) : (
								props.data.sort(compare).map((res, i) => {
									return (
										<Row
											key={i}
											className="my-1 p-1 text-center"
											style={{
												borderTop: "solid 1px",
												borderColor: "#D6D6D7",
											}}
										>
											<Col lg="4">{res.vendor_name}</Col>
											<Col lg="4">{res.teknologi}</Col>
											<Col lg="4">{res.distance}</Col>
										</Row>
									);
								})
							)}
						</CardBody>
					)
				) : (
					""
				)}
			</Card>
		</div>
	);
}
