import React, { useEffect, useState } from "react";
import {
	MDBContainer,
	MDBModal,
	MDBModalBody,
	MDBModalHeader,
	MDBDataTable,
} from "mdbreact";
import { Col, Row, Input, Button } from "reactstrap";
import moment from "moment";
import "./style.css";

// GANTT CHART
import { FrappeGantt } from "frappe-gantt-react";

function DetailVendorGantt(props) {
	const [viewmode, setViewmode] = useState("Week");
	const [job, setJob] = useState({
		startPekerjaan: "",
		finishPekerjaan: "",
	});
	const [invitation, setInvitation] = useState({
		startInvitation: "",
		finishInvitation: "",
	});
	const [timeline, setTimeLine] = useState({
		tanggal_mulai_sla: "",
		tanggal_akhir_sla: "",
		installation: [],
		integration: [],
		material_on_site: [],
		on_air: [],
	});

	useEffect(() => {
		setJob((prev) => ({
			...prev,
			startPekerjaan: props.detailVendor
				? props.detailVendor.batchid &&
				  props.detailVendor.batchid.tanggal_mulai_kerja &&
				  moment(props.detailVendor.batchid.tanggal_mulai_kerja).format(
						"YYYY-MM-DD"
				  )
				: "2000-01-01",
			finishPekerjaan: props.detailVendor
				? props.detailVendor.batchid &&
				  props.detailVendor.batchid.tanggal_selesai_kerja &&
				  moment(props.detailVendor.batchid.tanggal_selesai_kerja).format(
						"YYYY-MM-DD"
				  )
				: "2000-01-01",
		}));
		setInvitation((prev) => ({
			...prev,
			startInvitation: props.detailVendor
				? props.detailVendor.batchid &&
				  props.detailVendor.batchid.tanggal_mulai_kerja &&
				  moment(props.detailVendor.batchid.tanggal_mulai_undangan).format(
						"YYYY-MM-DD"
				  )
				: "2000-01-01",
			finishInvitation: props.detailVendor
				? props.detailVendor.batchid &&
				  props.detailVendor.batchid.tanggal_mulai_kerja &&
				  moment(props.detailVendor.batchid.tanggal_selesai_undangan).format(
						"YYYY-MM-DD"
				  )
				: "2000-01-01",
		}));
		setTimeLine((prev) => ({
			...prev,
			tanggal_mulai_sla: props.detailVendor
				? moment(props.detailVendor.tanggal_mulai_sla).format("YYYY-MM-DD")
				: "2000-01-01",
			tanggal_akhir_sla: props.detailVendor
				? moment(props.detailVendor.tanggal_akhir_sla).format("YYYY-MM-DD")
				: "2000-01-01",
			installation: [
				props.dataListVendor
					? moment(props.dataListVendor.installation).format("YYYY-MM-DD")
					: "2000-01-01",
				props.dataListVendor
					? moment(props.dataListVendor.installation)
							.add(props.dataListVendor.days_installation, "days")
							.format("YYYY-MM-DD")
					: "2000-01-01",
			],
			integration: [
				props.dataListVendor
					? moment(props.dataListVendor.integration).format("YYYY-MM-DD")
					: "2000-01-01",
				props.dataListVendor
					? moment(props.dataListVendor.integration)
							.add(props.dataListVendor.days_integration, "days")
							.format("YYYY-MM-DD")
					: "2000-01-01",
			],
			material_on_site: [
				props.dataListVendor
					? moment(props.dataListVendor.material_on_site).format("YYYY-MM-DD")
					: "2000-01-01",
				props.dataListVendor
					? moment(props.dataListVendor.material_on_site)
							.add(props.dataListVendor.days_material_on_site, "days")
							.format("YYYY-MM-DD")
					: "2000-01-01",
			],
			on_air: [
				props.dataListVendor
					? moment(props.dataListVendor.on_air).format("YYYY-MM-DD")
					: "2000-01-01",
				props.dataListVendor
					? moment(props.dataListVendor.on_air)
							.add(props.dataListVendor.days_on_air, "days")
							.format("YYYY-MM-DD")
					: "2000-01-01",
			],
		}));
	}, [props.detailVendor, props.dataListVendor]);

	const tasks = [
		{
			id: "Task 1",
			name: "Tanggal Undangan",
			start: invitation.startInvitation,
			end: invitation.finishInvitation,
			progress: 0, // max 100, if over 100 the task is prolongated
			custom_class: "cc-bar",
		},
		{
			id: "Task 2",
			name: "Tanggal Kerja",
			start: job.startPekerjaan,
			end: job.finishPekerjaan,
			progress: 0, // max 100, if over 100 the task is prolongated
			dependencies: "Task 1",
			custom_class: "cc-bar",
		},
		// {
		// 	id: `Task 3`,
		// 	name: `Time Frame`,
		// 	start: timeline.tanggal_mulai_sla ?? "2000-01-01",
		// 	end: timeline.tanggal_akhir_sla ?? "2000-01-01",
		// 	dependencies: "Task 2",
		// 	progress: 0, // max 100, if over 100 the task is prolongated
		// 	custom_class: "cc-bar",
		// },
		{
			id: "Task 4",
			name: "Material On Site",
			start: timeline.material_on_site[0] ?? "2000-01-01",
			end: timeline.material_on_site[1] ?? "2000-01-01",
			progress: 0, // max 100, if over 100 the task is prolongated
			dependencies: "Task 3",
			custom_class: "cc-bar",
		},
		{
			id: "Task 5",
			name: "Installation",
			start: timeline.installation[0] ?? "2000-01-01",
			end: timeline.installation[1] ?? "2000-01-01",
			progress: 0,
			dependencies: "Task 4",
			custom_class: "cc-bar",
		},
		{
			id: "Task 6",
			name: "On Air",
			start: timeline.on_air[0] ?? "2000-01-01",
			end: timeline.on_air[1] ?? "2000-01-01",
			progress: 0, // max 100, if over 100 the task is prolongated
			dependencies: "Task 5",
			custom_class: "cc-bar",
		},
		{
			id: "Task 7",
			name: "Integration & Report",
			start: timeline.integration[0] ?? "2000-01-01",
			end: timeline.integration[1] ?? "2000-01-01",
			progress: 0, // max 100, if over 100 the task is prolongated
			dependencies: "Task 5",
			custom_class: "cc-bar",
		},
	];

	return (
		<>
			<MDBContainer>
				<MDBModal
					size="lg"
					isOpen={props.modal}
					toggle={props.toggle}
					centered={true}
				>
					<MDBModalHeader className="d-flex justify-content-center">
						<Col xs="12">
							{props.detailVendor
								? props.detailVendor.vendorid
									? props.detailVendor.vendorid.name
									: ""
								: ""}
						</Col>
					</MDBModalHeader>
					<MDBModalBody>
						{/* <Row>
							<Col style={{ display: "flex", justifyContent: "center" }}>
								<Button>Dokumen</Button>
							</Col>
							<Col style={{ display: "flex", justifyContent: "center" }}>
								<Button>Gantt Chart</Button>
							</Col>
						</Row> */}
						<div
							className="text-center my-4"
							style={{ fontWeight: "bold", fontSize: "16px" }}
						>
							Service Level Agreement
						</div>
						<Row>
							<Col className="text-center">
								<div>Tanggal Awal Pekerjaan</div>
								<div>{job.startPekerjaan ? job.startPekerjaan : ""}</div>
							</Col>
							<Col className="text-center">
								<div>Tanggal Akhir Pekerjaan</div>
								<div>{job.finishPekerjaan ? job.finishPekerjaan : ""}</div>
							</Col>
						</Row>

						{/* GANTT CHART */}

						<div className="text-center my-3">
							<FrappeGantt
								tasks={tasks}
								viewMode={viewmode}
								onClick={(task) => console.log(task)}
								onDateChange={(task, start, end) =>
									console.log(task, start, end)
								}
								onProgressChange={(task, progress) => {
									task._progress = 10;
									console.log(task, progress);
								}}
								onTasksChange={(tasks) => console.log(tasks)}
							/>

							<button
								// type="submit"
								onClick={() => setViewmode("Quarter Day")}
							>
								Quarter Day
							</button>
							<button
								// type="submit"
								onClick={() => setViewmode("Half Day")}
							>
								Half Day
							</button>
							<button
								// type="submit"
								onClick={() => setViewmode("Day")}
							>
								Day
							</button>
							<button
								// type="submit"
								onClick={() => setViewmode("Week")}
							>
								Week
							</button>
							<button
								// type="submit"
								onClick={() => setViewmode("Month")}
							>
								Month
							</button>
						</div>
					</MDBModalBody>
				</MDBModal>
			</MDBContainer>
		</>
	);
}
export default DetailVendorGantt;
