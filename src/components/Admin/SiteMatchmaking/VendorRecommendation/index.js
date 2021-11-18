import React, { useEffect, useState, useRef } from "react";
import { Row, Container } from "reactstrap";
import { MDBDataTable } from "mdbreact";
import "./style.css";
import Filter from "../../../Filter/FilterTable";
import API from "../../../../services/index";
//redux
import { useDispatch } from "react-redux";
import { getDataRecommend } from "../../../../store/actions";
//lodash
import _ from "lodash";
import NumberFormat from "react-number-format";

export default function VendorReccomendation(props) {
	const [saveToLocal, setSaveToLocal] = useState({
		durasi: { check: false, value: 0 },
		vp: { check: false, value: 0 },
		price: { check: false, value: 0 },
		team: { check: false, value: 0 },
	});

	// console.log("isi savetolocal", saveToLocal);

	const handleRFIScoreCheck = (e) => {
		setSaveToLocal((prev) => ({
			...prev,
			[e.target.name]: {
				...prev[e.target.name],
				check: e.target.checked,
			},
		}));
	};
	const handleRFIScoreValue = (e, name) => {
		setSaveToLocal((prev) => ({
			...prev,
			[name]: {
				...prev[name],
				value: e,
			},
		}));
	};

	// console.log("savetolocallllll", saveToLocal);
	useEffect(() => {
		if (
			localStorage.getItem("rfi-score") !== "null" &&
			localStorage.getItem("rfi-score") !== null
		) {
			setSaveToLocal(JSON.parse(window.localStorage.getItem("rfi-score")));
		}
		// console.log("isi localstorage rfi-score", saveToLocal);
	}, []);
	useEffect(() => {
		if (saveToLocal) {
			window.localStorage.setItem("rfi-score", JSON.stringify(saveToLocal));
		}
	}, [
		saveToLocal?.price?.check,
		saveToLocal?.vp?.check,
		saveToLocal?.durasi?.check,
		saveToLocal?.team?.check,
		saveToLocal?.price?.value,
		saveToLocal?.vp?.value,
		saveToLocal?.durasi?.value,
		saveToLocal?.team?.value,
	]);

	// console.log("local storageeeeeeeeee", localStorage.getItem("rfi-score"));
	const dataTableRecommend = {
		columns: [
			{
				label: "NO",
				field: "no",
				sort: "disabled",
				width: 50,
			},
			{
				label: "RFI SCORING",
				field: "col2",
				sort: "disabled",
				width: 150,
			},
			{
				label: "CHECKLIST",
				field: "col3",
				sort: "disabled",
				width: 150,
			},
			{
				label: "SCORE PERCENTAGE",
				field: "col4",
				sort: "disabled",
				width: 150,
			},
		],
		rows: [
			{
				no: 1,
				col2: "Teknologi",
				col3: <input type="checkbox" defaultChecked={true} disabled></input>,
				col4: (
					<div className="text-success font-weight-bold text-center">-</div>
				),
			},
			{
				no: 2,
				col2: "Durasi",
				col3: (
					<input
						type="checkbox"
						defaultChecked={saveToLocal?.durasi?.check}
						checked={saveToLocal?.durasi?.check}
						onChange={handleRFIScoreCheck}
						name="durasi"
					></input>
				),
				col4: (
					<div className="d-flex justify-content-center">
						<NumberFormat
							className="form-control w-50 text-success font-weight-bold text-center py-0"
							maxLength="4"
							style={{ height: "25px" }}
							max="100"
							suffix={"%"}
							isAllowed={(values) => {
								const { formattedValue, floatValue } = values;
								return formattedValue === "" || floatValue <= 100;
							}}
							value={
								saveToLocal?.durasi?.value !== 0
									? saveToLocal?.durasi?.value
									: ""
							}
							onValueChange={(values) => {
								const { formattedValue, value } = values;
								// handleChange(values, value);
								handleRFIScoreValue(value, "durasi");
								// console.log(formattedValue, value)
								// formattedValue = $2,223
								// value ie, 2223
							}}
							disabled={!saveToLocal?.durasi?.check}
						/>
					</div>
				),
			},
			{
				no: 3,
				col2: "VP",
				col3: (
					<input
						type="checkbox"
						defaultChecked={saveToLocal.vp.check}
						checked={saveToLocal.vp.check}
						onChange={handleRFIScoreCheck}
						name="vp"
					></input>
				),
				col4: (
					<div className="d-flex justify-content-center">
						<NumberFormat
							className="form-control w-50 text-success font-weight-bold text-center py-0"
							maxLength="4"
							style={{ height: "25px" }}
							max="100"
							suffix={"%"}
							isAllowed={(values) => {
								const { formattedValue, floatValue } = values;
								return formattedValue === "" || floatValue <= 100;
							}}
							value={saveToLocal.vp.value !== 0 ? saveToLocal.vp.value : ""}
							onValueChange={(values) => {
								const { formattedValue, value } = values;
								// handleChange(values, value);
								handleRFIScoreValue(value, "vp");
								// console.log(formattedValue, value)
								// formattedValue = $2,223
								// value ie, 2223
							}}
							disabled={!saveToLocal.vp.check}
						/>
					</div>
				),
			},
			{
				no: 4,
				col2: "Price",
				col3: (
					<input
						type="checkbox"
						defaultChecked={saveToLocal.price.check}
						checked={saveToLocal.price.check}
						onChange={handleRFIScoreCheck}
						name="price"
					></input>
				),
				col4: (
					<div className="d-flex justify-content-center">
						<NumberFormat
							className="form-control w-50 text-success font-weight-bold text-center py-0"
							maxLength="4"
							style={{ height: "25px" }}
							max="100"
							suffix={"%"}
							isAllowed={(values) => {
								const { formattedValue, floatValue } = values;
								return formattedValue === "" || floatValue <= 100;
							}}
							value={
								saveToLocal.price.value !== 0 ? saveToLocal.price.value : ""
							}
							onValueChange={(values) => {
								const { formattedValue, value } = values;
								// handleChange(values, value);
								handleRFIScoreValue(value, "price");
								// console.log(formattedValue, value)
								// formattedValue = $2,223
								// value ie, 2223
							}}
							disabled={!saveToLocal.price.check}
						/>
					</div>
				),
			},
			{
				no: 5,
				col2: "Team",
				col3: (
					<input
						type="checkbox"
						defaultChecked={saveToLocal.team.check}
						checked={saveToLocal.team.check}
						onChange={handleRFIScoreCheck}
						name="team"
					></input>
				),
				col4: (
					<div className="d-flex justify-content-center">
						<NumberFormat
							className="form-control w-50 text-success font-weight-bold text-center py-0"
							maxLength="4"
							style={{ height: "25px" }}
							max="100"
							suffix={"%"}
							isAllowed={(values) => {
								const { formattedValue, floatValue } = values;
								return formattedValue === "" || floatValue <= 100;
							}}
							value={saveToLocal.team.value !== 0 ? saveToLocal.team.value : ""}
							onValueChange={(values) => {
								const { formattedValue, value } = values;
								// handleChange(values, value);
								handleRFIScoreValue(value, "team");
								// console.log(formattedValue, value)
								// formattedValue = $2,223
								// value ie, 2223
							}}
							disabled={!saveToLocal.team.check}
						/>
					</div>
				),
			},
		],
	};
	return (
		<div className="container-fluid">
			<span
				className="text-right text-danger d-flex justify-content-end col-12"
				style={{ cursor: "pointer", fontSize: "14px" }}
				onClick={() => {
					setSaveToLocal({
						durasi: { check: false, value: 0 },
						vp: { check: false, value: 0 },
						price: { check: false, value: 0 },
						team: { check: false, value: 0 },
					});
					window.localStorage.setItem("rfi-score", saveToLocal);
				}}
			>
				Reset
			</span>
			<div className="w-75 mx-auto">
				<div className={`text-center my-3`}>
					<h4>RFI SCORING METHOD</h4>
				</div>
				<div className="text-center my-1">
					<MDBDataTable
						id="tableRecommendVendor"
						className="text-center font-size-12"
						searching={false}
						responsive
						hover
						// scrollY
						paging={false}
						sortable={false}
						data={dataTableRecommend}
						noBottomColumns={true}
					/>
				</div>
			</div>
		</div>
	);
}
