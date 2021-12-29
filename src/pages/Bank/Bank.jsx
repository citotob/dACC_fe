import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";

import { Label, Modal, Alert } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation";

// Import custom styling
import style from "./style.module.css";

// Import Components
import Table from "../../components/Bank/TableBootstrap/TableBootstrap";

//import API
import API from "../../services";

function Bank() {
  let roleName = window.localStorage.getItem("roleName");
  let userId = window.localStorage.getItem("userid");
  const location = useLocation();
  const history = useHistory();
  const PageTitle = () => {
    return location.pathname
      .substr(location.pathname.lastIndexOf("/") + 1)
      .replace("-", " ")
      .replaceAll("%20", " ")
      .replaceAll("%24", "/");
    // .toUpperCase();
  };

  const [refresh, setrefresh] = useState(false);
  // modal states
  const [modalAddDataOpen, setmodalAddDataOpen] = useState(false);
  const [docUpload, setDocUpload] = useState();
  const [errorDocFormat, setErrorDocFormat] = useState();
  // cito
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  // const [currency, setCurrency] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState([]);
  // 

  // modal error messages
  const [errorMessage, setErrorMessage] = useState("");
  const [toggleAlert, settoggleAlert] = useState(false);
  const [toggleFailedAlert, settoggleFailedAlert] = useState(false);
  const [shouldRefresh, setshouldRefresh] = useState(false);

  useEffect(() => {
  }, []);

  // modal functions
  // submit new bank
  function handleValidSubmit(event, values) {
    if (
      name &&
      code &&
      selectedCurrency
    ) {
      postAddBank();
    } else {
      // sweet alert 2 "data belum lengkap!"
    }
  }

  const postAddBank = () => {
    let formData = new URLSearchParams();

    formData.append("name", name);
    formData.append("code", code);
    formData.append("currency", selectedCurrency);
    formData.append("userid", userId);
    API.postAddBank(formData)
      .then((res) => {
        if (res.status === 200) {
          settoggleAlert(true);
          setTimeout(() => {
            tog_AddData();
            settoggleAlert(false);
          }, 3000);
        }
        setName("");
        setCode("");
        selectedCurrency("");
        // fetch lagi dimari caranya pake refresh token aja, panggil di useeffect fungsi tabel
        setshouldRefresh(!shouldRefresh);

      })
      .catch((err) => {
        setErrorMessage(err?.response?.data?.message ?? "Tambah Bank Gagal");
        settoggleFailedAlert(true);
        setTimeout(() => {
          settoggleFailedAlert(false);
        }, 3000);
      });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      postAddBank();
    }
  };

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
          <div
            style={{ position: "sticky", top: "15px", zIndex: "2000" }}
            className='w-100 d-flex justify-content-center text-center'
          >
            <Alert
              color={"success"}
              isOpen={toggleAlert}
              className={style.alertDetail}
            >
              Tambah Bank berhasil
            </Alert>
            <Alert
              color={"danger"}
              isOpen={toggleFailedAlert}
              className={style.alertDetail}
            >
              {errorMessage &&
                errorMessage?.includes("name") &&
                "Nama Bank Sudah Ada"}
              {errorMessage &&
                errorMessage?.includes("currency") &&
                "Currency Sudah Ada"}
            </Alert>
          </div>
          <h5 className={style.title}>Tambahkan Bank</h5>
          {/* ============================== form start  */}

          <AvForm className='form-horizontal' onValidSubmit={() => postAddBank()}>
            <AvField
              name='nameCustomMessage'
              label='Name'
              type='text'
              placeholder='Nama'
              onChange={(e) => setName(e.target.value)}
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
                  value: 1,
                  errorMessage: "Nama harus lebih dari 1 karakter",
                },
              }}
            />
            <AvField
              name='codeCustomMessage'
              label='Code'
              type='text'
              placeholder='Code'
              onChange={(e) => setCode(e.target.value)}
              className={`${style.placeholder} form-control`}
              validate={{
                required: {
                  value: true,
                  errorMessage: "Please enter a code",
                },
                pattern: {
                  value: "^[A-Za-z0-9]+$",
                  errorMessage: "Code hanya berisi huruf dan angka",
                },
                minLength: {
                  value: 1,
                  errorMessage: "Code harus lebih dari 1 karakter",
                },
              }}
            />
            <label className='col-form-label'>Pilih Currency</label>
            <div>
              <select
                name='Currency'
                onChange={(e) => setSelectedCurrency(e.target.value)}
                className={`form-control form-group ${style.placeholder}`}
              >
                <option value=''>Pilih</option>
                <option value='IDR'>IDR</option>
                <option value='USD'>USD</option>
              </select>
            </div>
            <div className={`span2 ${style.modalButtonWrapper}`}>
              <button
                type='button'
                onClick={() => {
                  tog_AddData();
                  setrefresh(!refresh);
                }}
                className={`btn-block waves-effect ${style.noButton}`}
                data-dismiss='modal'
              >
                Batal
              </button>
              <button
                type='submit'
                className={`bln-block waves-effect waves-light ${style.yesButton}`}
                onClick={handleKeyPress}
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
    <div>
      <div className={`${alertAddDataStatus}`}>
        <Alert color='success'>Bank berhasil di Ditambahkan!</Alert>
      </div>
      <div className='page-content px-4'>
        {modalAddData()}
        {/* ======================== HEADER ======================= */}
        <div className='d-flex flex-row justify-content-between'>
          <div className='d-flex flex-row align-items-center'>
            <div className='align-self-center'>
              <span className={`${style.pageTitle} mr-4 `}>{PageTitle()}</span>
              {roleName === "admin" ? (
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
              ) : (
                <></>
              )}
            </div>
          </div>
          <div>
            <Breadcrumbs title='Data Bank' breadcrumbItem='Aktif' />
          </div>
        </div>
        {/* ======================== CONTENT ======================= */}
        <div className='py-4'>
          <Table shouldRefresh={shouldRefresh} />
        </div>
      </div>
    </div>
  );
}

export default Bank;
