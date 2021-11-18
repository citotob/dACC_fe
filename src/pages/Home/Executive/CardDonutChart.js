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
	const DonutChartToast = (title) => {
		const data = {
			categories: ["Titik Akses Internet " + title],
			series: [
				{
					name: "Total FO",
					data:
						props.data !== undefined
							? title==="Beroperasi"
								? props.data.running_ai !== undefined
									? props.data.running_ai.FO
									: "0"
								: props.data.new_ai !== undefined
								? props.data.new_ai.FO
								: "0"
							: "0",
				},
				{
					name: "Total RL",
					// data: props.data !== undefined ? props.data.running_ai !== undefined ? props.data.running_ai.GS : "0" : "0",
					data:
						props.data !== undefined
							? title==="Beroperasi"
								? props.data.running_ai !== undefined
									? props.data.running_ai.RL
									: "0"
								: props.data.new_ai !== undefined
								? props.data.new_ai.RL
								: "0"
							: "0",
				},
				{
					name: "Total VSAT-GS",
					data:
						props.data !== undefined
							? title==="Beroperasi"
								? props.data.running_ai !== undefined
									? props.data.running_ai['VSAT-GS']
									: "0"
								: props.data.new_ai !== undefined
								? props.data.new_ai['VSAT-GS']
								: "0"
							: "0",
				},
			],
		};
		const data2 = {
			categories: ["Titik Akses Internet " + title],
			series: [
				{
					name: "Total FO",
					data:
						props.data !== undefined
							? props.data.new_ai !== undefined
								? props.data.new_ai.FO
								: "0"
							: "0",
				},
				{
					name: "Total RL",
					// data: props.data !== undefined ? props.data.running_ai !== undefined ? props.data.running_ai.GS : "0" : "0",
					data:
						props.data !== undefined
							? title==="Beroperasi"
								? props.data.running_ai !== undefined
									? props.data.running_ai.RL
									: "0"
								: props.data.new_ai !== undefined
								? props.data.new_ai.RL
								: "0"
							: "0",
				},
				{
					name: "Total VSAT-GS",
					data:
						props.data !== undefined
							? props.data.new_ai !== undefined
								? props.data.new_ai['VSAT-GS']
								: "0"
							: "0",
				},
			],
		};

		const options = {
			chart: {
				width: 330,
				height: 250,
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
		<div>
			<Row>
				<Col md="12" lg="6">
					<Card body>
						<div className="p-3">
							<CardTitle style={{ fontSize: "20px" }}>
								Titik Akses Internet Beroperasi
							</CardTitle>
							<Row className="text-center mt-3">
								<Col style={{ color: "#49ADAD", fontWeight: "bold" }}>
									<div style={{ fontSize: "20px" }}>
										{props.data !== undefined
											? props.data.running_ai !== undefined
												? props.data.running_ai.count
												: "0"
											: "0"}
									</div>
									<div>Total Titik</div>
								</Col>
								<Col>
									<div
										style={{
											color: "#49ADAD",
											fontWeight: "bold",
											fontSize: "20px",
										}}
									>
										{props.data !== undefined
											? props.data.running_ai !== undefined
												? props.data.running_ai.FO
												: "0"
											: "0"}
									</div>
									<div style={{ color: "#B9B9B9", fontWeight: "bold" }}>
										Total FO
									</div>
								</Col>
								<Col>
									<div
										style={{
											color: "#49ADAD",
											fontWeight: "bold",
											fontSize: "20px",
										}}
									>
										{props.data !== undefined
											? props.data.running_ai !== undefined
												? props.data.running_ai.RL
												: "0"
											: "0"}
									</div>
									<div style={{ color: "#B9B9B9", fontWeight: "bold" }}>
										Total RL
									</div>
								</Col>
								<Col>
									<div
										style={{
											color: "#49ADAD",
											fontWeight: "bold",
											fontSize: "20px",
										}}
									>
										{props.data !== undefined
											? props.data.running_ai !== undefined
												? props.data.running_ai['VSAT-GS']
												: "0"
											: "0"}
									</div>
									<div style={{ color: "#B9B9B9", fontWeight: "bold" }}>
										Total VSAT-GS
									</div>
								</Col>
							</Row>
							<Row className="justify-content-center" md="12">
								{DonutChartToast("Beroperasi")}
							</Row>
						</div>
					</Card>
				</Col>
				{/*  */}
				<Col md="12" lg="6">
					<Card body>
						<div className="p-3">
							<CardTitle style={{ fontSize: "20px" }}>
								Titik Akses Internet Baru
							</CardTitle>
							<Row className="text-center mt-3">
								<Col style={{ color: "#49ADAD", fontWeight: "bold" }}>
									<div style={{ fontSize: "20px" }}>
										{props.data !== undefined
											? props.data.new_ai !== undefined
												? props.data.new_ai.count
												: "0"
											: "0"}
									</div>
									<div>Total Titik</div>
								</Col>
								<Col>
									<div
										style={{
											color: "#49ADAD",
											fontWeight: "bold",
											fontSize: "20px",
										}}
									>
										{props.data !== undefined
											? props.data.new_ai !== undefined
												? props.data.new_ai.FO
												: "0"
											: "0"}
									</div>
									<div style={{ color: "#B9B9B9", fontWeight: "bold" }}>
										Total FO
									</div>
								</Col>
								<Col>
									<div
										style={{
											color: "#49ADAD",
											fontWeight: "bold",
											fontSize: "20px",
										}}
									>
										{props.data !== undefined
											? props.data.new_ai !== undefined
												? props.data.new_ai.RL
												: "0"
											: "0"}
									</div>
									<div style={{ color: "#B9B9B9", fontWeight: "bold" }}>
										Total RL
									</div>
								</Col>
								<Col>
									<div
										style={{
											color: "#49ADAD",
											fontWeight: "bold",
											fontSize: "20px",
										}}
									>
										{props.data !== undefined
											? props.data.new_ai !== undefined
												? props.data.new_ai['VSAT-GS']
												: "0"
											: "0"}
									</div>
									<div style={{ color: "#B9B9B9", fontWeight: "bold" }}>
										Total VSAT-GS
									</div>
								</Col>
							</Row>
							<Row className="justify-content-center" md="12">
								{DonutChartToast("Baru")}
							</Row>
						</div>
					</Card>
				</Col>
			</Row>
		</div>
	);
};
export default CardTitikAkses;
