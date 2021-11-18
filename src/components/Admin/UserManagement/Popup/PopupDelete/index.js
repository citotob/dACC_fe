import React from "react";

import { Modal, ModalBody, Button, Row } from "reactstrap";
import styles from "./styles.module.css";
import { MDBModalHeader } from "mdbreact";

function PopupConfirmation({
	toggleDelete,
	modalTrash,
	data,
	TrashAction,
	// handleChangeAlasan,
}) {
	return (
		<>
			<Modal
				size="md"
				isOpen={modalTrash}
				toggle={toggleDelete}
				centered={true}
			>
				<MDBModalHeader toggle={toggleDelete}>
					<span className={styles.headText}> HAPUS PENGGUNA </span>
				</MDBModalHeader>
				<ModalBody>
					<center className="container-popup">
						<Row className={`justify-content-center ${styles.wrapper}`}>
							<h4 className={styles.title}>{data.name}</h4>
						</Row>

						<div className={styles.text}>
							Anda yakin ingin hapus pengguna ini?
						</div>
						<Button
							color=""
							className={styles.btn_confirm}
							onClick={TrashAction}
						>
							HAPUS
						</Button>
					</center>
				</ModalBody>
			</Modal>
		</>
	);
}

export default PopupConfirmation;
