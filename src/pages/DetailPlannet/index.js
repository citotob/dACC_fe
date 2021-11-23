import React, { useState } from "react";

import { useLocation } from "react-router-dom";

import { Label, Modal } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

// IMPORT STYLE
import style from "./style.module.scss";

// IMPORT CARDS
import CardDetail from "../../components/DetailPlannet/CardDetail";
import CardInfo from "../../components/DetailPlannet/CardInfo";
import CardConfirm from "../../components/DetailPlannet/CardConfirm";

function DetailPlannet(props) {
  // console.log("DetailPlannet", props)
  const location = useLocation();
  const datatable = location.state?.datatable;
  const activeTab = location.state?.activeTab;

  // modal states
  const [modalOpen, setModalOpen] = useState(false);

  // modal functions
  function tog_tambahTitik() {
    setModalOpen(!modalOpen);
    removeBodyCss();
  }

  function removeBodyCss() {
    document.body.classList.add("no_padding");
  }

  //states for upload file
  const [docUpload, setDocUpload] = useState();
  const [errorDocFormat, setErrorDocFormat] = useState();

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

  console.log("planet detail ke refreshed");
  const ModalInputTitik = () => {
    const [nama, setNama] = useState("");
    const [longitude, setlongitude] = useState("");
    const [latitude, setlatitude] = useState("");
    const [lampiran, setlampiran] = useState("");
    const [kml, setkml] = useState("");

    return (
      <Modal
        isOpen={modalOpen}
        // isOpen={true}
        centered={true}
        toggle={() => {
          tog_tambahTitik();
          // setdataLokasiSurvey(null);
        }}
      >
        <div className={`modal-body px-4 ${style.modalBody}`}>
          <div className='px-4'>
            <div className={` ${style.modalTitleWrapper}`}>
              <div
                className={`d-flex flex-column align-items-center ${style.modalTopTitle}`}
              >
                <h3>Tambah Titik Lokasi</h3>
              </div>
              <div
                className={`d-flex flex-column align-items-start ${style.modalContentWrapper}`}
              >
                <form
                  className={`${style.formWrapper}`}
                  onSubmit={(e) => {
                    e.preventDefault();
                    // handleFormTugaskan(e);
                  }}
                >
                  <div className='form-group'>
                    <Label>Nama Titik Lokasi</Label>
                    <input
                      className='form-control'
                      value={nama}
                      onChange={(e) => {
                        setNama(e.target.value);
                      }}
                    />
                  </div>
                  <div className='form-group'>
                    <Label>Longitude</Label>
                    <input className='form-control' />
                  </div>
                  <div className='form-group'>
                    <Label>Latitude</Label>
                    <input className='form-control' />
                  </div>

                  {/* ================ upload file ===============  */}
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
                  <Label
                    for='basicpill-firstname-input14'
                    style={{ marginTop: "15px" }}
                  >
                    Lampiran
                  </Label>
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
                      onClick={() => {
                        tog_tambahTitik();
                        // setdataLokasiSurvey(null);
                      }}
                      className={`waves-effect ${style.noButton}`}
                      data-dismiss='modal'
                    >
                      Batal
                    </button>

                    <button
                      type='submit'
                      onClick={() => {
                        tog_tambahTitik();
                        // setdataLokasiSurvey(null);
                      }}
                      className={`waves-effect ${style.yesButton}`}
                      data-dismiss='modal'
                    >
                      Tambah
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
    <div className={style.pageFont}>
      <ModalInputTitik />
      <div className='page-content px-4'>
        {/* ======================== HEADER ======================= */}
        <div className='d-flex flex-row justify-content-between mb-4'>
          <div className='d-flex flex-row align-items-center'>
            <div className='align-self-center d-flex flex-row align-center'>
              <span className={`${style.pageTitle} mr-4`}>Detail Plannet</span>
              <button
                className={`${style.addDataButton}`}
                type='button'
                onClick={() => {
                  tog_tambahTitik();
                }}
                data-toggle='modal'
                data-target='#myModal'
              >
                <i className='bi bi-plus-circle mr-2'></i>
                <span>Input Titik Lokasi</span>
              </button>
              {/* USE IF SOMETHING TO THE RIGHT OF THE PAGE IS NEEDED */}
              {/* <button
                className={`${style.addDataButton}`}
                type='button'
                onClick={() => {
                  tog_AddData();
                }}
                data-toggle='modal'
                data-target='#myModal'
              >
                <i className='bi bi-plus-circle'></i>
                <span>Tambah Data</span>
              </button> */}
            </div>
          </div>
          <div>
            {/* FIX BREADCRUMB TO SHOW MORE THAN 1 LAYER BELOW */}
            <Breadcrumbs
              title='Plannet'
              breadcrumbItem='Plannet'
              breadcrumbItem='Detail Plannet'
            />
          </div>
        </div>
        {/* ======================== CONTENT ======================= */}
        <CardDetail datatable={datatable} />
        <CardInfo datatable={datatable} />
        <CardConfirm datatable={datatable} activeTab={activeTab} />
      </div>
    </div>
  );
}

export default DetailPlannet;
