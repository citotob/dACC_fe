import React from 'react'

import { Modal, ModalBody, Button, Row } from 'reactstrap';
import styles from './styles.module.css'

function PopupConfirmationHasilSurvey({ kode, isOpenModal, toggleModal, handleConfirmHasilSurvey }) {
  return (
    <>
      <Modal size="lg" isOpen={isOpenModal} toggle={toggleModal} centered={true} >
        <ModalBody>
          <center className="container-popup">
            <Row className={`justify-content-center ${styles.wrapper_top}`}>
              <h4 className={styles.title}>Kode Survey</h4>
              <h5 className={styles.sub_title}>{kode}</h5>
            </Row>
            <Row className={`justify-content-center ${styles.wrapper_middle}`}>
              <h3 className={styles.confirm}>Yakin Setujui Hasil Survey ini ?  </h3>
            </Row>
            <Button color="" className={styles.btn_cancel} onClick={toggleModal}>Batal</Button>
            <Button color="" className={styles.btn_confirm} onClick={handleConfirmHasilSurvey} >Ya</Button>
          </center>
        </ModalBody>
      </Modal>
    </>
  );
};

export default PopupConfirmationHasilSurvey;