import React, { useEffect, useState } from "react";
import { Alert } from "reactstrap";

import "./style.css";

import CardHome from "./CardHome";
import CardFitur from "./CardFitur";
import CardDonutChart from "./CardDonutChart";

//API
import API from "../../../services";

function Home() {
	const [loading, setLoading] = useState(true);
	const [err, setErr] = useState(false);
	const [data, setData] = useState({});

	const vendor_id = window.localStorage.getItem("companyId");

	const getData = () => {
		const param = {
			vendor: vendor_id,
		};

		API.getDashboardVendor(param)
			.then((res) => {
				if (res.data.success) {
					setData(res.data.values);
					setLoading(false);
				} else {
					setErr(true);
				}
			})
			.catch((err) => {
				setErr(true);
			});
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<>
			{err ? (
				<div className="page-content">
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
					<div className="my-5">
						<CardDonutChart loading={loading} data={data} />
					</div>
					<div className="mt-5">
						<CardFitur loading={loading} data={data} />
					</div>
				</div>
			)}
		</>
	);
}

export default Home;
