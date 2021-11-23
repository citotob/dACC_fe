import React, { useState, useEffect } from "react";

import { Modal, ModalBody, Button, Row } from "reactstrap";
import popTugas from "./popuptugas.module.css";
import prefixData from "./prefixData.json";

function PopupTugas(props) {
  const [orglist, setOrglist] = useState([]);
  const [org, setOrg] = useState("");
  const [date, setDate] = useState("");
  const [sla, setSla] = useState("");
  const [spk, setSpk] = useState("");
  const [fileSpk, setFileSpk] = useState(null);

  // menutab active
  let jenis_survey = props.jenisSurvey === "Akses Internet" ? "AI" : "BTS";
  let lokasi_id = props.data._id;

  // Handle Date
  const [dateTugaskan, setDateTugaskan] = useState("");
  const [dateSLA, setDateSLA] = useState("");

  // timer
  const [prefix, setPrefix] = useState("");

  const prefixList = Object.values(prefixData);
  const handlePrefix = () => {
    if (props.data.length > 0) {
      if (props.data.provinsi.length > 0) {
        return null;
      } else {
        prefixList.map((prefix) => {
          if (prefix === props.data.provinsi.name) {
            return setPrefix(prefix);
          }

          setPrefix(null);
        });
      }
    }

    return null;
  };

  async function fetchorg() {
    return fetch(`${process.env.REACT_APP_BE_URL}/survey/getsurveyor/`, {
      method: "POST",
      body: JSON.stringify({ surveyor: "all", jenis: "ai/bts" }),
    })
      .then((result) => result.json())
      .then((result) => {
        setOrglist(result.values);
      });
  }

  useEffect(() => {
    fetchorg();
  }, []);

  // Assign Penugasan
  const assignTugas = (formData) => {
    return fetch(`${process.env.REACT_APP_BE_URL}/survey/assignpenugasan/`, {
      method: "POST",
      body: formData,
    })
      .then((result) => result.json())
      .then(async (result) => {
        return result
      })
      .catch((e) => console.log("catch error", e));
  }

  // Add Penugasan
  const buatTugas = async () => {
    const userid = window.localStorage.getItem("userid");

    let formData = new FormData();

    formData.append("user", userid);
    formData.append("jenissurvey", jenis_survey);
    formData.append("surveyor", org);
    formData.append("tanggal_penugasan", date);
    formData.append("lokasisurvey", lokasi_id);
    formData.append("sla", sla);
    formData.append("nospk", spk);
    formData.append("doc", fileSpk);
    formData.append("prefix", prefix);

    // Add Penugasan
    return fetch(`${process.env.REACT_APP_BE_URL}/survey/addpenugasan/`, {
      method: "POST",
      body: formData,
    })
      .then((result) => result.json())
      .then(async (result) => {
        if (result.success) {
          let formAssign = new FormData();

          // Asign Penugasan to User
          formAssign.append("user", userid)
          formAssign.append("kode", result.values.kode)
          formAssign.append("assignto", org)
          formAssign.append("ke", "1")
          const objectData = {
            user: userid,
            kode: result.values.kode,
            assignto: org,
            ke: "1"
          }
          const jsonData = JSON.stringify(objectData)
          const assign = await assignTugas(jsonData)

          if (assign.success) {
            props.handleAlert(true);
          } else {
            props.handleAlert(false);
          }
        } else {
          props.handleAlert(false);
        }
      })
      .catch((e) => {

        console.log("catch error", e)
        props.handleAlert(false);
      });
  };

  // handle Change Date Tugaskan
  const handleChangeTanggalTugaskan = (e) => {
    setDateTugaskan(e.target.value);
    setDate(`${e.target.value} 00:00:00`)
  };

  // handle Change Date SLA
  const handleChangeTanggalSLA = (e) => {
    setDateSLA(e.target.value);
    setSla(`${e.target.value} 00:00:00`)
  };

  const resetState = () => {
    setOrg("");
    setDate("");
    setSla("");
    setSpk("");
    setFileSpk(null);
  }

  return (
    <>
      <Modal
        size="lg"
        centered={true}
        isOpen={props.modalTugasAI}
        toggle={props.toggleTugasAI}
        onOpened={resetState}
      >
        <ModalBody>
          <center className="container-popup">
            <Row className={`justify-content-center ${popTugas.wrapper}`}>
              <span className={popTugas.title}>Buat Penugasan Baru</span>
            </Row>

            {/* Title */}
            <Row className={`${popTugas.titRow}`}>
              <span className={popTugas.tlRow}>{props.data.desa ? props.data.desa.name : ""}</span>
              <span className={popTugas.latitude}>{props.data.latitude}</span> |
              <span className={popTugas.longitude}>{`${props.data.longitude}`}</span>
            </Row>

            {/* Jenis Survey */}
            <div className={popTugas.inputPop}>
              <label className={popTugas.labTug_jenisSurvey}>Jenis Survey</label>
              <div className={popTugas.jenis_survey_text}>{jenis_survey}</div>
            </div>

            {/* Nama Instansi */}
            <div className={popTugas.inputPop}>
              <label className={popTugas.labTug_jenisSurvey_Instansi}>Nama Instansi Survey</label>

              <select
                type="select"
                name="organization"
                className={popTugas.FieldTug}
                onChange={(e) => setOrg(e.target.value)}>
                <option defaultValue="" value="" selected>
                  Pilih nama instansi
                </option>
                {orglist.map((data, index) => {
                  return (
                    <option key={index} value={data._id}>
                      {data.name}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* Tanggal Tugaskan */}
            <div className={popTugas.inputPop}>
              <label className={popTugas.labTug_jenisSurvey}>Tanggal Penugasan</label>
              <input
                type="date"
                max={dateSLA}
                name="TanggalPenugasan"
                className={popTugas.FieldTug}
                onChange={(e) => handleChangeTanggalTugaskan(e)}
              />
            </div>

            {/* Tanggal SLA */}
            <div className={popTugas.inputPop}>
              <label className={popTugas.labTug_jenisSurvey}>SLA Penyelesaian Survey</label>
              <input
                type="date"
                min={dateTugaskan}
                name="SLA"
                className={popTugas.FieldTug}
                onChange={(e) => handleChangeTanggalSLA(e)}
              />
            </div>

            {/* No. SPK */}
            <div className={popTugas.inputPop}>
              <label className={popTugas.labTug_jenisSurvey}>Input Nomor SPK</label>
              <input
                type="text"
                name="SPK"
                className={popTugas.FieldTug}
                onChange={(e) => setSpk(e.target.value)}
              />
            </div>

            {/* Unggah SPK */}
            <div className={popTugas.inputPop}>
              <label className={popTugas.labTug_jenisSurvey}>Unggah SPK</label>
              <input
                type="file"
                name="fileSPK"
                className={popTugas.FieldTug}
                onChange={(e) => setFileSpk(e.target.files[0])}
                accept="application/pdf"
              />
            </div>

            {/* Button */}
            <div className={popTugas.wrapper_btn}>
              <Button color="" className={popTugas.btnCancel} onClick={props.toggleTugasAI}>
                Cancel
              </Button>
              <Button
                className={popTugas.btnConfirm}
                onClick={() => buatTugas()}
                disabled={
                  org === "" || date === "" || sla === "" || spk === "" || fileSpk === null
                    ? true
                    : false
                }>
                Tugaskan
              </Button>
            </div>
          </center>
        </ModalBody>
      </Modal>
    </>
  );
}

export default PopupTugas;
