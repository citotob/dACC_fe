import React from "react";
import styles from "./styles.module.css";
import { Modal, ModalBody, Button, Row, Container } from "reactstrap";
import { Link } from "react-router-dom";

const PopupDokPenunjang = (props) => {
  return (
    <>
      <Modal size="lg" isOpen={props.modalDok} toggle={props.toggleDok} centered={true}>
        <ModalBody>
          <Row>
            <Container>
              <h3 className={styles.title_dok}>Dokumen Penujang</h3>
            </Container>
          </Row>
          <iframe
            src={`${process.env.REACT_APP_BE_URL}${props.data.spk ? props.data.spk.path : ""}`}
            target="_top"
            className={styles.iframe_doc}
            frameborder="0"
            allowFullScreen></iframe>
          <Button color="" className={styles.btn_cancel} onClick={props.toggleDok}>
            Cancel
          </Button>

          <Link
            to={`${process.env.REACT_APP_BE_URL}${props.data.spk ? props.data.spk.path : ""}`}
            target="_blank"
            download>
            <Button className={styles.btn_download} color="">
              Download
            </Button>
          </Link>
        </ModalBody>
      </Modal>
    </>
  );
};

export default PopupDokPenunjang;
