import React, { useState, useCallback } from 'react'

import { Modal, ModalBody, Button, Row } from 'reactstrap';
import styles from './styles.module.css'

function PopupDelete({toggleDecline, modalDelete, data,deleteAction, handleChangeAlasan}) {
    return (
        <>
            <Modal size="lg"  isOpen={modalDelete} toggle={toggleDecline} centered={true} >
                <ModalBody>
                    <center className="container-popup">
                        <Row className={`justify-content-center ${styles.wrapper}`}>
                            <h3 className={styles.title}>Hapus Pengguna</h3>
                        </Row>
                        <Row className={`justify-content-center ${styles.wrapper}`}>
                            <h4 className={styles.title}>{data.name}</h4>
                            <textarea name="alasan_tolak" className={styles.input_alasan} onChange={handleChangeAlasan} placeholder="Tulis Alasan Penolakan..."></textarea>
                        </Row>
                        <div className={styles.text}>Yakin hapus pengguna ini?</div>
                        <Button color="" className={styles.btn_cancel} onClick={toggleDecline}>Tidak</Button>
                        <Button color="" className={styles.btn_confirm} onClick={deleteAction}>Ya</Button>
                    </center>
                </ModalBody>
            </Modal>
        </>
    );
};

export default PopupDelete;