import React, { useEffect, useState } from "react";
import { MDBContainer, MDBModal, MDBModalBody, MDBModalHeader } from "mdbreact";
import { Col, Row, Input, Button } from "reactstrap";
import styles from "./style.module.css";
import './style.css'

function SelectFromDb(props) {
	const [modal, setModal] = useState(false);
	function displayModal() {
		setModal((prevModal) => !prevModal);
	}

	return (
		<>
			<Button className={styles.buttonStyle} onClick={displayModal}>
				Add from Database
			</Button>
			<MDBContainer>
				<MDBModal
					size="lg"
					isOpen={modal}
					toggle={displayModal}
					centered={true}
				>
					<MDBModalHeader>Tambah Batch</MDBModalHeader>
					<MDBModalBody>
						<Row>MODAL TAMBAH BATCH</Row>
					</MDBModalBody>
				</MDBModal>
			</MDBContainer>
		</>
	);
}
export default SelectFromDb;
