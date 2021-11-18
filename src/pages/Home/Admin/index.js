import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useHistory } from "react-router-dom";
import { Col, Row, Container, Alert, Spinner } from "reactstrap";

import "./style.css";

import CardHome from "./CardHome";
import CardPenyedia from "./CardPenyedia";
import CardTitikAkses from "./CardDonutChart";
// import { Col, Row, Container, Alert } from "reactstrap";

//API
import API from "../../../services";

function Home() {
	const [loading, setLoading] = useState(true);
	const [dataDashboard, setDataDashboard] = useState({});

	const getData = () => {
		API.getDashboard()
			.then((result) => {
				// if (result.data.success) {
				setDataDashboard(result.data.values);
				setLoading(false);
				// 	// console.log(Object.values(res.data.values.report.site));
				// }
				// console.log("data dashboard", result);
			})
			.catch((err) => {
				setDataDashboard(null);
				setLoading(false);
				// console.log("errrororr", err);
			});
	};

	useEffect(() => {
		getData();
	}, []);
	// console.log("dataaaa", dataDashboard);

	return (
		<>
			{loading ? (
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						marginTop: "45vh",
					}}
				>
					<Spinner />
				</div>
			) : !dataDashboard ? (
				<div className="page-content mx-5">
					<Alert color="danger" className="text-center">
						Terjadi kesalahan pada halaman ini, silahkan dicoba beberapa saat
						lagi
					</Alert>
				</div>
			) : Object.values(dataDashboard).length === 0 ? (
				<div className="page-content mx-5">
					<Alert color="danger" className="text-center">
						Terjadi kesalahan pada halaman ini, silahkan dicoba beberapa saat
						lagi
					</Alert>
				</div>
			) : (
				<div className="page-content mx-5">
					<div>
						<CardHome loading={loading} data={dataDashboard} />
					</div>
					<div className="mt-5">
						<CardPenyedia loading={loading} data={dataDashboard} />
					</div>
					<div className="mt-5">
						<CardTitikAkses loading={loading} data={dataDashboard} />
					</div>
				</div>
			)}
		</>
	);
}

export default Home;
