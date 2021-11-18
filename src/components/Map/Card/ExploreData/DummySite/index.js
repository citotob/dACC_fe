import React, { useEffect, useState } from "react";
import { Row, Col } from "reactstrap";
import CardLokasiDummy from "./CardLokasiDummy";
import CardRecommendedDummy from "./CardRecommended";
import CardWeatherDummy from "./CardWeather";

import API from "../../../../../services";

export default function Index(props) {
	const [data, setData] = useState([]);

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
				}
			})
			.catch((err) => {
				setData("Terjadi Kesalahan Pada Server");
			});
	};
	useEffect(() => {
		getData();
	}, []);

	return (
		<div>
			<Row>
				<Col lg={4}>
					<CardLokasiDummy data={data} />
				</Col>
				<Col lg={4}>
					<CardRecommendedDummy data={data} />
				</Col>
				<Col lg={4}>
					<CardWeatherDummy />
				</Col>
			</Row>
		</div>
	);
}
