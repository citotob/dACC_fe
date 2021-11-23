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
                            <h3 className={styles.title}>Tandai Hasil Survey</h3>
                        </Row>
                        <Row className={`justify-content-center ${styles.wrapper}`}>
                            <h4 className={styles.title}>{data.name}</h4>
                            <textarea name="alasan_tolak" className={styles.input_alasan} onChange={handleChangeAlasan} placeholder="Tuliskan Deskripsi..."></textarea>
                        </Row>
                        {/* <div className={styles.text}>Yakin menolak pengguna ini?</div> */}
                        <Button color="" className={styles.btn_cancel} onClick={toggleDecline}>Cancel</Button>
                        <Button color="" className={styles.btn_sending} onClick={deleteAction}>Kirim Hasil Survey</Button>
                    </center>
                </ModalBody>
            </Modal>
        </>
    );
};

export default PopupDelete;