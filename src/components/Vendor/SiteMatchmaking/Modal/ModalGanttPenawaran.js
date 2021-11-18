import React, { useEffect, useState } from "react";
import { MDBContainer, MDBModal, MDBModalBody, MDBModalHeader } from "mdbreact";
import { Container, Col, Row, Input, Button, Spinner, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import moment from "moment";
import { FrappeGantt } from "frappe-gantt-react";
import API from "../../../../services";
import styles from "./style.module.css";
import "./style.css"
import { database } from "firebase";
import './style.css'

function ModalGanttChartPenawaran(props) {
	const role = window.localStorage.getItem("companyId");
	const [viewmode, setViewmode] = useState("Day");
    const [active, setActive] = useState(0);
    const taV = localStorage.getItem("tanggalAwalVendor");
	const tiV = localStorage.getItem("tanggalAkhirVendor");
    var sitesData = JSON.parse(localStorage.getItem('sitesData') || "[]")
	const siteListA = sitesData.map((data) => {
		return { ...data };
    });

	const data = []

    const isiData = siteListA.map((data, index)=>{
        return [
            {
                id: `Task Mat ${index}`,
                name: `Material On Site ${data.sitenama}`,
                start: siteListA ? moment(data.tanggal_mulai_material).format("YYYY-MM-DD"): "2000-01-01",
                end: siteListA ? moment(data.tanggal_selesai_material).format("YYYY-MM-DD"): "2000-01-01",
                progress: 0, // max 100, if over 100 the task is prolongated
				custom_class: 'cc-bar',
				dependencies: `TimeFrame`,
            },
            {
                id: `Task Ins ${index}`,
                name: `Installation ${data.sitenama}`,
                start: data	? moment(data.tanggal_mulai_installation).format("YYYY-MM-DD"): "2000-01-01",
                end: data ? moment(data.tanggal_selesai_installation).format("YYYY-MM-DD"): "2000-01-01",
                progress: 0,
                dependencies: `Task Mat ${index}`,
                custom_class: 'cc-bar'
            },
            {
                id: `Task On ${index}`,
                name: `On Air ${data.sitenama}`,
                start: siteListA ? moment(data.tanggal_mulai_onair).format("YYYY-MM-DD"): "2000-01-01",
                end: siteListA ? moment(data.tanggal_selesai_onair).format("YYYY-MM-DD"): "2000-01-01",
                progress: 0, // max 100, if over 100 the task is prolongated
                dependencies: `Task Ins ${index}`,
                custom_class: 'cc-bar'
            },
            {
                id: `Task In ${index}`,
                name: `Integration ${data.sitenama}`,
                start: data ? moment(data.tanggal_mulai_ir).format("YYYY-MM-DD"): "2000-01-01",
                end: data ? moment(data.tanggal_selesai_ir).format("YYYY-MM-DD"): "2000-01-01",
                progress: 0, // max 100, if over 100 the task is prolongated
                dependencies: `Task On ${index}`,
                custom_class: 'cc-bar'
            }
        ]
    })

    const isiData1 = siteListA.map((data, index)=>{
        return {
            id: `Task Mat ${index}`,
            name: `Material On Site ${data.siteunikid}`,
            start: siteListA ? moment(data.tanggal_mulai_material).format("YYYY-MM-DD"): "2000-01-01",
            end: siteListA ? moment(data.tanggal_selesai_material).format("YYYY-MM-DD"): "2000-01-01",
            progress: 0, // max 100, if over 100 the task is prolongated
            custom_class: 'cc-bar'
        }
    })

    const isiData2 = siteListA.map((data, index)=>{
        return {
            id: `Task Ins ${index}`,
            name: `Installation ${data.siteunikid}`,
            start: data	? moment(data.tanggal_mulai_installation).format("YYYY-MM-DD"): "2000-01-01",
            end: data ? moment(data.tanggal_selesai_installation).format("YYYY-MM-DD"): "2000-01-01",
            progress: 0,
            dependencies: `Task Mat ${index}`,
            custom_class: 'cc-bar'
        }
    })

    const isiData3 = siteListA.map((data, index)=>{
        return {
            id: `Task On ${index}`,
            name: `On Air ${data.siteunikid}`,
            start: siteListA ? moment(data.tanggal_mulai_onair).format("YYYY-MM-DD"): "2000-01-01",
            end: siteListA ? moment(data.tanggal_selesai_onair).format("YYYY-MM-DD"): "2000-01-01",
            progress: 0, // max 100, if over 100 the task is prolongated
            dependencies: `Task Ins ${index}`,
            custom_class: 'cc-bar'
        }
    })

    const isiData4 = siteListA.map((data, index)=>{
        return {
            id: `Task In ${index}`,
            name: `Integration ${data.siteunikid}`,
            start: data ? moment(data.tanggal_mulai_ir).format("YYYY-MM-DD"): "2000-01-01",
            end: data ? moment(data.tanggal_selesai_ir).format("YYYY-MM-DD"): "2000-01-01",
            progress: 0, // max 100, if over 100 the task is prolongated
            dependencies: `Task On ${index}`,
            custom_class: 'cc-bar'
        }
	})

    // console.log(data.concat.apply([], isiData))///Per Site
    // console.log(data.concat(isiData1, isiData2, isiData3, isiData4)) ///Per Category

	const tasks = data.concat.apply([{
		id: `TimeFrame`,
		name: `Time Frame`,
		start: taV ? moment(taV).format("YYYY-MM-DD"): "2000-01-01",
		end: tiV ? moment(tiV).format("YYYY-MM-DD"): "2000-01-01",
		progress: 0, // max 100, if over 100 the task is prolongated
		custom_class: 'cc-bar'
	}], isiData);

	return (
		<Container>
			<Modal
				className="modalGantt"
				isOpen={props.modal}
				toggle={props.toggle}
				centered
				scrollable
			>
				<ModalHeader toggle={props.toggle}>
					<div style={{display:'flex', justifyContent:'center', alignItems:'flex-start', textAlign:'center', fontSize:'24px', fontWeight:'bold'}}>
							{
								"GANTT CHART"
							}
					</div>
				</ModalHeader>
				<div>
					{/* <Row style={{paddingLeft:'16px', paddingRight:'16px', paddingTop:'16px'}}>
						<Col xs="12" style={{display:'flex', justifyContent:'center', alignItems:'flex-start', textAlign:'center', fontSize:'24px', fontWeight:'bold'}}>
							{
								"GANTT CHART"
							}
						</Col>
					</Row>
					<hr/> */}
					<Row style={{paddingLeft:'16px', paddingRight:'16px', paddingTop:'16px'}}>
						<Col xs="4" style={{display:'flex', justifyContent:'flex-start', alignItems:'flex-start', textAlign:'center'}}>
							{siteListA[0] ? siteListA[0].batchname : "-"}
						</Col>
						<Col xs="4" style={{display:'flex', justifyContent:'center', alignItems:'flex-start', textAlign:'center'}}>
							Timeline Pembuatan RFI
						</Col>
						<Col xs="4" style={{display:'flex', justifyContent:'flex-end', alignItems:'flex-start',  textAlign:'center'}}>
							{/* {
								moment(sortedArray[0], "YYYYMMDD").format("DD/MM/YYYY")
							}
							-
							{
								moment(sortedArrayLast[sortedArrayLast.length - 1], "YYYYMMDD").format("DD/MM/YYYY")
							} */}
						</Col>
					</Row>
				</div>
				<div>
					<hr/>
				</div>
				<Row style={{paddingBottom:'16px', paddingLeft:'16px', paddingRight:'16px', paddingTop:'16px'}}>
					<Col xs="2" md="1" lg="1" style={{display:'flex', justifyContent:'flex-start', alignItems:'center', textAlign:'center'}}>
						Mode View
					</Col>
					<Col xs="10" md="11" lg="11" style={{display:'flex', justifyContent:'center', alignItems:'center', textAlign:'center'}}>
						<Row style={{width:'100%'}}>
							<Col xs="6" md="3" lg="3" style={{marginBottom:'4px'}}>
								<Button
									color=""
									style={{color: 'white', backgroundColor: active === 0 ? '#e7883a' : '#073030', width:'100%'}}
									onClick={() => {
										setActive(0)
										setViewmode("Day")
									}}
								>
									Day
								</Button>
							</Col>
							<Col xs="6" md="3" lg="3" style={{marginBottom:'4px'}}>
								<Button
									color=""
									style={{color: 'white', backgroundColor: active === 1 ? '#e7883a' : '#073030', width:'100%'}}
									onClick={() => {
										setActive(1)
										setViewmode("Week")
									}}
								>
									Week
								</Button>
							</Col>
							<Col xs="6" md="3" lg="3">
								<Button
									color=""
									style={{color: 'white', backgroundColor: active === 2 ? '#e7883a' : '#073030', width:'100%'}}
									onClick={() => {
										setActive(2)
										setViewmode("Month")
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
				<div style={{overflowY:'auto'}}>
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
export default ModalGanttChartPenawaran;