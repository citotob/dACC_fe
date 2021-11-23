import React, { useState, useCallback } from "react";

import { Modal, ModalBody, Button, Row } from "reactstrap";
import styles from "./style.module.css";
import { useHistory } from "react-router-dom";
import logo from "../../../assets/img/baktikominfo.png";

function ModalLogout({ toggleModalLogout, modalLogout }) {
  let history = useHistory();
  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("userid");
    localStorage.removeItem("org");
    localStorage.removeItem("orgpt");
    localStorage.removeItem("email");
    localStorage.removeItem("username");
    localStorage.removeItem("tokenFirebase");
    localStorage.clear();
    history.push("/login");
  };

  return (
    <>
      <Modal
        size="lg"
        isOpen={modalLogout}
        toggle={toggleModalLogout}
        centered={true}
        className={styles.modal}>
        <ModalBody className={styles.modalBody}>
          <center className={styles.modalContent}>
            <div className={styles.text}>Yakin ingin keluar ?</div>
              {/* <img src={logo} height={"70px"} width={"100px"} className={`${styles.logoImg} mt-3 mb-3 d-flex justify-content-center`} /> */}
              <div>
                <Button color="" className={styles.btn_cancel} onClick={toggleModalLogout}>
                  Cancel
                </Button>
                <Button color="" className={styles.btn_sending} onClick={handleLogout}>
                  Ya
                </Button>
              </div>
          </center>
        </ModalBody>
      </Modal>
    </>
  );
}

export default ModalLogout;
