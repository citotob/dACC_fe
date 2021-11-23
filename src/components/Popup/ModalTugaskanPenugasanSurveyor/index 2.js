import React, { useState } from "react";
import {
  Modal,
  ModalBody,
  Button,
  Row,
  Spinner
} from "reactstrap";
import styles from "./styles.module.css";
import ButtonPDF from "../../../assets/icons/pdf-icon.svg";
import get from "lodash.get";
import moment from "moment";

const ModalTugaskanPenugasanSurveyor = (props) => {
  const org = window.localStorage.getItem("org");

  // menutab active
  const jenis_survey = props.jenisSurvey === "AI" ? "Akses Internet" : "BTS";
  const jenis_survey_style = props.jenisSurvey === "AI" ? styles.jenis_survey_text : styles.jenis_survey_textbts;

  // loading
  const [loading, setLoading] = useState(false)

  // Handle Date
  const [dateTugaskan, setDateTugaskan] = useState("");
  const [dateSLA, setDateSLA] = useState("");

  const [staffsurveyors, setStaffSurveyors] = useState([]);
  const [assignedStaff, setAssignedStaff] = useState("");
  const [tanggalSelesai, setTanggalSelesai] = useState("");

  const LoadingSpinner = () => {
    return <Spinner color="primary"></Spinner>;
  };

  const fetchDataSurveyor = () => {
    fetch(`${process.env.REACT_APP_BE_URL}/user/getstaffsurvey/?role=staffs&organization=${org}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((result) => {
        return result.json();
        //
      })
      .then((result) => {
        setStaffSurveyors(result.values);
      })
      .catch((e) => console.log(e));
  };

  const handleChange = (e) => {
    const target = e.target;
    const value = target.value;
    switch (target.name) {
      case "staffSurveyor":
        setAssignedStaff(value);
        break;
      case "TanggalPenugasan":
        setTanggalSelesai(value);
        break;
      default:
        break;
    }
  };

  const submitChangeStatus = () => {
    return fetch(`${process.env.REACT_APP_BE_URL}/survey/changestatuspenugasan/`, {
      method: "POST",
      body: JSON.stringify({
        kode: props.data.kode,
        status: "on progress",
      }),
    });
  };

  const submitAssignTugas = () => {
    const userid = window.localStorage.getItem("userid");
    return fetch(`${process.env.REACT_APP_BE_URL}/survey/assignpenugasan/`, {
      method: "POST",
      body: JSON.stringify({
        user: userid,
        kode: props.data.kode,
        assignto: assignedStaff,
        ke: "2",
      }),
    });
  };

  const submitData = (e) => {
    setLoading(true);
    Promise.all([submitChangeStatus(), submitAssignTugas()])
      .then((result) => {
        setLoading(false);
        props.toggle();
        if (result[0].ok && result[1].ok) {
          props.handleAlert(true, 'Penugasan');
        } else {
          props.handleAlert(false, 'Penugasan');
        }
      })
      .catch((e) => {
        setLoading(false);
        props.toggle();

        console.log("catch error", e);
        props.handleAlert(false, 'Penugasan');
      });
  };

  // handle Change Date SLA
  const initDateBoundary = () => {
    setDateSLA(moment(data.target).format("YYYY-MM-DD"));

    if (moment(data.tanggal_penugasan).format("YYYYMMDD") < moment(data.target).format("YYYYMMDD")) {
      setDateTugaskan(moment(data.tanggal_penugasan).format("YYYY-MM-DD"));
    } else {
      setDateTugaskan("");
    }
  };

  const onModalOpened = () => {
    initDateBoundary();

    fetchDataSurveyor();

    setLoading(false);

    console.log(props.data);
  }

  // // data penugasan
  // useEffect(() => {
  //   fetchDataSurveyor();
  // }, []);
  // useDeepCompareEffect(() => { }, [data]);

  const data = props.data;
  const status = get(data, 'status', [Object.assign({}, { status: '-' })]);
  // const status = data.status ?? [Object.assign({}, { status: '-' })];

  return (
    <Modal
      size="lg"
      isOpen={props.isOpen}
      toggle={props.toggle}
      centered={true}
      onOpened={onModalOpened}
    >
      <ModalBody>
        <center className="container-popup">
          <Row className={`justify-content-center ${styles.wrapper}`}>
            <span className={styles.title}>Penugasan</span>
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
              {/* <p className={styles.tanggal_text}>Jenis Survey </p> */}
              <p className={jenis_survey_style}>{jenis_survey}</p>
            </div>
          </div>

          {/* Tanggal Tugaskan */}
          <div className={styles.wrapper_tanggal}>
            <div className={styles.wrapper_tanggal_data}>
              <p className={styles.tanggal_text}>Tanggal Penugasan dari BAKTI: </p>
              <p className={styles.tanggal_text_sub}>
                {get(data, 'tanggal_penugasan', '-') !== '-'
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
                {get(data, 'target', '-') !== '-'
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
                {/* <img onClick={() => handlePreviewPDF()} src={ButtonPDF} alt="" /> */}
              </p>
            </div>
          </div>

          {/* File SPK */}
          <div className={styles.wrapper_tanggal}>
            <div className={styles.wrapper_tanggal_data}>
              <p className={styles.tanggal_text}>File SPK: </p>
              <p className={styles.tanggal_text_sub}>
                {get(data, 'spk', '-') !== '-'
                  ?
                  <a
                    href={`${process.env.REACT_APP_BE_URL}${data.spk.path}`}
                    target="_blank" rel="noopener noreferrer"
                    download
                  >
                    <Button
                      color=""
                    // className={styles.button_pdf_verifp}
                    >
                      <img src={ButtonPDF} alt="" />
                    </Button>
                  </a>
                  : 'File SPK tidak tersedia'
                }
              </p>
            </div>
          </div>

          <div className={`justify-content-center ${styles.wrapper}`}>
            <span className={styles.title_subtitle}>Beri Penugasan</span>
          </div>

          {/* Staff Surveyor */}
          <div className={styles.inputPop}>
            <label className={styles.labTug}>Nama Staff Surveyor</label>
            <select
              name="staffSurveyor"
              className={styles.FieldTug}
              onChange={handleChange}
            >
              <option value={""}>Pilih</option>
              {staffsurveyors.map((data, index) => {
                return <option value={data.id}>{data.name}</option>;
              })}
            </select>
          </div>

          {/* Tanggal penugasan */}
          <div className={styles.inputPen}>
            <label className={styles.labTug}>Tanggal Penugasan Staff Surveyor</label>
            <input
              type="date"
              min={dateTugaskan}
              max={dateSLA}
              name="TanggalPenugasan"
              className={styles.FieldTug}
              onChange={handleChange}
            />
          </div>

          <Row className={styles.wrapper_btn}>
            <Button color="" className={styles.btnCancel} onClick={props.toggle}>
              Cancel
            </Button>
            <Button
              className={styles.btnConfirm}
              onClick={submitData}
              disabled={assignedStaff === "" || tanggalSelesai === "" ? true : false}
            >
              {loading ? <LoadingSpinner /> : "Tugaskan"}
            </Button>
          </Row>
        </center>
      </ModalBody>
    </Modal>
  );
};

export default ModalTugaskanPenugasanSurveyor;
