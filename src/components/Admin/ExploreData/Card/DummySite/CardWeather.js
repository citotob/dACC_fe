import React, { useEffect, useState } from "react";
import { Card, CardBody, Row, Col, CardTitle } from "reactstrap";
import Skleton from "react-loading-skeleton";
import Axios from "axios";

export default function CardLokasiDummy(props) {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);

	var today = new Date();
	var date =
		today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

	var hours = today.getHours();
	var minutes = today.getMinutes().toString();
	if (minutes.length === 1) {
		minutes = "0" + minutes;
	}
	var time = hours + ":" + minutes;

	var dateTime = date + " " + time;
	useEffect(() => {
		Axios.get(
			`https://api.openweathermap.org/data/2.5/weather?lat=${props.longLat.lat}&lon=${props.longLat.long}&lang=id&appid=${process.env.REACT_APP_OPENWEATHER_KEY}&units=metric`
		)
			.then((res) => {
				setData(res.data);
				setLoading(!loading);
			})
			.catch((e) => setData([]));
	}, []);

	return (
		<div>
			<Card style={{ width: "100%", height: "300px", fontSize: "15px" }}>
				<CardBody>
					<CardTitle style={{ fontSize: "20px" }}>Weather</CardTitle>
					{loading ? (
						<Skleton count={3} />
					) : data.length === 0 ? (
						<div>No Data</div>
					) : (
						<div>
							<CardBody>
								<Row className="my-1">
									<Col lg="6">Tanggal/Jam </Col>
									<Col lg="6">{dateTime}</Col>
								</Row>
								<Row className="my-1">
									<Col lg="6">Nama </Col>
									<Col lg="6">{data.name === "" ? "-" : data.name}</Col>
								</Row>
								<Row className="my-1">
									<Col lg="6">Temperatur </Col>
									<Col lg="6">
										{data.main.temp === "" ? "-" : data.main.temp} °C
									</Col>
								</Row>
								<Row className="my-1">
									<Col lg="6">Cuaca </Col>
									<Col lg="6">
										{data.weather[0].main === "" ? "-" : data.weather[0].main}
									</Col>
								</Row>
								<Row className="my-1">
									<Col lg="6">Detail </Col>
									<Col lg="6">
										{data.weather[0].description === ""
											? "-"
											: data.weather[0].description}
									</Col>
								</Row>
								<Row className="my-1">
									<Col lg="6">Kecepatan Angin </Col>
									<Col lg="6">
										{data.wind.speed === "" ? "-" : data.wind.speed}
									</Col>
								</Row>
							</CardBody>
						</div>
					)}
				</CardBody>
			</Card>
		</div>
	);
}
