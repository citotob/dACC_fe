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
	const renderCard = (title, dat, col) => {
		return (
			<Col md={col}>
				<Card
					className="py-4 wrap-content"
					style={{ borderRadius: "10px", height: "80%" }}
				>
					<CardBody>
						<Row style={{ height: "50%", justifyContent: "center" }}>
							<div className="title-content mb-1">{title}</div>
						</Row>
						<Row
							style={{ height: "50%" }}
							className="d-flex justify-content-center"
						>
							<div>
								{props.loading===true ? (
									<div className="mt-1">{skeletonCostume}</div>
								) : (
									<div className="total-content">
										{props.data !== undefined ? dat : "0"}
									</div>
								)}
							</div>
						</Row>
					</CardBody>
				</Card>
			</Col>
		);
	};
	return (
		<div className="container-fluid">
			<Row className="justify-content-center" style={{ height: "180px" }}>
				{props.data !== undefined
					? renderCard("Penyedia Terdaftar", props.data.vendor, "4")
					: ""}
				{props.data !== undefined
					? renderCard("Pengguna Aktif", props.data.active_user, "4")
					: ""}
				{props.data !== undefined
					? renderCard(
							"Pengguna Belum Terverifikasi",
							props.data.requested_user,
							"4"
					  )
					: ""}
			</Row>
			<Row>
				{props.data !== undefined
					? renderCard("Titik AI Terdaftar Dalam Batch", props.data.site, "3")
					: ""}
				{props.data !== undefined
					? renderCard("Total Batch Dibuat", props.data.batch, "3")
					: ""}
				{props.data !== undefined
					? renderCard("Total Pengajuan RFI Terbuat", props.data.rfi, "3")
					: ""}
				{props.data !== undefined
					? renderCard("Titik Baru Non Batch", props.data.site_not_batch, "3")
					: ""}
			</Row>
		</div>
	);
}

export default CardHome;
