import React from 'react'
import { Modal, ModalBody, Button, Col, Row, ModalFooter, Spinner, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import styles from "./styles.module.css"
const ModalBuatPenugasan = (props) => {
    return (
        <Modal size="lg" centered={true} isOpen={props.isOpen} toggle={props.toggle}>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label>Nama Lengkap</Label>
                        <Input className={styles.input} type="text" name="nama" placeholder="Nama Lengkap" />
                    </FormGroup>
                    <FormGroup>
                        <Label>Email</Label>
                        <Input className={styles.input} type="email" name="email" placeholder="Email" />
                    </FormGroup>
                    <FormGroup>
                        <Label>Nama Instansi</Label>
                        <Input className={styles.input} type="instansi" name="instansi" placeholder="Nama Instansi" />
                    </FormGroup>
                    <FormGroup>
                        <Label>Tipe Pengguna</Label>
                        <Input className={styles.input} type="select" name="tipe_pengguna">
                            <option>Admin BAKTI</option>
                            <option>Staff Admin BAKTI</option>
                            <option>Admin Surveyor</option>
                            <option>Staff Surveyor</option>
                            <option>Executive</option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="tipe">Jenis Surveyor</Label>
                        <Input className={styles.input} type="select" name="tipe_surveyor">
                            <option>Akses Internet</option>
                            <option>BTS</option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Username</Label>
                        <Input className={styles.input} type="text" name="username" />
                    </FormGroup>
                    <FormGroup>
                        <Label>Password</Label>
                        <Input className={styles.input} type="password" name="password" />
                    </FormGroup>
                    <FormGroup>
                        <Label>Ulangi Password</Label>
                        <Input className={styles.input} type="password" name="password" />
                    </FormGroup>
                    <FormGroup>
                        <Label>File</Label>
                        <Input className={styles.input} type="file" name="file" accept="application/pdf" />
                    </FormGroup>
                    <Row className={styles.btn_modal}>
                        <Button color="" onClick={props.toggle}>Cancel</Button>
                        <Button className={styles.btn_tambah}>Tambah Pengguna</Button>
                    </Row>
                </Form>
            </ModalBody>
        </Modal>
    )
}

export default ModalBuatPenugasan