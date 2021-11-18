import React, { useEffect, useState } from "react";
import { MDBContainer, MDBModal, MDBModalBody, MDBModalHeader } from "mdbreact";
import {
	Container,
	Col,
	Row,
	Input,
	Button,
	Spinner,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
} from "reactstrap";
import moment from "moment";
import { FrappeGantt } from "frappe-gantt-react";
import API from "../../../../services";
import styles from "./style.module.css";
import "./style.css";

function ModalGanttChart(props) {
	const role = window.localStorage.getItem("companyId");
	const [viewmode, setViewmode] = useState("Day");
	const [active, setActive] = useState(0);

	let dats = props.dataBatch
		? props.dataBatch.rfi_score
			? props.dataBatch.rfi_score.filter(
					(x) => x.vendor_app.vendorid.id === role
			  )
			: ""
		: "";

	const tasks = [
		{
			id: `TimeFrame`,
			name: `Time Frame`,
			start: dats
				? moment(dats[0].vendor_app.tanggal_mulai_sla).format("YYYY-MM-DD")
				: "2000-01-01",
			end: dats
				? moment(dats[0].vendor_app.tanggal_akhir_sla).format("YYYY-MM-DD")
				: "2000-01-01",
			progress: 0, // max 100, if over 100 the task is prolongated
			custom_class: "cc-bar",
		},
		{
			id: "Task 1",
			name: "Material On Site",
			start: dats
				? moment(dats[0].material_on_site).format("YYYY-MM-DD")
				: "2000-01-01",
			end: dats
				? moment(dats[0].material_on_site)
						.add(dats[0].days_material_on_site, "days")
						.format("YYYY-MM-DD")
				: "2000-01-01",
			progress: 0, // max 100, if over 100 the task is prolongated
			custom_class: "cc-bar",
			dependencies: "TimeFrame",
		},
		{
			id: "Task 2",
			name: "Installation",
			start: dats
				? moment(dats[0].installation).format("YYYY-MM-DD")
				: "2000-01-01",
			end: dats
				? moment(dats[0].installation)
						.add(dats[0].days_installation, "days")
						.format("YYYY-MM-DD")
				: "2000-01-01",
			progress: 0,
			dependencies: "Task 1",
			custom_class: "cc-bar",
		},
		{
			id: "Task 3",
			name: "On Air",
			start: dats ? moment(dats[0].on_air).format("YYYY-MM-DD") : "2000-01-01",
			end: dats
				? moment(dats[0].on_air)
						.add(dats[0].days_on_air, "days")
						.format("YYYY-MM-DD")
				: "2000-01-01",
			progress: 0, // max 100, if over 100 the task is prolongated
			dependencies: "Task 2",
			custom_class: "cc-bar",
		},
		{
			id: "Task 4",
			name: "Integration & Report",
			start: dats
				? moment(dats[0].integration).format("YYYY-MM-DD")
				: "2000-01-01",
			end: dats
				? moment(dats[0].integration)
						.add(dats[0].days_on_integration, "days")
						.format("YYYY-MM-DD")
				: "2000-01-01",
			progress: 0, // max 100, if over 100 the task is prolongated
			dependencies: "Task 3",
			custom_class: "cc-bar",
		},
	];

	return (
		<Container>
			<Modal
				className="modalGantt"
				isOpen={props.modalGanttChart}
				toggle={props.toggleGanttChart}
				centered
			>
				<ModalHeader toggle={props.toggleGanttChart}>
					<div
						style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "flex-start",
							textAlign: "center",
							fontSize: "24px",
							fontWeight: "bold",
						}}
					>
						{"Gantt Chart"}
					</div>
				</ModalHeader>
				<div>
					<Row
						style={{
							paddingLeft: "16px",
							paddingRight: "16px",
							paddingTop: "16px",
						}}
					>
						<Col
							xs="4"
							style={{
								display: "flex",
								justifyContent: "flex-start",
								alignItems: "flex-start",
								textAlign: "center",
							}}
						>
							{props?.dataBatch?.siteid?.nama ?? ""}
						</Col>
						<Col
							xs="4"
							style={{
								display: "flex",
								justifyContent: "center",
								alignItems: "flex-start",
								textAlign: "center",
							}}
						>
							Timeline Pembuatan RFI
						</Col>
						<Col
							xs="4"
							style={{
								display: "flex",
								justifyContent: "flex-end",
								alignItems: "flex-start",
								textAlign: "center",
							}}
						>
							{/* {
								dats ? moment(dats[0].material_on_site).format("DD/MM/YYYY "): "01/01/2000" 
							}
							-
							{
								dats ? moment(dats[0].integration).add(dats[0].days_on_integration, 'days').format(" DD/MM/YYYY"): "01/01/2000"
							} */}
						</Col>
					</Row>
				</div>
				<div>
					<hr />
				</div>
				<Row
					style={{
						paddingBottom: "16px",
						paddingLeft: "16px",
						paddingRight: "16px",
					}}
				>
					<Col
						xs="2"
						md="1"
						lg="1"
						style={{
							display: "flex",
							justifyContent: "flex-start",
							alignItems: "center",
							textAlign: "center",
						}}
					>
						Mode View
					</Col>
					<Col
						xs="10"
						md="11"
						lg="11"
						style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							textAlign: "center",
						}}
					>
						<Row style={{ width: "100%" }}>
							<Col xs="6" md="3" lg="3" style={{ marginBottom: "4px" }}>
								<Button
									color=""
									style={{
										color: "white",
										backgroundColor: active === 0 ? "#e7883a" : "#073030",
										width: "100%",
									}}
									onClick={() => {
										setActive(0);
										setViewmode("Day");
									}}
								>
									Day
								</Button>
							</Col>
							<Col xs="6" md="3" lg="3" style={{ marginBottom: "4px" }}>
								<Button
									color=""
									style={{
										color: "white",
										backgroundColor: active === 1 ? "#e7883a" : "#073030",
										width: "100%",
									}}
									onClick={() => {
										setActive(1);
										setViewmode("Week");
									}}
								>
									Week
								</Button>
							</Col>
							<Col xs="6" md="3" lg="3">
								<Button
									color=""
									style={{
										color: "white",
										backgroundColor: active === 2 ? "#e7883a" : "#073030",
										width: "100%",
									}}
									onClick={() => {
										setActive(2);
										setViewmode("Month");
									}}
								>
									Month
								</Button>
							</Col>
							<Col xs="6" md="3" lg="3"></Col>
						</Row>
					</Col>
				</Row>
				{/* GANTT CHART */}
				<div>
					<FrappeGantt
						tasks={tasks}
						viewMode={viewmode}
						// onClick={(task) => console.log(task)}
						// onDateChange={(task, start, end) =>
						// 	console.log(task, start, end)
						// }
						// onProgressChange={(task, progress) => {
						// 	task._progress = 10;
						// 	console.log(task, progress);
						// }}
						// onTasksChange={(tasks) => console.log(tasks)}
					/>
				</div>
			</Modal>
		</Container>
	);
}
export default ModalGanttChart;
