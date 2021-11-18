import React from "react";

import { Modal, ModalBody, Button, Row } from "reactstrap";
import styles from "./styles.module.css";
import { MDBModalHeader } from "mdbreact";
import IconGreenCheckList from "../../../assets/images/IconGreenChecklist.svg"
// "../assets/images/IconGreenChecklist.svg"

function PopupConfirmation({ toggleSuccess, modalSuccess, doneSucces }) {
	return (
		<>
			<Modal
				size="md"
				isOpen={modalSuccess}
				toggle={toggleSuccess}
				centered={true}
				doneSucces={doneSucces}
			>
				<MDBModalHeader >
					<span className={styles.headText}> Data Berhasil di Unduh </span>
				</MDBModalHeader>
				<ModalBody>
					<center className="container-popup">
						<div className={styles.text}>
							<img src={IconGreenCheckList}/>
						</div>
						<Button
							color=""
							className={styles.btn_confirm}
							onClick={toggleSuccess}
						>
							Done
						</Button>
					</center>
				</ModalBody>
			</Modal>
		</>
	);
}

export default PopupConfirmation;
