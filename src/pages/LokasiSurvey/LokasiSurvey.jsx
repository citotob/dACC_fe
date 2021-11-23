import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { Label, Modal, Alert } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

// availity-reactstrap-validation
// import { AvForm, AvField } from "availity-reactstrap-validation";

// Import custom styling
import style from "./style.module.css";

import axios from "axios";

//import loader
import Loader from "react-loader-spinner";

// Import Components
import Table from "../../components/LokasiSurvey/TableBootstrap/TableBootstrap";

//import API
import { url } from "../../services/Config";
import FileDownloadExcel from "./TemplateExcel.xlsm";

// import API from "../../services";
const source = axios.CancelToken.source();

function LokasiSurvey() {
  const location = useLocation();
  const PageTitle = () => {
    return location.pathname
      .substr(location.pathname.lastIndexOf("/") + 1)
      .replace("-", " ")
      .replaceAll("%20", " ")
      .replaceAll("%24", "/");
  };

  // states
  const [uploadLoading, setuploadLoading] = useState(false);
  const [uploadStateFail, setuploadStateFail] = useState(false);
  const [uploadStateSuccess, setuploadStateSuccess] = useState(false);
  // modal states
  const [modalAddDataOpen, setmodalAddDataOpen] = useState(false);
  const [docUpload, setDocUpload] = useState();
  const [errorDocFormat, setErrorDocFormat] = useState("");

  // modal functions

  //alert state
  const [alertAddDataStatus, setalertAddDataStatus] = useState(
    style.alertAddDataOff
  );
  const [alertServerErrorStatus, setalertServerErrorStatus] = useState(
    style.alertAddDataOff
  );

  function tog_AddData() {
    setmodalAddDataOpen((prev) => !prev);
    removeBodyCss();
  }

  function removeBodyCss() {
    document.body.classList.add("no_padding");
  }

  const handleUploadFile = (e) => {
    let formData = new FormData();
    formData.append("excel_file", docUpload);
    setuploadLoading(true);
    axios
      .post(`${url}/survey/uploadlokasi/`, formData, {
        cancelToken: source.token,
      })
      .then((res) => {
        if (res.status === 200) {
          console.log("berhasil upload lokasi 200 : ", res);
          setuploadLoading(false);
          var string = res.data.message;
          var length = 12;
          var resMessage = string.substring(0, length);
          if (resMessage === "Lokasi gagal") {
            setuploadStateFail(true);
          } else {
            setuploadStateSuccess(true);
            setTimeout(() => {
              tog_AddData();
              setuploadStateSuccess(false);
              setalertAddDataStatus(style.alertAddDataOn);
            }, 3000);

            setTimeout(() => {
              setalertAddDataStatus(style.alertAddDataOff);
              window.location.reload();
            }, 7000);
          }
        }
      })
      .catch((err) => {
        if (err?.response?.status === 500) {
          tog_AddData();
          setalertServerErrorStatus(style.alertAddDataOn);
          console.log("log server 500 error");
          setTimeout(() => {
            setalertServerErrorStatus(style.alertAddDataOff);
          }, 4000);
        } else {
          console.log("gagal upload lokasi: ", err.response);
          setuploadLoading(false);
        }
      });
  };

  function handleChange(e) {
    switch (e.target.name) {
      case "excel_file":
        let fileExtension = e.target.files[0].name.split(".").pop();
        if (fileExtension !== "xlsm") {
          setErrorDocFormat("Format Dokumen harus .xlsm");
          setDocUpload("");
        } else {
          setErrorDocFormat("");
          setDocUpload(e.target.files[0]);
          console.log("doc udah masuk");
        }
        break;
    }
  }

  // Modal component for tambah data
  const modalAddData = () => {
    return (
      <Modal
        isOpen={modalAddDataOpen}
        centered={true}
        toggle={() => {
          tog_AddData();
        }}
      >
        <div className={`modal-body ${style.modalBody}`}>
          <h5 className={style.title}>Tambahkan Lokasi</h5>
          {/* ============================== form start  */}
          <div>
            <p className={`${style.formLabel} text-center`}>Unduh Template</p>
            {/* <a
              // href='https://smaslab.devlabs.id/static/media/TemplateExcel.1b44168f.xlsm'
              href='https://smaslab.devlabs.id/static/media/TemplateExcel.LokasiSurvey.xlsm'
              // href='https://smaslab-v2.devlabs.id/TemplateExcel.LokasiSurvey.xlsm'
              target='_blank'
              // href='./aaa.xlsx'
              // download
              // to='./aaa.xlsx'
              rel='noopener noreferrer'
            >
              <button type='button' className={`${style.downloadButton}`}>
                Template Lokasi
              </button>
            </a> */}
            <a href={`${FileDownloadExcel}`} target='_blank' download>
              <button type='button' className={`${style.downloadButton}`}>
                Template Lokasi
              </button>
            </a>
          </div>
          <div className={`${style.divider}`}></div>
          {uploadLoading ? (
            <>
              <Loader type='TailSpin' color='#A8D0DA' height={80} width={80} />
              <button
                type='button'
                onClick={() => {
                  tog_AddData();
                  setuploadStateFail(false);
                  source.cancel("Operation canceled by the user.");
                  setTimeout(() => {
                    window.location.reload();
                  }, 1000);
                }}
                className={`btn-block waves-effect ${style.noButton}`}
                data-dismiss='modal'
              >
                Cancel Upload
              </button>
            </>
          ) : uploadStateFail ? (
            <>
              <p>Upload gagal. Coba sekali lagi.</p>
              <button
                type='button'
                onClick={() => {
                  tog_AddData();
                  setuploadStateFail(false);
                }}
                className={`btn-block waves-effect ${style.noButton}`}
                data-dismiss='modal'
              >
                Tutup
              </button>
            </>
          ) : uploadStateSuccess ? (
            <p>Upload Berhasil!</p>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUploadFile(e);
              }}
              className={`d-flex flex-column align-items-center ${style.formWrapper}`}
            >
              {/* ================ upload file ===============  */}
              <Label
                for='basicpill-firstname-input14'
                className={`${style.formLabel}`}
              >
                Unggah File List Lokasi Survey
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
                name={"excel_file"}
                onChange={(e) => handleChange(e)}
                className='form-control'
                style={{
                  display: "flex",
                  justifyItems: "center",
                  alignItems: "center",
                  height: "43px",
                }}
                accept='.xlsm, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
              />
              <small className='mt-2'>
                Pastikan lokasi yang diinput merupakan data baru!
              </small>
              {/* ================ buttons ===============  */}
              <div
                className={`d-flex align-items-center justify-content-center mt-4 ${style.modalButtonWrapper}`}
              >
                <button
                  type='button'
                  onClick={() => {
                    tog_AddData();
                    setuploadStateFail(false);
                  }}
                  className={`btn-block waves-effect ${style.noButton}`}
                  data-dismiss='modal'
                >
                  Cancel
                </button>
                {/* <button
                  type='submit'
                  onClick={() => {
                    // tog_AddData();
                    setuploadLoading(false);
                  }}
                  className={`btn-block waves-effect ${style.yesButton}`}
                  data-dismiss='modal'
                >
                  Kirimkan
                </button> */}
                {docUpload ? (
                  <button
                    type='submit'
                    onClick={() => {
                      // tog_AddData();
                      setuploadLoading(false);
                    }}
                    className={`btn-block waves-effect ${style.yesButton}`}
                    data-dismiss='modal'
                  >
                    Kirimkan
                  </button>
                ) : (
                  <button
                    type='button'
                    className={`btn-block waves-effect ${style.yesButton}`}
                    data-dismiss='modal'
                    disabled
                  >
                    Kirimkan
                  </button>
                )}
              </div>
            </form>
          )}
          {/* ============================== form   */}
        </div>
      </Modal>
    );
  };

  return (
    <div className={style.pageFont}>
      <div className={`${alertAddDataStatus}`}>
        <Alert color='success'>Lokasi berhasil di Ditambahkan!</Alert>
      </div>
      <div className={`${alertServerErrorStatus}`}>
        <Alert color='danger'>Upload gagal. SERVER ERROR 500.</Alert>
      </div>
      <div className='page-content px-4'>
        {/* <ModalAddData /> */}
        {modalAddData()}
        {/* ======================== HEADER ======================= */}
        <div className='d-flex flex-row justify-content-between'>
          <div className='d-flex flex-row align-items-center'>
            <div className='align-self-center'>
              <span className={`${style.pageTitle} mr-4 `}>{PageTitle()}</span>
              <button
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
              </button>
            </div>
          </div>
          <div>
            <Breadcrumbs
              title='Lokasi Survey'
              breadcrumbItem='Akses Internet'
            />
          </div>
        </div>
        {/* ======================== CONTENT ======================= */}
        <div className='py-4'>
          <Table />
        </div>
      </div>
    </div>
  );
}

export default LokasiSurvey;
