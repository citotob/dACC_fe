import React from "react";

import { Modal, ModalBody, Button, Row } from "reactstrap";
import styles from "./styles.module.css";
import { MDBModalHeader } from "mdbreact";
import iconGreen from "../../../../../assets/images/IconGreenChecklist.svg"

function PopupConfirmation({ toogleBerhasilVerif, modalBerhasilVerif }) {
	return (
		<>
			<Modal
				size="md"
				isOpen={modalBerhasilVerif}
				toggle={toogleBerhasilVerif}
				centered={true}
			>
				<MDBModalHeader>
					<span className={styles.headText}> Verifikasi Pengguna </span>
				</MDBModalHeader>
				<ModalBody>
					<center className="container-popup">
						<Row className={`justify-content-center ${styles.wrapper}`}>
							<img src={iconGreen}/>
							<h4 className={styles.title}> Berhasil</h4>
							{/* <h5 className={styles.sub_title}>{data.type}</h5> */}
						</Row>
						<div className={styles.text}>Pengguna telah di Verifikasi</div>
						{/* <Button color="" className={styles.btn_cancel} onClick={toggleVerify}>Tidak</Button> */}
						{/* <Button
							color=""
							className={styles.btn_confirm}
							onClick={verifyAction}
						>
							tutup
						</Button> */}
					</center>
				</ModalBody>
			</Modal>
		</>
	);
}

export default PopupConfirmation;
