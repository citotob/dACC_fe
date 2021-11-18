import React, { useEffect, useState } from "react";
import { Card, CardBody, Row, Col, CardTitle } from "reactstrap";
import Axios from "axios";

export default function CardLokasiDummy(props) {
	const [data, setData] = useState([]);
	const [prov, setProv] = useState("");
	const [kab, setKab] = useState("");
	const [kec, setKec] = useState("");
	const [kel, setKel] = useState("");
	const [postCode, setPostCode] = useState("");
	useEffect(() => {
		Axios.get(
			`https://api.mapbox.com/geocoding/v5/mapbox.places/${props.longLat.long},${props.longLat.lat}.json?language=ID&access_token=${process.env.REACT_APP_MAPBOX_GL_TOKEN}`
		)
			.then((res) => {
				setData(res.data.features);
				const prov_res = res.data.features[0].context.filter((e) =>
					e.id.includes("region")
				);
				const kab_res = res.data.features[0].context.filter((e) =>
					e.id.includes("place")
				);
				const kec_res = res.data.features[0].context.filter((e) =>
					e.id.includes("locality")
				);
				const kel_res = res.data.features[0].context.filter((e) =>
					e.id.includes("neighborhood")
				);
				const post_code_res = res.data.features[0].context.filter((e) =>
					e.id.includes("postcode")
				);
				setProv(prov_res);
				setKab(kab_res);
				setKec(kec_res);
				setKel(kel_res);
				setPostCode(post_code_res);
			})
			.catch((e) => setData([]));
	}, []);
	// console.log(data);

	return (
		<div>
			<Card style={{ width: "100%", height: "300px", fontSize: "15px" }}>
				{data.length === 0 ? (
					<CardBody>
						<CardTitle style={{ fontSize: "20px" }}>Dummy Site</CardTitle>
						<Row
							className="my-1 p-1 text-center"
							style={{ borderTop: "solid 1px", borderColor: "#D6D6D7" }}
						>
							<Col lg="12">Data Tidak Ada</Col>
						</Row>
					</CardBody>
				) : (
					<CardBody>
						<CardTitle style={{ fontSize: "20px" }}>Dummy Site</CardTitle>
						<Row className="my-1 p-1">
							<Col lg="12" style={{ color: "grey", fontSize: "13px" }}>
								Lon: {props.data[0] !== undefined && props.longLat.long} | Lat:{" "}
								{props.data[0] !== undefined && props.longLat.lat}
							</Col>
						</Row>
						<Row
							className="my-1 p-1"
							style={{ borderTop: "solid 1px", borderColor: "#D6D6D7" }}
						>
							<Col lg="6">Provinsi:</Col>
							<Col lg="6" className="font-weight-bold">
								{data.length !== 0
									? prov
										? prov[0]
											? prov[0].text
											: "-"
										: "-"
									: "-"}
							</Col>
						</Row>
						<Row
							className="my-1 p-1"
							style={{ borderTop: "solid 1px", borderColor: "#D6D6D7" }}
						>
							<Col lg="6">Kabupaten/Kota:</Col>
							<Col lg="6" className="font-weight-bold">
								{data.length !== 0
									? kab
										? kab[0]
											? kab[0].text
											: "-"
										: "-"
									: "-"}
							</Col>
						</Row>
						<Row
							className="my-1 p-1"
							style={{ borderTop: "solid 1px", borderColor: "#D6D6D7" }}
						>
							<Col lg="6">Kecamatan:</Col>
							<Col lg="6" className="font-weight-bold">
								{data.length !== 0
									? kec
										? kec[0]
											? kec[0].text
											: "-"
										: "-"
									: "-"}
							</Col>
						</Row>
						<Row
							className="my-1 p-1"
							style={{ borderTop: "solid 1px", borderColor: "#D6D6D7" }}
						>
							<Col lg="6">Kelurahan:</Col>
							<Col lg="6" className="font-weight-bold">
								{data.length !== 0
									? kel
										? kel[0]
											? kel[0].text
											: "-"
										: "-"
									: "-"}
							</Col>
						</Row>
						<Row
							className="my-1 p-1"
							style={{ borderTop: "solid 1px", borderColor: "#D6D6D7" }}
						>
							<Col lg="6">Kode Pos:</Col>
							<Col lg="6" className="font-weight-bold">
								{data.length !== 0
									? postCode
										? postCode[0]
											? postCode[0].text
											: "-"
										: "-"
									: "-"}
							</Col>
						</Row>
						{/* <Row
							className="my-1 p-1"
							style={{ borderTop: "solid 1px", borderColor: "#D6D6D7" }}
						>
							<Col lg="6">Guna Lahan:</Col>
							<Col lg="6" className="font-weight-bold">
								{data.length !== 0
									? data[0].place_type
										? data[0].place_type[0] ?? "-"
										: "-"
									: "-"}
							</Col>
						</Row> */}
					</CardBody>
				)}
			</Card>
		</div>
	);
}
