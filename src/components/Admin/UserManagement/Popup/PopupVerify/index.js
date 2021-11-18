import React from "react";

import { Modal, ModalBody, Button, Row } from "reactstrap";
import styles from "./styles.module.css";
import { MDBModalHeader } from "mdbreact";

function PopupConfirmation({ toggleVerify, modalVerify, data, verifyAction }) {
	return (
		<>
			<Modal
				size="md"
				isOpen={modalVerify}
				toggle={toggleVerify}
				centered={true}
			>
				<MDBModalHeader toggle={toggleVerify}>
					<span className={styles.headText}> Verifikasi Pengguna </span>
				</MDBModalHeader>
				<ModalBody>
					<center className="container-popup">
						<Row className={`justify-content-center ${styles.wrapper}`}>
							<h4 className={styles.title}>{data.name}</h4>
							{/* <h5 className={styles.sub_title}>{data.type}</h5> */}
						</Row>
						<div className={styles.text}>Yakin verifikasi pengguna ini?</div>
						{/* <Button color="" className={styles.btn_cancel} onClick={toggleVerify}>Tidak</Button> */}
						<Button
							color=""
							className={styles.btn_confirm}
							onClick={verifyAction}
						>
							Verifikasi
						</Button>
					</center>
				</ModalBody>
			</Modal>
		</>
	);
}

export default PopupConfirmation;
