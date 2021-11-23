import React, { useState, useEffect } from "react";
import { Modal, Label, Alert } from "reactstrap";

// IMPORT CUSTOM STYLING
import style from "../TableBootstrap/style.module.css";
import "../TableBootstrap/style.css";

//import API
import API from "../../../services";

function Index({ togModal, setTogModal }) {
  // Modal Input States
  const [inputModalOp1, setInputModalOp1] = useState({
    mcc: "",
    mnc: "",
    tac: "",
    type: "",
    enb: "",
    cid: "",
    pci: "",
    f: "",
    b: "",
    ta: "",
    rsrp: "",
    rsrq: "",
    snr: "",
    cqi: "",
    rssi: "",
  });

  const [inputModalOp2, setInputModalOp2] = useState({
    mcc: "",
    mnc: "",
    tac: "",
    type: "",
    enb: "",
    cid: "",
    pci: "",
    f: "",
    b: "",
    ta: "",
    rsrp: "",
    rsrq: "",
    snr: "",
    cqi: "",
    rssi: "",
  });

  const [siMcc, setSiMcc] = useState("");

  // state toggle modals
  const [togModal2, setTogModal2] = useState(false);
  const [togModalInfo, setTogModalInfo] = useState(false);

  //states for upload file
  const [docUpload, setDocUpload] = useState();
  const [errorDocFormat, setErrorDocFormat] = useState();

  // upload file function
  function handleChange(e) {
    switch (e.target.name) {
      case "doc":
        let fileExtension = e.target.files[0].name.split(".").pop();
        if (fileExtension !== "pdf") {
          setErrorDocFormat("Format Dokumen harus .pdf");
          setDocUpload("");
        } else {
          setErrorDocFormat("");
          setDocUpload(e.target.files[0]);
        }
        break;
    }
  }
  const tog_Modal = () => {
    setTogModal(!togModal);
  };
  console.log("the input child comp", inputModalOp1);
  console.log("si tog modal ", togModal);
  console.log("ke refreshed di child");
  // modal components
  const ModalOperator1 = () => {
    const [inputModalOp1, setInputModalOp1] = useState({
      mcc: "",
      mnc: "",
      tac: "",
      type: "",
      enb: "",
      cid: "",
      pci: "",
      f: "",
      b: "",
      ta: "",
      rsrp: "",
      rsrq: "",
      snr: "",
      cqi: "",
      rssi: "",
    });

    console.log("aaaaaaaa ", inputModalOp1);
    return (
      <Modal
        isOpen={togModal}
        centered={true}
        toggle={() => {
          tog_Modal();
        }}
      >
        <div className={`modal-body ${style.modalBody}`}>
          <div className={`w-100 px-5`}>
            <div className={`d-flex flex-column`}>
              <h3 className='text-wrap text-break text-center'>
                OPERATOR SIM 1
              </h3>
            </div>
            <div
              className={`d-flex flex-column align-items-center justify-content-center ${style.modalContentWrapper}`}
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  // handleFormTugaskan(e);
                }}
              >
                {/* ================ Input text ===============  */}
                <div className='form-group'>
                  <label htmlFor='mcc'>MCC</label>
                  <input
                    value={inputModalOp1.mcc}
                    type='text'
                    className='form-control'
                    id='mcc'
                    placeholder='MCC'
                    onChange={(e) => {
                      //   setSiMcc(e.target.value);
                      setInputModalOp1({
                        ...inputModalOp1,
                        mcc: e.target.value,
                      });
                    }}
                    required
                  />
                </div>

                {/* ================ buttons ===============  */}
                <div
                  className={`d-flex flex-row align-items-center justify-content-center mt-4 ${style.modalButtonWrapper}`}
                >
                  <button
                    type='button'
                    onClick={() => {}}
                    className={`waves-effect ${style.yesButton}`}
                    data-dismiss='modal'
                  >
                    Sebelumnya
                  </button>
                  <button
                    type='submit'
                    onClick={() => {}}
                    className={` waves-effect ${style.yesButton}`}
                    data-dismiss='modal'
                  >
                    Selanjutnya
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Modal>
    );
  };

  const ModalInformasi = () => {
    return (
      <Modal isOpen={false} centered={true} toggle={() => {}}>
        <div className={`modal-body px-4 ${style.modalBody}`}>
          <div className='px-4'>
            <div className={` ${style.modalTitleWrapper}`}>
              <div
                className={`d-flex flex-column align-items-center ${style.modalTopTitle}`}
              >
                <h3>INFORMASI</h3>
              </div>
              <div
                className={`d-flex flex-column align-items-start ${style.modalContentWrapper}`}
              >
                <form
                  className={`${style.formWrapper}`}
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
                  {/* ================ input text ===============  */}
                  <div className='form-group'>
                    <label htmlFor='nomorSPK'>Longitude</label>
                    <input
                      type='text'
                      className='form-control'
                      id='nomorSPK'
                      placeholder='Longitude'
                      onChange={(e) => {}}
                      required
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='nomorSPK'>Latitude</label>
                    <input
                      type='text'
                      className='form-control'
                      id='nomorSPK'
                      placeholder='Latitude'
                      onChange={(e) => {}}
                      required
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='nomorSPK'>Speed</label>
                    <input
                      type='text'
                      className='form-control'
                      id='nomorSPK'
                      placeholder='Speed'
                      onChange={(e) => {}}
                      required
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='nomorSPK'>Hdg</label>
                    <input
                      type='text'
                      className='form-control'
                      id='nomorSPK'
                      placeholder='Hdg'
                      onChange={(e) => {}}
                      required
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='nomorSPK'>GPS Acc</label>
                    <input
                      type='text'
                      className='form-control'
                      id='nomorSPK'
                      placeholder='GPS Acc'
                      onChange={(e) => {}}
                      required
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='nomorSPK'>Height</label>
                    <input
                      type='text'
                      className='form-control'
                      id='nomorSPK'
                      placeholder='Height'
                      onChange={(e) => {}}
                      required
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='nomorSPK'>Altitude</label>
                    <input
                      type='text'
                      className='form-control'
                      id='nomorSPK'
                      placeholder='Altitude'
                      onChange={(e) => {}}
                      required
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='nomorSPK'>Ground</label>
                    <input
                      type='text'
                      className='form-control'
                      id='nomorSPK'
                      placeholder='Ground'
                      onChange={(e) => {}}
                      required
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='nomorSPK'>UL</label>
                    <input
                      type='text'
                      className='form-control'
                      id='nomorSPK'
                      placeholder='UL'
                      onChange={(e) => {}}
                      required
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='nomorSPK'>DL</label>
                    <input
                      type='text'
                      className='form-control'
                      id='nomorSPK'
                      placeholder='DL'
                      onChange={(e) => {}}
                      required
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='nomorSPK'>Data</label>
                    <input
                      type='text'
                      className='form-control'
                      id='nomorSPK'
                      placeholder='Data'
                      onChange={(e) => {}}
                      required
                    />
                  </div>

                  {/* ================ upload file lampiran ===============  */}
                  <Label for='basicpill-firstname-input14'>Lampiran</Label>
                  <Label
                    style={{
                      color: "red",
                      marginLeft: "15px",
                      fontSize: "11px",
                    }}
                  >
                    {errorDocFormat === "" ? "" : errorDocFormat}
                  </Label>
                  <input
                    type='file'
                    className='form-control'
                    name={"doc"}
                    onChange={(e) => handleChange(e)}
                    className='form-control'
                    style={{
                      display: "flex",
                      justifyItems: "center",
                      alignItems: "center",
                      height: "43px",
                    }}
                    accept='application/pdf'
                  />
                  {/* ================ upload file KML===============  */}
                  <Label for='basicpill-firstname-input14'>KML File</Label>
                  <Label
                    style={{
                      color: "red",
                      marginLeft: "15px",
                      fontSize: "11px",
                    }}
                  >
                    {errorDocFormat === "" ? "" : errorDocFormat}
                  </Label>
                  <input
                    type='file'
                    className='form-control'
                    name={"doc"}
                    onChange={(e) => handleChange(e)}
                    className='form-control'
                    style={{
                      display: "flex",
                      justifyItems: "center",
                      alignItems: "center",
                      height: "43px",
                    }}
                    accept='application/pdf'
                  />
                  {/* ================ buttons ===============  */}
                  <div
                    className={`d-flex align-items-center justify-content-center mt-4 ${style.modalButtonWrapper}`}
                  >
                    <button
                      type='button'
                      onClick={async () => {}}
                      className={` waves-effect ${style.yesButton}`}
                      data-dismiss='modal'
                    >
                      Sebelumnya
                    </button>
                    <button
                      type='button'
                      onClick={() => {}}
                      className={` waves-effect ${style.yesButton}`}
                      data-dismiss='modal'
                    >
                      Simpan
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    );
  };

  return (
    <div>
      <ModalOperator1 />
    </div>
  );
}

export default Index;
