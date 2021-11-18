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

function CardHome(props) {
	const skeletonCostume = <Skeleton circle={true} height={50} width={50} />;

	return (
		<div className="container">
			<Row>
				<Col md="4">
					<Card className="m-3 py-4" style={{ borderRadius: "10px" }}>
						<CardBody>
							<Row className="d-flex justify-content-center">
								<div className="wrap-content">
									<div className="title-content">Total Batch Dibuat</div>
									{props.loading===true ? (
										skeletonCostume
									) : (
										<div className="total-content">
											{props.data !== undefined ? props.data.batch : "0"}
										</div>
									)}
								</div>
							</Row>
						</CardBody>
					</Card>
				</Col>
				<Col md="4">
					<Card className="m-3 py-4" style={{ borderRadius: "10px" }}>
						<CardBody>
							<Row className="d-flex justify-content-center">
								<div className="wrap-content">
									<div className="title-content">
										Titik AI Terdaftar Dalam Batch
									</div>
									{props.loading===true ? (
										skeletonCostume
									) : (
										<div className="total-content">
											{props.data !== undefined ? props.data.site : "0"}
										</div>
									)}
								</div>
							</Row>
						</CardBody>
					</Card>
				</Col>
				<Col md="4">
					<Card className="m-3 py-4" style={{ borderRadius: "10px" }}>
						<CardBody>
							<Row className="d-flex justify-content-center">
								<div className="wrap-content">
									<div className="title-content">
										Total Pengajuan RFI terbuat
									</div>
									{props.loading===true ? (
										skeletonCostume
									) : (
										<div className="total-content">
											{props.data !== undefined ? props.data.rfi : "0"}
										</div>
									)}
								</div>
							</Row>
						</CardBody>
					</Card>
				</Col>
			</Row>
		</div>
	);
}

export default CardHome;
