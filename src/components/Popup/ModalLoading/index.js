import React from 'react'

import { Modal, ModalBody, Button, Row, Spinner } from 'reactstrap';
import styles from "./styles.module.css"

const ModalLoading = ({ isOpenModal }) => {
    const LoadingSpinner = () => {
        return <Spinner color="primary"></Spinner>;
    };
    return (
        <>
            <Modal size="sm" isOpen={isOpenModal} toggle={() => { }} centered={true} >
                <ModalBody>
                    <center>
                        <Row>
                            <div className="col-12">
                                <h3 className={`${styles.title} justify-content-center`}>Loading..</h3>
                            </div>
                        </Row>
                        <LoadingSpinner />
                    </center>
                </ModalBody>
            </Modal>
        </>
    )
}

export default ModalLoading