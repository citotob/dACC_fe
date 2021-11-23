import React from 'react'

import { Modal, ModalBody, Button, Row } from 'reactstrap';
import styles from "./styles.module.css"

const ModalSetujuiSurvey = ({ isOpenModal, toggleModal, handleSetujuiSurvey }) => {
  return (
    <>
      <Modal size="lg" isOpen={isOpenModal} toggle={toggleModal} centered={true} >
        <ModalBody>
          <Row className={styles.row_top}>
            <h3 className={`${styles.title} justify-content-center`}>Setujui Hasil Survey</h3>
          </Row>
          <Row className={styles.wrapper_btn}>
            <Button color="" className={styles.btn_cancel} onClick={toggleModal}>Cancel</Button>
            <Button color="" className={styles.btn_submit} onClick={handleSetujuiSurvey} >Submit</Button>
          </Row>

        </ModalBody>
      </Modal>
    </>
  )
}

export default ModalSetujuiSurvey