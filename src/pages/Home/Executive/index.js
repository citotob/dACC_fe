import React, { useEffect, useState } from "react";
// import Skeleton from "react-loading-skeleton";
// import { useHistory } from "react-router-dom";
import { Alert } from "reactstrap";

import "./style.css";

import CardHome from "./CardHome";
import CardPenyedia from "./CardPenyedia";
import CardTitikAkses from "./CardDonutChart";
// import { Col, Row, Container, Alert } from "reactstrap";

//API
import API from "../../../services";

function Home() {
	const [loading, setLoading] = useState(true);
	const [err, setErr] = useState(false);
	const [data, setData] = useState({});

	const getData = () => {
		API.getDashboard()
			.then((res) => {
				if (res.data.success) {
					setData(res.data.values);
					setLoading(false);
					// console.log(Object.values(res.data.values.report.site))
				}
			})
			.catch((err) => {
				setErr(true);
			});
	};

	useEffect(() => {
		getData();
	}, []);

	// const skeletonCostume = <Skeleton circle={true} height={50} width={50} />;
	return (
		<>
			{err ? (
				<div className="page-content mx-5">
					<Alert color="danger" className="text-center">
						Terjadi kesalahan pada halaman ini, silahkan dicoba beberapa saat
						lagi
					</Alert>
				</div>
			) : (
				<div className="page-content">
					<div>
						<CardHome loading={loading} data={data} />
					</div>
					<div className="mt-5 mx-5">
						<CardPenyedia loading={loading} data={data} />
					</div>
					<div className="mt-5 mx-5">
						<CardTitikAkses loading={loading} data={data} />
					</div>
				</div>
			)}
		</>
	);
}

export default Home;
