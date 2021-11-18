import React, { useEffect, useState } from "react";
import { Row, Col } from "reactstrap";
import CardLokasiDummy from "./CardLokasiDummy";
import CardRecommendedDummy from "./CardRecommended";
import CardWeatherDummy from "./CardWeather";

import API from "../../../../../services";

import style from "../../style.module.css";

export default function Index(props) {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);

	const getData = () => {
		const param = {
			longitude: props.longLat.long,
			latitude: props.longLat.lat,
		};

		API.postDummySite(param)
			.then((res) => {
				if (res.data.success) {
					if (res.data.message==="Data tidak ada") {
						setData("Data tidak ada");
					} else if (res.data.message==="Data sudah ada") {
						setData("Data sudah ada");
					} else {
						setData(res.data.values);
					}
					setLoading(false);
				}
			})
			.catch((err) => {
				setData("Terjadi Kesalahan Pada Server");
				setLoading(false);
			});
	};
	useEffect(() => {
		getData();
	}, []);

	return (
		<div>
			<Row
				className={style.cardTable}
				style={{
					paddingBottom: "30px",
					paddingTop: "20px",
					// height: "33vh",
					// marginTop: 0,
					// marginBottom: 0,
					paddingTop: 0,
					paddingBottom: 0,
				}}
			>
				<Col lg={4}>
					<CardLokasiDummy data={data} longLat={props.longLat} />
				</Col>
				<Col lg={4}>
					<CardRecommendedDummy data={data} loading={loading} />
				</Col>
				<Col lg={4}>
					<CardWeatherDummy longLat={props.longLat} />
				</Col>
			</Row>
		</div>
	);
}
