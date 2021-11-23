import React from 'react'

import { Modal, ModalBody, Button, Row } from 'reactstrap';
import styles from './styles.module.css'
function PopupConfirmation({ toggleVerify, modalVerify, data, verifyAction }) {
    return (
        <>
            <Modal
                size="lg"
                isOpen={modalVerify}
                toggle={toggleVerify}
                centered={true}
            >
                <ModalBody>
                    <center className="container-popup">
                        <Row className={`justify-content-center ${styles.wrapper}`}>
                            <h3 className={styles.title}>Verifikasi Pengguna</h3>
                        </Row>

                        <Row className={`justify-content-center ${styles.wrapper}`}>
                            <h4 className={styles.title}>{data.name}</h4>
                            <h5 className={styles.sub_title}>{data.type}</h5>
                        </Row>
                        
                        <div className={styles.text}>Yakin verifikasi pengguna ini?</div>
                        <Button color="" className={styles.btn_cancel} onClick={toggleVerify}>Tidak</Button>
                        <Button color="" className={styles.btn_confirm} onClick={verifyAction}>Ya</Button>
                    </center>
                </ModalBody>
            </Modal>
        </>
    );
};

export default PopupConfirmation;