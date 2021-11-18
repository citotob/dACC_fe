import React, { useState } from "react";
import { MDBContainer, MDBModal } from "mdbreact";
import { Col, Row, Button, ModalBody, ModalFooter, Spinner } from "reactstrap";
import styles from "./style.module.css";
// import Skeleton from "react-loading-skeleton"
import "./style.css";
import Invitation from "../Table/Invitation";
import API from "../../../../services";
import MailIcon from "../../../../assets/images/MailIcon.svg";
import ReactTooltip from "react-tooltip";

function InvitationSM(props) {
	const [modal, setModal] = useState(false);
	const [error, setError] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	function displayModal() {
		localStorage.removeItem("dataInvitation");
		setModal((prevModal) => !prevModal);
	}

	function kirimUndangan() {
		var data = JSON.parse(localStorage.getItem("dataInvitation")) ?? [];
		const userid = localStorage.getItem("userId");
		if (data.length === 0) {
			setError(true);
		} else {
			setError(false);
			setIsLoading(true);
			API.postInVendor({
				batchid: props.batch_id,
				from: userid,
				to: data.toString(),
			})
				.then((response) => {
					setIsLoading(false);
					displayModal();
					props.showModalSuccess();
				})
				.catch((e) => {
					setIsLoading(false);
				});
		}
	}

	return (
		<>
			<a key={props.itemid} onClick={displayModal} data-tip="Invite Vendor">
				<img src={MailIcon} alt={props.itemid} />
				{/* Tooltip */}
				<ReactTooltip place="left" />
			</a>
			<MDBContainer>
				<MDBModal
					size="lg"
					isOpen={modal}
					toggle={displayModal}
					centered={true}
				>
					<ModalBody>
						<div className={styles.judulHeaderEdit}>
							<center>
								<h3>Kirim Undangan</h3>
								<h3>{props.batch_title}</h3>
							</center>
						</div>
						{isLoading ? (
							<div
								style={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									paddingTop: "20px",
								}}
							>
								<Spinner
									color=""
									style={{
										color: "orange",
										marginRight: "15px",
										width: "40px",
										height: "40px",
									}}
								/>
								<h5 style={{ margin: "0px" }}>Mengirimkan Undangan...</h5>
							</div>
						) : (
							<div className="container-fluid">
								<Invitation sm={"sm"} tekno={props.item.tech_type} />
							</div>
						)}
					</ModalBody>
					<ModalFooter
						style={{
							display: "flex",
							justifyContent: "center",
							itemAlign: "center",
						}}
					>
						<Row>
							<Col xs="12">
								{error ? (
									<div
										style={{
											display: "flex",
											justifyContent: "center",
											itemAlign: "center",
											color: "red",
											paddingBottom: "10px",
										}}
									>
										Silahkan pilih vendor terlebih dahulu
									</div>
								) : (
									<div></div>
								)}
							</Col>
							<Col xs="12">
								<Button
									onClick={kirimUndangan}
									color=""
									className={styles.btn_confirm}
									disabled={isLoading}
								>
									Kirim Undangan
								</Button>
							</Col>
						</Row>
					</ModalFooter>
				</MDBModal>
			</MDBContainer>
		</>
	);
}
export default InvitationSM;
