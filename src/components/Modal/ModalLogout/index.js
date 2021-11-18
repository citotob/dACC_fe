import React from "react";

import { Modal, ModalBody, Button, Row } from "reactstrap";
import styles from "./styles.module.css";
import { MDBModalHeader } from "mdbreact";

function PopupConfirmation({ toggleLogout, modalLogout, logout }) {
	return (
		<>
			<Modal
				size="md"
				isOpen={modalLogout}
				toggle={toggleLogout}
				centered={true}
			>
				<MDBModalHeader toggle={toggleLogout}>
					<span className={styles.headText}> Logout </span>
				</MDBModalHeader>
				<ModalBody>
					<center className="container-popup">
						{/* <Row className={`justify-content-center ${styles.wrapper}`}>
                            <h3 className={styles.title}>Verifikasi Pengguna</h3>
                        </Row> */}

						<div className={styles.text}>Anda Yakin Untuk Keluar?</div>
						{/* <Button color="" className={styles.btn_cancel} onClick={toggleVerify}>Tidak</Button> */}
						<Button
							color=""
							className={styles.btn_confirm}
							onClick={logout}
						>
							ok
						</Button>
					</center>
				</ModalBody>
			</Modal>
		</>
	);
}

export default PopupConfirmation;
