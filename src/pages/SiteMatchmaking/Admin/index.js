import React, { useState, useEffect } from "react";
import { Row, Col, Modal, ModalBody, Button } from "reactstrap";
import BatchTable from "../../../components/Admin/SiteMatchmaking/Table/Batch";
import { MDBNavLink, MDBModalHeader } from "mdbreact";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { exportPDF } from "../../../components/Admin/Download/SiteMatchmaking/DownloadPDF";
import DownloadXLS from "../../../components/Admin/Download/SiteMatchmaking/DownloadXLS";
import moment from 'moment';
import styles from './styles.module.css'
import './style.css'
import SuccessInvite from '../../../components/Modal/ModalSuccess/SuccessInvite'
import ModalSuccess from "../../../components/Modal/ModalSuccess";

const SiteMatchmakingAdmin = (props) => {
	const[modalDownloadPDF, setModalDownloadPDF] = useState(false)
	const[modalDownloadXLS, setModalDownloadXLS] = useState(false)

	const [modalSuccess, setModalSuccess] = useState(false);
	const toggleSuccess = () =>{
		setModalSuccess(!modalSuccess)
	}

	useEffect(() => {
		if(modalSuccess === true){
			const timer = setTimeout(() => {
				setModalSuccess(false)
			}, 3000);
			return () => clearTimeout(timer);
		}
	}, [modalSuccess]);

	const showModalSuccess = () => {
		setModalSuccess(true)
	}

	const toggleDownloadPDF = () => {
		setModalDownloadPDF(!modalDownloadPDF)
	}

	const toggleDownloadXLS = () => {
		setModalDownloadXLS(!modalDownloadXLS)
	}

	const toggleDownloadSuccess = () => {
		setModalSuccess(!modalSuccess);
	}

	//handle data xls
	const [data, setData] = useState([]);
	const handleData = (dats) => {
		setData(dats);
	};
	//handle download pdf
	const handleDownloadPDF = () => {
		setModalDownloadPDF(!modalDownloadPDF)
		exportPDF(data);
	};
	return (
		<>
			<SuccessInvite modalSuccess={modalSuccess} toggleSuccess={()=>toggleSuccess()}/>
			<Modal
				size="md"
				isOpen={modalDownloadXLS}
				toggle={toggleDownloadXLS}
				centered={true}
			>
				<MDBModalHeader toggle={toggleDownloadXLS}>
					<span className={styles.headText}>Download XLS</span>
				</MDBModalHeader>
				<ModalBody>
					<center className="container-popup">
						<div className={styles.text}>Anda Yakin Untuk Download XLS?</div>
						<Button
							color=""
							className={styles.btn_reject}
							onClick={toggleDownloadXLS}
						>
							Batal
						</Button>
						<Button
							color=""
							className={styles.btn_confirm_xls}
							onClick={() => {
								toggleDownloadXLS(true);
								toggleDownloadSuccess(false);
								setTimeout(() => {
									toggleDownloadSuccess(true)
								}, 1000)
							}}
						>
						<ReactHTMLTableToExcel
							id="TableXLS"
							className="DownloadTableXLSSMADMIN"
							table="DownloadTableXLS"
							filename={`Data_Akses_Internet_${moment(Date()).format("DDMMYYYY").toString()}`}
							sheet="dataSMAdmin"
							buttonText="Download"
						/>
						</Button>
					</center>
				</ModalBody>
			</Modal>
			<Modal
				size="md"
				isOpen={modalDownloadPDF}
				toggle={toggleDownloadPDF}
				centered={true}
			>
				<MDBModalHeader toggle={toggleDownloadPDF}>
					<span className={styles.headText}>Download PDF</span>
				</MDBModalHeader>
				<ModalBody>
					<center className="container-popup">
						<div className={styles.text}>Anda Yakin Untuk Download PDF?</div>
						<Button
							color=""
							className={styles.btn_reject}
							onClick={toggleDownloadPDF}
						>
							Batal
						</Button>
						<Button
							color=""
							className={styles.btn_confirm}
							onClick={() => {
								handleDownloadPDF(true);
								toggleDownloadSuccess(false);
								setTimeout(() => {
									toggleDownloadSuccess(true)
								}, 1000)
							}}
						>
							Download
						</Button>
					</center>
				</ModalBody>
			</Modal>
			<ModalSuccess
				modalSuccess={modalSuccess}
				toggleSuccess={() => toggleDownloadSuccess()}
				// doneSucces={done}
			/>
			<div className="page-content">
				<div className="container-fluid">
					<div style={{display:'flex', width:"100%", justifyContent:'flex-end'}}>
						<MDBNavLink to="#" className="textDownload">
							Download
						</MDBNavLink>
						<MDBNavLink onClick={toggleDownloadXLS} link to="#">
							XLS
						</MDBNavLink>
						<MDBNavLink onClick={toggleDownloadPDF} link to="#">
							PDF
						</MDBNavLink>
					</div>
					<DownloadXLS
					id="DownloadTableXLS"
					className="DownloadTableXLS"
					data={data}
					/>
					<Row>
						<Col className="col-12">
							<BatchTable handleData={handleData} showModalSuccess={()=>showModalSuccess()}/>
						</Col>
					</Row>
				</div>
			</div>
		</>
	);
};

export default SiteMatchmakingAdmin;
