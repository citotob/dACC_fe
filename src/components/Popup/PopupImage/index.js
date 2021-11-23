import React from 'react'
import styles from "./styles.module.css"
import {Modal, ModalBody} from 'reactstrap'

const PopupImage = (props) => {
    return (
        <>
            <Modal size="lg" isOpen={props.modalImage} toggle={props.toggleImage} centered={true} >
                <ModalBody>
                    <img src={props.image} className={styles.image} alt=""></img>
                </ModalBody>
            </Modal>
        </>
    )
}

export default PopupImage