// import React, { useState, useEffect } from "react";
// import { useHistory } from "react-router-dom";

import { Row, Card, CardBody, Col, CardTitle } from "reactstrap";
// import Skeleton from "react-loading-skeleton";

// import "tui-chart/dist/tui-chart.css";
// import { PieChart } from "@toast-ui/react-chart";
// import TuiChart from "tui-chart";
// import "./toastui.scss";

import React from "react";

import { PieChart } from "@toast-ui/react-chart";
import TuiChart from "tui-chart";
import "./toastui.scss";
import "tui-chart/dist/tui-chart.css";

const CardTitikAkses = (props) => {
	// const _width = window.screen.width * 0.2;
	// const _height = window.screen.width * 0.2;
	const DonutChartToast = (title) => {
		const data = {
			categories: ["Total Layanan AI Milik Penyedia"],
			series: [
				{
					name: "Total FO",
					data:
						props.data !== undefined
							? props.data.totallayananaifo !== undefined
								? props.data.totallayananaifo
								: 0
							: 0,
					// data: 50,
				},
				{
					name: "Total RL",
					// data: props.data !== undefined ? props.data.running_ai !== undefined ? props.data.running_ai.GS : 0 : 0,
					data:
						props.data !== undefined
							? props.data.totallayananaifo !== undefined
								? props.data.totallayananaifo
								: 0
							: 0,
				},
				{
					name: "Total VSAT-GS",
					data:
						props.data !== undefined
							? props.data.totallayananaivsatgs !== undefined
								? props.data.totallayananaivsatgs
								: 0
							: 0,
				},
			],
		};
		const options = {
			chart: {
				width: 300,
				height: 300,
				title: "",
				format: function (value, chartType, areaType, valuetype, legendName) {
					if (areaType === "makingSeriesLabel") {
						// formatting at series area
						value = "";
					}

					return value;
				},
			},
			series: {
				radiusRange: ["40%", "100%"],
				showLabel: true,
			},
			tooltip: {
				suffix: "",
			},
			legend: {
				align: "right",
				visible: false,
			},
			chartExportMenu: {
				visible: false, // default is true.
			},
		};
		var theme = {
			chart: {
				background: {
					color: "#fff",
					opacity: 0,
				},
			},
			title: {
				color: "#8791af",
				fontWeight: "bold",
			},

			plot: {
				lineColor: "rgba(166, 176, 207, 0.1)",
			},
			legend: {
				label: {
					color: "#8791af",
				},
			},
			series: {
				series: {
					// colors: ["#F36666", "#F4EA90", "#5EA2F2"],
					colors: ["#F36666", "#F36666", "#F36666"],
				},
				label: {
					color: "#fff",
					fontFamily: "sans-serif",
				},
			},
		};
		// untuk apply theme
		TuiChart.registerTheme("donut", theme);
		// options.theme = "donut";

		return (
			<React.Fragment>
				<PieChart data={data} options={options} theme={theme} />
			</React.Fragment>
		);
	};

	return (
		<div className="container">
			<Card>
				<Row>
					<Col md="12" lg="6">
						<CardBody>
							<CardTitle style={{ fontSize: "20px" }}>
								Total Layanan AI Milik Penyedia
							</CardTitle>
							<div className="p-3">
								<Row className="text-center">
									<Col lg="6" style={{ color: "#49ADAD", fontWeight: "bold" }}>
										<div className="my-auto">
											<div style={{ fontSize: "20px" }}>
												{props.data !== undefined
													? props.data.totallayananai !== undefined
														? props.data.totallayananai
														: 0
													: 0}
											</div>
											<div>Total Titik</div>
										</div>
									</Col>
									<Col lg="6">
										<div
											style={{
												color: "#49ADAD",
												fontWeight: "bold",
												fontSize: "20px",
											}}
										>
											{props.data !== undefined
												? props.data.totallayananaifo !== undefined
													? props.data.totallayananaifo
													: 0
												: 0}
										</div>
										<div
											className="mb-3"
											style={{ color: "#B9B9B9", fontWeight: "bold" }}
										>
											Total FO
										</div>
										<div
											style={{
												color: "#49ADAD",
												fontWeight: "bold",
												fontSize: "20px",
											}}
										>
											{props.data !== undefined
												? props.data.totallayananairl !== undefined
													? props.data.totallayananairl
													: 0
												: 0}
										</div>
										<div
											className="mb-3"
											style={{ color: "#B9B9B9", fontWeight: "bold" }}
										>
											Total RL
										</div>
										<div
											style={{
												color: "#49ADAD",
												fontWeight: "bold",
												fontSize: "20px",
											}}
										>
											{props.data !== undefined
												? props.data.totallayananaivsatgs !== undefined
													? props.data.totallayananaivsatgs
													: 0
												: 0}
										</div>
										<div style={{ color: "#B9B9B9", fontWeight: "bold" }}>
											Total VSAT-GS
										</div>
									</Col>
								</Row>
							</div>
						</CardBody>
					</Col>
					<Col md="12" lg="6">
						<CardBody className="">{DonutChartToast()}</CardBody>
					</Col>
				</Row>
			</Card>
		</div>
	);
};
export default CardTitikAkses;
