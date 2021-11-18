import React from "react";

import { Modal, ModalBody, Button, Row } from "reactstrap";
import styles from "./styles.module.css";
import { MDBModalHeader } from "mdbreact";

function PopupConfirmation({
	toggleDecline,
	modalDelete,
	data,
	deleteAction,
	handleChangeAlasan,
	dataAlasan,
}) {
	return (
		<>
			<Modal
				size="lg"
				isOpen={modalDelete}
				toggle={toggleDecline}
				centered={true}
			>
				<MDBModalHeader toggle={toggleDecline}>
					<span className={styles.headText}> Tolak Pengguna </span>
				</MDBModalHeader>
				<ModalBody>
					<center className="container-popup">
						{/* <Row className={`justify-content-center ${styles.wrapper}`}>
                            <h3 className={styles.title}>Verifikasi Pengguna</h3>
                        </Row> */}

						<Row className={`justify-content-center ${styles.wrapper}`}>
							<h4 className={styles.title}>{data.name}</h4>
							<h5 className={styles.sub_title}>{data.type}</h5>
						</Row>

						<div className={styles.text}>Yakin tolak pengguna ini?</div>
						<textarea
							name="alasan_tolak"
							className={styles.input_alasan}
							onChange={handleChangeAlasan}
							placeholder="Tulis Alasan Penolakan..."
						></textarea>
						{dataAlasan === "" && (
							<p className={styles.styleError}>
								Alasan Penolakan tidak boleh kosong
							</p>
						)}
						{/* <Button color="" className={styles.btn_cancel} onClick={toggleVerify}>Tidak</Button> */}
						<Button
							disabled={dataAlasan === ""}
							color=""
							className={styles.btn_confirm}
							onClick={deleteAction}
						>
							TOLAK
						</Button>
					</center>
				</ModalBody>
			</Modal>
		</>
	);
}

export default PopupConfirmation;
