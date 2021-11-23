import React from 'react'
import { Modal, ModalBody, Button, Col, Row, ModalFooter, Spinner, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import styles from "./styles.module.css"

const ModalDetailHasilSurvey = ({isOpen, toggle}) => {
    return (
        <Modal size="lg" centered={true} isOpen={isOpen} toggle={toggle}>
            <ModalBody>
                <tbody>
                    <tr>
                        <td>{"test"}</td>
                        <td>{"test"}</td>
                        <td>{"test"}</td>
                        <td>{"test"}</td>
                    </tr>
                </tbody>
            </ModalBody>
        </Modal>
    )
}

export default ModalDetailHasilSurvey