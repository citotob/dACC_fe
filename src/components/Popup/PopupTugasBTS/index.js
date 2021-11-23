import React, { useState, useEffect } from 'react'

import { Modal, ModalBody, Button, Row, Container } from 'reactstrap';
import popTugasBTS from './popuptugasbts.module.css'

function PopupTugasBTS(props) {
  const [orglist, setOrglist] = useState([]);
  const [org, setOrg] = useState("");
  const [date, setDate] = useState("");
  const [sla, setSla] = useState("");
  const [spk, setSpk] = useState("");
  const [fileSpk, setFileSpk] = useState(null);

  // menutab active
  let jenis = props.data.jenis === "Akses Internet" ? "AI" : "BTS";
  let lokasi_id = props.data._id;

  // Handle Date
  const [dateTugaskan, setDateTugaskan] = useState("");
  const [dateSLA, setDateSLA] = useState("");

  let jenis_survey = props.jenisSurvey;

  const fetchorg = () => {
    fetch(`${process.env.REACT_APP_BE_URL}/survey/getsurveyor/`, {
      method: "POST",
      body: JSON.stringify(
        { "surveyor": "all", "jenis": "ai/bts" }
      )
    })
      .then(result => result.json())
      .then(result =>
        setOrglist(result.values)
      )
  }

  useEffect(() => {
    fetchorg()
  }, [])

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
    let userid = window.localStorage.getItem('userid');

    let formData = new FormData();

    formData.append('user', userid);
    formData.append('jenissurvey', jenis);
    formData.append('surveyor', org);
    formData.append('tanggal_penugasan', date);
    formData.append('lokasisurvey', lokasi_id);
    formData.append('sla', sla);
    formData.append('nospk', spk);
    formData.append('doc', fileSpk);

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
      .catch((e) => console.log("catch error", e));
  }

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
        isOpen={props.modalTugasBTS}
        toggle={props.toggleTugasBTS}
        onOpened={resetState}
      >
        <ModalBody>
          <center className="container-popup">
            <Container>
              <Row className={`justify-content-center ${popTugasBTS.wrapper}`}>
                <span className={popTugasBTS.title}>Buat Penugasan Baru</span>
              </Row>

              {/* Title */}
              <Row className={`${popTugasBTS.titRow} ${popTugasBTS.wrapperLokasi}`}>
                <span className={popTugasBTS.tlRow}>{props.data.desa === undefined ? '' : props.data.desa.name}</span>
                <span className={popTugasBTS.latitude}>{props.data === undefined ? '' : props.data.latitude} , </span>
                <span className={popTugasBTS.longitude}>{props.data === undefined ? '' : props.data.longitude}</span>
              </Row>

              {/* Jenis Survey */}
              <Row>
                <div className={popTugasBTS.inputPop}>
                  <p className={popTugasBTS.labTug}>Jenis Survey </p>
                  <div className={`${popTugasBTS.label_jenis_survey}`}>
                    <p className={popTugasBTS.label_jenis_survey_text}>{jenis_survey}</p>
                  </div>
                </div>
              </Row>

              {/* Nama Instansi */}
              <Row>
                <div className={popTugasBTS.inputPop}>
                  <label className={popTugasBTS.labTug}>Nama Instansi Survey</label>
                  <select
                    type="select"
                    name="organization"
                    className={popTugasBTS.FieldTug}
                    onChange={(e) => setOrg(e.target.value)}
                  >
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
              </Row>

              {/* Tanggal Tugaskan */}
              <Row>
                <div className={popTugasBTS.inputPop}>
                  <label className={popTugasBTS.labTug}>Tanggal Penugasan</label>
                  <input
                    type="date"
                    max={dateSLA}
                    name="TanggalPenugasan"
                    className={popTugasBTS.FieldTug}
                    onChange={(e) => handleChangeTanggalTugaskan(e)} />
                </div>
              </Row>

              {/* Tanggal SLA */}
              <Row>
                <div className={popTugasBTS.inputPop}>
                  <label className={popTugasBTS.labTug}>SLA Penyelesaian Survey</label>
                  <input
                    type="date"
                    min={dateTugaskan}
                    name="TanggalSLA"
                    className={popTugasBTS.FieldTug}
                    onChange={(e) => handleChangeTanggalSLA(e)} />
                </div>
              </Row>

              {/* No. SPK */}
              <Row>
                <div className={popTugasBTS.inputPop}>
                  <label className={popTugasBTS.labTug}>Input Nomor SPK</label>
                  <input
                    type="text"
                    name="nospk"
                    className={`${popTugasBTS.FieldTug} ${popTugasBTS.inputnumber}`}
                    pattern='^[0-9]*$'
                    onChange={(e) => setSpk(e.target.value)}
                  />
                </div>
              </Row>

              {/* Unggah SPK */}
              <Row>
                <div className={popTugasBTS.inputPop}>
                  <label className={popTugasBTS.labTug}>Unggah SPK</label>
                  <input
                    type="file"
                    name="FileSpk"
                    accept="application/pdf"
                    className={popTugasBTS.FieldTug}
                    onChange={(e) => setFileSpk(e.target.files[0])}
                  />
                </div>
              </Row>

              {/* Button */}
              <Row className={popTugasBTS.wrapper_buttons}>
                <Button color="" className={popTugasBTS.btnCancel} onClick={props.toggleTugasBTS}>Cancel</Button>
                <Button
                  className={popTugasBTS.btnConfirm}
                  onClick={() => buatTugas()}
                  disabled={
                    org === "" || date === "" || sla === "" || spk === "" || fileSpk === null
                      ? true
                      : false
                  }>
                  Tugaskan
									</Button>
              </Row>

            </Container>

          </center>
        </ModalBody>
      </Modal>
    </>
  );
};

export default PopupTugasBTS;