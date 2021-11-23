import React from 'react'

import { Modal, ModalBody, Row } from 'reactstrap';
import styles from "./styles.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const AlertFail = ({ isOpenModal, toggle, message }) => {
    return (
        <>
            <Modal size="sm" isOpen={isOpenModal} toggle={toggle} centered={true} >
                <ModalBody>
                    <center>
                        <img src="/images/ic-failed.svg" />
                        <br />
                        <br />
                        <h3>
                            Gagal
                        </h3>
                        <p>{message}</p>
                        <br />
                        <button type="button" className="btn btn-danger" onClick={toggle}>Tutup</button>
                    </center>
                </ModalBody>
            </Modal>
        </>
    )
}

export default AlertFail