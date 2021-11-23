import React, { useState, useContext } from "react";
import {
  Modal,
  ModalBody,
  Button,
  Row,
  Spinner,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import TambahLokasi from "./tambahlokasi.module.css";
import FileDownloadExcel from "./TemplateExcel.xlsm";
import { Link } from "react-router-dom";
import RootContext from "../../../context";

function ModalTambahLokasi(props) {
  const [uploadFile, setUploadFile] = useState(null);

  // loading
  const [loading, setLoading] = useState(false);

  // const contextLokasi = useContext(RootContext);

  const submit = async (e) => {
    let formData = new FormData();
    formData.append("excel_file", uploadFile);
    setLoading(true);
    await fetch(`${process.env.REACT_APP_BE_URL}/survey/uploadlokasi/`, {
      method: "POST",
      body: formData,
    })
      .then((result) => result.json())
      .then((result) => {
        setLoading(false);
        props.toggle();

        if (result.success) {

          if ((result.message).length > 1) {
            props.handleAlert(false);
          } else {
            props.handleAlert(true);
          }


          // setUpload(false);
          // props.toggle();
          // contextLokasi.dispatch({ type: "CHANGE_NOTIF", value: true });
          // contextLokasi.dispatch({ type: "CHANGE_ALERT", value: true });
          // clearTimeout(timerLokasi);
          // setTimerLokasi(
          //   setTimeout(() => {
          //     contextLokasi.dispatch({ type: "CHANGE_NOTIF", value: false });
          //     contextLokasi.dispatch({ type: "CHANGE_RELOAD", value: false });
          //   }, 10000)
          // );
          // setUpload(false);
          // contextLokasi.dispatch({ type: "CHANGE_MESSAGE", value: "" });
        } else { // Failure add locations

          props.handleAlert(false);

          // props.toggle();
          // setUpload(true);
          // clearTimeout(timerLokasi);
          // setNotifLokasi(true);
          // setAlertLokasi(false);
          // setTimerLokasi(
          //   setTimeout(() => {
          //     setNotifLokasi(false);
          //   }, 10000)
          // );
          // contextLokasi.dispatch({ type: "CHANGE_NOTIF", value: true });
          // contextLokasi.dispatch({ type: "CHANGE_ALERT", value: false });
          // clearTimeout(timerLokasi);
          // contextLokasi.dispatch({ type: "CHANGE_MESSAGE", value: `${result.message}` });
          // setUpload(false);
        }
      })
      .catch((e) => {  // Network / System Failure
        setLoading(false);
        props.toggle();

        console.log("catch error", e);
        props.handleAlert(false);

        // contextLokasi.dispatch({ type: "CHANGE_NOTIF", value: true });
        // contextLokasi.dispatch({ type: "CHANGE_ALERT", value: false });
        // clearTimeout(timerLokasi);
        // setTimerLokasi(
        //   setTimeout(() => {
        //     contextLokasi.dispatch({ type: "CHANGE_NOTIF", value: false });
        //     contextLokasi.dispatch({ type: "CHANGE_RELOAD", value: false });
        //   }, 10000)
        // );
        // setUpload(false);
        // contextLokasi.dispatch({ type: "CHANGE_MESSAGE", value: "" });
      });
  };

  const onModalOpened = () => {
    setLoading(false);
    setUploadFile(null);
  }

  return (
    <RootContext.Consumer>
      {() => {
        return (
          <Modal
            className={TambahLokasi.modCont}
            size="lg"
            centered={true}
            isOpen={props.isOpen}
            toggle={props.toggle}
            onOpened={onModalOpened}
          >
            <ModalBody className={TambahLokasi.modbody}>
              <span className={TambahLokasi.titleModal}>Tambah Lokasi</span>

              <FormGroup style={{ display: "flex", flexDirection: "column" }}>
                <Label className={TambahLokasi.lbUnduh}> Unduh Template </Label>
                <Button className={TambahLokasi.btnAi} type="submit" name="download">
                  <Link
                    className={TambahLokasi.btnlink}
                    to={`${FileDownloadExcel}`}
                    target="_blank"
                    download>
                    Template Excel Lokasi
                  </Link>
                </Button>
                <hr className={TambahLokasi.formHR}></hr>
              </FormGroup>

              {loading ? (
                <FormGroup style={{ display: "flex", justifyContent: "center" }}>
                  <Spinner />
                </FormGroup>
              ) : (
                  <FormGroup>
                    <Label className={TambahLokasi.lbUnggah}> Unggah File List Lokasi Survey </Label>
                    <Input
                      onChange={(e) => setUploadFile(e.target.files[0])}
                      className={TambahLokasi.input}
                      type="file"
                      name="file"
                      accept=".xlsm, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    />
                    <hr className={TambahLokasi.formHR}></hr>
                  </FormGroup>
                )}

              <Row className={TambahLokasi.btn_modal}>
                <Button className={TambahLokasi.btnCancel} color="#999" onClick={props.toggle}>
                  Cancel
                </Button>
                <Button
                  className={TambahLokasi.btn_tambah}
                  disabled={uploadFile === "" ? true : false}
                  onClick={submit}
                >
                  Submit
                </Button>
              </Row>

            </ModalBody>
          </Modal>
        );
      }}
    </RootContext.Consumer>
  );
}

export default ModalTambahLokasi;
