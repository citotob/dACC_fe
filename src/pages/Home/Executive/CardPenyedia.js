import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useHistory } from "react-router-dom";
import {
	Card,
	CardBody,
	CardText,
	CardTitle,
	CardSubtitle,
	Col,
	Row,
	Container,
	Alert,
} from "reactstrap";

import "./style.css";

import CardBarChart from "./CardBarChart";

function CardPenyedia(props) {
	// const [loading, setLoading] = useState(false);

	const skeletonCostume = <Skeleton circle={true} height={50} width={50} />;
	return (
		<div className="container-fluid">
			<Row>
				<Col md="4">
					<Card>
						<h3 className="mt-4 ml-4">Daftar Penyedia</h3>
						<CardBody style={{ height: "400px", overflowY: "auto" }}>
							<Row>
								{props.loading ? (
									<Skeleton />
								) : props.data !== undefined ? (
									props.data.vendor_list
										.map((dt) => ({
											name: dt.name,
											nilai:
												dt.nilai.length != 0
													? (
															dt.nilai.reduce((acc, curr) => {
																acc =
																	acc +
																	(curr.kecepatan +
																		curr.ketepatan +
																		curr.kualitas) /
																		3;
																return acc;
															}, 0) / dt.nilai.length
													  ).toFixed(1)
													: "0.0",
										}))
										.sort((a, b) => b.nilai - a.nilai)
										.map((x) => (
											<Col md="12">
												<Card className="wrapper-penyedia">
													<CardBody style={{ padding: "0.55rem" }}>
														<Row className="d-flex justify-content-center">
															<Col md="8" className="nama-penyedia">
																{x.name}
															</Col>
															<Col md="4" className="total-penyedia">
																{x.nilai}
															</Col>
														</Row>
													</CardBody>
												</Card>
											</Col>
										))
								) : (
									"Tidak Ada Data"
								)}
							</Row>
						</CardBody>
					</Card>
				</Col>
				<Col md="8">
					<Card>
						<h3 className="m-4">Laporan Bulanan</h3>
						<div className="d-flex justify-content-center">
							{props.loading ? (
								<Skeleton count={3} />
							) : props.data !== undefined ? (
								<CardBarChart data={props.data} loading={props.loading} />
							) : (
								"Tidak Ada Data"
							)}
						</div>
					</Card>
				</Col>
			</Row>
		</div>
	);
}

export default CardPenyedia;
