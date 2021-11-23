import React from 'react'

import { Modal, ModalBody, Button, Row } from 'reactstrap';
import styles from "./styles.module.css"

const ModalTandaiSurvey = ({ isOpenModal, toggleModal, handleChangeAlasan, handleTandaiSurvey }) => {
  return (
    <>
      <Modal size="lg" isOpen={isOpenModal} toggle={toggleModal} centered={true} >
        <ModalBody>
          <Row className={styles.row_top}>
            <h3 className={`${styles.title} justify-content-center`}>Tandai Hasil Survey</h3>
          </Row>
          <span className={styles.labelReason}> Deskripsi Issue Temuan </span>
          <Row className={styles.fielReason}>

            <textarea name="alasan_tolak" className={styles.input_alasan} onChange={handleChangeAlasan} placeholder="Tuliskan Deskripsi..."></textarea>
          </Row>
          <Row className={styles.wrapper_btn}>
            <Button color="" className={styles.btn_cancel} onClick={toggleModal}>Cancel</Button>
            <Button color="" className={styles.btn_submit} onClick={handleTandaiSurvey} >Submit</Button>
          </Row>

        </ModalBody>
      </Modal>
    </>
  )
}

export default ModalTandaiSurvey