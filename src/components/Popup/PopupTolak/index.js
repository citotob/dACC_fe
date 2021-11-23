import React from "react";

import { Modal, ModalBody, Button, Row } from "reactstrap";
import styles from "./styles.module.css";

function PopupDelete({ toggleDecline, modalDelete, data, deleteAction, handleChangeAlasan }) {
  return (
    <>
      <Modal
        size="lg"
        isOpen={modalDelete}
        toggle={toggleDecline}
        centered={true}
      >
        <ModalBody>
          <center className="container-popup">
            <Row className={`justify-content-center ${styles.wrapper}`}>
              <h3 className={styles.title}>Tolak Pengguna</h3>
            </Row>

            <Row className={`justify-content-center ${styles.wrapper}`}>
              <h4 className={styles.title}>{data.name}</h4>
              <h5 className={styles.role}>{data.role ? data.role.name : ""}</h5>
              <div className={styles.text_confirm}>
                <p className={styles.text_confirm_paragraph}>Yakin menolak pengguna ini?</p>
              </div>
              <textarea
                name="alasan_tolak"
                className={styles.input_alasan}
                onChange={handleChangeAlasan}
                placeholder="Tulis Alasan Penolakan..."></textarea>
            </Row>
            <Button color="" className={styles.btn_cancel} onClick={toggleDecline}>
              Tidak
            </Button>
            <Button color="" className={styles.btn_confirm} onClick={deleteAction}>
              Ya
            </Button>
          </center>
        </ModalBody>
      </Modal>
    </>
  );
}

export default PopupDelete;
