import React from "react";

import { Modal, ModalBody, Button, Row } from "reactstrap";
import styles from "./styles.module.css";

function ModalHapusPengguna({ toggleDelete, modalDelete, data, deleteAction }) {
  return (
    <>
      <Modal
        size="lg"
        isOpen={modalDelete}
        toggle={toggleDelete}
        centered={true}
      >
        <ModalBody>
          <center className="container-popup">
            <Row className={`justify-content-center ${styles.wrapper}`}>
              <h3 className={styles.title}>Hapus Pengguna</h3>
            </Row>

            <Row className={`justify-content-center ${styles.wrapper}`}>
              <h4 className={styles.title}>{data.name}</h4>
              <h5 className={styles.sub_title}>{data.type}</h5>
            </Row>

            <div className={styles.text}>Yakin hapus pengguna ini?</div>
            <Button color="" className={styles.btn_cancel} onClick={toggleDelete}>
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

export default ModalHapusPengguna;
