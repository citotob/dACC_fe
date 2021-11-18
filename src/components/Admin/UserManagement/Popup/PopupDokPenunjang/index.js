import React from "react";
import styles from "./styles.module.css";
import { Modal, ModalBody, Button, Row, Container } from "reactstrap";
import { Link } from "react-router-dom";

const PopupDokPenunjang = (props) => {
	// console.log(props);
	return (
		<>
			<Modal
				size="lg"
				isOpen={props.modalDok}
				toggle={props.toggleDok}
				centered={true}
			>
				<ModalBody>
					<Row>
						<Container>
							<h3 className={styles.title_dok}>Dokumen Penujang</h3>
						</Container>
					</Row>
					<Row>
						<h3 className={styles.titName}>{props.data.name}</h3>
					</Row>
					<iframe
						src={`${process.env.REACT_APP_BE_URL}${
							props.data.doc ? props.data.doc.path : ""
						}`}
						// src={}
						target="_top"
						className={styles.iframe_doc}
						frameBorder="0"
						allowFullScreen
					></iframe>
					<Button
						color=""
						className={styles.btn_cancel}
						onClick={props.toggleDok}
					>
						Cancel
					</Button>
					{/* <Link
            to={`${process.env.REACT_APP_BE_URL}${props.data.doc ? props.data.doc.path : ""}`}
            target="_blank"
            >
            <Button className={styles.btn_download} color="">
              Download
            </Button>
          </Link> */}
				</ModalBody>
			</Modal>
		</>
	);
};

export default PopupDokPenunjang;
