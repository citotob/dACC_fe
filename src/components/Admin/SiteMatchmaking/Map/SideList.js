import React, { useState, useContext } from "react";
import { Card, CardBody } from "reactstrap";

// CONTEXT
import { LocalContext } from "../LocalContext";
import { flyToPoint } from "./maphelper";

// STYLES
import style from "./style.module.css";

export default function SideList(props) {
	// const [listData, setListData] = useState([
	// 	{ loc: "Jakarta", long: 121, lat: -2 },
	// 	{ loc: "Bandung", long: 120.049766, lat: -1.900772 },
	// 	{ loc: "Solo", long: 119.043929, lat: 1.910525 },
	// ]);

	const handleClick = (param, vendor) => {
		// flyToPoint(props.mapRef, param, props.popup);
		props.showVendorList(vendor, param);
	};

	const renderList = () => {
		return props.data
			? props.data.map((i, index) =>
					props.data.length === 0 ? (
						<div className={style.listplace}>Tidak Ada Data</div>
					) : (
						<div
							key={index}
							className={style.listplace}
							onClick={() => {
								handleClick([i.lng, i.lat], i.listVendor);
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
			{/* <Card style={{ height: "200px" }}> */}
			{props.data ? (
				<CardBody style={{ height: "100%", overflowY: "auto" }}>
					{renderList()}
				</CardBody>
			) : (
				<CardBody style={{ height: "100%", overflowY: "auto" }}>
					Terjadi Kesalahan
				</CardBody>
			)}
			{/* </Card> */}
		</div>
	);
}
