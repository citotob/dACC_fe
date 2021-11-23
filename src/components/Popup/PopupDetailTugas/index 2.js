import React from "react";

import { Modal, ModalBody, Button, Row } from "reactstrap";
import styles from "./popupdetailtugas.module.css";
import ButtonPDF from "../../../assets/icons/pdf-icon.svg";
import get from "lodash.get";
var moment = require("moment");

function PopupDetailTugas(props) {
  // menutab active
  const jenis_survey = props.jenisSurvey === "AI" ? "Akses Internet" : "BTS";
  const jenis_survey_style = props.jenisSurvey === "AI" ? styles.jenis_survey_text : styles.jenis_survey_textbts;

  const data = props.data;
  const status = get(data, 'status', [Object.assign({}, { status: '-' })]);

  return (
    <>
      <Modal
        size="lg"
        centered={true}
        isOpen={props.modalTugasAI}
        toggle={props.toggleTugasAI}
      >
        <ModalBody>
          <center className="container-popup">
            <Row className={`justify-content-center ${styles.wrapper}`}>
              <span className={styles.title}>Detail Penugasan</span>
            </Row>

            {/* Title */}
            <div>
              <span className={styles.tlRow}>
                {`${get(data, 'lokasisurvey.desa.name', '-')} | ${get(data, 'kode', '-')}`}
              </span>
              <span className={styles.status}>
                Status: {status.slice(-1).pop().status}
              </span>
              <span className={styles.latitude}>
                {get(data, 'lokasisurvey.latitude', '-')}
              </span>
              |
              <span className={styles.longitude}>
                {get(data, 'lokasisurvey.longitude', '-')}
              </span>
            </div>

            {/* Jenis Survey */}
            <div className={styles.wrapper_tanggal}>
              <div className={styles.wrapper_jenis_survey}>
                <p className={jenis_survey_style}>{jenis_survey}</p>
              </div>
            </div>

            {/* Nama Instansi */}
            <div className={styles.wrapper_tanggal}>
              <div className={styles.wrapper_tanggal_data}>
                <p className={styles.tanggal_text}>Nama Instansi Survey: </p>
                <p className={styles.tanggal_text_sub}>
                  {get(data, 'surveyor.name', '-')}
                </p>
              </div>
            </div>

            {/* Tanggal Tugaskan */}
            <div className={styles.wrapper_tanggal}>
              <div className={styles.wrapper_tanggal_data}>
                <p className={styles.tanggal_text}>Tanggal Penugasan dari BAKTI: </p>
                <p className={styles.tanggal_text_sub}>
                  {data.tanggal_penugasan
                    ? moment(data.tanggal_penugasan).format("DD/MM/YYYY")
                    : "-"}
                </p>
              </div>
            </div>

            {/* Tanggal SLA */}
            <div className={styles.wrapper_tanggal}>
              <div className={styles.wrapper_tanggal_data}>
                <p className={styles.tanggal_text}>SLA Tanggal Penyelesaian: </p>
                <p className={styles.tanggal_text_sub}>
                  {data.target
                    ? moment(data.target).format("DD/MM/YYYY")
                    : "-"}
                </p>
              </div>
            </div>

            {/* No. SPK */}
            <div className={styles.wrapper_tanggal}>
              <div className={styles.wrapper_tanggal_data}>
                <p className={styles.tanggal_text}>No. SPK: </p>
                <p className={styles.tanggal_text_sub}>
                  {" "}
                  {get(data, 'nospk', '-')}
                </p>
              </div>
            </div>

            {/* File SPK */}
            <div className={styles.wrapper_tanggal}>
              <div className={styles.wrapper_tanggal_data}>
                <p className={styles.tanggal_text}>File SPK: </p>
                <p className={styles.tanggal_text_sub}>
                  {data.spk !== undefined
                    ?
                    <a
                      href={`${process.env.REACT_APP_BE_URL}${data.spk.path}`}
                      target="_blank" rel="noopener noreferrer"
                      download
                    >
                      <Button
                        color=""
                        className={styles.button_pdf_verifp}
                      >
                        <img src={ButtonPDF} alt="" />
                      </Button>
                    </a>
                    : 'File SPK tidak tersedia'
                  }
                </p>
              </div>
            </div>


            {/* Staff Surveyor */}
            <div className={styles.wrapper_tanggal}>
              <div className={styles.wrapper_tanggal_data}>
                <p className={styles.tanggal_text}>Staff yang ditugaskan: </p>
                <p className={styles.tanggal_text_sub}>
                  {" "}
                  {get(data, 'assignto1.name', '-')}
                </p>
              </div>
            </div>

            {/* Tanggal terakhir update */}
            <div className={styles.wrapper_tanggal}>
              <div className={styles.wrapper_tanggal_data}>
                <p className={styles.tanggal_text}>Tanggal ditugaskan ke staff: </p>
                <p className={styles.tanggal_text_sub}>
                  {" "}
                  {/* Hanya ambil yang date on progress */}
                  {status
                    ? get(status, '[2].status') === 'on progress'
                      ? moment(get(status, '[2]').date).format("DD/MM/YYYY")
                      : "-"
                    : "-"}
                </p>
              </div>
            </div>

            {/* Button */}
            <div className={styles.wrapper_btn}>
              <Button color="" className={styles.btnCancel} onClick={props.toggleTugasAI}>
                Tutup
              </Button>
            </div>
          </center>
        </ModalBody>
      </Modal>
    </>
  );
}

export default PopupDetailTugas;
