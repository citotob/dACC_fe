import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { Label, Modal, Alert } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation";

// Import custom styling
import style from "./style.module.css";

// Import Components
import Table from "../../components/Penugasan/TableBootstrap/TableBootstrap";

// import redux
import { useSelector } from "react-redux";

// Import API
import API from "../../services";

function Penugasan() {
  let role = window.localStorage.getItem("roleName");

  // for redux
  const breadcrumbItem = useSelector(
    (state) => state.BreadcrumbReducer.breadcrumbItem
  );

  const location = useLocation();
  const PageTitle = () => {
    return location.pathname
      .substr(location.pathname.lastIndexOf("/") + 1)
      .replace("-", " ")
      .replaceAll("%20", " ")
      .replaceAll("%24", "/");
    // .toUpperCase();
  };

  // states yang diturunkan ke table
  const [breadcrumbStatus, setbreadcrumbStatus] = useState("aksesinternet");

  // modal states
  const [modalAddDataOpen, setmodalAddDataOpen] = useState(false);
  const [docUpload, setDocUpload] = useState();
  const [errorDocFormat, setErrorDocFormat] = useState();
  // modal functions

  //alert state
  const [alertAddDataStatus, setalertAddDataStatus] = useState(
    style.alertAddDataOff
  );

  function tog_AddData() {
    setmodalAddDataOpen(!modalAddDataOpen);
    removeBodyCss();
  }

  function removeBodyCss() {
    document.body.classList.add("no_padding");
  }

  // handleValidSubmit
  function handleValidSubmit(event, values) {
    // props.loginUser(values, props.history);
  }
  function handleChange(e) {
    switch (e.target.name) {
      case "unggah-rfi":
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
          <h5 className={style.title}>Tambahkan Pengguna</h5>
          {/* ============================== form start  */}

          <AvForm
            className='form-horizontal'
            onValidSubmit={(e, v) => {
              handleValidSubmit(e, v);
            }}
          >
            <AvField
              name='nameCustomMessage'
              label='Name'
              type='text'
              placeholder='Nama'
              className={`${style.placeholder} form-control`}
              validate={{
                required: {
                  value: true,
                  errorMessage: "Please enter a name",
                },
                pattern: {
                  value: "^[A-Za-z0-9]+$",
                  errorMessage: "Nama hanya berisi huruf dan angka",
                },
                minLength: {
                  value: 6,
                  errorMessage: "Nama harus lebih dari 6 karakter",
                },
              }}
            />
            <AvField
              name='emailProp'
              label='Email'
              type='text'
              className={style.placeholder}
              placeholder='Email'
              validate={{
                required: {
                  value: true,
                  errorMessage: "Masukkan email yang valid",
                },
                email: {
                  value: true,
                  errorMessage: "Pastikan penulisan email sesuai",
                },
              }}
            />
            <label className='col-form-label'>Tipe Pengguna</label>
            <div>
              <select
                className={`form-control form-group ${style.placeholder}`}
              >
                <option className={style.placeholder}>Pilih</option>
                <option className={style.placeholder}>Admin</option>
                <option className={style.placeholder}>Admin Surveyor</option>
                <option className={style.placeholder}>Tipe Pengguna C</option>
              </select>
            </div>

            <label className='col-form-label'>Nama Instansi</label>
            <div>
              <select
                className={`form-control form-group ${style.placeholder}`}
              >
                <option className={style.placeholder}>Pilih</option>
                <option className={style.placeholder}>Instansi A</option>
                <option className={style.placeholder}>Instansi B</option>
                <option className={style.placeholder}>Instansi C</option>
              </select>
            </div>
            <AvField
              name='username'
              label='Username'
              value=''
              className={`${style.placeholder} form-control`}
              placeholder='Enter Username'
              type='username'
              required
            />
            <div className={`${style.passwordBox}`}>
              <AvField
                name='password'
                label='Password'
                value=''
                type='password'
                required
                className={style.placeholder}
                placeholder='Enter Password'
              />
            </div>
            {/* <FormGroup> */}
            <Label for='basicpill-firstname-input14'>Dokumen Pendukung</Label>
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
              name={"unggah-rfi"}
              onChange={handleChange}
              className='form-control'
              style={{
                display: "flex",
                justifyItems: "center",
                alignItems: "center",
                height: "43px",
              }}
              accept='application/pdf'
            />
            {/* </FormGroup> */}

            <div className={`span2 ${style.modalButtonWrapper}`}>
              <button
                type='button'
                onClick={() => {
                  tog_AddData();
                }}
                className={`btn-block waves-effect ${style.noButton}`}
                data-dismiss='modal'
              >
                Batal
              </button>
              <button
                type='submit'
                className={`bln-block waves-effect waves-light ${style.yesButton}`}
                onClick={() => {
                  tog_AddData();
                  setalertAddDataStatus(style.alertAddDataOn);
                  setTimeout(() => {
                    setalertAddDataStatus(style.alertAddDataOff);
                  }, 2000);
                }}
              >
                Tambah
              </button>
            </div>
          </AvForm>

          {/* ============================== form   */}
        </div>
      </Modal>
    );
  };

  return (
    <div className={style.pageFont}>
      <div className={`${alertAddDataStatus}`}>
        <Alert color='success'>Pengguna berhasil di Ditambahkan!</Alert>
      </div>
      <div className='page-content px-4'>
        {modalAddData()}
        {/* ======================== HEADER ======================= */}
        <div className='d-flex flex-row justify-content-between'>
          <div className='d-flex flex-row align-items-center'>
            <div className='align-self-center'>
              <span className={`${style.pageTitle} mr-4 `}>{PageTitle()}</span>
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
            <Breadcrumbs title={PageTitle()} breadcrumbItem={breadcrumbItem} />
          </div>
        </div>
        {/* ======================== CONTENT ======================= */}
        <div className='py-4'>
          <Table setbreadcrumbStatus={setbreadcrumbStatus} />
        </div>
      </div>
    </div>
  );
}

export default Penugasan;
