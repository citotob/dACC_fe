import React, { useState, useCallback } from 'react'

import { Modal, ModalBody, ModalHeader, Button, Row, ModalFooter } from 'reactstrap';
import styles from './styles.module.css'

function PopupAlasan({ isOpenModal, toggleModalAlasan, comment }) {
    return (
        <>
            <Modal size="lg" isOpen={isOpenModal} toggle={toggleModalAlasan} centered={true} contentClassName={styles.modal} >
                <ModalHeader className={styles.modal_header}>Alasan Penolakan</ModalHeader>
                <ModalBody>
                    <center className="container-popup">
                        <Row className={`justify-content-center ${styles.wrapper_content}`}>
                            <p>{comment}</p>
                        </Row>
                    </center>
                </ModalBody>
                <ModalFooter className={styles.modal_footer}>
                    <center>
                        <Button color="" className={styles.btn_cancel} onClick={toggleModalAlasan}>Tutup</Button>
                    </center>
                </ModalFooter>
            </Modal>
        </>
    );
};

export default PopupAlasan;