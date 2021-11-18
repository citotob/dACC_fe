import React, { useState, useContext } from "react";
import { Card, CardBody } from "reactstrap";

// CONTEXT
import { LocalContext } from "../LocalContext";
import { flyToPoint } from "./maphelper";

// STYLES
import style from "./style.module.css";

export default function SideList(props) {
	const { mapRef } = useContext(LocalContext);
	// const [listData, setListData] = useState([
	// 	{ loc: "Jakarta", long: 121, lat: -2 },
	// 	{ loc: "Bandung", long: 120.049766, lat: -1.900772 },
	// 	{ loc: "Solo", long: 119.043929, lat: 1.910525 },
	// ]);

	const handleClick = (param) => {
		flyToPoint(props.mapRef, param, props.popup);
	};

	const renderList = () => {
		return props.data
			? props.data.map((i) =>
					props.data.length === 0 ? (
						<div className={style.listplace}>Tidak Ada Data</div>
					) : (
						<div
							className={style.listplace}
							onClick={() => {
								handleClick([i.lng, i.lat]);
							}}
						>
							{i.kt}
						</div>
					)
			  )
			: "";
	};

	return (
		<div>
			<Card>
				{props.data ? (
					<CardBody style={{ height: "500px", overflowY: "auto" }}>
						{renderList()}
					</CardBody>
				) : (
					<CardBody style={{ height: "500px", overflowY: "auto" }}>
						Terjadi Kesalahan
					</CardBody>
				)}
			</Card>
		</div>
	);
}
