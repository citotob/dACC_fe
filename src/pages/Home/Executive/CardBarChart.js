import React from "react";

import { ColumnChart } from "@toast-ui/react-chart";
import TuiChart from "tui-chart";
import "./toastui.scss";
import "tui-chart/dist/tui-chart.css";

var theme = {
	chart: {
		background: {
			color: "#fff",
			opacity: 0,
		},
	},
	// title: {
	//     color: '#8791af',
	// },
	xAxis: {
		// title: {
		//     color: '#8791af'
		// },
		label: {
			color: "#8791af",
		},
		tickColor: "#8791af",
	},
	yAxis: {
		title: {
			color: "#8791af",
		},
		label: {
			color: "#8791af",
		},
		tickColor: "#8791af",
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
		colors: ["#49ADAD", "#1E1BB7"],
	},
};

const ColumnChartToast = (props) => {
	const _width = window.screen.width / 2.4;

	const data = {
		categories:
			props.data !== undefined ? Object.keys(props.data.report.site) : "",
		series: [
			{
				name: "Batch yang sudah dibuat",
				data:
					props.data !== undefined ? Object.values(props.data.report.site) : "",
			},
			{
				name: "Penawaran RFI yang dibuat",
				data:
					props.data !== undefined ? Object.values(props.data.report.rfi) : "",
			},
		],
	};

	const options = {
		chart: {
			width: _width,
			height: 380,
			// title: 'Monthly Revenue',
			// format: "1,000",
		},
		yAxis: {
			// title: "Amount",
			min: 0,
			max:
				props.data !== undefined
					? Math.max(...Object.values(props.data.report.rfi)) + 100
					: 100,
		},
		// xAxis: {
		// 	title: "Month",
		// },
		legend: {
			align: "bottom",
			// visible: false,
		},
		chartExportMenu: {
			visible: false, // default is true.
		},
	};
	// untuk apply theme
	TuiChart.registerTheme("myTheme", theme);
	options.theme = "myTheme";
	return (
		<React.Fragment>
			<ColumnChart data={data} options={options} />
		</React.Fragment>
	);
};
export default ColumnChartToast;
